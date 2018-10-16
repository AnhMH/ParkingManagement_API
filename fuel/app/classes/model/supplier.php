<?php

use Fuel\Core\DB;

/**
 * Any query in Model Version
 *
 * @package Model
 * @created 2017-10-22
 * @version 1.0
 * @author AnhMH
 */
class Model_Supplier extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'code',
        'name',
        'phone',
        'email',
        'address',
        'notes',
        'admin_id',
        'created',
        'updated'
    );

    protected static $_observers = array(
        'Orm\Observer_CreatedAt' => array(
            'events'          => array('before_insert'),
            'mysql_timestamp' => false,
        ),
        'Orm\Observer_UpdatedAt' => array(
            'events'          => array('before_update'),
            'mysql_timestamp' => false,
        ),
    );

    /** @var array $_table_name name of table */
    protected static $_table_name = 'suppliers';

    /**
     * List Supplier
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Supplier or false if error
     */
    public static function get_list($param)
    {
        // Query
        $query = DB::select(
                self::$_table_name.'.*'
            )
            ->from(self::$_table_name)
        ;
        
        // Filter
        if (!empty($param['get_order_data'])) {
            $query->select(
                    'orders.total_lack',
                    'orders.sum_total_price',
                    array('orders.created', 'order_created')
                )
                ->join([DB::expr("(
                        SELECT 
                            supplier_id,
                            SUM(lack) as total_lack,
                            SUM(total_price) as sum_total_price,
                            SUBSTRING_INDEX(GROUP_CONCAT(IFNULL(created, '') ORDER BY created DESC SEPARATOR ','),',',1) AS created
                        FROM 
                            orders
                        WHERE
                            type = 1
                            AND disable = 0
                            AND supplier_id > 0
                        GROUP BY supplier_id
                    )"), 'orders'], 'LEFT')
                ->on('suppliers.id', '=', 'orders.supplier_id')
            ;
        }
        if (!empty($param['keyword'])) {
            $query->where_open();
            $query->where(self::$_table_name.'.name', 'LIKE', "%{$param['keyword']}%");
            $query->or_where(self::$_table_name.'.code', 'LIKE', "%{$param['keyword']}%");
            $query->or_where(self::$_table_name.'.phone', 'LIKE', "%{$param['keyword']}%");
            $query->where_close();
        }
        
        // Pagination
        if (!empty($param['page']) && $param['limit']) {
            $offset = ($param['page'] - 1) * $param['limit'];
            $query->limit($param['limit'])->offset($offset);
        }
        if (!empty($param['admin_id'])) {
            $query->where(self::$_table_name . '.admin_id', $param['admin_id']);
        }
        
        // Sort
        if (!empty($param['sort'])) {
            if (!self::checkSort($param['sort'])) {
                self::errorParamInvalid('sort');
                return false;
            }

            $sortExplode = explode('-', $param['sort']);
            if ($sortExplode[0] == 'created') {
                $sortExplode[0] = self::$_table_name . '.created';
            }
            $query->order_by($sortExplode[0], $sortExplode[1]);
        } else {
            $query->order_by(self::$_table_name . '.id', 'DESC');
        }
        
        // Get data
        $data = $query->execute()->as_array();
        $total = !empty($data) ? DB::count_last_query(self::$slave_db) : 0;
        
        return array(
            'total' => $total,
            'data' => $data
        );
    }
    
    /**
     * Add update info
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int|bool User ID or false if error
     */
    public static function add_update($param)
    {
        // Init
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : '';
        $id = !empty($param['id']) ? $param['id'] : 0;
        $self = array();
        $new = false;
        
        // Check code
        if (!empty($param['code'])) {
            $check = self::find('first', array(
                'where' => array(
                    'code' => $param['code'],
                    array('id', '!=', $id)
                )
            ));
            if (!empty($check)) {
                self::errorDuplicate('code');
                return false;
            }
        }
        
        
        // Check if exist User
        if (!empty($id)) {
            $self = self::find($id);
            if (empty($self)) {
                self::errorNotExist('user_id');
                return false;
            }
        } else {
            $self = new self;
            $new = true;
        }
        
        // Set data
        $self->set('admin_id', $adminId);
        if (!empty($param['name'])) {
            $self->set('name', $param['name']);
        }
        if (!empty($param['code']) && $new) {
            $self->set('code', $param['code']);
        }
        if (!empty($param['address'])) {
            $self->set('address', $param['address']);
        }
        if (!empty($param['phone'])) {
            $self->set('phone', $param['phone']);
        }
        if (!empty($param['email'])) {
            $self->set('email', $param['email']);
        }
        if (!empty($param['notes'])) {
            $self->set('notes', $param['notes']);
        }
        if (!empty($param['birthday'])) {
            $self->set('birthday', $param['birthday']);
        }
        if (isset($param['gender'])) {
            $self->set('gender', $param['gender']);
        }
        
        // Save data
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
            }
            if (empty($param['code']) && $new) {
                $code = Lib\Str::generate_code('NCC', $self->id);
                $self->set('code', $code);
                $self->save();
            }
            return $self->id;
        }
        
        return false;
    }
    
    /**
     * Get detail
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array
     */
    public static function get_detail($param)
    {
        $data = array();
        
        $data['supplier'] = self::find($param['id']);
        
        return $data;
    }
    
    /**
     * Delete
     *
     * @author AnhMH
     * @param array $param Input data
     * @return Int|bool
     */
    public static function del($param)
    {
        $delete = self::deleteRow(self::$_table_name, array(
            'id' => $param['id']
        ));
        if ($delete) {
            return $param['id'];
        } else {
            return 0;
        }
    }
    
    /**
     * Supplier auto complete
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Supplier or false if error
     */
    public static function auto_complete($param)
    {
        // Query
        $query = DB::select(
                self::$_table_name.'.*'
            )
            ->from(self::$_table_name)
        ;
        
        // Filter
        if (!empty($param['keyword'])) {
            $query->where_open();
            $query->where(self::$_table_name.'.name', 'LIKE', "%{$param['keyword']}%");
            $query->or_where(self::$_table_name.'.code', 'LIKE', "%{$param['keyword']}%");
            $query->where_close();
        }
        if (!empty($param['admin_id'])) {
            $query->where(self::$_table_name . '.admin_id', $param['admin_id']);
        }
        
        // Pagination
        if (!empty($param['page']) && $param['limit']) {
            $offset = ($param['page'] - 1) * $param['limit'];
            $query->limit($param['limit'])->offset($offset);
        }
        
        // Sort
        $query->order_by(self::$_table_name . '.id', 'DESC');
        
        // Get data
        $data = $query->execute()->as_array();
        
        return $data;
    }
    
    /**
     * Get all
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Supplier or false if error
     */
    public static function get_all($param)
    {
        // Query
        $query = DB::select(
                self::$_table_name.'.*'
            )
            ->from(self::$_table_name)
        ;
        
        // Filter
        if (!empty($param['keyword'])) {
            $query->where_open();
            $query->where(self::$_table_name.'.name', 'LIKE', "%{$param['keyword']}%");
            $query->or_where(self::$_table_name.'.code', 'LIKE', "%{$param['keyword']}%");
            $query->where_close();
        }
        if (!empty($param['admin_id'])) {
            $query->where(self::$_table_name . '.admin_id', $param['admin_id']);
        }
        
        // Pagination
        if (!empty($param['page']) && $param['limit']) {
            $offset = ($param['page'] - 1) * $param['limit'];
            $query->limit($param['limit'])->offset($offset);
        }
        
        // Sort
        $query->order_by(self::$_table_name . '.id', 'DESC');
        
        // Get data
        $data = $query->execute()->as_array();
        
        return $data;
    }
}
