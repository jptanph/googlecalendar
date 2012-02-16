<form method="post">
<!-- message box -->
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
                <span class="neccesary"> * </span> <input type='text' name=''>
                <p>Example: <br />
                    <span>http://www.google.com/calendar/feeds/your-email@gmail.com/public/basic.</span>
                </p>
			</td>
		</tr>
		<tr>
			<th><label for="show_html_value">Retrieve events from : </label></th>
			<td>
				<select>
				    <option>NOW</option>
				    <option>00:00 today</option>
				    <option>Start of current week</option>
				    <option>Start of current month</option>
				    <option>End of current Month</option>
				    <option>The beginning of time</option>
				    <option>Specific date / time</option>
			    </select>
			    <p>
			        The point in time at which to start retrieving events.
			    </p>
			</td>
		</tr>
		<tr>
			<th><label for="show_html_value">Retrieve events until : </label></th>
			<td>
				<select>
				    <option>NOW</option>
				    <option>00:00 today</option>
				    <option>Start of current week</option>
				    <option>Start of current month</option>
				    <option>End of current Month</option>
				    <option>The beginning of time</option>
				    <option>Specific date / time</option>
			    </select>
			    <p>
                    The point in time at which to stop retrieving events.
			    </p>
			</td>
		</tr>

		<tr>
			<th><label for="show_html_value">Maximum number of events to retrieve : </label></th>
			<td>
			    <input type='text'>
			    <p>
			        Number of the event you want to show on your page.
			    </p>
			</td>
		</tr>

		<tr>
			<th><label for="show_html_value">Date format : </label></th>
			<td>
			    <input type='text'>
			</td>
		</tr>

		<tr>
			<th><label for="show_html_value">Time format : </label></th>
			<td>
			    <input type='text'>
			</td>
		</tr>

		<tr>
			<th><label for="show_html_value">Event Display Editor : </label></th>
			<td>
			    <textarea style='resize:none;height:100px;padding:10px'></textarea>
			    <p>
			        You can customized the appearance of the calendar event.
			    </p>
			</td>
		</tr>
	</table>
</form>
<div class="tbl_lb_wide_btn">
	<a href="#none" class="btn_apply" title="Save changes" >Save</a>
	<a href="#none" class="add_link" title="Reset to default">Reset to Default</a>
</div>
<div id="color_picker_area">
</div>

