<?php

namespace Bus;

/**
 * AddUpdate Card
 *
 * @package Bus
 * @created 2017-10-22
 * @version 1.0
 * @author AnhMH
 */
class Cards_AddUpdate extends BusAbstract
{
    /** @var array $_required field require */
    protected $_required = array(
        'code',
        'stt'
    );

    /** @var array $_length Length of fields */
    protected $_length = array();

    /** @var array $_email_format field email */
    protected $_email_format = array();

    /**
     * Call function get_list() from model Card
     *
     * @author AnhMH
     * @param array $data Input data
     * @return bool Success or otherwise
     */
    public function operateDB($data)
    {
        try {
            $this->_response = \Model_Card::add_update($data);
            return $this->result(\Model_Card::error());
        } catch (\Exception $e) {
            $this->_exception = $e;
        }
        return false;
    }
}
