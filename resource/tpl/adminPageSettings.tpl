<div id="sdk_message_box"></div>

<form method="post" name='<?php echo $sPrefix?>settings_form' class='<?php echo $sPrefix?>settings_form'>
    <input type='hidden' id="idx" name='idx' value="<?php echo $iIdx;?>">
	<p class="require"><span class="neccesary">*</span> Required</p>
	<br />
	<!-- input area -->
	<table border="1" cellspacing="0" class="table_input_vr">
		<colgroup>
			<col width="220px" />
			<col width="*" />
		</colgroup>
		<tr>
			<th class="padt1"><label for="show_html_value">Feed Url : </label></th>
			<td class="padt1">
                <span class="neccesary"> * </span> <input fw-filter="isFill" fw-label="feed_url"  type='text' name='feed_url' id='<?php echo $sPrefix?>feed_url' value='<?php echo $sFeedUrl;?>'>
                <p>Example: <br />
                    <span>http://www.google.com/calendar/feeds/your-email@gmail.com/public/basic.</span>
                </p>
			</td>
		</tr>
		<tr>
			<th><label for="show_html_value">Retrieve events from : </label></th>
			<td>
                <input type='text'  readonly="true" class="fix" id="<?php echo $sPrefix;?>start_date" name="start_date" value='<?php echo $sStartDate;?>'> <label for="<?php echo $sPrefix;?>start_date" class='cp_icon'><a href="#" class='icon_calendar'></a></label>
			    <p>
			        The point in time at which to start retrieving events.
			    </p>
			</td>
		</tr>
		<tr>
			<th><label for="show_html_value">Retrieve events until : </label></th>
			<td>
                <input type='text' class="fix"  readonly="true"   id="<?php echo $sPrefix;?>end_date" name="end_date" value='<?php echo $sEndDate;?>'> <label class='cp_icon'  for="<?php echo $sPrefix;?>end_date"><a href="#" class='icon_calendar'></a></label>
			    <p>
                    The point in time at which to stop retrieving events.
			    </p>
			</td>
		</tr>

		<tr>
			<th><label for="show_html_value">Maximum number of events to retrieve : </label></th>
			<td>
			    <input type='text' value='<?php echo $iMaxEvent;?>' name='max_event'>
			    <p>
			        Number of the event you want to show on your page.
			    </p>
			</td>
		</tr>
		<tr>
			<th><label for="show_html_value">Event Display Editor : </label></th>
			<td>
			    <textarea style='resize:none;height:100px;padding:6px' name='event_style'><?php echo $sEventStyle;?></textarea>
			    <p>
			        You can customized the appearance of the calendar event.
			    </p>
			</td>
		</tr>
	</table>
</form>
<div class="tbl_lb_wide_btn">
	<a href="#none" class="btn_apply" title="Save changes"  onclick='adminPageSettings.execSave();'>Save</a>
	<a href="#none" class="add_link" title="Reset to default">Reset to Default</a>
</div>
<div id="color_picker_area">
</div>

