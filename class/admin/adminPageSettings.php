<?php
require_once('builder/builderInterface.php');
require_once('gcParser.php');

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

        $aResult = common()->modelAdmin()->execGetSettings($aArgs);
        $this->assign('sPrefix',$this->_sPrefix);
        $this->assign('sImagePath',$this->_sImagePath);

        /** for settings value.**/
        $this->assign('iSequence',$aArgs['seq']);
        $this->assign('iIdx',$aResult['idx']);
        $this->assign('sFeedUrl',ltrim($aResult['feed_url']));
        $this->assign('sStartDate',($aResult['ut_startdate'] > 0) ? $aResult['sdate'] : '' );
        $this->assign('sEndDate',($aResult['ut_enddate'] > 0) ? $aResult['edate'] : '');
        $this->assign('iStartTime',($aResult['ut_enddate'] > 0) ? $aResult['start_time'] : '');
        $this->assign('iEndTime',($aResult['ut_enddate'] > 0) ? $aResult['end_time'] : '');

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