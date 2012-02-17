$(document).ready(function(){
    calendar_options = { 'years_between' : [2000,2030],'format' : 'yyyy/mm/dd' };
    $("#googlecalendar_start_date, #googlecalendar_end_date").BuilderCalendar(calendar_options);
});

var adminPageSettings = {
        
    execSave : function(){
        if(oValidator.formName.getMessage('googlecalendar_settings_form')){
            document.googlecalendar_settings_form.submit();
        }   
    },execReset : function(){
        $("#googlecalendar_feed_url").val('');
        $("#googlecalendar_start_date").val('');
        $("#googlecalendar_end_date").val('');
        $("select#googlecalendar_start_time").val('00:00');
        $("select#googlecalendar_end_time").val('00:00');
        $("#googlecalendar_max_event").val('');
        $("#googlecalendar_event_style").val('');
    }
}