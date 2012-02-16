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
        usbuilder()->getFormAction($this->_sPrefix . 'settings_form','adminExecSave');
        usbuilder()->validator(array('form' => $this->_sPrefix . 'settings_form'));

        $aResult = common()->modelAdmin()->execGetSettings();

        $this->assign('sPrefix',$this->_sPrefix);
        $this->assign('sImagePath',$this->_sImagePath);

        /** for settings value.**/
        $this->assign('iIdx',$aResult['idx']);
        $this->assign('sFeedUrl',$aResult['feed_url']);
        $this->assign('sStartDate',$aResult['start_date']);
        $this->assign('sEndDate',$aResult['end_date']);
        $this->assign('iMaxEvent',$aResult['max_event']);
        $this->assign('sEventStyle',$aResult['event_style']);
        /** for settings value.**/

        $this->importCss(__CLASS__);
        $this->importCss('jqueryCalendar');
        $this->importJs('jqueryCalendar');
        $this->importJs(__CLASS__);
        $this->view(__CLASS__);
    }
}