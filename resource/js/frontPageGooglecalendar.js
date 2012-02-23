$(document).ready(function(){
    frontPageGooglecalendar.init('','');
});

var frontPageGooglecalendar = {
    aLoopDate : [],
    init : function(iMonth,iYear){
        var sCalendar = "";
        var sEventInfo = "";
        var sToday = "";
        var aDays = ['S','M','T','W','T','F','S'];
        var aDaysTitle = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        
        var data;
        $('.left,.right').css({'visibility':'hidden'});
        $('.googlecalendar_event_count').qtip('hide');
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
                
               today =  data.today;
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
                sCalendar +="     <li><a href='#none' title='prebv' id='testtools' class='left' onclick='frontPageGooglecalendar.init(" + prev_month + "," + prev_year + ")'>&laquo;</a></li>";
                sCalendar +="     <li ><center>" + this_month + " " + this_year + "</center></li>";
                sCalendar +="     <li><a href='#none' class='right' onclick='frontPageGooglecalendar.init(" + next_month + "," + next_year + ")'>&raquo;</a></li>";
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
                var iTotalEvent = 0;
                var sBackground = 'white';
                var sColor = 'gray';
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
                            if(data.event_info){
                                
                                $.each(data.event_info,function(index,value){
                                    sThisDate = sYearMonth+sLoopDate;
                                       
                                        if(sThisDate == value.loop_date){  
                                            iTotalEvent = ( value.total_sched == 0 ) ? 0 : value.total_sched;
                                            
                                            
                                            if(iTotalEvent > 0 ){
                                            sEventInfo += "<div id='googlecalendar_event_wrapper" + ( i - start_day + 1 ) + "' style='display:none;padding:0 !important;'>\n";
                                            sEventInfo += "  <div class='googlecalendar_event_close' onclick='frontPageGooglecalendar.hideList(" + ( i - start_day + 1 ) +");' title='Close Dialog'></div>\n";
                                            sEventInfo += "  <div class='googlecalendar_event_wrapper' id='googlecalendar_list_scroll" + ( i - start_day + 1 ) + "' " + ( (iTotalEvent >= 3) ? "style='height:255px;overflow:auto;overflow-x:hidden;'" : '' )+ ">\n";
                                              
                                                 $.each(value.event_details,function(ind,val){
                                                    sEventInfo += "  <div class='googlecalendar_event_container'>\n";
                                                    sEventInfo += "      <div class='googlecalendar_event_title'><h2>Title : " + ((val.title=='') ? '(No title)' : val.title ) + "</h2></div>\n";
                                                    sEventInfo += (val.start_time=='') ? '' : "      <p class='googlecalendar_event_content'><span class='googlecalendar_label'>Start : </span><span class='googlecalendar_info'>" + val.start_time +  " </span></p>\n";
                                                    sEventInfo += (val.end_time=='') ? '' : "      <p class='googlecalendar_event_content'><span class='googlecalendar_label'>End : </span><span class='googlecalendar_info'>" + val.end_time + "</span></p>\n";
                                                    sEventInfo += (val.location=='') ? '' : "      <p class='googlecalendar_event_content'><span class='googlecalendar_label'>Location : </span><span class='googlecalendar_info'>" + val.location + "</span></p>\n";
                                                    sEventInfo += (val.content=='') ? '' : "      <p class='googlecalendar_event_content'><span class='googlecalendar_label'>Description : </span><span class='googlecalendar_info'>" + val.content + "</span></p>\n";
                                                    sEventInfo += "      <p class='googlecalendar_event_content'><a target='_blank' href='" + val.event_link + "'>See more details..</a></p>\n";
                                                    sEventInfo += "  </div>\n";                                   
                                                });
                                           }
                                            sEventInfo += "  </div>\n";                           
                                            sEventInfo += "</div>\n";
                                            
                                        }
                                 });
                            }
                            
                            if(iTotalEvent > 0){
                                sBackground = "white";
                            }else if(iTotalEvent==0){
                                sBackground = "white";
                                
                            }
                            
                            if(sThisDate == today){
                                sBackground = '#CCC';
                                sColor = "gray";
                            }else{
                                sColor = "gray";                                
                            }
                            
                            sCalendar += "<td align='center'>\n";
                            sCalendar += "<div class='googlecalendar_count_container' style='background:" + sBackground + ";'>";
                            
                            if(iTotalEvent > 0){
                                sCalendar += "  <span id='google_calendar_event_only" +( i - start_day + 1 ) + "' class='googlecalendar_event_count'>" +iTotalEvent+ "</span>";
                            }
                              sCalendar += "<span class='googlecalendar_days' style='color:" + sColor + "'>" + ( i - start_day + 1 ) + "</span>";
                            sCalendar += "</div>";
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
                $(".event_details").html(sEventInfo);
                frontPageGooglecalendar.execQtip();
                
            }            
        }
        
        $.ajax(options);        
    },execQtip : function(){

        $('.googlecalendar_event_count').each(function(ind,val){
           sId =  this.id;
           iId = sId.replace('google_calendar_event_only','');
           
           sHtml = $('#googlecalendar_event_wrapper'+$.trim(iId)).html();
           
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
              hide: { fixed: true, effect: { length: 0 },when : {event : 'click'} },
              show: { solo: true, delay: 0, effect: { length: 0 },when : {event : 'click'} }
               });
        });
    },execEventDetails : function(data){
        console.log(data);
        var sEventInfo = "";
        var iTotalEvent = 0;
        var j = this.aLoopDate.length
        if(data){
            for( i = 0 ; i <= j ; i++ ){

                $.each(data,function(index,value){
                   if(value.event_details){
                      
                       if(frontPageGooglecalendar.aLoopDate[i] == value.loop_date){                 
                           iTotalEvent = ( value.total_sched == 0 ) ? '' : value.total_sched;
                           sEventInfo += "<div id='googlecalendar_event_wrapper" + i + "' style='display:none;padding:0 !important;'>\n";
                           sEventInfo += "  <div class='googlecalendar_event_wrapper'>\n";
                           sEventInfo += "  <div class='googlecalendar_event_close'>asdasdasdasdasdasdasdf</div>\n";
                           
                           if(iTotalEvent > 0 ){
                              
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
                          }
                           sEventInfo += "  </div>\n";                           
                           sEventInfo += "</div>\n";
                       }

                   }
                  
                });
                $("#google_calendar_event_only"+i).html(iTotalEvent).addClass('googlecalendar_event_count');
            }
            $(".event_details").html(sEventInfo);
            
        }
       
    },hideList : function(id){
       $('.googlecalendar_event_count').qtip('hide');
    }

}