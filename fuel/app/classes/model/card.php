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
class Model_Card extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'code',
        'stt',
        'vehicle_id',
        'monthly_card_id',
        'created',
        'updated',
        'disable',
        'admin_id',
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
    protected static $_table_name = 'cards';
    
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
                        self::$_table_name . '.*',
                        array('vehicles.name', 'vehicle_name')
                )
                ->from(self::$_table_name)
                ->join('vehicles', 'LEFT')
                ->on('vehicles.id', '=', self::$_table_name.'.vehicle_id')
        ;

        // Filter
        if (!empty($param['code'])) {
            $query->where(self::$_table_name . '.code', 'LIKE', "%{$param['code']}%");
        }
        if (!empty($param['stt'])) {
            $query->where(self::$_table_name . '.code', 'LIKE', "%{$param['stt']}%");
        }
        if (!empty($param['vehicle_id'])) {
            $query->where(self::$_table_name . '.vehicle_id', '=', $param['vehicle_id']);
        }
        if (isset($param['disable'])) {
            $query->where(self::$_table_name . '.disable', '=', $param['disable']);
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
        
        if (!empty($param['export_data'])) {
            $logParam = array(
                'detail' => 'Export thẻ',
                'admin_id' => $adminId,
                'type' => static::LOG_TYPE_CARD_EXPORT,
                'company_id' => !empty($param['company_id']) ? $param['company_id'] : 0
            );
            Model_System_Log::add_update($logParam);
        }

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
        if (!empty($param['company_id'])) {
            $query->where(self::$_table_name . '.company_id', $param['company_id']);
        }
        if (!empty($param['id'])) {
            if (!is_array($param['id'])) {
                $param['id'] = explode(',', $param['id']);
            }
            $query->where(self::$_table_name . '.name', 'IN', $param['id']);
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
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : '';
        
        // Check code
        if (!empty($param['code'])) {
            $check = self::find('first', array(
                'where' => array(
                    'code' => $param['code'],
                    array('id', '!=', $id)
                )
            ));
            if (!empty($check)) {
                self::errorOther(self::ERROR_CODE_OTHER_1, 'name', 'Mã thẻ đã tồn tại, vui lòng chọn thẻ khác.');
                return false;
            }
        }
        
        
        // Check if exist User
        if (!empty($id)) {
            $self = self::find($id);
            if (empty($self)) {
                self::errorNotExist('card_id');
                return false;
            }
        } else {
            $self = new self;
            $new = true;
        }
        
        // Set data
        if (!empty($param['code'])) {
            $self->set('code', $param['code']);
        }
        if (!empty($param['stt'])) {
            $self->set('stt', $param['stt']);
        }
        if (!empty($param['vehicle_id'])) {
            $self->set('vehicle_id', $param['vehicle_id']);
        }
        if (isset($param['is_monthly_card'])) {
            $self->set('is_monthly_card', $param['is_monthly_card']);
        }
        if (isset($param['admin_id'])) {
            $self->set('admin_id', $param['admin_id']);
        }
        if (!empty($param['company_id'])) {
            $self->set('company_id', $param['company_id']);
        }
        
        // Save data
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
            }
            $logData = array();
            foreach (self::$_properties as $val) {
                $logData[$val] = $self[$val];
            }
            $logParam = array(
                'detail' => json_encode($logData),
                'admin_id' => $adminId,
                'type' => !empty($new) ? static::LOG_TYPE_CARD_CREATE : static::LOG_TYPE_CARD_UPDATE,
                'company_id' => !empty($param['company_id']) ? $param['company_id'] : 0
            );
            Model_System_Log::add_update($logParam);
            
            // Sync data
            Model_Sync::sync_data(array(
                'card_id' => $self->id,
                'type' => !empty($new) ? 1 : 0,
                'company_id' => !empty($param['company_id']) ? $param['company_id'] : 0
            ));
            
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
        $cond = '';
        $disable = !empty($param['disable']) ? 1 : 0;
        if (!empty($param['id'])) {
            $cond .= "id IN ({$param['id']})";
        }
        if (!empty($param['code'])) {
            if (!empty($cond)) {
                $cond .= " AND ";
            }
            $cond .= "code IN ({$param['code']})";
        }
        
        $sql = "UPDATE {$table} SET disable = {$disable} WHERE {$cond}";
        // Sync data
        Model_Sync::sync_data(array(
            'card_id' => $param['id'],
            'type' => 2,
            'company_id' => !empty($param['company_id']) ? $param['company_id'] : 0
        ));
        return DB::query($sql)->execute();
    }
    /*
     * Import Excel
     * @param array $param
     * @return boolean|string
     */
    public static function import($param)
    {
        // Check valid file upload
        if (empty($param['data'])) {
            self::errorOther(static::ERROR_CODE_OTHER_1, 'data', 'Empty data');
            return false;
        }
        
        $data = json_decode($param['data'], true);
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : 0;
        $results = array();
        foreach ($data as $val) {
            // Init
            $error = false;
            $code = !empty($val['code']) ? $val['code'] : '';
            $stt = !empty($val['stt']) ? $val['stt'] : '';
            $vehicleName = !empty(($val['vehicle_name'])) ? $val['vehicle_name'] : '';
            $tmp = array(
                'status' => 'OK',
                'code' => $code,
                'card_id' => '',
                'message' => ''
            );
            
            // Validation
            if (empty($code)) {
                $error = true;
                $tmp['message'] = 'Mã thẻ rỗng';
            }
            if (!$error && empty($stt)) {
                $error = true;
                $tmp['message'] = 'STT rỗng';
            }
            if (!$error && empty($vehicleName)) {
                $error = true;
                $tmp['message'] = 'Loại xe rống';
            }
            if (!$error) {
                $vehicleId = 0;
                $vehicle = Model_Vehicle::find('first', array(
                    'where' => array(
                        'name' => $vehicleName
                    )
                ));
                if (!empty($vehicle)) {
                    $vehicleId = $vehicle['id'];
                } else {
                    $vehicleId = Model_Vehicle::add_update(array(
                        'name' => $vehicleName,
                        'admin_id' => $adminId
                    ));
                }
                
                $card = self::find('first', array(
                    'where' => array(
                        'code' => $code
                    )
                ));
                if (!empty($card)) {
                    $card->set('vehicle_id', $vehicleId);
                    $card->set('stt', $stt);
                    $card->save();
                    $tmp['card_id'] = $card['id'];
                    $tmp['message'] = 'Cập nhật';
                } else {
                    $tmp['card_id'] = self::add_update(array(
                        'code' => $code,
                        'stt' => $stt,
                        'vehicle_id' => $vehicleId,
                        'admin_id' => $adminId
                    ));
                    $tmp['message'] = 'Tạo mới';
                }
            }
            $tmp['status'] = !empty($error) ? 'ERROR' : 'OK';
            $results[] = $tmp;
        }
        $logParam = array(
            'detail' => 'Import thẻ',
            'admin_id' => $adminId,
            'type' => static::LOG_TYPE_CARD_IMPORT,
            'company_id' => !empty($param['company_id']) ? $param['company_id'] : 0
        );
        Model_System_Log::add_update($logParam);
        return $results;
    }
    
    /**
     * Checkin
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int|bool User ID or false if error
     */
    public static function checkin($param)
    {
        // Init
        $cardCode = !empty($param['code']) ? $param['code'] : '';
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : '';
        $card = array();
        $admin = array();
        $vehicle = array();
        $monthlyCard = array();
        $time = time();
        $pcName = !empty($param['pc_name']) ? $param['pc_name'] : gethostname();
        $orderId = 0;
        
        // Get data
        $card = self::find('first', array(
            'where' => array(
                'code' => $cardCode
            )
        ));
        if (empty($card)) {
            self::errorNotExist('card_code');
            return false;
        }
        
        // Check order
        $checkOrder = Model_Order::find('first', array(
            'where' => array(
                'card_code' => $cardCode,
                'checkout_time' => 0
            )
        ));
        if (!empty($checkOrder)) {
            $orderId = !empty($checkOrder['id']) ? $checkOrder['id'] : 0;
        }
        
        // Upload image
        if (!empty($_FILES)) {
            $uploadResult = \Lib\Util::uploadImage(); 
            if ($uploadResult['status'] != 200) {
                self::setError($uploadResult['error']);
                return false;
            }
            $param['image_in_1'] = !empty($uploadResult['body']['image_in_1']) ? $uploadResult['body']['image_in_1'] : '';
            $param['image_in_2'] = !empty($uploadResult['body']['image_in_2']) ? $uploadResult['body']['image_in_2'] : '';
        }
        
        $monthlyCardId = !empty($card['monthly_card_id']) ? $card['monthly_card_id'] : 0;
        $monthlyCard = Model_Monthly_Card::find($monthlyCardId);
        $vehicleId = !empty($card['vehicle_id']) ? $card['vehicle_id'] : '';
        $vehicle = Model_Vehicle::find($vehicleId);
        $vehicleCode = !empty($vehicle['code']) ? $vehicle['code'] : '';
        $admin = Model_Admin::find($adminId);
        $addUpdateData = array(
            'id' => $orderId,
            'card_id' => $card['id'],
            'card_code' => $cardCode,
            'card_stt' => $card['stt'],
            'checkin_time' => $time,
            'checkout_time' => 0,
            'car_number' => !empty($monthlyCard['car_number']) ? $monthlyCard['car_number'] : '',
            'admin_checkin_id' => $adminId,
            'admin_checkin_name' => !empty($admin['name']) ? $admin['name'] : '',
            'vehicle_code' => $vehicleCode,
            'admin_checkout_id' => '',
            'admin_checkout_name' => '',
            'monthly_card_id' => $monthlyCardId,
            'vehicle_id' => $vehicleId,
            'vehicle_name' => !empty($vehicle['name']) ? $vehicle['name'] : '',
            'is_card_lost' => $card['disable'],
            'total_price' => 0,
            'pc_name' => $pcName,
            'account' => !empty($admin['account']) ? $admin['account'] : '',
            'created' => $time,
            'updated' => $time,
            'customer_name' => !empty($monthlyCard['customer_name']) ? $monthlyCard['customer_name'] : '',
            'company' => !empty($monthlyCard['company']) ? $monthlyCard['company'] : '',
            'image_in_1' => !empty($param['image_in_1']) ? $param['image_in_1'] : '',
            'image_in_2' => !empty($param['image_in_2']) ? $param['image_in_2'] : '',
            'car_number_in' => !empty($param['car_number_in']) ? $param['car_number_in'] : '',
        );
        
        // Save data
        $orderId = Model_Order::add_update($addUpdateData);
        if (!empty($orderId)) {
            return array(
                'order_id' => $orderId,
                'monthly_card_id' => $monthlyCardId,
                'vehilce_code' => $vehicleCode,
                'card_stt' => $card['stt'],
                'customer_name' => !empty($monthlyCard['customer_name']) ? $monthlyCard['customer_name'] : '',
                'car_number' => !empty($monthlyCard['car_number']) ? $monthlyCard['car_number'] : '',
            );
        }
        
        return false;
    }
    
    /**
     * Checkout
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int|bool User ID or false if error
     */
    public static function checkout($param)
    {
        // Init
        $pcName = !empty($param['pc_name']) ? $param['pc_name'] : gethostname();
        $cardCode = !empty($param['code']) ? $param['code'] : '';
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : '';
        $totalPrice = 0;
        $order = array();
        $admin = array();
        $settings = array();
        $displaySetting = array();
        $priceFormula1Setting = array();
        $priceFormula2Setting = array();
        $priceFormula3Setting = array();
        $time = time();
        $settingTypePriceFormula1 = \Config::get('setting_type')['price_formula1'];
        $settingTypePriceFormula2 = \Config::get('setting_type')['price_formula2'];
        $settingTypePriceFormula3 = \Config::get('setting_type')['price_formula3'];
        $settingTypeDisplay = \Config::get('setting_type')['display'];
        $settingTypes = array(
            $settingTypePriceFormula1,
            $settingTypePriceFormula2,
            $settingTypePriceFormula3,
            $settingTypeDisplay
        );
        
        // Get data
        $order = Model_Order::find('last', array(
            'where' => array(
                'card_code' => $cardCode,
                array(
                    array(
                        'checkout_time' => 0
                    ),
                    'or' => array(
                        'checkout_time' => null
                    )
                )
            )
        ));
        if (empty($order)) {
            self::errorNotExist('checkin_id');
            return false;
        }
        
        // Upload image
        if (!empty($_FILES)) {
            $uploadResult = \Lib\Util::uploadImage(); 
            if ($uploadResult['status'] != 200) {
                self::setError($uploadResult['error']);
                return false;
            }
            $param['image_out_1'] = !empty($uploadResult['body']['image_out_1']) ? $uploadResult['body']['image_out_1'] : '';
            $param['image_out_2'] = !empty($uploadResult['body']['image_out_2']) ? $uploadResult['body']['image_out_2'] : '';
        }
        
        $vehicleId = !empty($order['vehicle_id']) ? $order['vehicle_id'] : '';
        $monthlyCardId = !empty($order['monthly_card_id']) ? $order['monthly_card_id'] : 0;
        $checkinTime = $order['checkin_time'];
        $admin = Model_Admin::find($adminId);
        $adminCheckoutName = !empty($admin['name']) ? $admin['name'] : '';
        $adminAccount = !empty($admin['account']) ? $admin['account'] : '';
        $image1 = !empty($param['image_out_1']) ? $param['image_out_1'] : '';
        $image2 = !empty($param['image_out_2']) ? $param['image_out_2'] : '';
        $carNumberOut = !empty($param['car_number_out']) ? $param['car_number_out'] : '';
        
        $settings = DB::select(
                        'settings.*'
                )
                ->from('settings')
                ->where_open()
                ->where('vehicle_id', 'IS', null)
                ->or_where('vehicle_id', 0)
                ->or_where('vehicle_id', $vehicleId)
                ->where_close()
                ->where('settings.type', 'IN', $settingTypes)
                ->execute()
                ->as_array()
        ;
        
        if (!empty($settings)) {
            foreach ($settings as $val) {
                if ($val['type'] == $settingTypeDisplay) {
                    $displaySetting[$val['name']] = $val['value'];
                } elseif ($val['type'] == $settingTypePriceFormula1) {
                    $priceFormula1Setting[$val['name']] = $val['value'];
                } elseif ($val['type'] == $settingTypePriceFormula2) {
                    $priceFormula2Setting[$val['name']] = $val['value'];
                } elseif ($val['type'] == $settingTypePriceFormula3) {
                    $priceFormula3Setting[$val['name']] = $val['value'];
                }
            }
        }
        $parkingType = !empty($displaySetting['parking_type']) ? $displaySetting['parking_type'] : 0;
        if ($parkingType == 1) {
            $totalPrice = Model_Order::get_price_by_formula1($priceFormula1Setting, $checkinTime, $time, $monthlyCardId);
        } elseif ($parkingType == 2) {
            $totalPrice = Model_Order::get_price_by_formula2($priceFormula2Setting, $checkinTime, $time, $monthlyCardId);
        } elseif ($parkingType == 3) {
            $totalPrice = Model_Order::get_price_by_formula3($priceFormula3Setting, $checkinTime, $time, $monthlyCardId);
        }
        $order->set('admin_checkout_id', $adminId);
        $order->set('admin_checkout_name', $adminCheckoutName);
        $order->set('checkout_time', $time);
        $order->set('account', $adminAccount);
        $order->set('total_price', $totalPrice);
        $order->set('updated', $time);
        $order->set('pc_name', $pcName);
        $order->set('image_out_1', $image1);
        $order->set('image_out_2', $image2);
        $order->set('car_number_out', $carNumberOut);
        
        // Save data
        if ($order->save()) {
            return array(
                'total_price' => $totalPrice,
                'monthly_card_id' => $monthlyCardId,
                'image_in_1' => $order['image_in_1'],
                'image_in_2' => $order['image_in_2'],
                'order_id' => $order['id'],
                'card_stt' => $order['card_stt'],
                'checkin_time' => $order['checkin_time'],
                'customer_name' => $order['customer_name'],
                'car_number_in' => $order['car_number_in'],
                'car_number' => $order['car_number'],
            );
        }
        
        return false;
    }
}
