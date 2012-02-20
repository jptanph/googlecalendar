<?php

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
}