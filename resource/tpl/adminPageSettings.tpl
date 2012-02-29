<div id="sdk_message_box"></div>

<form method="post" name='<?php echo $sPrefix?>settings_form' class='<?php echo $sPrefix?>settings_form'>
    <input type='hidden' id='seq' name='seq' value='<?php echo $iSequence;?>'>
    <input type='hidden' id="idx" name='idx' value="<?php echo $iIdx;?>">

	<p class="require"><span class="neccesary">*</span> Required</p>
	<br />
	<!-- input area -->
	<table border="1" cellspacing="0" class="table_input_vr">
		<colgroup>
			<col width="210px" />
			<col width="*" />
		</colgroup>
		<tr>
			<th class="padt1"><label for="show_html_value">Feed Url : </label></th>
			<td class="padt1">
                <span class="neccesary"> * </span> <input fw-filter="isFill" fw-label="feed_url"  type='text' name='feed_url' style='width:98%;'id='<?php echo $sPrefix?>feed_url' value='<?php echo $sFeedUrl;?>'>
                <p>Example:
                    <span>http://www.google.com/calendar/feeds/your-email@gmail.com/public/basic.</span>
                </p>
			</td>
		</tr>
		<tr>
			<th><label for="show_html_value">Retrieve events from : </label></th>
			<td>
                <input type='text'  readonly="true" class="fix"  style='width:10%;' id="<?php echo $sPrefix;?>start_date" name="start_date" value='<?php echo $sStartDate;?>'> <label for="<?php echo $sPrefix;?>start_date" class='cp_icon'><a href="#" class='icon_calendar'></a></label>
                 Time :
                 <select id='<?php echo $sPrefix?>start_time' name='start_time'>
                     <option value=''>-select-</option>
                     <?php for($i = 0 ; $i<=23 ;$i++){?>
                         <option id='<?php echo $i;?>' value='<?php echo str_pad($i,2,'0',STR_PAD_LEFT);?>:00' <?php if($i == $iStartTime && $iStartTime !==''){?>selected='selected'<?php }?>><?php echo str_pad($i,2,'0',STR_PAD_LEFT);?>:00</option>
                     <?php }?>
                 </select>
                <span class='error_time' id='error_stime' style='display:none'>Invalid time.</span>

			    <p>
			        The point in time at which to start retrieving events.
			    </p>
			</td>
		</tr>
		<tr>
			<th><label for="show_html_value">Retrieve events until : </label></th>
			<td>
                <input type='text' class="fix"  readonly="true" style='width:10%;' id="<?php echo $sPrefix;?>end_date" name="end_date" value='<?php echo $sEndDate;?>'> <label class='cp_icon'  for="<?php echo $sPrefix;?>end_date"><a href="#" class='icon_calendar'></a></label>
                 Time :
                 <select id='<?php echo $sPrefix?>end_time' name='end_time'>
                     <option value=''>-select-</option>
                     <?php for($i = 0 ; $i<=23 ;$i++){?>
                         <option id='<?php echo $i;?>' value='<?php echo str_pad($i,2,'0',STR_PAD_LEFT);?>:00'  <?php if($i == $iEndTime && $iEndTime !==''){?>selected='selected'<?php }?>><?php echo str_pad($i,2,'0',STR_PAD_LEFT);?>:00</option>
                     <?php }?>
                 </select>
                 <span class='error_time' id='error_etime' style='display:none'>Invalid time.</span>
			    <p>
                    The point in time at which to stop retrieving events.
			    </p>
			</td>
		</tr>

		<tr>
			<th><label for="show_html_value">Maximum number of events to retrieve : </label></th>
			<td>
			    <input type='text' id='<?php echo $sPrefix?>max_event' value='<?php echo $iMaxEvent;?>' name='max_event'>
			    <p>
			        Number of the event you want to show on your page.
			    </p>
			</td>
		</tr>
	</table>
</form>
<div class="tbl_lb_wide_btn">
	<a href="#none" class="btn_apply" title="Save changes"  onclick='adminPageSettings.execSave();'>Save</a>
	<a href="#none" class="add_link" title="Reset to default" onclick='adminPageSettings.execReset();'>Reset to Default</a>
</div>
<div id="color_picker_area"></div>

