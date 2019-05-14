<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Projects extends \Controller_App {
    
    /**
     * Project list
     */
    public function action_list() {
        return \Bus\Projects_List::getInstance()->execute();
    }
    
    /**
     * Project all
     */
    public function action_all() {
        return \Bus\Projects_All::getInstance()->execute();
    }
    
    /**
     * Project addupdate
     */
    public function action_addupdate() {
        return \Bus\Projects_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Project detail
     */
    public function action_detail() {
        return \Bus\Projects_Detail::getInstance()->execute();
    }
    
    /**
     * Project disable
     */
    public function action_disable() {
        return \Bus\Projects_Disable::getInstance()->execute();
    }
}