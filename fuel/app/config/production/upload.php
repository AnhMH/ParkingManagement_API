<?php 
return array(	
	'upload_dir' => '/home/hoangan1/imgpm.hoanganhonline.com/',
	'img_dir' => '/home/hoangan1/imgpm.hoanganhonline.com/',
	'path' => '/home/hoangan1/imgpm.hoanganhonline.com/' . date('Y' . DS . 'm' . DS . 'd') . DS,
	'auto_process' => false,
	'normalize' => true,
	'change_case' => 'lower',
	'randomize' => true,
	'ext_whitelist' => array('jpeg', 'jpg', 'gif', 'png', 'mp4', 'flv'),
        'max_size' => 5 * 1024 * 1024, // 1MB
);