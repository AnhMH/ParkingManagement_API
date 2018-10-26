<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Permissions extends \Controller_App {
    /**
     * Permission addupdate
     */
    public function action_addupdate() {
        return \Bus\Permissions_AddUpdate::getInstance()->execute();
    }
    
    /**
     * Permission detail
     */
    public function action_detail() {
        return \Bus\Permissions_Detail::getInstance()->execute();
    }
}