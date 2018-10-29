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
}