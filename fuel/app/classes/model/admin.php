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
        'type',
        'account',
        'password',
        'name',
        'email',
        'address',
        'tel',
        'avatar',
        'website',
        'facebook',
        'description',
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
        $login = self::get_profile(array(
            'email' => $param['email'],
            'password' => \Lib\Util::encodePassword($param['password'], $param['email'])
        ));
        
        if (!empty($login)) {
            if (empty($login['disable'])) {
                $login['token'] = Model_Authenticate::addupdate(array(
                    'user_id' => $login['id'],
                    'regist_type' => 'admin'
                ));
                return $login;
            }
            static::errorOther(static::ERROR_CODE_OTHER_1, 'User is disabled');
            return false;
        }
        static::errorOther(static::ERROR_CODE_AUTH_ERROR, 'Email/Password');
        return false;
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
        if (!empty($param['email'])) {
            $query->where(self::$_table_name.'.email', $param['email']);
        }
        if (!empty($param['password'])) {
            $query->where(self::$_table_name.'.password', $param['password']);
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
}
