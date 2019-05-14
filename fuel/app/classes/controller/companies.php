<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Companies extends \Controller_App {
    
    /**
     * Vehicle list
     */
    public function action_list() {
        return \Bus\Companies_List::getInstance()->execute();
    }
    
    /**
     * Vehicle all
     */
    public function action_all() {
        return \Bus\Companies_All::getInstance()->execute();
    }
    
    /**
     * Vehicle addupdate
     */
    public function action_addupdate() {
        return \Bus\Companies_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Vehicle detail
     */
    public function action_detail() {
        return \Bus\Companies_Detail::getInstance()->execute();
    }
    
    /**
     * Vehicle disable
     */
    public function action_disable() {
        return \Bus\Companies_Disable::getInstance()->execute();
    }
}