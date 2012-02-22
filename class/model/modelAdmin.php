<?php
require_once('builder/builderInterface.php');
define('SPREFIX','googlecalendar_');
define('GOOGLECALENDAR_SETTINGS',SPREFIX . 'settings');
class modelAdmin extends Model
{

    public function execGetSettings()
    {
        $sSql = "SELECT *,
            DATE_FORMAT(FROM_UNIXTIME(start_date),'%Y/%m/%d') as sdate,
            DATE_FORMAT(FROM_UNIXTIME(end_date),'%Y/%m/%d') as edate,
            DATE_FORMAT(FROM_UNIXTIME(start_date),'%H') as start_time,
            DATE_FORMAT(FROM_UNIXTIME(end_date),'%H') as end_time,
            start_date AS ut_startdate,
            end_date AS ut_enddate
            FROM " . GOOGLECALENDAR_SETTINGS;
        return $this->query($sSql,'row');
    }

    public function execSave($aArgs)
    {
        $sSql = "INSERT INTO  " . GOOGLECALENDAR_SETTINGS .
            "(feed_url,start_date,end_date,max_event,event_style,date_created)
            VALUES
            (
            '" .trim($aArgs['feed_url']) . "',
            UNIX_TIMESTAMP('{$aArgs['start_date']} {$aArgs['start_time']}:00'),
            UNIX_TIMESTAMP('{$aArgs['end_date']} {$aArgs['end_time']}:00'),
            '{$aArgs['max_event']}',
            '{$aArgs['event_style']}',
             UNIX_TIMESTAMP(NOW())
            )
        ";
        usbuilder()->vd($sSql);
        return $this->query($sSql);
    }

    public function execUpdate($aArgs)
    {
        $sSql = "UPDATE " . GOOGLECALENDAR_SETTINGS . " SET
        feed_url = '" . $aArgs['feed_url'] . "',
        start_date = UNIX_TIMESTAMP('{$aArgs['start_date']} {$aArgs['start_time']}:00'),
        end_date = UNIX_TIMESTAMP('{$aArgs['end_date']} {$aArgs['end_time']}:00'),
        max_event = '{$aArgs['max_event']}',
        event_style ='{$aArgs['event_style']}'
        WHERE idx = {$aArgs['idx']}
        ";
        return $this->query($sSql);
    }
}