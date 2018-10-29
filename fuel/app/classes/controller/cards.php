<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Cards extends \Controller_App {
    
    /**
     * Card list
     */
    public function action_list() {
        return \Bus\Cards_List::getInstance()->execute();
    }
    
    /**
     * Card all
     */
    public function action_all() {
        return \Bus\Cards_All::getInstance()->execute();
    }
    
    /**
     * Card addupdate
     */
    public function action_addupdate() {
        return \Bus\Cards_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Card detail
     */
    public function action_detail() {
        return \Bus\Cards_Detail::getInstance()->execute();
    }
    
    /**
     * Card disable
     */
    public function action_disable() {
        return \Bus\Cards_Disable::getInstance()->execute();
    }
    
    /**
     * Card import
     */
    public function action_import() {
        return \Bus\Cards_Import::getInstance()->execute();
    }
    
    /**
     * Card checkin
     */
    public function action_checkin() {
        return \Bus\Cards_Checkin::getInstance()->execute();
    }
    
    /**
     * Card checkout
     */
    public function action_checkout() {
        return \Bus\Cards_Checkout::getInstance()->execute();
    }
}