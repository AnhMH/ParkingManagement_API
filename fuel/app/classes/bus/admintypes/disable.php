<?php

namespace Bus;

/**
 * Disable Admintype
 *
 * @package Bus
 * @created 2017-10-22
 * @version 1.0
 * @author AnhMH
 */
class Admintypes_Disable extends BusAbstract
{
    /** @var array $_required field require */
    protected $_required = array(
        'id'
    );

    /** @var array $_length Length of fields */
    protected $_length = array();

    /** @var array $_email_format field email */
    protected $_email_format = array();

    /**
     * Call function get_list() from model Admintype
     *
     * @author AnhMH
     * @param array $data Input data
     * @return bool Success or otherwise
     */
    public function operateDB($data)
    {
        try {
            $this->_response = \Model_Admin_Type::disable($data);
            return $this->result(\Model_Admin_Type::error());
        } catch (\Exception $e) {
            $this->_exception = $e;
        }
        return false;
    }
}
