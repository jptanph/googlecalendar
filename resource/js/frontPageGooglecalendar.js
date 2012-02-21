$(document).ready(function(){


    frontPageGooglecalendar.init('','');

});

var frontPageGooglecalendar = {
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
                var iDetailCounter = 0;
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
                                    iTotalEvent = ( value.total_sched == 0 ) ? '' : value.total_sched;
                                    if( value.total_sched > 0)
                                    {   
                                        sEventInfo += "<div class='edetails" + iDetailCounter +"' style='display:none;'>";
                                            $.each(value.event_details,function(ind,val){
                                                sEventInfo += "  <span class='etitle' style='font-size:9px !important'>" + val.title + "</span><br />";    
                                                sEventInfo += " <span style='font-size:9px !important'>" + val.content + "</span><br /><br /><hr size='1' />";
                                            });
                                        sEventInfo +="</div><br />";
                                        iDetailCounter++;
                                    }
                                }
                            });
                                
                            sCalendar += "<td style='background:" + ( ( iTotalEvent != 0 ) ? 'Lavender' : '')  + "'>\n";
                            sCalendar += "  <div style='position:relative;width:100%;'>";
                            if( iTotalEvent > 0 ){
                                sCalendar += "      <div class='testtool' href='#' style='cursor:pointer;position:absolute;right:0;top:0;font-size:8px;margin-right:2px;display:inline-block;color:black;'>" + iTotalEvent + "</div>";                                
                            }
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
                $(".event_details").html(sEventInfo);
                
                $('.testtool').each(function(ind,val){                        
                       $(this).qtip({
                         style: { 
                             background: 'white',
                             textAlign: 'left',
                             border: {
                                 width: 2,
                                 radius: 3,
                                 color: '#CCC'
                              }
                         },
                         content: $('.edetails'+ind).html(),
                         position: { corner: { target: 'center', tooltip: 'bottomLeft' }, adjust: { screen: true } },
                         hide: { fixed: true, delay: 100, effect: { length: 0 } },
                         show: { solo: true, delay: 0, effect: { length: 0 } }
                      });
                })
                
            }            
        }
        
        $.ajax(options);        
    },showEventDetails : function(a){
//        alert($('.testtool').index(a));
//        alert($('.edetails:eq('+$('.testtool').index(a)+')').html())
        //$(".testool").qtip('destroy');
//        $('.testtool:eq('+$('.testtool').index(a)+')').qtip({
//            style: { 
//                background: '#A2D959',
//                width : 200,
//                textAlign: 'center'
//            },
//            content: $('.edetails:eq('+$('.testtool').index(a)+')').html(),
//            position: { corner: { target: 'center', tooltip: 'bottomLeft' }, adjust: { screen: true } },
//            hide: { fixed: true, delay: 100, effect: { length: 0 } },
//            show: { solo: true, delay: 0, effect: { length: 0 } }
//         });
//        
//        return;
    }

}