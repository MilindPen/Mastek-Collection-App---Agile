var dashboard = {
	/***************************************mapping the day with date of the current week************************************************/	
    mapDateDay: function(){
        //determining todays day and date
        var todaysDay = Date.today().getDayName();
        dataStorage.setData(TODAYS_DAY,todaysDay);
        var todaysDate=Date.today();
        todaysDate = todaysDate.toString().split(" ");
        dataStorage.setData(TODAYS_DATE,todaysDate[2]);
        todaysDate = todaysDate[2]+"-"+todaysDate[1]+"-"+todaysDate[3];
        
        var prevDays;
        var nextDays;
        var todaysDayId;
        
        //call function to get the previous and next days according to todays day in the current week
        var weekDays = common.calcWeekDays();
        
        prevDays = weekDays[0];
        nextDays = weekDays[1];
        todaysDayId = prevDays;
        
        $('span#day'+todaysDayId).removeClass('counter');
        $('span#day'+todaysDayId).addClass('counterSelected');
        
        //populate previous days
        var subDays;
        var formattedPrevDays;
        var prevDates;
        var days;
        var dayId=0;
        for(i=prevDays;i>0;i--){
            days=(0-i);
            dayId=prevDays-i;
            subDays=Date.today().add(days).days();
            subDays = subDays.toString().split(" ");
            prevDates = subDays[3]+"-"+subDays[1]+"-"+subDays[2];
            formattedPrevDays = formatDate.reverseDateFormatter(prevDates);
            $('span#hidden_day'+dayId).text(formattedPrevDays);
        }
        
        //populate today
        if(prevDays==0){
            dayId=dayId;
        }
        else{
            dayId=dayId+1;
        }
        var dateArray;
        var getToday=Date.today();
        var today = getToday.toString().split(" ");
        today = today[3]+"-"+today[1]+"-"+today[2];
        var formattedDayZero = formatDate.reverseDateFormatter(today);
        $('span#hidden_day'+dayId).text(formattedDayZero);
        
        //populate next days
        var addDays;
        var formattedNxtDays;
        var nextDates;
        for(i=1;i<=nextDays;i++){
            addDays=Date.today().add(i).days();
            addDays = addDays.toString().split(" ");
            nextDates = addDays[3]+"-"+addDays[1]+"-"+addDays[2];
            formattedNxtDays = formatDate.reverseDateFormatter(nextDates);
            $('span#hidden_day'+(dayId+i)).text(formattedNxtDays);
        }
    },
    setAndRedirect: function(selectedDate,weekDay){
        dataStorage.setData(SELECTED_VISIT_DATE,selectedDate);
        dataStorage.setData(SELECTED_VISIT_DAY,weekDay);
        common.redirect('scheduledCustomers.html');
    }
};

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    
	dataStorage.setData(IS_WEEKLY_VIEW,"");
	//call function
	dashboard.mapDateDay(); 
	
    var selectedDate;
    $('span#day0').on('click',function(){
           selectedDate = $('span#hidden_day0').text();
           dashboard.setAndRedirect(selectedDate,week.DAY0);
    });
    $('span#day1').on('click',function(){
           selectedDate = $('span#hidden_day1').text();
           dashboard.setAndRedirect(selectedDate,week.DAY1);
    });
    $('span#day2').on('click',function(){
           selectedDate = $('span#hidden_day2').text();
           dashboard.setAndRedirect(selectedDate,week.DAY2);
    });
    $('span#day3').on('click',function(){
           selectedDate = $('span#hidden_day3').text();
           dashboard.setAndRedirect(selectedDate,week.DAY3);
    });
    $('span#day4').on('click',function(){
           selectedDate = $('span#hidden_day4').text();
           dashboard.setAndRedirect(selectedDate,week.DAY4);
    });
    $('span#day5').on('click',function(){
           selectedDate = $('span#hidden_day5').text();
           dashboard.setAndRedirect(selectedDate,week.DAY5);
    });
    $('span#day6').on('click',function(){
           selectedDate = $('span#hidden_day6').text();
           dashboard.setAndRedirect(selectedDate,week.DAY6);
    });
    
    //Weekly View
    $('.weeklyView').on('click',function(){
    	dataStorage.setData(IS_WEEKLY_VIEW,"1");
    	common.redirect('scheduledCustomers.html');
    	$('div.weeklyCollapsible').hide();
    });
    
});