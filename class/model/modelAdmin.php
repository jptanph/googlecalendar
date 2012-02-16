<?php
require_once('builder/builderInterface.php');
define('SPREFIX','googlecalendar_');
define('GOOGLECALENDAR_SETTINGS',SPREFIX . 'settings');
class modelAdmin extends Model
{

    public function execGetSettings()
    {
        $sSql = "SELECT * FROM " . GOOGLECALENDAR_SETTINGS;
        return $this->query($sSql,'row');
    }
}