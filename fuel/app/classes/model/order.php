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
        'company'
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
        if (!empty($param['checkout_time'])) {
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
        
        // Save data
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
            }
            return $self->id;
        }
        
        return false;
    }
}
