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
class Model_Setting extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array();

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
    protected static $_table_name = '';

    /**
     * List Setting
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Setting or false if error
     */
    public static function get_topdata($param)
    {
        $data = array();
        $totay = date('Y-m-d', time());
        
        // Get order data
        $query = DB::select(
                DB::expr("COUNT(id) as total_order"),
                DB::expr("SUM(total_qty) as sum_total_qty"),
                DB::expr("SUM(total_price) as sum_total_price")
            )
            ->from('orders')
            ->where('orders.type', '!=', 1)
            ->where('orders.created', '>=', self::time_to_val($totay))
            ->where('orders.created', '<=', self::date_to_val($totay))
        ;
        if (!empty($param['admin_id'])) {
            $query->where("orders.admin_id", $param['admin_id']);
        }
        $data['order'] = $query->execute()->offsetGet(0);
        
        // Get product data
        $query = DB::select(
                DB::expr("COUNT(id) as cnt_id")
            )
            ->from('products')
            ->where('products.disable', 0)
        ;
        if (!empty($param['admin_id'])) {
            $query->where("products.admin_id", $param['admin_id']);
        }
        $data['total_product'] = $query->execute()->offsetGet(0);
        
        // Get product inventory
        $query = DB::select(
                DB::expr("COUNT(id) as cnt_id"),
                DB::expr("SUM(qty) as sum_qty")
            )
            ->from('products')
            ->where('products.disable', 0)
            ->where('products.is_inventory', 1)
            ->where('products.qty', '>', 0)
        ;
        if (!empty($param['admin_id'])) {
            $query->where("products.admin_id", $param['admin_id']);
        }
        $data['total_inventory'] = $query->execute()->offsetGet(0);
        
        // Get product inventory
        $query = DB::select(
                DB::expr("COUNT(id) as cnt_id")
            )
            ->from('products')
            ->where('products.disable', 0)
            ->where('products.is_inventory', 1)
            ->where('products.qty', '<=', 0)
        ;
        if (!empty($param['admin_id'])) {
            $query->where("products.admin_id", $param['admin_id']);
        }
        $data['total_inventory2'] = $query->execute()->offsetGet(0);
        
        // Get product not sell price
        $query = DB::select(
                DB::expr("COUNT(id) as cnt_id")
            )
            ->from('products')
            ->where('products.disable', 0)
            ->where('products.sell_price', 0)
        ;
        if (!empty($param['admin_id'])) {
            $query->where("products.admin_id", $param['admin_id']);
        }
        $data['product_not_sell_price'] = $query->execute()->offsetGet(0);
        
        // Get product not origin price
        $query = DB::select(
                DB::expr("COUNT(id) as cnt_id")
            )
            ->from('products')
            ->where('products.disable', 0)
            ->where('products.origin_price', 0)
        ;
        if (!empty($param['admin_id'])) {
            $query->where("products.admin_id", $param['admin_id']);
        }
        $data['product_not_origin_price'] = $query->execute()->offsetGet(0);
        
        // Get product not cate
        $query = DB::select(
                DB::expr("COUNT(id) as cnt_id")
            )
            ->from('products')
            ->where('products.disable', 0)
            ->where('products.cate_id', 0)
        ;
        if (!empty($param['admin_id'])) {
            $query->where("products.admin_id", $param['admin_id']);
        }
        $data['product_not_cate']= $query->execute()->offsetGet(0);
        
        return $data;
    }
}
