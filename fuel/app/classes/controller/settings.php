<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Settings extends \Controller_App {
    /**
     * Setting addupdate
     */
    public function action_addupdate() {
        return \Bus\Settings_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Setting detail
     */
    public function action_detail() {
        return \Bus\Settings_Detail::getInstance()->execute();
    }
}