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
class Model_Order extends Model_Abstract {

    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'code',
        'customer_id',
        'detail',
        'total_sell_price',
        'total_origin_price',
        'total_price',
        'total_qty',
        'customer_pay',
        'lack',
        'payment_method',
        'status',
        'notes',
        'admin_id',
        'created',
        'updated',
        'disable',
        'coupon',
        'type',
        'supplier_id'
    );
    protected static $_observers = array(
        'Orm\Observer_CreatedAt' => array(
            'events' => array('before_insert'),
            'mysql_timestamp' => false,
        ),
        'Orm\Observer_UpdatedAt' => array(
            'events' => array('before_update'),
            'mysql_timestamp' => false,
        ),
    );

    /** @var array $_table_name name of table */
    protected static $_table_name = 'orders';

    /**
     * List Order
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
        if (!empty($param['get_order_import'])) {
            $query->select(
                            array('suppliers.name', 'supplier_name')
                    )
                    ->join('suppliers', 'LEFT')
                    ->on('suppliers.id', '=', self::$_table_name . '.supplier_id')
            ;
            $query->where(self::$_table_name . '.type', 1);
        } else {
            $query->select(
                            array('customers.name', 'customer_name')
                    )
                    ->join('customers', 'LEFT')
                    ->on('customers.id', '=', self::$_table_name . '.customer_id')
            ;
            $query->where(self::$_table_name . '.type', '!=', 1);
        }
        if (!empty($param['keyword'])) {
            $query->or_where(self::$_table_name . '.code', 'LIKE', "%{$param['keyword']}%");
        }
        if (isset($param['option1']) && $param['option1'] != '') {
            if ($param['option1'] == 1) {
                $query->where(self::$_table_name . '.disable', 1);
            } else {
                $query->where(self::$_table_name . '.disable', 0);
            }
            if ($param['option1'] == 2) {
                $query->where(self::$_table_name . '.lack', '>', 0);
            }
        } else {
            $query->where(self::$_table_name . '.disable', 0);
        }
        if (isset($param['customer_id']) && $param['customer_id'] >= 0) {
            $query->where(self::$_table_name . '.customer_id', $param['customer_id']);
        }
        if (!empty($param['supplier_id'])) {
            $query->where(self::$_table_name . '.supplier_id', $param['supplier_id']);
        }
        if (!empty($param['date_from'])) {
            $query->where(self::$_table_name . '.created', '>=', self::time_to_val($param['date_from']));
        }
        if (!empty($param['date_to'])) {
            $query->where(self::$_table_name . '.created', '<=', self::date_to_val($param['date_to']));
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
        $total = 0;
        if (!empty($param['page']) && !empty($param['limit'])) {
            $total = !empty($data) ? DB::count_last_query(self::$slave_db) : 0;
        }
        $customers = array();
        $suppliers = array();
        if (!empty($param['get_customers'])) {
            $customers = Model_Customer::get_all(array());
        }
        if (!empty($param['get_suppliers'])) {
            $suppliers = Model_Supplier::get_all(array());
        }

        return array(
            'total' => $total,
            'data' => $data,
            'customers' => $customers,
            'suppliers' => $suppliers
        );
    }

    /**
     * Add update info
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int|bool User ID or false if error
     */
    public static function add_update($param) {
        // Check code
        $id = !empty($param['id']) ? $param['id'] : 0;
        $self = array();
        $new = false;
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

        // Init
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : '';
        $totalQty = 0;
        $totalPrice = 0;
        $totalSellPrice = 0;
        $totalOriginPrice = 0;
        $lack = 0;
        $created = time();
        $detailOrder = !empty($param['detail_order']) ? json_decode($param['detail_order'], true) : array();
        $productIds = array();
        $customerPay = !empty($param['customer_pay']) ? $param['customer_pay'] : 0;
        $customerId = !empty($param['customer_id']) ? $param['customer_id'] : 0;
        $status = !empty($param['status']) ? $param['status'] : 0;
        $detail = array();
        $coupon = !empty($param['coupon']) ? $param['coupon'] : 0;
        $paymentMethod = !empty($param['payment_method']) ? $param['payment_method'] : 0;
        $notes = !empty($param['notes']) ? $param['notes'] : '';
        $type = !empty($param['type']) ? $param['type'] : 0;
        $supplierId = !empty($param['supplier_id']) ? $param['supplier_id'] : 0;
        $preCode = !empty($param['type']) ? 'PN' : 'HD';
        $products = array();
        $errorProduct = false;
        $orderDetail = !empty($self['detail']) ? Lib\Arr::key_values(json_decode($self['detail'], true), 'id') : array();
        
        if (!empty($param['created'])) {
            $created = self::time_to_val($param['created']);
        }
        if (!empty($detailOrder)) {
            foreach ($detailOrder as $val) {
                $productIds[] = $val['id'];
                $totalQty += $val['qty'];
            }
            if (!empty($orderDetail)) {
                foreach ($orderDetail as $val) {
                    $productIds[] = $val['id'];
                }
            }
            $products = Lib\Arr::key_values(Model_Product::get_all(array(
                                'ids' => $productIds
                            )), 'id');
            foreach ($detailOrder as $val) {
                $tmpDetail = array();
                if (!empty($products[$val['id']])) {
                    $beforeQty = 0;
                    if (!empty($orderDetail[$val['id']])) {
                        $beforeQty = $orderDetail[$val['id']]['qty'];
                        unset($orderDetail[$val['id']]);
                    }
                    if ($type == 1) {
                        $products[$val['id']]['qty'] = $products[$val['id']]['qty'] + $val['qty'] - $beforeQty;
                    } else {
                        $products[$val['id']]['qty'] = $products[$val['id']]['qty'] + $beforeQty;
                        if (empty($products[$val['id']]['is_allow_negative']) && $products[$val['id']]['qty'] < $val['qty']) {
                            $errorProduct = true;
                            self::errorOther(self::ERROR_CODE_OTHER_1, 'product_qty', "Không đủ hàng tồn. <strong>{$products[$val['id']]['name']}</strong> chỉ còn <strong>{$products[$val['id']]['qty']}</strong> sản phẩm");
                            break;
                        } else {
                            $products[$val['id']]['qty'] = $products[$val['id']]['qty'] - $val['qty'];
                        }
                    }

                    $totalOriginPrice += $products[$val['id']]['origin_price'] * $val['qty'];
                    $totalSellPrice += $products[$val['id']]['sell_price'] * $val['qty'];
                    $tmpDetail['id'] = $val['id'];
                    $tmpDetail['code'] = $products[$val['id']]['code'];
                    $tmpDetail['name'] = $products[$val['id']]['name'];
                    $tmpDetail['image'] = $products[$val['id']]['image'];
                    $tmpDetail['qty'] = $val['qty'];
                    $tmpDetail['origin_price'] = $products[$val['id']]['origin_price'];
                    $tmpDetail['price'] = !empty($type) ? $products[$val['id']]['origin_price'] : $products[$val['id']]['sell_price'];
                    $detail[] = $tmpDetail;
                }
            }
        }
        if ($errorProduct) {
            return false;
        }

        // Set data
        if (!empty($param['code']) && $new) {
            $self->set('code', $param['code']);
        }
        $totalPrice = !empty($type) ? ($totalOriginPrice - $coupon) : ($totalSellPrice - $coupon);
        $lack = ($totalPrice - $customerPay) > 0 ? ($totalPrice - $customerPay) : 0;
        $self->set('admin_id', $adminId);
        $self->set('total_qty', $totalQty);
        $self->set('total_sell_price', $totalSellPrice);
        $self->set('total_origin_price', $totalOriginPrice);
        $self->set('total_price', $totalPrice);
        $self->set('customer_pay', $customerPay);
        $self->set('lack', $lack);
        $self->set('customer_id', $customerId);
        $self->set('status', $status);
        $self->set('detail', json_encode($detail));
        $self->set('payment_method', $paymentMethod);
        $self->set('coupon', $coupon);
        $self->set('notes', $notes);
        $self->set('created', $created);
        $self->set('type', $type);
        $self->set('supplier_id', $supplierId);

        // Save data
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
            }
            if (empty($param['code']) && $new) {
                $code = Lib\Str::generate_code($preCode, $self->id);
                $self->set('code', $code);
                $self->save();
            }
            $productData = array();
            if (!empty($products)) {
                foreach ($products as $p) {
                    if (!empty($orderDetail[$p['id']])) {
                        if ($type == 1) {
                            $p['qty'] = $p['qty'] - $orderDetail[$p['id']]['qty'];
                        } else {
                            $p['qty'] = $p['qty'] + $orderDetail[$p['id']]['qty'];
                        }
                    }
                    $productData[] = array(
                        'id' => $p['id'],
                        'qty' => $p['qty']
                    );
                }
            }
            if (!empty($productData)) {
                self::batchInsert('products', $productData, array(
                    'qty' => DB::expr('VALUES(qty)')
                ));
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
    public static function get_detail($param) {
        $data = array();
        $query = DB::select(
                        self::$_table_name . '.*', array('customers.name', 'customer_name'), array('suppliers.name', 'supplier_name')
                )
                ->from(self::$_table_name)
                ->join('customers', 'LEFT')
                ->on('customers.id', '=', self::$_table_name . '.customer_id')
                ->join('suppliers', 'LEFT')
                ->on('suppliers.id', '=', self::$_table_name . '.supplier_id')
                ->where(self::$_table_name . '.id', $param['id'])
        ;
        $data['order'] = $query->execute()->offsetGet(0);
        ;

        return $data;
    }

    /**
     * Delete
     *
     * @author AnhMH
     * @param array $param Input data
     * @return Int|bool
     */
    public static function del($param) {
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
    public static function disable($param) {
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
    
}
