<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Controller_Systemlogs extends \Controller_App {
    /**
     * Systemlog list
     */
    public function action_list() {
        return \Bus\Systemlogs_List::getInstance()->execute();
    }
}