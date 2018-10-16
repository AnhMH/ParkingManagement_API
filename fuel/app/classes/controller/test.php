<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Test extends \Controller_App {

    /**
     * The basic welcome message
     *
     * @access  public
     * @return  Response
     */
    public function action_index() {
        $param = array();
        $data = Model_Customer::get_list($param);
        echo '<pre>';
        print_r($data);
        die();
    }

    /**
     * Generate pass
     *
     * @access  public
     * @return  Response
     */
    public function action_pass() {
        include_once APPPATH . "/config/auth.php";
        $account = $_GET['acc'];
        $pass = $_GET['pw'];
        echo \Lib\Util::encodePassword($pass, $account);
    }
    
}
