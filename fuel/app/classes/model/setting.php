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
    protected static $_properties = array(
        'id',
        'name',
        'value',
        'admin_type',
        'type', // 1: permission, 2: display setting, 3,4,5:priceformula
        'vehicle_id'
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
    protected static $_table_name = 'settings';
    
    /**
     * Add update info
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int|bool User ID or false if error
     */
    public static function add_update($param)
    {
        $data = !empty($param['data']) ? json_decode($param['data'], true) : array();
        $adminType = !empty($param['admin_type']) ? $param['admin_type'] : '';
        $type = !empty($param['type']) ? $param['type'] : '';
        $vehicleId = !empty($param['vehicle_id']) ? $param['vehicle_id'] : '';
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : '';
        if (!empty($data)) {
            $addUpdateData = array();
            foreach ($data as $k => $v) {
                $addUpdateData[] = array(
                    'name' => $k,
                    'value' => $v,
                    'admin_type' => $adminType,
                    'type' => $type,
                    'vehicle_id' => $vehicleId
                );
            }
            if (!empty($addUpdateData)) {
                // Add/update value
                self::batchInsert(self::$_table_name, $addUpdateData, array(
                    'name' => DB::expr('VALUES(name)'),
                    'value' => DB::expr('VALUES(value)'),
                    'admin_type' => DB::expr('VALUES(admin_type)'),
                    'type' => DB::expr('VALUES(type)'),
                    'vehicle_id' => DB::expr('VALUES(vehicle_id)')
                ));
                $logType = '';
                if ($type == \Config::get('setting_type')['price_formula1']) {
                    $logType = static::LOG_TYPE_UPDATE_PRICE_FORMULA1;
                }
                if ($type == \Config::get('setting_type')['price_formula2']) {
                    $logType = static::LOG_TYPE_UPDATE_PRICE_FORMULA2;
                }
                if ($type == \Config::get('setting_type')['price_formula3']) {
                    $logType = static::LOG_TYPE_UPDATE_PRICE_FORMULA3;
                }
                if (!empty($logType)) {
                    $logData = array();
                    foreach ($addUpdateData as $val) {
                        $logData[$val['name']] = $val['value'];
                    }
                    $logParam = array(
                        'detail' => json_encode($logData),
                        'admin_id' => $adminId,
                        'type' => $logType
                    );
                    Model_System_Log::add_update($logParam);
                }
                
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Get detail
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int|bool User ID or false if error
     */
    public static function get_detail($param)
    {
        // Query
        $query = DB::select(
                        self::$_table_name . '.*'
                )
                ->from(self::$_table_name)
        ;

        // Filter
        if (!empty($param['type'])) {
            $query->where(self::$_table_name . '.type', $param['type']);
        }
        if (!empty($param['admin_type'])) {
            $query->where(self::$_table_name . '.admin_type', $param['admin_type']);
        }
        if (!empty($param['vehicle_id'])) {
            $query->where(self::$_table_name . '.vehicle_id', $param['vehicle_id']);
        }

        // Get data
        $data = $query->execute()->as_array();
        return $data;
    }
}
