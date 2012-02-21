$(document).ready(function(){
    
    frontPageGooglecalendar.init('','');

});

var frontPageGooglecalendar = {
    init : function(iMonth,iYear){
        var sCalendar = "";
        var aDays = ['S','M','T','W','T','F','S'];
        var aDaysTitle = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        
        var data;
        $('.left,.right').css({'visibility':'hidden'});
        var options = {
            url : usbuilder.getUrl('apiFrontCalendarData'),
            dataType : 'json',
            type : 'post',
            data : {
                month : iMonth,
                year : iYear
            },success : function(server_response){
                data = server_response.Data;
                
                console.log(data.event_info);
                
                total_days = data.start_day + data.max_day;
                start_day = data.start_day;
                max_day = data.max_day;         
                
                next_year = data.next_year;
                prev_year = data.prev_year;
                
                next_month = data.next_month
                prev_month = data.prev_month;
                
                this_month = data.this_month;
                this_year = data.this_year;
                this_month_num = data.this_month_num;
                
                sCalendar += "<div class='googlecalendar_navs'>";
                sCalendar +="   <ul>";
                sCalendar +="     <li><a href='#' class='left' id='left' onclick='frontPageGooglecalendar.init(" + prev_month + "," + prev_year + ")'>&laquo;</a></li>";
                sCalendar +="     <li ><center>" + this_month + " " + this_year + "</center></li>";
                sCalendar +="     <li><a href='#' class='right' onclick='frontPageGooglecalendar.init(" + next_month + "," + next_year + ")'>&raquo;</a></li>";
                sCalendar +="   </ul>";
                sCalendar += "</div>";
                sCalendar += "<table class='googlecalendar_calendar'>";
                sCalendar += "<thead>";
                sCalendar += "<tr>";
                    for(i = 0 ; i < aDays.length ; i++){
                        sCalendar += "<th title='" + aDaysTitle[i] + "'>";
                            sCalendar += aDays[i];
                        sCalendar += "</th>";
                        
                    }
                sCalendar += "</tr>";
                sCalendar += "</thead>";
                sCalendar += "<tbody>";
                
                var iTotalEvent;
                var sMonth = ( this_month_num > 9 ) ? this_month_num : '0'+this_month_num;
                var sYearMonth = this_year+'-'+ sMonth+'-';
               

                    for( i = 0 ; i < total_days ; i++ )
                    {
                        if ( ( i % 7 ) == 0 ) {
                            sCalendar += "<tr>\n";
                        }
                        
                        if ( i < start_day )
                        {
                            sCalendar += "<td>&nbsp;</td>\n";
                        }
                        else
                        {   
                            sLoopDate = ( ( i - start_day + 1 ) < 10 ) ?"0"+( i - start_day + 1 ) : ( i - start_day + 1 )
                            $.each(data.event_info,function(index,value){
                                sThisDate = sYearMonth+sLoopDate;

                                if(value.loop_date == sThisDate)
                                {
                                    iTotalEvent = value.total_sched;
                                }
                            });

                            sCalendar += "<td style='background:" + ( ( iTotalEvent != 0 ) ? 'gray' : '')  + "'><a href='#none'>" + ( i - start_day + 1 ) + " </a> <span>" + iTotalEvent + "</span></td>\n";                                                            
                        }
                        
                        if ( ( i % 7 ) == 6 )
                        {
                            sCalendar += "</tr>\n";
                        }
                    }
                
                sCalendar += "</tbody>";                
                sCalendar += "</table>";
                $("#googlecalendar_content").html(sCalendar);
                
            }            
        }
        
        $.ajax(options);        
    }
}