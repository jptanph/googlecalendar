<?php

require_once('builder/builderInterface.php');

class frontPageGooglecalendar extends Controller_Front
{
    private $_sPrefix;
    protected function run($aArgs)
    {
        $sHtml = "";
        usbuilder()->init($this, $aArgs);
        $this->_sPrefix = $this->Request->getAppID() . '_';
        $iSequence = $this->getSequence();

        $this->_sImagePath = '/_sdk/img/' . $this->Request->getAppID() . '/';
        $sHtml .= "<div class='{$this->_sPrefix}wrapper' id='{$this->_sPrefix}content'></div><div class='event_details'></div><input type='hidden' value='$iSequence' id='{$this->_sPrefix}'>";

        $this->importCss(__CLASS__);
        $this->importJs('jquery.qtip-1.0.0-rc3.min');
        $this->importJs(__CLASS__);

        $this->assign('googlecalendar',$sHtml);
    }
}
