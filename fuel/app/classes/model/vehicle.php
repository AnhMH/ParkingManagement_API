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
class Model_Vehicle extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'name',
        'code',
        'monthly_cost',
        'limit',
        'type',
        'card_type',
        'company_id'
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
    protected static $_table_name = 'vehicles';
    
    /**
     * Get list
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Order or false if error
     */
    public static function get_list($param) {
        // Query
        $query = DB::select(
                        self::$_table_name . '.*'
                )
                ->from(self::$_table_name)
        ;

        // Filter
        if (!empty($param['name'])) {
            $query->where(self::$_table_name . '.name', 'LIKE', "%{$param['name']}%");
        }
        if (!empty($param['card_type'])) {
            $query->where(self::$_table_name . '.card_type', $param['card_type']);
        }
        if (!empty($param['type'])) {
            $query->where(self::$_table_name . '.type', $param['type']);
        }
        if (!empty($param['company_id'])) {
            $query->where(self::$_table_name . '.company_id', $param['company_id']);
        }

        // Pagination
        if (!empty($param['page']) && $param['limit']) {
            $offset = ($param['page'] - 1) * $param['limit'];
            $query->limit($param['limit'])->offset($offset);
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
     * Get all
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Order or false if error
     */
    public static function get_all($param) {
        // Query
        $query = DB::select(
                        self::$_table_name . '.*'
                )
                ->from(self::$_table_name)
        ;

        // Filter
        if (!empty($param['name'])) {
            $query->where(self::$_table_name . '.name', 'LIKE', "%{$param['name']}%");
        }
        if (!empty($param['card_type'])) {
            $query->where(self::$_table_name . '.card_type',$param['card_type']);
        }
        if (!empty($param['type'])) {
            $query->where(self::$_table_name . '.type',$param['type']);
        }
        if (!empty($param['company_id'])) {
            $query->where(self::$_table_name . '.company_id', $param['company_id']);
        }

        // Pagination
        if (!empty($param['page']) && $param['limit']) {
            $offset = ($param['page'] - 1) * $param['limit'];
            $query->limit($param['limit'])->offset($offset);
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
        return $data;
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
        $id = !empty($param['id']) ? $param['id'] : 0;
        $self = array();
        $new = false;
        
        // Check code
        if (!empty($param['name'])) {
            $check = self::find('first', array(
                'where' => array(
                    'name' => $param['name'],
                    array('id', '!=', $id)
                )
            ));
            if (!empty($check)) {
                self::errorOther(self::ERROR_CODE_OTHER_1, 'name', 'Loại xe đã tồn tại, vui lòng chọn tên khác.');
                return false;
            }
        }
        
        
        // Check if exist User
        if (!empty($id)) {
            $self = self::find($id);
            if (empty($self)) {
                self::errorNotExist('vehicle_id');
                return false;
            }
        } else {
            $self = new self;
            $new = true;
        }
        
        // Set data
        if (!empty($param['name'])) {
            $self->set('name', $param['name']);
        }
        if (!empty($param['code'])) {
            $self->set('code', $param['code']);
        }
        if (!empty($param['company_id'])) {
            $self->set('company_id', $param['company_id']);
        }
        if (!empty($param['monthly_cost'])) {
            $self->set('monthly_cost', $param['monthly_cost']);
        }
        if (!empty($param['limit'])) {
            $self->set('limit', $param['limit']);
        }
        if (!empty($param['type'])) {
            $self->set('type', $param['type']);
        }
        if (!empty($param['card_type'])) {
            $self->set('card_type', $param['card_type']);
        }
        
        // Save data
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
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
        
        $data = self::find($param['id']);
        
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
        if (empty($param['delete_product'])) {
            $product = Model_Product::find('first', array(
                'where' => array(
                    'cate_id' => $param['id']
                )
            ));
            if (!empty($product)) {
                return -1;
            }
        } else {
            self::deleteRow('products', array(
                'cate_id' => $param['id']
            ));
        }
        
        self::deleteRow(self::$_table_name, array(
            'id' => $param['id']
        ));
        
        return $param['id'];
    }
    
    /**
     * Disable
     *
     * @author AnhMH
     * @param array $param Input data
     * @return Int|bool
     */
    public static function disable($param)
    {
        $table = self::$_table_name;
        $cond = "id IN ({$param['id']})";
        $sql = "DELETE FROM {$table} WHERE {$cond}";
        return DB::query($sql)->execute();
    }
}
