<?php

function req( $url , $param = null)
{
	$cl = curl_init();
	$opts[CURLOPT_RETURNTRANSFER] = 1;
	$opts[CURLOPT_URL] = $url;

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

