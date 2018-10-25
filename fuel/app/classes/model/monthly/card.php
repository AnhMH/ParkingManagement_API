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
class Model_Monthly_Card extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'card_id',
        'car_number',
        'customer_name',
        'id_number',
        'email',
        'company',
        'address',
        'brand',
        'parking_fee',
        'vehicle_id',
        'start_date',
        'end_date',
        'created',
        'updated',
        'disable',
        'admin_id'
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
    protected static $_table_name = 'monthly_cards';
    
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
                        array('cards.code', 'card_code'),
                        DB::expr("FROM_UNIXTIME(start_date, '%Y-%m-%d') as startdate"),
                        DB::expr("FROM_UNIXTIME(end_date, '%Y-%m-%d') as enddate"),
                        DB::expr("DATEDIFF(FROM_UNIXTIME(end_date, '%Y-%m-%d'), now()) as total_date"),
                        array('vehicles.name', 'vehicle_name')
                )
                ->from(self::$_table_name)
                ->join('cards')
                ->on('cards.id', '=', self::$_table_name.'.card_id')
                ->join('vehicles', 'LEFT')
                ->on('vehicles.id', '=', self::$_table_name.'.vehicle_id')
        ;

        // Filter
        if (!empty($param['code'])) {
            $query->where('cards.code', 'LIKE', "%{$param['code']}%");
        }
        if (!empty($param['vehicle_id'])) {
            $query->where(self::$_table_name . '.vehicle_id', '=', $param['vehicle_id']);
        }
        if (isset($param['disable'])) {
            $query->where(self::$_table_name . '.disable', '=', $param['disable']);
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
        $cardId = 0;
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : 0;
        $vehicleId = !empty($param['vehicle_id']) ? $param['vehicle_id'] : 0;
        $new = false;
        
        // Check if exist User
        if (!empty($id)) {
            $self = self::find($id);
            if (empty($self)) {
                self::errorNotExist('monthly_card_id');
                return false;
            }
        } else {
            $self = new self;
            $new = true;
        }
        
        // Check code
        if (!empty($param['card_code'])) {
            $card = Model_Card::find('first', array(
                'where' => array(
                    'code' => $param['card_code']
                )
            ));
            if (!empty($card)) {
                $cardId = $card['id'];
            } else {
                $cardId = Model_Card::add_update(array(
                    'code' => $param['card_code'],
                    'admin_id' => $adminId,
                    'vehicle_id' => $vehicleId
                ));
            }
        } elseif (!empty($param['card_id'])) {
            $cardId = $param['card_id'];
        }
        
        // Set data
        if (!empty($cardId)) {
            $self->set('card_id', $cardId);
        }
        if (!empty($param['car_number'])) {
            $self->set('car_number', $param['car_number']);
        }
        if (!empty($param['customer_name'])) {
            $self->set('customer_name', $param['customer_name']);
        }
        if (isset($param['id_number'])) {
            $self->set('id_number', $param['id_number']);
        }
        if (isset($param['email'])) {
            $self->set('email', $param['email']);
        }
        if (isset($param['company'])) {
            $self->set('company', $param['company']);
        }
        if (isset($param['address'])) {
            $self->set('address', $param['address']);
        }
        if (isset($param['brand'])) {
            $self->set('brand', $param['brand']);
        }
        if (isset($param['parking_fee'])) {
            $self->set('parking_fee', $param['parking_fee']);
        }
        if (isset($param['start_date'])) {
            $self->set('start_date', self::time_to_val($param['start_date']));
        }
        if (isset($param['end_date'])) {
            $self->set('end_date', self::date_to_val($param['end_date']));
        }
        if (!empty($vehicleId)) {
            $self->set('vehicle_id', $vehicleId);
        }
        if (!empty($adminId)) {
            $self->set('admin_id', $adminId);
        }
        
        // Save data
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
            }
            if (empty($card)) {
                $card = Model_Card::find($cardId);
            }
            if (!empty($card)) {
                $card->set('monthly_card_id', $self->id);
                $card->set('vehicle_id', $vehicleId);
                $card->save();
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
                        self::$_table_name . '.id',
                        self::$_table_name . '.card_id',
                        self::$_table_name . '.customer_name',
                        self::$_table_name . '.car_number',
                        self::$_table_name . '.id_number',
                        self::$_table_name . '.email',
                        self::$_table_name . '.company',
                        self::$_table_name . '.brand',
                        self::$_table_name . '.address',
                        self::$_table_name . '.parking_fee',
                        self::$_table_name . '.vehicle_id',
                        DB::expr("FROM_UNIXTIME(start_date, '%Y-%m-%d') as start_date"),
                        DB::expr("FROM_UNIXTIME(end_date, '%Y-%m-%d') as end_date"),
                        array('cards.code', 'card_code')
                )
                ->from(self::$_table_name)
                ->join('cards')
                ->on('cards.id', '=', self::$_table_name.'.card_id')
                ->where(self::$_table_name.'.id', $param['id'])
        ;
        
        $data = $query->execute()->offsetGet(0);
        
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
        $results = array();
        foreach ($data as $val) {
            // Init
            $error = false;
            $stt = '';
            $cardId = 0;
            $cardCode = !empty($val['card_code']) ? $val['card_code'] : '';
            $carNumber = !empty($val['car_number']) ? $val['car_number'] : '';
            $vehicleName = !empty(($val['vehicle_name'])) ? $val['vehicle_name'] : '';
            $customerName = !empty($val['customer_name']) ? $val['customer_name'] : '';
            $idNumber = !empty($val['id_number']) ? $val['id_number'] : '';
            $email = !empty($val['email']) ? $val['email'] : '';
            $company = !empty($val['company']) ? $val['company'] : '';
            $address = !empty($val['address']) ? $val['address'] : '';
            $brand = !empty($val['brand']) ? $val['brand'] : '';
            $parkingFee = !empty($val['parking_fee']) ? $val['parking_fee'] : '';
            $startDate = !empty($val['start_date']) ? self::time_to_val($val['start_date']) : '';
            $endDate = !empty($val['end_date']) ? self::date_to_val($val['end_date']) : '';
            $adminId = !empty($param['admin_id']) ? $param['admin_id'] : 0;
            $tmp = array(
                'status' => 'OK',
                'code' => $cardCode,
                'card_id' => '',
                'monthly_card_id' => '',
                'message' => ''
            );
            
            // Validation
            if (empty($cardCode)) {
                $error = true;
                $tmp['message'] = 'Mã thẻ rỗng';
            }
            if (!$error && empty($carNumber)) {
                $error = true;
                $tmp['message'] = 'Biển số rỗng';
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
                        'name' => $vehicleName
                    ));
                }
                
                $card = Model_Card::find('first', array(
                    'where' => array(
                        'code' => $cardCode
                    )
                ));
                if (!empty($card)) {
                    $cardId = $card->get('id');
                } else {
                    $cardId = Model_Card::add_update(array(
                        'code' => $cardCode,
                        'stt' => $stt,
                        'vehicle_id' => $vehicleId
                    ));
                }
                
                $monthlyCard = self::find('first', array(
                    'where' => array(
                        'card_id' => $cardId
                    )
                ));
                if (!empty($monthlyCard)) {
                    $monthlyCard->set('card_id', $cardId);
                    $monthlyCard->set('car_number', $carNumber);
                    $monthlyCard->set('customer_name', $customerName);
                    $monthlyCard->set('id_number', $idNumber);
                    $monthlyCard->set('email', $email);
                    $monthlyCard->set('company', $company);
                    $monthlyCard->set('address', $address);
                    $monthlyCard->set('brand', $brand);
                    $monthlyCard->set('parking_fee', $parkingFee);
                    $monthlyCard->set('vehicle_id', $vehicleId);
                    $monthlyCard->set('start_date', $startDate);
                    $monthlyCard->set('end_date', $endDate);
                    $monthlyCard->set('updated', time());
                    $monthlyCard->set('admin_id', $adminId);
                    $monthlyCard->save();
                    if (!empty($card)) {
                        $card->set('monthly_card_id', $monthlyCard->get('id'));
                        $card->set('vehicle_id', $vehicleId);
                        $card->save();
                    }
                    $tmp['message'] = 'Cập nhật';
                } else {
                    self::add_update(array(
                        'card_id' => $cardId,
                        'car_number' => $carNumber,
                        'customer_name' => $customerName,
                        'id_number' => $idNumber,
                        'email' => $email,
                        'company' => $company,
                        'address' => $address,
                        'brand' => $brand,
                        'parking_fee' => $parkingFee,
                        'vehicle_id' => $vehicleId,
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                        'created' => time(),
                        'admin_id' => $adminId
                    ));
                    $tmp['message'] = 'Tạo mới';
                }
            }
            $tmp['status'] = !empty($error) ? 'ERROR' : 'OK';
            $results[] = $tmp;
        }
        
        return $results;
    }
    
    /**
     * Renewal
     *
     * @author AnhMH
     * @param array $param Input data
     * @return Int|bool
     */
    public static function renewal($param)
    {
        if (!empty($param['date_to'])) {
            $query = DB::select(
                    array('cards.code', 'card_code')
                )
                ->from(self::$_table_name)
                ->join('cards')
                ->on('cards.id', '=', self::$_table_name.'.card_id')
                ->where(self::$_table_name.'.end_date', '>', self::date_to_val($param['date_to']))
                ->where(self::$_table_name.'.id', 'IN', explode(',', $param['ids']))
            ;
            $check = $query->execute()->as_array();
            if (!empty($check)) {
                $code = array();
                foreach ($check as $val) {
                    $code[] = $val['card_code'];
                }
                $code = implode(', ', $code);
                self::errorOther(static::ERROR_CODE_OTHER_1, 'card_code', "LỖI!! Mã thẻ {$code} vẫn còn hạn sử dụng.");
                return false;
            }
        }
        
        $table = self::$_table_name;
        $cond = "id IN ({$param['ids']})";
        if (!empty($param['days'])) {
            $time = $param['days'] * 60 * 60 * 24;
            $sql = "UPDATE {$table} SET end_date = end_date + {$time} WHERE {$cond}";
        } elseif (!empty($param['date_to']) && !empty($param['date_from'])) {
            $startDate = self::time_to_val($param['date_from']);
            $endDate = self::date_to_val($param['date_to']);
            $sql = "UPDATE {$table} SET end_date = {$endDate}, start_date = {$startDate} WHERE {$cond}";
        }
        if (!empty($sql)) {
            return DB::query($sql)->execute();
        } else {
            return false;
        }
    }
}
