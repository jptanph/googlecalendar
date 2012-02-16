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

    public function execSave($aArgs)
    {
        $sSql = "INSERT INTO  " . GOOGLECALENDAR_SETTINGS .
            "(feed_url,start_date,end_date,max_event,event_style,date_created)
            VALUES
            (
            '{$aArgs['feed_url']}',
            '{$aArgs['start_date']}',
            '{$aArgs['end_date']}',
            '{$aArgs['max_event']}',
            '{$aArgs['event_style']}',
             UNIX_TIMESTAMP(NOW())
            )
        ";
        return $this->query($sSql);
    }

    public function execUpdate($aArgs)
    {
        $sSql = "UPDATE " . GOOGLECALENDAR_SETTINGS . " SET
        feed_url = '{$aArgs['feed_url']}',
        start_date = '{$aArgs['start_date']}',
        end_date = '{$aArgs['end_date']}',
        max_event = '{$aArgs['max_event']}',
            event_style ='{$aArgs['event_style']}'
            WHERE idx = {$aArgs['idx']}
            ";

       return $this->query($sSql);
    }
}