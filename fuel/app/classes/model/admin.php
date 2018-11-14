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
class Model_Admin extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'name',
        'account',
        'password',
        'type',
        'gender',
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
    protected static $_table_name = 'admins';

    /**
     * Login Admin
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Admin or false if error
     */
    public static function get_login($param)
    {
        $login = array();
        $currentTime = time();
        $login = self::get_profile(array(
            'account' => $param['account'],
            'password' => $param['password']
        ));
        
        if (!empty($login)) {
            if (empty($login['disable'])) {
                $login['token'] = Model_Authenticate::addupdate(array(
                    'user_id' => $login['id'],
                    'regist_type' => 'admin',
                    'update_token' => true
                ));
                $login['permission'] = \Lib\Arr::key_value(Model_Setting::get_detail(array(
                    'type' => \Config::get('setting_type')['permission'],
                    'admin_type' => $login['type']
                )), 'name', 'value');
                $lastLogin = Model_System_Log::find('last', array(
                    'where' => array(
                        'admin_id' => $login['id'],
                        'type' => static::LOG_TYPE_ADMIN_LOGIN
                    )
                ));
                if (!empty($lastLogin) && empty($lastLogin['logout_time'])) {
                    $logoutTime = $currentTime;
                    if ($currentTime - $lastLogin['login_time'] >= 8*3600) {
                        $logoutTime = $lastLogin['login_time'] + 8*3600;
                    }
                    $lastLogin->set('logout_time', $logoutTime);
                    $lastLogin->save();
                }
                $logParam = array(
                    'detail' => 'Đăng nhập hệ thống',
                    'admin_id' => $login['id'],
                    'type' => static::LOG_TYPE_ADMIN_LOGIN,
                    'login_time' => $currentTime
                );
                Model_System_Log::add_update($logParam);
                return $login;
            }
            static::errorOther(static::ERROR_CODE_OTHER_1, 'User is disabled');
            return false;
        }
        static::errorOther(static::ERROR_CODE_AUTH_ERROR, 'Email/Password');
        return false;
    }
    
    /**
     * Logout Admin
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Admin or false if error
     */
    public static function logout($param)
    {
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : 0;
        $logoutTime = time();
        $lastLogin = Model_System_Log::find('last', array(
            'where' => array(
                'admin_id' => $adminId
            )
        ));
        if (!empty($lastLogin)) {
            $lastLogin->set('logout_time', $logoutTime);
            $lastLogin->save();
        }
        $logParam = array(
            'detail' => 'Đăng xuất hệ thống',
            'admin_id' => $adminId,
            'type' => static::LOG_TYPE_ADMIN_LOGOUT,
            'logout_time' => $logoutTime
        );
        Model_System_Log::add_update($logParam);
        return true;
    }
    
    /**
     * Get profile
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Admin or false if error
     */
    public static function get_profile($param)
    {
        // Query
        $query = DB::select(
                self::$_table_name.'.*'
            )
            ->from(self::$_table_name)
        ;
        
        // Filter
        if (!empty($param['admin_id'])) {
            $query->where(self::$_table_name.'.id', $param['admin_id']);
        }
        if (!empty($param['account'])) {
            $query->where(self::$_table_name.'.account', $param['account']);
        }
        if (!empty($param['password'])) {
            $query->where(self::$_table_name.'.password', $param['password']);
        }        
        if (!empty($param['id'])) {
            $query->where(self::$_table_name.'.id', $param['id']);
        }        
        
        // Get data
        $data = $query->execute()->offsetGet(0);
        
        if (empty($data)) {
            static::errorNotExist('user_id');
            return false;
        }
        
        return $data;
    }
    
    /**
     * Update profile
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Admin or false if error
     */
    public static function update_profile($param)
    {
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : '';
        $admin = self::find($adminId);
        if (empty($admin)) {
            self::errorNotExist('admin_id', $adminId);
            return false;
        }
        
        // Upload image
        if (!empty($_FILES)) {
            $uploadResult = \Lib\Util::uploadImage(); 
            if ($uploadResult['status'] != 200) {
                self::setError($uploadResult['error']);
                return false;
            }
            $param['avatar'] = !empty($uploadResult['body']['avatar']) ? $uploadResult['body']['avatar'] : '';
        }
        
        // Set data
        if (!empty($param['email'])) {
            $admin->set('email', $param['email']);
        }
        if (!empty($param['address'])) {
            $admin->set('address', $param['address']);
        }
        if (!empty($param['tel'])) {
            $admin->set('tel', $param['tel']);
        }
        if (!empty($param['avatar'])) {
            $admin->set('avatar', $param['avatar']);
        }
        if (!empty($param['website'])) {
            $admin->set('website', $param['website']);
        }
        if (!empty($param['facebook'])) {
            $admin->set('facebook', $param['facebook']);
        }
        if (!empty($param['description'])) {
            $admin->set('description', $param['description']);
        }
        
        // Save data
        if ($admin->save()) {
            $admin['token'] = Model_Authenticate::addupdate(array(
                'user_id' => $adminId,
                'regist_type' => 'admin'
            ));
            return $admin;
        }
        return false;
    }
    
    /**
     * Register Admin
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Admin or false if error
     */
    public static function register($param)
    {
        $self = array();
        
        $check = self::find('first', array(
            'where' => array(
                'email' => $param['register_email']
            )
        ));
        if (!empty($check)) {
            self::errorDuplicate('email', "Email {$param['register_email']} đã được đăng ký.");
            return false;
        }
        
        $self = new self;
        $self->set('name', $param['register_name']);
        $self->set('email', $param['register_email']);
        $self->set('password', \Lib\Util::encodePassword($param['register_password'], $param['register_email']));
        $self->set('type', 0);
        $self->set('account', '');
        
        if ($self->save()) {
            if (empty($self->id)) {
                $self->id = self::cached_object($self)->_original['id'];
            }
            $self['token'] = Model_Authenticate::addupdate(array(
                'user_id' => $self->id,
                'regist_type' => 'admin'
            ));
            return $self;
        }
        
        return false;
    }
    
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
                        self::$_table_name . '.*',
                        array('admin_types.name', 'type_name')
                )
                ->from(self::$_table_name)
                ->join('admin_types', 'LEFT')
                ->on(self::$_table_name.'.type', '=', 'admin_types.id')
        ;

        // Filter
        if (!empty($param['name'])) {
            $query->where(self::$_table_name . '.name', 'LIKE', "%{$param['name']}%");
        }
        if (!empty($param['type'])) {
            $query->where(self::$_table_name . '.type', $param['type']);
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
        $adminId = !empty($param['admin_id']) ? $param['admin_id'] : '';
        
        // Check code
        if (!empty($param['account'])) {
            $check = self::find('first', array(
                'where' => array(
                    'name' => $param['account'],
                    array('id', '!=', $id)
                )
            ));
            if (!empty($check)) {
                self::errorOther(self::ERROR_CODE_OTHER_1, 'account', 'Tài khoản đã tồn tại, vui lòng chọn tên khác.');
                return false;
            }
        }
        
        
        // Check if exist User
        if (!empty($id)) {
            $self = self::find($id);
            if (empty($self)) {
                self::errorNotExist('admin_id');
                return false;
            }
        } else {
            $self = new self;
            $new = true;
        }
        
        // Set data
        if (!empty($param['name'])) {
            $self->set('name', $param['name']);
        }
        if (!empty($param['account'])) {
            $self->set('account', $param['account']);
        }
        if (!empty($param['pass'])) {
            $self->set('password', $param['pass']);
        }
        if (!empty($param['type'])) {
            $self->set('type', $param['type']);
        }
        if (!empty($param['gender'])) {
            $self->set('gender', $param['gender']);
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
                'type' => !empty($new) ? static::LOG_TYPE_ADMIN_CREATE : static::LOG_TYPE_ADMIN_UPDATE
            );
            Model_System_Log::add_update($logParam);
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
     * Disable
     *
     * @author AnhMH
     * @param array $param Input data
     * @return Int|bool
     */
    public static function disable($param)
    {
        $table = self::$_table_name;
        $cond = "id IN ({$param['id']})";
        $sql = "DELETE FROM {$table} WHERE {$cond}";
        return DB::query($sql)->execute();
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
     * Login Admin
     *
     * @author AnhMH
     * @param array $param Input data
     * @return array|bool Detail Admin or false if error
     */
    public static function get_login_by_id($param)
    {
        $login = array();
        $currentTime = time();
        $login = self::get_profile(array(
            'id' => $param['id']
        ));
        
        if (!empty($login)) {
            if (empty($login['disable'])) {
                $login['token'] = Model_Authenticate::addupdate(array(
                    'user_id' => $login['id'],
                    'regist_type' => 'admin',
                    'update_token' => true
                ));
                $login['permission'] = \Lib\Arr::key_value(Model_Setting::get_detail(array(
                    'type' => \Config::get('setting_type')['permission'],
                    'admin_type' => $login['type']
                )), 'name', 'value');
                $lastLogin = Model_System_Log::find('last', array(
                    'where' => array(
                        'admin_id' => $login['id'],
                        'type' => static::LOG_TYPE_ADMIN_LOGIN
                    )
                ));
                if (!empty($lastLogin) && empty($lastLogin['logout_time'])) {
                    $logoutTime = $currentTime;
                    if ($currentTime - $lastLogin['login_time'] >= 8*3600) {
                        $logoutTime = $lastLogin['login_time'] + 8*3600;
                    }
                    $lastLogin->set('logout_time', $logoutTime);
                    $lastLogin->save();
                }
                $logParam = array(
                    'detail' => 'Đăng nhập hệ thống',
                    'admin_id' => $login['id'],
                    'type' => static::LOG_TYPE_ADMIN_LOGIN,
                    'login_time' => $currentTime
                );
                Model_System_Log::add_update($logParam);
                return $login;
            }
            static::errorOther(static::ERROR_CODE_OTHER_1, 'User is disabled');
            return false;
        }
        static::errorOther(static::ERROR_CODE_AUTH_ERROR, 'Email/Password');
        return false;
    }
}
