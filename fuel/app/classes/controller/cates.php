<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Cates extends \Controller_App {
    /**
     * Cate list
     */
    public function action_list() {
        return \Bus\Cates_List::getInstance()->execute();
    }
    
    /**
     * Cate all
     */
    public function action_all() {
        return \Bus\Cates_All::getInstance()->execute();
    }
    
    /**
     * Cate add/update
     */
    public function action_addupdate() {
        return \Bus\Cates_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Cate detail
     */
    public function action_detail() {
        return \Bus\Cates_Detail::getInstance()->execute();
    }
    
    /**
     * Cate delete
     */
    public function action_delete() {
        return \Bus\Cates_Delete::getInstance()->execute();
    }
    
    /**
     * Cate disable
     */
    public function action_disable() {
        return \Bus\Cates_Disable::getInstance()->execute();
    }
}