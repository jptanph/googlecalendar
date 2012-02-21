<?php
require_once('builder/builderInterface.php');
define('SPREFIX','googlecalendar_');
define('GOOGLECALENDAR_SETTINGS',SPREFIX . 'settings');

class modelFront extends Model
{

    public function execGetSettings()
    {
        $sSql = "SELECT *,
            DATE_FORMAT(FROM_UNIXTIME(start_date),'%Y/%d/%m') as sdate,
            DATE_FORMAT(FROM_UNIXTIME(end_date),'%Y/%d/%m') as edate,
            DATE_FORMAT(FROM_UNIXTIME(start_date),'%H') as start_time,
            DATE_FORMAT(FROM_UNIXTIME(end_date),'%H') as end_time,
            start_date AS ut_startdate,
            end_date AS ut_enddate
        FROM " . GOOGLECALENDAR_SETTINGS;
        return $this->query($sSql,'row');
    }
}