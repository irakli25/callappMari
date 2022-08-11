<?php

set_time_limit(0);

require 'vendor/autoload.php';
require 'Configs/config.php';


use Websocket\rootController;
// use Websocket\Controller;

$loop = React\EventLoop\Factory::create();

$server = new Ratchet\App(APP_IP, APP_PORT, '0.0.0.0', $loop);

$server->route('/', new rootController($loop), array('*'));
// $server->route('/old', new Controller($loop), array('*'));

$server->run();

