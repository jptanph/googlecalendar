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
        $this->_sImagePath = '/_sdk/img/' . $this->Request->getAppID() . '/';
        $sHtml .= "<div class='{$this->_sPrefix}wrapper' id='{$this->_sPrefix}content'></div><div class='texthere'>asdasdasd</div>";

        $this->importCss(__CLASS__);
        $this->importJs(__CLASS__);
        $this->assign('googlecalendar',$sHtml);
    }
}