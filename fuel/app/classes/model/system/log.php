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
class Model_System_Log extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'admin_id',
        'detail',
        'pc_name',
        'login_time',
        'logout_time',
        'created',
        'type',
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
    protected static $_table_name = 'system_logs';
    
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
                        self::$_table_name . '.id',
                        self::$_table_name . '.admin_id',
                        self::$_table_name . '.pc_name',
                        self::$_table_name . '.type',
                        self::$_table_name . '.detail',
//                        self::$_table_name . '.created',
                        self::$_table_name . '.vehicle_id',
                        DB::expr("FROM_UNIXTIME(system_logs.created, '%Y-%m-%d %H:%i') AS created"),
                        DB::expr("FROM_UNIXTIME(login_time, '%Y-%m-%d %H:%i') AS login_time"),
                        DB::expr("FROM_UNIXTIME(logout_time, '%Y-%m-%d %H:%i') AS logout_time"),
                        DB::expr("TIME_FORMAT(SEC_TO_TIME(logout_time - login_time),'%Hh %im') AS total_hours"),
                        array('admins.name', 'admin_name'),
                        array('vehicles.name', 'vehicle_name')
                )
                ->from(self::$_table_name)
                ->join('admins', 'LEFT')
                ->on('admins.id', '=', self::$_table_name.'.admin_id')
                ->join('vehicles', 'LEFT')
                ->on('vehicles.id', '=', self::$_table_name.'.vehicle_id')
        ;

        // Filter
        if (!empty($param['option1'])) {
            $query->where(self::$_table_name . '.login_time', '>=', self::time_to_val($param['option1']));
            $query->where(self::$_table_name . '.login_time', '<=', self::date_to_val($param['option1']));
        }
        if (!empty($param['option2_from'])) {
            $query->where(self::$_table_name . '.login_time', '>=', self::time_to_val($param['option2_from']));
        }
        if (!empty($param['option2_to'])) {
            $query->where(self::$_table_name . '.login_time', '<=', self::date_to_val($param['option2_to']));
        }
        if (!empty($param['log_create_from'])) {
            $query->where(self::$_table_name . '.created', '>=', self::time_to_val($param['log_create_from']));
        }
        if (!empty($param['log_create_to'])) {
            $query->where(self::$_table_name . '.created', '<=', self::date_to_val($param['log_create_to']));
        }
        if (!empty($param['adminname'])) {
            $query->where('admins.name', 'LIKE', "%{$param['adminname']}%");
        }
        if (!empty($param['type'])) {
            $query->where(self::$_table_name . '.type', 'IN', explode(',', $param['type']));
        }
        if (!empty($param['vehicle_id'])) {
            $query->where(self::$_table_name . '.vehicle_id', $param['vehicle_id']);
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
        $id = !empty($param['id']) ? $param['id'] : 0;
        $self = array();
        $new = false;
        
        // Check if exist User
        if (!empty($id)) {
            $self = self::find($id);
            if (empty($self)) {
                self::errorNotExist('system_log_id');
                return false;
            }
        } else {
            $self = new self;
            $new = true;
        }
        
        // Set data
        $self->set('pc_name', gethostname());
        $self->set('created', time());
        if (!empty($param['admin_id'])) {
            $self->set('admin_id', $param['admin_id']);
        }
        if (!empty($param['type'])) {
            $self->set('type', $param['type']);
        }
        if (!empty($param['login_time'])) {
            $self->set('login_time', $param['login_time']);
        }
        if (!empty($param['logout_time'])) {
            $self->set('logout_time', $param['logout_time']);
        }
        if (!empty($param['detail'])) {
            $self->set('detail', $param['detail']);
        }
        if (!empty($param['vehicle_id'])) {
            $self->set('vehicle_id', $param['vehicle_id']);
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
