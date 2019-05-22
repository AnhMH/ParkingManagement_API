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
class Model_Sync extends Model_Abstract {
    
    /** @var array $_properties field of table */
    protected static $_properties = array(
        'id',
        'project_id',
        'company_id',
        'user_id',
        'card_id',
        'monthly_card_id',
        'type', //0: Edit, 1: Add new, 2: Delete
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
    protected static $_table_name = 'sync';
    
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
        
        
        // Check if exist
        if (!empty($id)) {
            $self = self::find($id);
            if (empty($self)) {
                self::errorNotExist('sync_id');
                return false;
            }
        } else {
            $self = new self;
            $new = true;
        }
        
        // Set data
        if (!empty($param['project_id'])) {
            $self->set('project_id', $param['project_id']);
        }
        if (!empty($param['company_id'])) {
            $self->set('company_id', $param['company_id']);
        }
        if (!empty($param['user_id'])) {
            $self->set('user_id', $param['user_id']);
        }
        if (!empty($param['card_id'])) {
            $self->set('card_id', $param['card_id']);
        }
        if (!empty($param['monthly_card_id'])) {
            $self->set('monthly_card_id', $param['monthly_card_id']);
        }
        if (isset($param['type'])) {
            $self->set('type', $param['type']);
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
     * Sync data
     *
     * @author AnhMH
     * @param array $param Input data
     * @return int|bool User ID or false if error
     */
    public static function sync_data($param)
    {
        // Check
        if (empty($param['admin_id']) && empty($param['card_id']) && empty($param['monthly_card_id'])) {
            return false;
        }
        
        // Init
        $syncData = array();
        
        // Sync admin
        if (!empty($param['admin_id'])) {
            $adminProjects = Model_Admin_Project::get_all(array(
                'admin_id' => $param['admin_id']
            ));
            if (!empty($adminProjects)) {
                foreach ($adminProjects as $val) {
                    $syncData[] = array(
                        'admin_id' => $param['admin_id'],
                        'project_id' => $val['project_id'],
                        'company_id' => $val['company_id'],
                        'type' => $param['type']
                    );
                }
            }
        }
        if (!empty($param['company_id'])) {
            $projects = Model_Project::get_all(array(
                'company_id' => $param['company_id']
            ));
            if (!empty($projects)) {
                if (!empty($param['card_id']) && !is_array($param['card_id'])) {
                    $param['card_id'] = explode(',', $param['card_id']);
                }
                if (!empty($param['monthly_card_id']) && !is_array($param['monthly_card_id'])) {
                    $param['monthly_card_id'] = explode(',', $param['monthly_card_id']);
                }
                foreach ($projects as $val) {
                    if (!empty($param['card_id'])) {
                        foreach ($param['card_id'] as $c) {
                            $syncData[] = array(
                                'card_id' => $c,
                                'project_id' => $val['id'],
                                'company_id' => $val['company_id'],
                                'type' => $param['type']
                            );
                        }
                    }
                    if (!empty($param['monthly_card_id'])) {
                        foreach ($param['monthly_card_id'] as $mc) {
                            $syncData[] = array(
                                'monthly_card_id' => $mc,
                                'project_id' => $val['id'],
                                'company_id' => $val['company_id'],
                                'type' => $param['type']
                            );
                        }
                    }
                }
            }
        }
        
        // Sync data
        if (!empty($syncData)) {
            self::batchInsert('sync', $syncData);
            return true;
        }
        
        // Return
        return false;
    }
}
