<?php
require_once('builder/builderInterface.php');
require_once('gcParser.php');

class apiFrontCalendarData extends Controller_Api
{
    public function post($aArgs)
    {
        usbuilder()->init($this, $aArgs);
        $aData = array();
        $aEvents = array();
        $oGcParser = new gcParser();

        $aResult = common()->modelFront()->execGetSettings();
        $oGcParser->setFeedUrl($aResult['feed_url']);
        $aFeed = $oGcParser->init();

        $iMonth = (isset($aArgs['month']) && $aArgs['month'] != '') ? $aArgs['month'] : date('n');
        $iYear = (isset($aArgs['year']) && $aArgs['year'] != '') ? $aArgs['year'] : date('Y');

        $sPrevYear = $iYear;
        $sNextYear = $iYear;

        $sPrevMonth = ($iMonth - 1);
        $sNextMonth = ($iMonth + 1);

        if( $sPrevMonth == 0 ){
            $sPrevMonth = 12;
            $sPrevYear = ( $iYear - 1 );
        }

        if( $sNextMonth == 13 )
        {
            $sNextMonth = 1;
            $sNextYear = ( $iYear + 1 );
        }

        $iTimeStamp = mktime(0,0,0,$iMonth,1,$iYear);
        $iMaxDay    = date("t",$iTimeStamp);
        $aMonthInfo = getdate ($iTimeStamp);
        $sStartDay  = $aMonthInfo['wday'];



        for( $i = 0 ; $i < ($iMaxDay + $sStartDay ) ; $i++)
        {
            if( ( $i % 7 ) == 0 )
            {}

            if($i < $sStartDay)
            {

            }else
            {
               foreach($aFeed as $rows)
               {
                    $aEvents[] = array(
                        'start_date' => $rows['dg$when'][0]['startTime']
                    );
               }
            }
        }

        $aData['next_year'] = (int)  $sNextYear;
        $aData['prev_year'] =  (int) $sPrevYear;
        $aData['next_month'] =  (int) $sNextMonth;
        $aData['prev_month'] = (int)  $sPrevMonth;
        $aData['this_month'] = substr($aMonthInfo['month'],0,3) . '.';
        $aData['this_year'] = $aMonthInfo['year'];

        $aData['max_day'] = (int) $iMaxDay;
        $aData['start_day'] = (int) $sStartDay;
        $aData['event_schedule'] = $aEvents;
        return $aData;
    }
}