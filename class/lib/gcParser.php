<?php

/**
 * Google Calendar Feed Parser Class
 * Parse the the google calendar feed and return the result.
 * @package   builder
 * @author    author_name <john@simplexi.com.ph>
 * @version    1.0
 */

class gcParser
{
    private $_sFeedUrl;
    private $_sStartTime;
    private $_sEndTime;
    private $_iMaxEvent;

    public function __construct()
    {
        /** class constructor.**/
    }

    public function init()
    {
        $aData = array();
        $sFeedUrl = $this->_feedUrlConstructor();
        $oGcJson = $this->_getCurlRequest($sFeedUrl);
        $aJson = json_decode($oGcJson,TRUE);
        $aFeed = $aJson['feed']['entry'];

        foreach($aFeed as $rows)
        {
            $aData[] = array(
                'title' => $rows['title'],
                'content' => $rows['content'],
                'link' => $rows['link'],
                'where' => $rows['gd$where'],
                'when' => $rows['gd$when'],
                'calid' => $rows['gCal$uid'],
            );
        }

        return $aData;
    }

    public function setFeedUrl($sFeedUrl)
    {
        $this->_sFeedUrl = $sFeedUrl;
    }

    public function setStartTime($sStartTime)
    {
        $this->_sStartTime = $sStartTime;
    }

    public function sEndTime($sEndTime)
    {
        $this->_sEndTime = $sEndTime;
    }

    private function _getCurlRequest( $sUrl , $param = null)
    {
        $cl = curl_init();
        $opts[CURLOPT_RETURNTRANSFER] = 1;
        $opts[CURLOPT_URL] = $sUrl;

        if(is_null($param) === false)
        {
            $opts[CURLOPT_POST] = true;
            $opts[CURLOPT_POSTFIELDS] = $param;
        }
        curl_setopt_array($cl, $opts);
        curl_setopt($cl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($cl, CURLOPT_SSL_VERIFYHOST, 2);

        return curl_exec($cl);
    }

    private function _feedUrlConstructor()
    {
        $sGcParam = "&fields=entry(title,link[@rel='alternate'],content,gd:where,gd:when,gCal:uid)";
        $sFeedEntry = "?alt=json&singleevents=true&sortorder=ascending&orderby=starttime&max-results=25";
        $sQryParams = $sFeedEntry . $sGcParam;

        $aParseUrl = parse_url ( $this->_sFeedUrl );
        $sUrlEntry = ( substr ( $aParseUrl['path'] , 0 , strrpos($aParseUrl['path'], '/') ) ) . '/full-noattendees';

        $sFeedConstructor =$aParseUrl['scheme'] . '://' . $aParseUrl['host'] . $sUrlEntry . $sQryParams;
        return $sFeedConstructor;
    }

}