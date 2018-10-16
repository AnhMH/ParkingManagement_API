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
class Model_Product extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'code',
        'name',
        'qty',
        'origin_price',
        'sell_price',
        'is_inventory',
        'is_allow_negative',
        'cate_id',
        'manufacture_id',
        'description',
        'image',
        'is_hot',
        'is_new',
        'is_feature',
        'is_display_web',
        'seo_description',
        'seo_keyword',
        'admin_id',
        'created',
        'updated',
        'disable',
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
    protected static $_table_name = 'products';

    /**
     * List Product
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Product or false if error
     */
    public static function get_list($param)
    {
        // Query
        $query = DB::select(
                self::$_table_name.'.*',
                array('cates.name', 'cate_name')
            )
            ->from(self::$_table_name)
            ->join('cates', 'LEFT')
            ->on('cates.id', '=', self::$_table_name.'.cate_id')
        ;
        
        // Filter
        if (!empty($param['keyword'])) {
            $query->where_open();
            $query->where(self::$_table_name.'.name', 'LIKE', "%{$param['keyword']}%");
            $query->or_where(self::$_table_name.'.code', 'LIKE', "%{$param['keyword']}%");
            $query->where_close();
        }
        if (isset($param['disable']) && $param['disable'] != '') {
            $query->where(self::$_table_name.'.disable', $param['disable']);
        } else {
            $query->where(self::$_table_name.'.disable', 0);
        }
        if (!empty($param['cate_id'])) {
            $cateIds = explode(',', $param['cate_id']);
            $query->where(self::$_table_name.'.cate_id', 'IN', $cateIds);
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
        
        // Upload image
        if (!empty($_FILES)) {
            $uploadResult = \Lib\Util::uploadImage(); 
            if ($uploadResult['status'] != 200) {
                self::setError($uploadResult['error']);
                return false;
            }
            $param['image'] = !empty($uploadResult['body']['image']) ? $uploadResult['body']['image'] : '';
        }
        
        // Set data
        $self->set('admin_id', $adminId);
        if (!empty($param['name'])) {
            $self->set('name', $param['name']);
        }
        if (!empty($param['code']) && $new) {
            $self->set('code', $param['code']);
        }
        if (isset($param['qty'])) {
            $self->set('qty', $param['qty']);
        }
        if (isset($param['origin_price'])) {
            $self->set('origin_price', $param['origin_price']);
        }
        if (isset($param['sell_price'])) {
            $self->set('sell_price', $param['sell_price']);
        }
        if (isset($param['is_inventory'])) {
            $self->set('is_inventory', $param['is_inventory']);
        }
        if (isset($param['status'])) {
            $self->set('status', $param['status']);
        }
        if (isset($param['is_allow_negative'])) {
            $self->set('is_allow_negative', $param['is_allow_negative']);
        }
        if (isset($param['cate_id'])) {
            $self->set('cate_id', $param['cate_id']);
        }
        if (isset($param['manufacture_id'])) {
            $self->set('manufacture_id', $param['manufacture_id']);
        }
        if (isset($param['description'])) {
            $self->set('description', $param['description']);
        }
        if (isset($param['image'])) {
            $self->set('image', $param['image']);
        }
        if (isset($param['is_hot'])) {
            $self->set('is_hot', $param['is_hot']);
        }
        if (isset($param['is_new'])) {
            $self->set('is_new', $param['is_new']);
        }
        if (isset($param['is_feature'])) {
            $self->set('is_feature', $param['is_feature']);
        }
        if (isset($param['is_display_web'])) {
            $self->set('is_display_web', $param['is_display_web']);
        }
        if (isset($param['seo_description'])) {
            $self->set('seo_description', $param['seo_description']);
        }
        if (isset($param['seo_keyword'])) {
            $self->set('seo_keyword', $param['seo_keyword']);
        }
        
        // Save data
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
            }
            if (empty($param['code']) && $new) {
                $code = Lib\Str::generate_code('SP', $self->id);
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
        $query = DB::select(
                self::$_table_name.'.*',
                array('cates.name', 'cate_name')
            )
            ->from(self::$_table_name)
            ->join('cates', 'LEFT')
            ->on('cates.id', '=', self::$_table_name.'.cate_id')
            ->where(self::$_table_name.'.id', $param['id'])
        ;
        $data['product'] = $query->execute()->offsetGet(0);;
        
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
     * Disable
     *
     * @author AnhMH
     * @param array $param Input data
     * @return Int|bool
     */
    public static function disable($param)
    {
        $disable = !empty($param['disable']) ? 1 : 0;
        $self = self::find($param['id']);
        if (empty($self)) {
            self::errorNotExist('product_id');
            return false;
        }
        $self->set('disable', $disable);
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
            }
            return $self->id;
        }
        return false;
    }
    
    /**
     * List Product
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Product or false if error
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
        if (!empty($param['term'])) {
            $query->where_open();
            $query->where(self::$_table_name.'.name', 'LIKE', "%{$param['term']}%");
            $query->or_where(self::$_table_name.'.code', 'LIKE', "%{$param['term']}%");
            $query->where_close();
        }
        $query->where(self::$_table_name.'.disable', 0);
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
     * @return array|bool Detail Product or false if error
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
        if (!empty($param['ids'])) {
            $query->where(self::$_table_name.'.id', 'IN', $param['ids']);
        }
        $query->where(self::$_table_name.'.disable', 0);
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
     * List Product
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Product or false if error
     */
    public static function get_inventory($param)
    {
        // Query
        $query = DB::select(
                self::$_table_name.'.*',
                array('cates.name', 'cate_name')
            )
            ->from(self::$_table_name)
            ->join('cates', 'LEFT')
            ->on('cates.id', '=', self::$_table_name.'.cate_id')
            ->where(self::$_table_name.'.is_inventory', 1)
            ->where(self::$_table_name.'.disable', 0)
        ;
        
        // Filter
        if (!empty($param['keyword'])) {
            $query->where_open();
            $query->where(self::$_table_name.'.name', 'LIKE', "%{$param['keyword']}%");
            $query->or_where(self::$_table_name.'.code', 'LIKE', "%{$param['keyword']}%");
            $query->where_close();
        }
        if (!empty($param['cate_id'])) {
            $cateIds = explode(',', $param['cate_id']);
            $query->where(self::$_table_name.'.cate_id', 'IN', $cateIds);
        }
        if (!empty($param['option3'])) {
            if ($param['option3'] == 1) {
                $query->where(self::$_table_name.'.qty', '>', 0);
            } else {
                $query->where(self::$_table_name.'.qty', '<=', 0);
            }
        }
        if (!empty($param['admin_id'])) {
            $query->where(self::$_table_name . '.admin_id', $param['admin_id']);
        }
        
        // Pagination
//        if (!empty($param['page']) && $param['limit']) {
//            $offset = ($param['page'] - 1) * $param['limit'];
//            $query->limit($param['limit'])->offset($offset);
//        }
        
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
//        $total = !empty($data) ? DB::count_last_query(self::$slave_db) : 0;
        
        return array(
//            'total' => $total,
            'data' => $data
        );
    }
}
