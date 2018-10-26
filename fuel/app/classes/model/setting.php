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
        'type' // 1: permission, 2: display setting, 3,4,5:priceformula
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
        if (!empty($data)) {
            $addUpdateData = array();
            foreach ($data as $k => $v) {
                $addUpdateData[] = array(
                    'name' => $k,
                    'value' => $v,
                    'admin_type' => $adminType,
                    'type' => $type
                );
            }
            if (!empty($addUpdateData)) {
                // Reset value
                self::deleteRow(self::$_table_name, array(
                    'admin_type' => $adminType,
                    'type' => $type
                ));
                
                // Add new value
                self::batchInsert(self::$_table_name, $addUpdateData);
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

        // Get data
        $data = $query->execute()->as_array();
        return $data;
    }
}
