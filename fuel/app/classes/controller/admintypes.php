<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Admintypes extends \Controller_App {
    
    /**
     * Admintype list
     */
    public function action_list() {
        return \Bus\Admintypes_List::getInstance()->execute();
    }
    
    /**
     * Admintype all
     */
    public function action_all() {
        return \Bus\Admintypes_All::getInstance()->execute();
    }
    
    /**
     * Admintype addupdate
     */
    public function action_addupdate() {
        return \Bus\Admintypes_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Admintype detail
     */
    public function action_detail() {
        return \Bus\Admintypes_Detail::getInstance()->execute();
    }
    
    /**
     * Admintype disable
     */
    public function action_disable() {
        return \Bus\Admintypes_Disable::getInstance()->execute();
    }
}