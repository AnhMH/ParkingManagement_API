<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Vehicles extends \Controller_App {
    
    /**
     * Vehicle list
     */
    public function action_list() {
        return \Bus\Vehicles_List::getInstance()->execute();
    }
    
    /**
     * Vehicle all
     */
    public function action_all() {
        return \Bus\Vehicles_All::getInstance()->execute();
    }
    
    /**
     * Vehicle addupdate
     */
    public function action_addupdate() {
        return \Bus\Vehicles_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Vehicle detail
     */
    public function action_detail() {
        return \Bus\Vehicles_Detail::getInstance()->execute();
    }
    
    /**
     * Vehicle disable
     */
    public function action_disable() {
        return \Bus\Vehicles_Disable::getInstance()->execute();
    }
}