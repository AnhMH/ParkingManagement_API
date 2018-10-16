<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Orders extends \Controller_App {
    /**
     * Order list
     */
    public function action_list() {
        return \Bus\Orders_List::getInstance()->execute();
    }
    
    /**
     * Order add/update
     */
    public function action_addupdate() {
        return \Bus\Orders_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Order detail
     */
    public function action_detail() {
        return \Bus\Orders_Detail::getInstance()->execute();
    }
    
    /**
     * Order delete
     */
    public function action_delete() {
        return \Bus\Orders_Delete::getInstance()->execute();
    }
    
    /**
     * Order disable
     */
    public function action_disable() {
        return \Bus\Orders_Disable::getInstance()->execute();
    }
}