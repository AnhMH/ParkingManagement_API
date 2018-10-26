<?php

namespace Bus;

/**
 * Detail Permission
 *
 * @package Bus
 * @created 2017-10-22
 * @version 1.0
 * @author AnhMH
 */
class Permissions_Detail extends BusAbstract
{
    /** @var array $_required field require */
    protected $_required = array(
        'admin_type'
    );

    /** @var array $_length Length of fields */
    protected $_length = array();

    /** @var array $_email_format field email */
    protected $_email_format = array();

    /**
     * Call function get_list() from model Permission
     *
     * @author AnhMH
     * @param array $data Input data
     * @return bool Success or otherwise
     */
    public function operateDB($data)
    {
        try {
            $data['type'] = \Config::get('setting_type')['permission'];
            $this->_response = \Model_Setting::get_detail($data);
            return $this->result(\Model_Setting::error());
        } catch (\Exception $e) {
            $this->_exception = $e;
        }
        return false;
    }
}
