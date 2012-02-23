$(document).ready(function(){
    calendar_options = { 'years_between' : [2000,2030],'format' : 'yyyy/mm/dd' };
    $("#googlecalendar_start_date, #googlecalendar_end_date").BuilderCalendar(calendar_options);
});

var adminPageSettings = {
        
    execSave : function(){
        var start_date = $("#googlecalendar_start_date");
        var start_time = $("#googlecalendar_start_time");
        var end_date = $("#googlecalendar_end_date");
        var end_time = $("#googlecalendar_end_time");
        var error = 0;
        
        var sdatetime = start_date.val() + ' '+start_time.val() + ':00';
        var edatetime = end_date.val() + ' '+ end_time.val() + ':00';
        
        var stime = start_time.val().substr(0,2);
        var etime = end_time.val().substr(0,2);

        stime = parseInt(stime);
        etime = parseInt(etime);

        
        if(isNaN(stime)==true){
            $('#error_stime').show();
            error += 1;
        }else{
            $('#error_stime').hide();            
        }
        if(isNaN(etime)==true){
            $('#error_etime').show();
            error += 1;
        }else{
            $('#error_etime').hide();            
        }
        
        if(Date.parse(sdatetime) > Date.parse(edatetime)){
            start_date.css({'border':'solid 2px #DC4E22'});
            end_date.css({'border':'solid 2px #DC4E22'});      
            error += 1;
            
            if(stime > etime){
                $('.error_time').show();
                error += 1;
            }else{
                $('.error_time').hide();
            }
            
        }else{
            start_date.css({'border':'solid 1px #CCC'});
            end_date.css({'border':'solid 1px #CCC'});            
        }
        
        if(error == 0 && oValidator.formName.getMessage('googlecalendar_settings_form')){
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