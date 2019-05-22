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
class Model_Admin_Project extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'admin_id',
        'company_id',
        'project_id',
        'created',
        'updated',
        'disable'
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
    protected static $_table_name = 'admin_projects';
    
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
        
        if (!empty($param['get_project_name'])) {
            $query->select(
                    array('companies.name', 'company_name'),
                    array('projects.name', 'project_name')
            );
            $query->join('companies', 'LEFT')
                    ->on('companies.id', '=', self::$_table_name.'.company_id')
                    ->join('projects', 'LEFT')
                    ->on('projects.id', '=', self::$_table_name.'.project_id');
        }

        // Filter
        if (!empty($param['admin_id'])) {
            if (!is_array($param['admin_id'])) {
                $param['admin_id'] = explode(',', $param['admin_id']);
            }
            $query->where(self::$_table_name . '.admin_id', 'IN', $param['admin_id']);
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
}
