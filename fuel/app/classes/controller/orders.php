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
     * Order card disable
     */
    public function action_carddisable() {
        return \Bus\Orders_CardDisable::getInstance()->execute();
    }
    
    /**
     * Order revenue
     */
    public function action_revenue() {
        return \Bus\Orders_Revenue::getInstance()->execute();
    }
}