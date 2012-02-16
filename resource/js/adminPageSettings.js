$(document).ready(function(){
    calendar_options = { 'years_between' : [2000,2030],'format' : 'yyyy/mm/dd' };
    $("#googlecalendar_start_date, #googlecalendar_end_date").BuilderCalendar(calendar_options);
});

var adminPageSettings = {
        
    execSave : function(){
        if(oValidator.formName.getMessage('googlecalendar_settings_form')){
            document.googlecalendar_settings_form.submit();
        }   
    }
}