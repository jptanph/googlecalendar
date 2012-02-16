<?php
require_once('builder/builderInterface.php');

class adminPageSettings extends Controller_Admin
{
    private $_sPrefix;
    private $_sImagePath;

    protected function run($aArgs)
    {
        usbuilder()->init($this, $aArgs);
        $this->_sPrefix = $this->Request->getAppID() . '_';
        $this->_sImagePath = '/_sdk/img/' . $this->Request->getAppID() . '/';
        $this->assign('sPrefix',$this->_sPrefix);
        $this->assign('sImagePath',$this->_sImagePath);
        $this->view(__CLASS__);
    }
}