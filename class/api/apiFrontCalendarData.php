<?php
require_once('builder/builderInterface.php');
require_once('gcParser.php');

class apiFrontCalendarData extends Controller_Api
{
    private $_sEndTime;
    public function post($aArgs)
    {
        usbuilder()->init($this, $aArgs);
        $aData = array();
        $aEvent = array();

        $oGcParser = new gcParser();

        $aResult = common()->modelFront()->execGetSettings();
        $this->_sEndTime = $aResult['ut_enddate'];
        $oGcParser->setMaxResult($aResult['max_event']);
        $oGcParser->setStartTime($aResult['ut_startdate']);
        $oGcParser->setEndTime($aResult['ut_enddate']);
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
        $sMonth = str_pad( $aMonthInfo['mon'] , 2 , '0' , STR_PAD_LEFT );
        $sYear = $aMonthInfo['year'];
        $sYearMonth = $sYear . '-' . $sMonth . '-';
        $iTotalEvent = 0;

        for( $i = 0 ; $i < ($iMaxDay + $sStartDay ) ; $i++)
        {
            if( ( $i % 7 ) == 0 )
            {}

            if($i < $sStartDay)
            {

            }
            else
            {
                $iDay = ( $i - $sStartDay + 1 );
                $sCurrentDate = $sYearMonth . str_pad( $iDay , 2 , '0' , STR_PAD_LEFT );
                $aEventInfo = $this->_tempArrayEventDb($aFeed,$sCurrentDate);
                $aEvent[] = array('loop_date'=>$sCurrentDate,'total_sched' => $aEventInfo['total_event'],'event_details' => $aEventInfo['event_details']);
            }
        }

        $aData['next_year'] = (int)  $sNextYear;
        $aData['prev_year'] =  (int) $sPrevYear;
        $aData['next_month'] =  (int) $sNextMonth;
        $aData['prev_month'] = (int)  $sPrevMonth;
        $aData['this_month'] = substr($aMonthInfo['month'],0,3) . '.';
        $aData['this_year'] = $aMonthInfo['year'];
        $aData['this_month_num'] = $aMonthInfo['mon'];

        $aData['max_day'] = (int) $iMaxDay;
        $aData['start_day'] = (int) $sStartDay;
        $aData['event_info'] = $aEvent;
        return $aData;
    }

    private function _tempArrayEventDb($aFeed,$sCurrentDate)
    {
        $iTotal = 0;
        $aData = array();

        foreach($aFeed as $rows)
        {
            $sCheckEndTime = date('g:i a', $rows['end_time']);

            $sEndTime = $rows['end_time'];

            if($sCheckEndTime == '12:00 am')
            {
                $sEndTime = ( $sEndTime - 86400 );
            }

           if(date('Y-m-d', $rows['start_time']) <= $sCurrentDate && date('Y-m-d', $sEndTime) >= $sCurrentDate && date('Y-m-d', $this->_sEndTime)>=$sCurrentDate)
           {
               $aData['total_event'] += 1 ;
               $aData['event_details'][] = array(
                   'title' => $rows['title'],
                   'content' => $rows['content'],
                   'event_link' => $rows['event_link']
               );
           }
           else
           {
               $aData['total_event'] += 0 ;
           }
        }
        return $aData;
    }
}