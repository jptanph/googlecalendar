<?php
require_once('builder/builderInterface.php');

class adminPageSettings extends Controller_Admin
{
    protected function run($aArgs)
    {
        usbuilder()->init($this, $aArgs);
        usbuilder()->vd('asd');
    }
}