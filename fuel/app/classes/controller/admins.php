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
}