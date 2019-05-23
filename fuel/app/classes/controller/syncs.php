<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Syncs extends \Controller_App {
    
    /**
     * Card all
     */
    public function action_all() {
        return \Bus\Syncs_All::getInstance()->execute();
    }
    
    /**
     * Card disable
     */
    public function action_disable() {
        return \Bus\Syncs_Disable::getInstance()->execute();
    }
}