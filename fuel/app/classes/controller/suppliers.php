<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Suppliers extends \Controller_App {
    /**
     * Supplier login
     */
    public function action_list() {
        return \Bus\Suppliers_List::getInstance()->execute();
    }
    
    /**
     * Supplier add/update
     */
    public function action_addupdate() {
        return \Bus\Suppliers_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Supplier detail
     */
    public function action_detail() {
        return \Bus\Suppliers_Detail::getInstance()->execute();
    }
    
    /**
     * Supplier delete
     */
    public function action_delete() {
        return \Bus\Suppliers_Delete::getInstance()->execute();
    }
    
    /**
     * Supplier all
     */
    public function action_autocomplete() {
        return \Bus\Suppliers_AutoComplete::getInstance()->execute();
    }
}