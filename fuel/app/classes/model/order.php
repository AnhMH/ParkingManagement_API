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
        'order_id',
        'area_id',
        'card_id',
        'card_code',
        'card_stt',
        'checkin_time',
        'checkout_time',
        'car_number',
        'admin_checkin_id',
        'admin_checkin_name',
        'vehicle_code',
        'admin_checkout_id',
        'admin_checkout_name',
        'monthly_card_id',
        'vehicle_id',
        'vehicle_name',
        'is_card_lost',
        'total_price',
        'pc_name',
        'account',
        'created',
        'updated',
        'disable',
        'customer_name',
        'company',
        'notes',
        'image_in_1',
        'image_in_2',
        'image_out_1',
        'image_out_2',
        'car_number_in',
        'car_number_out'
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
    protected static $_table_name = 'orders';
    
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
        $id = !empty($param['id']) ? $param['id'] : '';
        $self = array();
        $new = false;
        
        // Validation
        if (!empty($id)) {
            $self = self::find($id);
            if (empty($self)) {
                self::errorNotExist('order_id');
                return false;
            }
        } else {
            $self = new self;
            $new = true;
        }
        
        // Set data
        if (!empty($param['card_id'])) {
            $self->set('card_id', $param['card_id']);
        }
        if (!empty($param['card_code'])) {
            $self->set('card_code', $param['card_code']);
        }
        if (!empty($param['card_stt'])) {
            $self->set('card_stt', $param['card_stt']);
        }
        if (!empty($param['checkin_time'])) {
            $self->set('checkin_time', $param['checkin_time']);
        }
        if (isset($param['checkout_time'])) {
            $self->set('checkout_time', $param['checkout_time']);
        }
        if (!empty($param['car_number'])) {
            $self->set('car_number', $param['car_number']);
        }
        if (!empty($param['admin_checkin_id'])) {
            $self->set('admin_checkin_id', $param['admin_checkin_id']);
        }
        if (!empty($param['admin_checkin_name'])) {
            $self->set('admin_checkin_name', $param['admin_checkin_name']);
        }
        if (!empty($param['vehicle_code'])) {
            $self->set('vehicle_code', $param['vehicle_code']);
        }
        if (!empty($param['admin_checkout_id'])) {
            $self->set('admin_checkout_id', $param['admin_checkout_id']);
        }
        if (!empty($param['admin_checkout_name'])) {
            $self->set('admin_checkout_name', $param['admin_checkout_name']);
        }
        if (!empty($param['monthly_card_id'])) {
            $self->set('monthly_card_id', $param['monthly_card_id']);
        }
        if (!empty($param['vehicle_id'])) {
            $self->set('vehicle_id', $param['vehicle_id']);
        }
        if (!empty($param['vehicle_name'])) {
            $self->set('vehicle_name', $param['vehicle_name']);
        }
        if (!empty($param['is_card_lost'])) {
            $self->set('is_card_lost', $param['is_card_lost']);
        }
        if (!empty($param['total_price'])) {
            $self->set('total_price', $param['total_price']);
        }
        if (!empty($param['pc_name'])) {
            $self->set('pc_name', $param['pc_name']);
        }
        if (!empty($param['account'])) {
            $self->set('account', $param['account']);
        }
        if (!empty($param['created'])) {
            $self->set('created', $param['created']);
        }
        if (!empty($param['updated'])) {
            $self->set('updated', $param['updated']);
        }
        if (!empty($param['customer_name'])) {
            $self->set('customer_name', $param['customer_name']);
        }
        if (!empty($param['company'])) {
            $self->set('company', $param['company']);
        }
        if (!empty($param['notes'])) {
            $self->set('notes', $param['notes']);
        }
        if (!empty($param['image_in_1'])) {
            $self->set('image_in_1', $param['image_in_1']);
        }
        if (!empty($param['image_in_2'])) {
            $self->set('image_in_2', $param['image_in_2']);
        }
        if (!empty($param['car_number_in'])) {
            $self->set('car_number_in', $param['car_number_in']);
        }
        if (!empty($param['image_out_1'])) {
            $self->set('image_out_1', $param['image_out_1']);
        }
        if (!empty($param['image_out_2'])) {
            $self->set('image_out_2', $param['image_out_2']);
        }
        if (!empty($param['car_number_out'])) {
            $self->set('car_number_out', $param['car_number_out']);
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
     * Get price
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int
     */
    public static function get_price_by_formula1($setting = array(), $checkinTime = null, $checkoutTime = null, $isMonthlyCard = false)
    {
        $price = 0;
        if (!empty($setting)) {
            $totalHours = round(abs($checkoutTime - $checkinTime) / 3600, 0);
            if (!empty($isMonthlyCard)) {
                $monthlyCardPrice = !empty($setting['monthly_card_time_price']) ? $setting['monthly_card_time_price'] : 0;
                $monthlyCardTime = !empty($setting['monthly_card_time']) ? $setting['monthly_card_time'] : 0;
                return ($totalHours/$monthlyCardTime + $totalHours%$monthlyCardTime)*$monthlyCardPrice;
            }
            $d1 = date('Y-m-d', $checkinTime);
            $d2 = date('Y-m-d', $checkoutTime);
            $h1 = date('H', $checkinTime);
            $h2 = date('H', $checkoutTime);
            $nightStart = !empty($setting['night_start']) ? $setting['night_start'] : 24;
            $nightEnd = !empty($setting['night_end']) ? $setting['night_end'] : 0;
            $timeDayNight = !empty($setting['time_day_night']) ? $setting['time_day_night'] : 0;
            $normalPrice = !empty($setting['normal_price']) ? $setting['normal_price'] : 0;
            $nightPrice = !empty($setting['night_price']) ? $setting['night_price'] : 0;
            $dayNightPrice = !empty($setting['day_night_price']) ? $setting['day_night_price'] : 0;
            $overMinute = !empty($setting['over_minute']) ? $setting['over_minute'] : 0;
            $overMinutePrice = !empty($setting['over_minute_price']) ? $setting['over_minute_price'] : 0;
            $dayDiff = \Lib\Util::getDayDiff($d1, $d2);
            if ($dayDiff > 1 || $totalHours > 24) {
                if ($h1 < $nightStart) {
                    if ($h2 >= $nightEnd) {
                        $price = ($dayDiff + 1)*$dayNightPrice + $normalPrice;
                    } else {
                        $price = $dayDiff*$dayNightPrice + $nightPrice;
                    }
                } else {
                    if ($h2 >= $nightStart) {
                        $price = ($dayDiff + 1)*$dayNightPrice + $nightPrice;
                    } elseif ($h2 < $nightEnd) {
                        $price = $dayDiff*$dayNightPrice + $nightPrice;
                    } else {
                        $price = $dayDiff*$dayNightPrice + $normalPrice;
                    }
                }
            } else {
                if ($h2 < $timeDayNight) {
                    $price = $normalPrice + $overMinutePrice;
                } elseif ($dayDiff == 0 && $h1 >= $nightEnd && $h2 < $nightStart) {
                    $price = $normalPrice;
                } elseif (($dayDiff == 0 && $h1 >= $nightStart && $h2 < 24) || $dayDiff == 1 && $h1 >= $nightStart && $h2 < $nightEnd) {
                    $price = $nightPrice;
                } elseif ($totalHours >= $timeDayNight) {
                    $price = $dayNightPrice;
                } else {
                    $timeDay = '';
                    $timeNight = '';
                    if ($h1 >= $nightEnd) {
                        $timeDay = $nightStart - $h1;
                        if ($dayDiff == 0) {
                            $timeDayNight = $h2 - $nightStart;
                        } else {
                            $timeDayNight = 24 - $nightStart + $h2;
                        }
                    } else {
                        $timeDay = $h2 - $nightEnd;
                        $timeNight = $nightEnd - $h1;
                    }
                    if ($timeNight > $timeDay) {
                        $price = $nightPrice;
                    } else {
                        $price = $normalPrice;
                    }
                }
            }
        }
        return $price;
    }
    
    /**
     * Get price
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int
     */
    public static function get_price_by_formula2($setting = array(), $checkinTime = 0, $checkoutTime = 0, $isMonthlyCard = false)
    {
        $price = 0;
        if (!empty($setting)) {
            $lv1Time = !empty($setting['level_1_time']) ? $setting['level_1_time'] : 0;
            $lv1Price = !empty($setting['level_1_price']) ? $setting['level_1_price'] : 0;
            $lv2Time = !empty($setting['level_2_time']) ? $setting['level_2_time'] : 0;
            $lv2Price = !empty($setting['level_2_price']) ? $setting['level_2_price'] : 0;
            $lv3Price = !empty($setting['level_3_price']) ? $setting['level_3_price'] : 0;
            $lv3Time = !empty($setting['level_3_time']) ? $setting['level_3_time'] : 0;
            $lv3PriceType = !empty($setting['level_3_price_type']) ? $setting['level_3_price_type'] : 0;
            $totalHours = round(abs($checkoutTime - $checkinTime) / 3600, 0);
            if (!empty($isMonthlyCard)) {
                $monthlyCardPrice = !empty($setting['monthly_card_time_price']) ? $setting['monthly_card_time_price'] : 0;
                $monthlyCardTime = !empty($setting['monthly_card_time']) ? $setting['monthly_card_time'] : 0;
                return ($totalHours/$monthlyCardTime + $totalHours%$monthlyCardTime)*$monthlyCardPrice;
            }
            if ($totalHours <= $lv1Time) {
                $price = $lv1Price;
            } elseif ($totalHours <= ($lv1Time + $lv2Time)) {
                $price = $lv1Price + $lv2Price;
            } else {
                if ($lv3PriceType == 1) {// Cộng dồn mức 1
                    $price = $lv1Price + (($totalHours-$lv1Time)/$lv3Time + ($totalHours-$lv1Time)%$lv3Time)*$lv3Price;
                } else {
                    $price = ($totalHours/$lv3Time + $totalHours%$lv3Time)*$lv3Price;
                }
            }
        }
        return $price;
    }
    
    /**
     * Get price
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int
     */
    public static function get_price_by_formula3($setting = array(), $checkinTime = null, $checkoutTime = null, $isMonthlyCard = false)
    {
        $price = 0;
        if (!empty($setting)) {
            $lv1Time = !empty($setting['level_1_time']) ? $setting['level_1_time'] : 0;
            $lv1Price = !empty($setting['level_1_price']) ? $setting['level_1_price'] : 0;
            $lv2Time = !empty($setting['level_2_time']) ? $setting['level_2_time'] : 0;
            $lv2Price = !empty($setting['level_2_price']) ? $setting['level_2_price'] : 0;
            $lv3Price = !empty($setting['level_3_price']) ? $setting['level_3_price'] : 0;
            $lv3Time = !empty($setting['level_3_time']) ? $setting['level_3_time'] : 0;
            $lv3PriceType = !empty($setting['level_3_price_type']) ? $setting['level_3_price_type'] : 0;
            $totalHours = round(abs($checkoutTime - $checkinTime) / 3600, 0);
            if (!empty($isMonthlyCard)) {
                $monthlyCardPrice = !empty($setting['monthly_card_time_price']) ? $setting['monthly_card_time_price'] : 0;
                $monthlyCardTime = !empty($setting['monthly_card_time']) ? $setting['monthly_card_time'] : 0;
                return ($totalHours/$monthlyCardTime + $totalHours%$monthlyCardTime)*$monthlyCardPrice;
            }
            if ($totalHours <= $lv1Time) {
                $price = $lv1Price;
            } elseif ($totalHours <= ($lv2Time)) {
                $price = $lv2Price;
            } else {
                if ($lv3PriceType == 1) {// Cộng dồn mức 1
                    $price = $lv1Price + (($totalHours-$lv1Time)/$lv3Time + ($totalHours-$lv1Time)%$lv3Time)*$lv3Price;
                } else {
                    $price = ($totalHours/$lv3Time + $totalHours%$lv3Time)*$lv3Price;
                }
            }
        }
        return $price;
    }
    
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
                        DB::expr("FROM_UNIXTIME(checkin_time, '%Y-%m-%d %H:%i') as checkintime"),
                        DB::expr("FROM_UNIXTIME(checkout_time, '%Y-%m-%d %H:%i') as checkouttime"),
                        DB::expr("IF(monthly_card_id > 0, card_code, '') as monthly_card_code")
                )
                ->from(self::$_table_name)
        ;

        // Filter
        if (!empty($param['card_code'])) {
            $query->where(self::$_table_name . '.card_code', 'LIKE', "%{$param['card_code']}%");
        }
        if (!empty($param['car_number'])) {
            $query->where(self::$_table_name . '.car_number', 'LIKE', "%{$param['car_number']}%");
        }
        if (!empty($param['card_stt'])) {
            $query->where(self::$_table_name . '.card_stt', 'LIKE', "%{$param['card_stt']}%");
        }
        if (!empty($param['created_from'])) {
            $query->where(self::$_table_name . '.created', '>=', self::time_to_val($param['created_from']));
        }
        if (!empty($param['created_to'])) {
            $query->where(self::$_table_name . '.created', '<=', self::date_to_val($param['created_to']));
        }
        if (!empty($param['admin_checkin_id'])) {
            $query->where(self::$_table_name . '.admin_checkin_id', $param['admin_checkin_id']);
        }
        if (!empty($param['admin_checkout_id'])) {
            $query->where(self::$_table_name . '.admin_checkout_id', $param['admin_checkout_id']);
        }
        if (!empty($param['get_car_survive'])) {
            $query->where_open();
            $query->where(self::$_table_name . '.checkout_time', 0);
            $query->or_where(self::$_table_name . '.checkout_time', "IS", NULL);
            $query->where_close();
        }
        if (!empty($param['get_car_lost_card'])) {
            $query->where(self::$_table_name . '.is_card_lost', 1);
        }
        if (!empty($param['card_type'])) {
            if ($param['card_type'] == 'normal') {
                $query->where_open();
                $query->where(self::$_table_name . '.monthly_card_id', 'IS', null);
                $query->or_where(self::$_table_name . '.monthly_card_id', '=', 0);
                $query->or_where(self::$_table_name . '.monthly_card_id', '=', '');
                $query->where_close();
            } elseif ($param['card_type'] == 'monthly') {
                $query->where(self::$_table_name . '.monthly_card_id', '>', 0);
            }
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
     * Card disable
     *
     * @author AnhMH
     * @param array $param Input data
     * @return Int|bool
     */
    public static function card_disable($param)
    {
        $query = DB::select(
                'card_code'
            )
            ->from(self::$_table_name)
            ->where(self::$_table_name.'.id', 'IN', explode(',', $param['id']))
            ->where(self::$_table_name.'.checkout_time', '>', 0)
        ;
        $check = $query->execute()->as_array();
        if (!empty($check)) {
            $code = array();
            foreach ($check as $val) {
                $code[] = $val['card_code'];
            }
            $code = implode(', ', $code);
            self::errorOther(static::ERROR_CODE_OTHER_1, 'card_code', "LỖI!! Xe đã ra khỏi bãi.");
            return false;
        }
        $query = DB::select(
                'card_id',
                'monthly_card_id'
            )
            ->from(self::$_table_name)
            ->where(self::$_table_name.'.id', 'IN', explode(',', $param['id']))
        ;
        $data = $query->execute()->as_array();
        $cardIds = array();
        $monthlyCardIds = array();
        if (!empty($data)) {
            foreach ($data as $val) {
                $cardIds[] = $val['card_id'];
                $monthlyCardIds[] = $val['monthly_card_id'];
            } 
        }
        
        $table = self::$_table_name;
        $cond = "id IN ({$param['id']})";
        $sql = "UPDATE {$table} SET is_card_lost = 1 WHERE {$cond};";
        if (!empty($cardIds)) {
            $cardIds = implode(',', $cardIds);
            $sql .= "UPDATE cards SET disable = 1 WHERE id IN ({$cardIds});";
        }
        if (!empty($monthlyCardIds)) {
            $monthlyCardIds = implode(',', $monthlyCardIds);
            $sql .= "UPDATE monthly_cards SET disable = 1 WHERE id IN ({$monthlyCardIds});";
        }
        DB::query($sql)->execute();
        return true;
    }
    
    /**
     * Get revenue
     *
     * @author AnhMH
     * @param array $param Input data
     * @return Int|bool
     */
    public static function get_revenue($param)
    {
        $data = array();
        $card = array();
        $monthlyCard = array();
        $cardType = !empty($param['card_type']) ? $param['card_type'] : '';
        if (empty($cardType) || $cardType == 1) {
            $query = DB::select(
                        DB::expr("SUM(CASE WHEN checkin_time > 0 THEN 1 ELSE 0 END) as total_checkin"),
                        DB::expr("SUM(CASE WHEN checkout_time > 0 THEN 1 ELSE 0 END) as total_checkout"),
                        DB::expr("SUM(total_price) as total_price"),
                        array('vehicles.type', 'vehicle_type')
                )
                ->from(self::$_table_name)
                ->join('vehicles')
                ->on(self::$_table_name.'.vehicle_id', '=', 'vehicles.id')
                ->where('vehicles.card_type', 1)
//                ->where_open()
//                ->where(self::$_table_name.'.monthly_card_id', 0)
//                ->or_where(self::$_table_name.'.monthly_card_id', '')
//                ->or_where(self::$_table_name.'.monthly_card_id', 'IS', NULL)
//                ->where_close()
                ->group_by('vehicles.type')
            ;
            if (!empty($param['admin'])) {
                $query->where_open();
                $query->where(self::$_table_name.'.admin_checkin_id', $param['admin']);
                $query->or_where(self::$_table_name.'.admin_checkout_id', $param['admin']);
                $query->where_close();
            }
            if (!empty($param['option1'])) {
                $query->where(self::$_table_name.'.created', '>=', self::time_to_val($param['option1']));
                $query->where(self::$_table_name.'.created', '<=', self::date_to_val($param['option1']));
            }
            if (!empty($param['option2_from'])) {
                $query->where(self::$_table_name.'.created', '>=', self::time_to_val($param['option2_from']));
            }
            if (!empty($param['option2_to'])) {
                $query->where(self::$_table_name.'.created', '<=', self::date_to_val($param['option2_to']));
            }
            $card = $query->execute()->as_array();
            $card = \Lib\Arr::key_values($card, 'vehicle_type');
        }
        
        if (empty($cardType) || $cardType == 2) {
            $query = DB::select(
                        DB::expr("SUM(CASE WHEN checkin_time > 0 THEN 1 ELSE 0 END) as total_checkin"),
                        DB::expr("SUM(CASE WHEN checkout_time > 0 THEN 1 ELSE 0 END) as total_checkout"),
                        DB::expr("SUM(IFNULL(total_price,0)) as total_price"),
                        array('vehicles.type', 'vehicle_type')
                )
                ->from(self::$_table_name)
                ->join('vehicles')
                ->on(self::$_table_name.'.vehicle_id', '=', 'vehicles.id')
                ->where('vehicles.card_type', 2)
//                ->where(self::$_table_name.'.monthly_card_id', '>', 0)
                ->group_by('vehicles.type')
            ;
            if (!empty($param['admin'])) {
                $query->where_open();
                $query->where(self::$_table_name.'.admin_checkin_id', $param['admin']);
                $query->or_where(self::$_table_name.'.admin_checkout_id', $param['admin']);
                $query->where_close();
            }
            if (!empty($param['option1'])) {
                $query->where(self::$_table_name.'.created', '>=', self::time_to_val($param['option1']));
                $query->where(self::$_table_name.'.created', '<=', self::date_to_val($param['option1']));
            }
            if (!empty($param['option2_from'])) {
                $query->where(self::$_table_name.'.created', '>=', self::time_to_val($param['option2_from']));
            }
            if (!empty($param['option2_to'])) {
                $query->where(self::$_table_name.'.created', '<=', self::date_to_val($param['option2_to']));
            }
            $monthlyCard = $query->execute()->as_array();
            $monthlyCard = \Lib\Arr::key_values($monthlyCard, 'vehicle_type');
        }
        
        $data = array(
            'card' => $card,
            'monthly_card' => $monthlyCard
        );
        return $data;
    }
    
    /**
     * Add update info
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int|bool User ID or false if error
     */
    public static function batch_insert($param)
    {
        $data = !empty($param['data']) ? json_decode($param['data'], true) : array();
        $addUpdateData = array();
        if (!empty($data)) {
            foreach ($data as $val) {
                $addUpdateData[] = array(
                    'area_id' => isset($val['area_id']) ? $val['area_id'] : '',
                    'order_id' => isset($val['order_id']) ? $val['order_id'] : '',
                    'card_id' => isset($val['card_id']) ? $val['card_id'] : '',
                    'card_code' => isset($val['card_code']) ? $val['card_code'] : '',
                    'card_stt' => isset($val['card_stt']) ? $val['card_stt'] : '',
                    'checkin_time' => isset($val['checkin_time']) ? $val['checkin_time'] : '',
                    'checkout_time' => isset($val['checkout_time']) ? $val['checkout_time'] : '',
                    'car_number' => isset($val['car_number']) ? $val['car_number'] : '',
                    'admin_checkin_id' => isset($val['admin_checkin_id']) ? $val['admin_checkin_id'] : '',
                    'admin_checkin_name' => isset($val['admin_checkin_name']) ? $val['admin_checkin_name'] : '',
                    'vehicle_code' => isset($val['vehicle_code']) ? $val['vehicle_code'] : '',
                    'monthly_card_id' => isset($val['monthly_card_id']) ? $val['monthly_card_id'] : '',
                    'vehicle_id' => isset($val['vehicle_id']) ? $val['vehicle_id'] : '',
                    'vehicle_name' => isset($val['vehicle_name']) ? $val['vehicle_name'] : '',
                    'is_card_lost' => isset($val['is_card_lost']) ? $val['is_card_lost'] : '',
                    'total_price' => isset($val['total_price']) ? $val['total_price'] : '',
                    'pc_name' => isset($val['pc_name']) ? $val['pc_name'] : '',
                    'account' => isset($val['account']) ? $val['account'] : '',
                    'created' => isset($val['created']) ? $val['created'] : '',
                    'updated' => isset($val['updated']) ? $val['updated'] : '',
                    'customer_name' => isset($val['customer_name']) ? $val['customer_name'] : '',
                    'company' => isset($val['company']) ? $val['company'] : '',
                    'car_number_in' => isset($param['car_number_in']) ? $param['car_number_in'] : '',
                    'admin_checkout_id' => isset($param['admin_checkout_id']) ? $param['admin_checkout_id'] : '',
                    'admin_checkout_name' => isset($param['admin_checkout_name']) ? $param['admin_checkout_name'] : '',
                    'car_number_out' => isset($param['car_number_out']) ? $param['car_number_out'] : ''
                );
            }
            if (!empty($addUpdateData)) {
                self::batchInsert('orders', $addUpdateData, array(
                    'area_id' => DB::expr('VALUES(area_id)'),
                    'order_id' => DB::expr('VALUES(order_id)'),
                    'card_id' => DB::expr('VALUES(card_id)'),
                    'card_code' => DB::expr('VALUES(card_code)'),
                    'card_stt' => DB::expr('VALUES(card_stt)'),
                    'checkin_time' => DB::expr('VALUES(checkin_time)'),
                    'checkout_time' => DB::expr('VALUES(checkout_time)'),
                    'car_number' => DB::expr('VALUES(car_number)'),
                    'admin_checkin_id' => DB::expr('VALUES(admin_checkin_id)'),
                    'admin_checkin_name' => DB::expr('VALUES(admin_checkin_name)'),
                    'vehicle_code' => DB::expr('VALUES(vehicle_code)'),
                    'monthly_card_id' => DB::expr('VALUES(monthly_card_id)'),
                    'vehicle_id' => DB::expr('VALUES(vehicle_id)'),
                    'vehicle_name' => DB::expr('VALUES(vehicle_name)'),
                    'is_card_lost' => DB::expr('VALUES(is_card_lost)'),
                    'total_price' => DB::expr('VALUES(total_price)'),
                    'pc_name' => DB::expr('VALUES(pc_name)'),
                    'account' => DB::expr('VALUES(account)'),
                    'created' => DB::expr('VALUES(created)'),
                    'updated' => DB::expr('VALUES(updated)'),
                    'customer_name' => DB::expr('VALUES(customer_name)'),
                    'company' => DB::expr('VALUES(company)'),
                    'car_number_in' => DB::expr('VALUES(car_number_in)'),
                    'admin_checkout_id' => DB::expr('VALUES(admin_checkout_id)'),
                    'admin_checkout_name' => DB::expr('VALUES(admin_checkout_name)'),
                    'car_number_out' => DB::expr('VALUES(car_number_out)'),
                ));
                return true;
            }
        }
        return false;
    }
}
