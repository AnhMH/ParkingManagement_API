<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Admins extends \Controller_App {
    /**
     * Admin login
     */
    public function action_login() {
        return \Bus\Admins_Login::getInstance()->execute();
    }
    
    /**
     * Admin update profile
     */
    public function action_updateprofile() {
        return \Bus\Admins_UpdateProfile::getInstance()->execute();
    }
    
    /**
     * Admin register
     */
    public function action_register() {
        return \Bus\Admins_Register::getInstance()->execute();
    }
    
    /**
     * Admin list
     */
    public function action_list() {
        return \Bus\Admins_List::getInstance()->execute();
    }
    
    /**
     * Admin addupdate
     */
    public function action_addupdate() {
        return \Bus\Admins_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Admin detail
     */
    public function action_detail() {
        return \Bus\Admins_Detail::getInstance()->execute();
    }
    
    /**
     * Admin disable
     */
    public function action_disable() {
        return \Bus\Admins_Disable::getInstance()->execute();
    }
}