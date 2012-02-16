<?php
require_once('builder/builderInterface.php');

class adminExecSave extends Controller_AdminExec
{
    protected function run($aArgs)
    {
        usbuilder()->init($this, $aArgs);
        $sUrlSettings = usbuilder()->getUrl('adminPageSettings');
        $oModel = common()->modelAdmin();
        $aResult = $oModel->execGetSettings();
        $bResult = false;

        if($aResult)
        {
           $bResult = $oModel->execUpdate($aArgs);
        }
        else
        {
           $bResult =  $oModel->execSave($aArgs);
        }

       if($bResult===false){
            usbuilder()->message('Saved failed!', 'warning');
        }else{
            usbuilder()->message('Saved succesfully!', 'success');
        }
        $sJsMove = usbuilder()->jsMove($sUrlSettings);
    }
}