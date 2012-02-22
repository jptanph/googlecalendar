$(document).ready(function(){


    frontPageGooglecalendar.init('','');

});

var frontPageGooglecalendar = {
    aLoopDate : [],
    init : function(iMonth,iYear){
        var sCalendar = "";
        var sEventInfo = "";
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
                
               //console.log(data.event_info);
                
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
                sCalendar +="     <li><a href='#' title='prebv' id='testtools' class='left' onclick='frontPageGooglecalendar.init(" + prev_month + "," + prev_year + ")'>&laquo;</a></li>";
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
                frontPageGooglecalendar.aLoopDate.length = 0;

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
                            
                            sLoopDate = ( ( i - start_day + 1 ) < 10 ) ?"0"+( i - start_day + 1 ) : ( i - start_day + 1 );
                            sThisDate = sYearMonth+sLoopDate;
                            frontPageGooglecalendar.aLoopDate.push(sThisDate);
                             
                            
                                
                            sCalendar += "<td style='background:" + ( ( iTotalEvent != 0 ) ? 'Lavender' : '')  + "'>\n";
                            sCalendar += "  <div style='position:relative;width:100%;'>";
                            sCalendar += "      <div id='google_calendar_event_only" +( i - start_day + 1 ) + "'style='cursor:pointer;position:absolute;right:0;top:0;font-size:8px;margin-right:2px;display:inline-block;color:black;'></div>";                                
                            sCalendar += "      <div style='margin:9px 0 9px 0;display:inline-block'>" + ( i - start_day + 1 ) + "</div>";
                            sCalendar += "  </div>";
                            sCalendar += "</td>\n";                                                            
                            
                        }
                        
                        if ( ( i % 7 ) == 6 )
                        {
                            sCalendar += "</tr>\n";
                        }
                    }
                
                sCalendar += "</tbody>";                
                sCalendar += "</table>";
                $("#googlecalendar_content").html(sCalendar);
                frontPageGooglecalendar.execEventDetails(data.event_info);
                frontPageGooglecalendar.execQtip();
                
            }            
        }
        
        $.ajax(options);        
    },execQtip : function(){
        $('.googlecalendar_event_count').each(function(ind,val){     
           var sHtml = $('#googlecalendar_event_wrapper'+(ind+1)).html();

            $(this).qtip({
              style: { 
                  padding : 0,
                  background: 'white',
                  textAlign: 'left',
                  border: {
                      width :2,
                      radius: 3,
                      color: '#CCC'
                   }
              },
              content: sHtml,
              position: { corner: { target: 'center', tooltip: 'bottomLeft' }, adjust: { screen: true } },
              hide: { fixed: true, delay: 100, effect: { length: 0 } },
              show: { solo: true, delay: 0, effect: { length: 0 } }
               });
        });
    },execEventDetails : function(data){
        console.log(data);
        var sEventInfo = "";
        var iTotalEvent = 0;
        j = this.aLoopDate.length
        if(data){
            for( i = 1 ; i <= j ; i++ ){
                
                $.each(data,function(index,value){
                   if(value.event_details){
                       if(frontPageGooglecalendar.aLoopDate[i] == value.loop_date){                 
                           sEventInfo += "<div id='googlecalendar_event_wrapper" + i + "' style='display:none;padding:0 !important;'>\n";
                           
                           sEventInfo += "  <div class='googlecalendar_event_wrapper'>\n";
                           iTotalEvent = value.total_sched;
                          
                           $.each(value.event_details,function(ind,val){
                               sEventInfo += "  <div class='googlecalendar_event_container'>\n";
                               sEventInfo += "      <div class='googlecalendar_event_title'><h2>" + val.title + "</h2></div>\n";
                               sEventInfo += (val.start_time=='') ? '' : "      <p class='googlecalendar_event_content'><span class='googlecalendar_label'>Start : </span><span class='googlecalendar_info'>" + val.start_time +  " </span></p>\n";
                               sEventInfo += (val.end_time=='') ? '' : "      <p class='googlecalendar_event_content'><span class='googlecalendar_label'>End : </span><span class='googlecalendar_info'>" + val.end_time + "</span></p>\n";
                               sEventInfo += (val.location=='') ? '' : "      <p class='googlecalendar_event_content'><span class='googlecalendar_label'>Location : </span><span class='googlecalendar_info'>" + val.location + "</span></p>\n";
                               sEventInfo += (val.content=='') ? '' : "      <p class='googlecalendar_event_content'><span class='googlecalendar_label'>Description : </span><span class='googlecalendar_info'>" + val.content + "</span></p>\n";
                               sEventInfo += "      <p class='googlecalendar_event_content'><a href='#'>See more details..</a></p>\n";
                               sEventInfo += "  </div>\n";
                               
                           });
                           $("#google_calendar_event_only"+i).html(iTotalEvent).addClass('googlecalendar_event_count');
                           sEventInfo += "  </div>\n";                           
                           sEventInfo += "</div>\n";
                       }

                   }
                });
            }
            $(".event_details").html(sEventInfo);
            
        }
       
    }

}