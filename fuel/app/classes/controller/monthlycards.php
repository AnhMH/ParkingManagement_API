<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_MonthlyCards extends \Controller_App {
    
    /**
     * MonthlyCard list
     */
    public function action_list() {
        return \Bus\MonthlyCards_List::getInstance()->execute();
    }
    
    /**
     * MonthlyCard all
     */
    public function action_all() {
        return \Bus\MonthlyCards_All::getInstance()->execute();
    }
    
    /**
     * MonthlyCard addupdate
     */
    public function action_addupdate() {
        return \Bus\MonthlyCards_AddUpdate::getInstance()->execute();
    }
    
    /**
     * MonthlyCard detail
     */
    public function action_detail() {
        return \Bus\MonthlyCards_Detail::getInstance()->execute();
    }
    
    /**
     * MonthlyCard disable
     */
    public function action_disable() {
        return \Bus\MonthlyCards_Disable::getInstance()->execute();
    }
    
    /**
     * MonthlyCard import
     */
    public function action_import() {
        return \Bus\MonthlyCards_Import::getInstance()->execute();
    }
    
    /**
     * MonthlyCard renewal
     */
    public function action_renewal() {
        return \Bus\MonthlyCards_Renewal::getInstance()->execute();
    }
}