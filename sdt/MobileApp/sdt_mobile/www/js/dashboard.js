var rowCount;
var dailyCallsClosed, dailyTargetCalls, dailyCardPayments, dailyPreviousDayCF, dailyTermCollections, dailyOtherCollections, dailyLoansIssued, dailyFloatWithdrawn, dailyCashBanked, dailyOther, dailyBalance, dailyRefund;
var weeklyCallsClosed, weeklyTargetCalls, weeklyCardPayments, weeklyPreviousDayCF, weeklyTermCollections, weeklyOtherCollections, weeklyLoansIssued, weeklyFloatWithdrawn, weeklyCashBanked, weeklyOther, weeklyBalance, weeklyRefund, weekClosureCollections;
var selectedUserId = dataStorage.getData(USER_ID);
var selectedJourneyId = dataStorage.getData(JOURNEY_ID);
var weekStartDate = dataStorage.getData(WEEK_START_DATE);
var weekEndDate = dataStorage.getData(WEEK_END_DATE);

var selectedBalanceType;
var hashMap1 = new HashMap();
var dailyBalanceArray=[];
var todaysDate,splitTodaysDate,formattedTodaysDate;
var noVisitsForJourney=0;

var dashboard = {
	/***************************************mapping the day with date of the current week************************************************/	
    mapDateDay: function(){
    	todaysDate=Date.today();
    	todaysDate = todaysDate.toString().split(" ");
        splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
        formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
        dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
    	dataStorage.setData(SELECTED_VISIT_DATE,'');
    	dataStorage.setData(SELECTED_VISIT_DAY,'');
    	
        //week start date
        var weekStartDay = Date.parse(weekStartDate).getDayName();
        console.log(weekStartDay);
        if(weekStartDay==week.DAY0){	//derive week start day from date and check if its DAY0 (Thursday)
        	//if(formattedTodaysDate>=weekStartDate && formattedTodaysDate<=weekEndDate){	//check if system date falls within SDT Week
        		console.log("System date is within SDT Week");
        		for(var i=0;i<7;i++){
        			var weeklyDate = Date.parse(weekStartDate).add(i).days();
        			weeklyDate = weeklyDate.toString().split(" ");
                    splitweeklyDate = weeklyDate[3]+"-"+weeklyDate[1]+"-"+weeklyDate[2];
                    var formattedweeklyDate = formatDate.reverseDateFormatter(splitweeklyDate);
        			$('div#hidden_day'+i).text(formattedweeklyDate);
                    //add 0 prefix if date is single digit
        			var prefixWeeklyDate;
                    if(weeklyDate[2].length<2){
                    	prefixWeeklyDate="0"+weeklyDate[2];
                    }
                    else{
                    	prefixWeeklyDate = weeklyDate[2];
                    }
                    $('span#date'+i).html(prefixWeeklyDate);
                    
                    //get todays date
                    todaysDate = Date.today();
                    todaysDate = todaysDate.toString().split(" ");
                    splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
                    formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
                    if(formattedweeklyDate==formattedTodaysDate){	//if today
                    	$('div#day'+i).removeClass('dashboardDailyDay');
                        $('div#day'+i).addClass('dashboardDailyDaySelected');
                        $('div#day'+i).trigger('click');
                        dataStorage.setData(TODAYS_DAY_ID,i);
                        
                        var todaysDay = Date.today().getDayName();
                        dataStorage.setData(TODAYS_DAY,todaysDay);
                        
                        //If today is Sunday
                        if(todaysDay==week.DAY3){
                        	dataStorage.setData(SELECTED_VISIT_DATE,'');
                        }
                        else{
                        	dataStorage.setData(SELECTED_VISIT_DAY,todaysDay);
                        	dataStorage.setData(SELECTED_VISIT_DATE,formattedTodaysDate);
                        }
                        
                    }
        		}
        		
        		 
        	/*}
        	else{
        		alert("System date is not within SDT Week");
        	}*/
        }
        else{
        	console.log("Start date is not as per the SDT Week");
        }
        
        
    	
        //determining todays day and date
        /*var todaysDay = Date.today().getDayName();
        dataStorage.setData(TODAYS_DAY,todaysDay);
        dataStorage.setData(SELECTED_VISIT_DAY,todaysDay);
        
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
        
        $('div#day'+todaysDayId).removeClass('dashboardDailyDay');
        $('div#day'+todaysDayId).addClass('dashboardDailyDaySelected');
        $('div#day'+todaysDayId).trigger('click');
        dataStorage.setData(TODAYS_DAY_ID,todaysDayId);
        
        
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
            $('div#hidden_day'+dayId).text(formattedPrevDays);
            $('span#date'+dayId).html(subDays[2]);
        }
        
        //populate today
        if(prevDays!==0){
            dayId=dayId+1;
        }
        var dateArray;
        var getToday=Date.today();
        var getTodayName = Date.today().getDayName();
        //alert(getTodayName);
        var today = getToday.toString().split(" ");
        var splitToday = today[3]+"-"+today[1]+"-"+today[2];
        var formattedDayZero = formatDate.reverseDateFormatter(splitToday);
        $('div#hidden_day'+dayId).text(formattedDayZero);
        //add 0 prefix if date is single digit
        if(today[2].length<2){
        	perfixToday="0"+today[2];
        }
        else{
        	perfixToday = today[2];
        }
        $('span#date'+dayId).html(perfixToday);
        //If today is Sunday
        if(getTodayName==collectDay.DAY7){
        	dataStorage.setData(SELECTED_VISIT_DATE,'');
        }
        else{
        	dataStorage.setData(SELECTED_VISIT_DATE,formattedDayZero);
        }
        
        
        
        //populate next days
        var addDays;
        var formattedNxtDays;
        var nextDates;
        for(i=1;i<=nextDays;i++){
            addDays=Date.today().add(i).days();
            addDays = addDays.toString().split(" ");
            nextDates = addDays[3]+"-"+addDays[1]+"-"+addDays[2];
            formattedNxtDays = formatDate.reverseDateFormatter(nextDates);
            $('div#hidden_day'+(dayId+i)).text(formattedNxtDays);
            $('span#date'+(dayId+i)).html(addDays[2]);
        }*/
    },
    setAndHighlight: function(selectedDate,weekDay,divId){
        dataStorage.setData(SELECTED_VISIT_DATE,selectedDate);
        dataStorage.setData(SELECTED_VISIT_DAY,weekDay);
        $('div#day'+dataStorage.getData(TODAYS_DAY_ID)).removeClass('dashboardDailyDaySelected');
        $('div#day'+dataStorage.getData(TODAYS_DAY_ID)).addClass('dashboardDailyDay');
        
        for(var i=0;i<7;i++){
        	if($('div#day'+i).hasClass("dashboardDailyDaySelected")){
        		$('div#day'+i).removeClass("dashboardDailyDaySelected");
        		$('div#day'+i).addClass("dashboardDailyDay");
        	}
        }
        $(divId).addClass('dashboardDailyDaySelected');
    },
    setAndRedirectBalanceTransaction: function(selectedBalanceType){
	   dataStorage.setData(SELECTED_BALANCE_TYPE,selectedBalanceType);
	   common.redirect("balanceTransaction.html");
    },
    getDashboardDataFromOfflineDB: function(){
    	var dbObj = dataStorage.initializeDB();
    	var journeyId = dataStorage.getData(JOURNEY_ID);
    	var userId = dataStorage.getData(USER_ID);
    	var weekStartDate = dataStorage.getData(WEEK_START_DATE);
    	var weekEndDate = dataStorage.getData(WEEK_END_DATE);	
    	var dashboardDataParams = [journeyId,weekStartDate,weekEndDate,journeyId,userId,weekStartDate,weekEndDate,journeyId,userId,weekStartDate,weekEndDate,journeyId,userId,weekStartDate,weekEndDate,weekStartDate,weekEndDate,journeyId,userId,weekStartDate,weekEndDate,weekStartDate,weekEndDate,journeyId,userId,weekStartDate,weekEndDate,weekStartDate,weekEndDate,journeyId,weekStartDate,weekEndDate];
    	console.log(dbQueries.selectDashboardData);
    	console.log(dashboardDataParams);
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectDashboardData,dashboardDataParams,function(tx, res) {
				var len = res.rows.length;
                if(len==0){
					console.log(len);
					noVisitsForJourney = 1;
                }
                if(len > 0) {
                	var dateArray= [];
                	var jsonObj1  = [];
                	var jsonObj2 = [];
					console.log("Fetched Data length "+len);
					
					for(var i = 0;i<len;i++)
					{
						console.log(JSON.stringify(res.rows.item(i)));
						
						dateArray[i] = JSON.stringify([res.rows.item(i).Date]);
						
						item = {};
						
						item["Date"]=res.rows.item(i).Date;
						item["DashboardData"]=res.rows.item(i).DashboardData;
						item["CashSUM"]=res.rows.item(i).CashSUM;
						jsonObj1.push(item);
						
						
					}
				    
					var weekStartDate = dataStorage.getData(WEEK_START_DATE);
					var weekEndDate = dataStorage.getData(WEEK_END_DATE);
										
					for(i=0;i<7;i++){
						var weeklyDate = Date.parse(weekStartDate).add(i).days();
						weeklyDate = weeklyDate.toString().split(" ");
				        var splitTodaysDate = weeklyDate[3]+"-"+weeklyDate[1]+"-"+weeklyDate[2];
				        var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
						dailyBalanceArray[i] = formattedTodaysDate;
					}
				    console.log("dailyBalanceArray: "+dailyBalanceArray);
				    console.log("dailyBalanceArray len: "+dailyBalanceArray.length);
				    console.log(dailyBalanceArray[0]);
					
					var balance = 0;
					
					for(var i=0;i<dailyBalanceArray.length;i++){
						var callsClosed = 0;
						var targetCalls = 0;
						var cardPayments = 0;
						var termCollections = 0;
						var otherCollections = 0;
						var refund = 0;
						var loansIssued = 0;
						var floatWithdrawn = 0;
						var cashBanked = 0;
						var other = 0;
						var previousDayCF = 0;
						
						var hashMap2 = new HashMap();
						
						for(var j=0;j<jsonObj1.length;j++){
							if((dailyBalanceArray[i])==(jsonObj1[j].Date).toString()){
								
								if(jsonObj1[j].DashboardData=='CallsClosed'){
									//balance = balance + jsonObj1[j].CashSUM;
									callsClosed = jsonObj1[j].CashSUM;
								}
								if(jsonObj1[j].DashboardData=='TargetCalls'){
									//balance = balance + jsonObj1[j].CashSUM;
									targetCalls = jsonObj1[j].CashSUM;
								}
								if(jsonObj1[j].DashboardData=='CardPayments'){
									//balance = balance + jsonObj1[j].CashSUM;
									cardPayments = jsonObj1[j].CashSUM;
								}
								if(jsonObj1[j].DashboardData=='TermCollections'){
									balance = balance + jsonObj1[j].CashSUM;
									termCollections = jsonObj1[j].CashSUM;
								}
								if(jsonObj1[j].DashboardData=='OtherCollections'){
									balance = balance + jsonObj1[j].CashSUM;
									otherCollections = jsonObj1[j].CashSUM;
								}
								if(jsonObj1[j].DashboardData=='Refund'){
									balance = balance - parseFloat(Math.abs(jsonObj1[j].CashSUM));
									refund = parseFloat(Math.abs(jsonObj1[j].CashSUM));
								}
								if(jsonObj1[j].DashboardData=='L'){
									balance = balance - jsonObj1[j].CashSUM;
									loansIssued = jsonObj1[j].CashSUM;
								}
								if(jsonObj1[j].DashboardData=='F'){
									balance = balance + jsonObj1[j].CashSUM;
									floatWithdrawn = jsonObj1[j].CashSUM;
								}
								if(jsonObj1[j].DashboardData=='B'){
									balance = balance - jsonObj1[j].CashSUM;
									cashBanked = jsonObj1[j].CashSUM;
								}
								if(jsonObj1[j].DashboardData=='O'){
									balance = balance - jsonObj1[j].CashSUM;
									other = jsonObj1[j].CashSUM;
								}
							}
							
						}
						
						console.log("balance1:"+balance);
						//console.log("dailyBalanceArray[i]"+JSON.parse(dailyBalanceArray[i]));
						
						hashMap2.set('callsClosed',callsClosed);
						hashMap2.set('targetCalls',targetCalls);
						hashMap2.set('cardPayments',cardPayments);
						hashMap2.set('termCollections',termCollections);
						hashMap2.set('otherCollections',otherCollections);
						hashMap2.set('refund',refund);
						hashMap2.set('loansIssued',loansIssued);
						hashMap2.set('floatWithdrawn',floatWithdrawn);
						hashMap2.set('cashBanked',cashBanked);
						hashMap2.set('other',other);
						hashMap2.set('balance',balance);
						
						hashMap1.set(dailyBalanceArray[i].toString(),hashMap2);
					    
					}
					
					
				}
				
			});
    	},function getDashboardDataFromOfflineDBErr(){},function getDashboardDataFromOfflineDBSuccess(){
    														if(dataStorage.getData(IS_WEEKLY_VIEW)){
    															dashboard.refreshWeeklyPage();
    														}
    														else{
    															dashboard.refreshDailyPage(dataStorage.getData(SELECTED_VISIT_DATE));
    														}
    														
    													});
    },
    
    refreshDailyPage: function(selectedDate){
    	console.log("selectedDate: "+selectedDate);
    	
		var weekStartDate = dataStorage.getData(WEEK_START_DATE);
    	var previousDayDate;
    	//if selected date is not set or there are no visits for the journey
    	if(!selectedDate || noVisitsForJourney == 1){
    		dailyCallsClosed = 0;
    		dailyTargetCalls = 0;
    		dailyCardPayments = 0;
    		dailyPreviousDayCF = 0;
    		dailyTermCollections = 0;
    		dailyOtherCollections = 0;
			dailyRefund = 0;
    		dailyLoansIssued = 0;
    		dailyFloatWithdrawn = 0;
    		dailyCashBanked = 0;
    		dailyOther = 0;
    		dailyBalance = 0;
    	}
    	else
    	{
    		var second;
	    	//if date is same as week start date
	    	if(selectedDate==weekStartDate){
	    		//get previous day CF data
	    		dailyPreviousDayCF = 0;
	    		
	    		//if data is present in hashmap for the selected date
	    		if(hashMap1.has(selectedDate)){
					second = hashMap1.get(selectedDate);  //DS
					dailyCallsClosed = (second.get('callsClosed'));
					dailyTargetCalls = (second.get('targetCalls'));
					dailyCardPayments = (second.get('cardPayments'));
					dailyTermCollections = (second.get('termCollections'));
					dailyOtherCollections = (second.get('otherCollections'));
					dailyRefund = (second.get('refund'));
					dailyLoansIssued = (second.get('loansIssued'));
					dailyFloatWithdrawn = (second.get('floatWithdrawn'));
					dailyCashBanked = (second.get('cashBanked'));
					dailyOther = (second.get('other'));
					dailyBalance = (second.get('balance'));
					
		    	}
	    		//if data is not present in hashmap for the selected date, set the default data to zero
	    		else{
	    			dailyCallsClosed = 0;
					dailyTargetCalls = 0;
					dailyCardPayments = 0;
					dailyTermCollections = 0;
					dailyOtherCollections = 0;
					dailyRefund = 0;
					dailyLoansIssued = 0;
					dailyFloatWithdrawn = 0;
					dailyCashBanked = 0;
					dailyOther = 0;
					dailyBalance = 0;
	    		}
	    	}
	    	//if selected date is other than week start date
	    	else{
	    		//get previous day CF data
	    		var previousDay = Date.parse(selectedDate).add(-1).days().getDayName();
	    		//skip sunday for previous day CF calculation
	    		if(previousDay==collectDay.DAY7){
	    			previousDayDate = Date.parse(selectedDate).add(-2).days();
	    		}
	    		else{
	    			previousDayDate = Date.parse(selectedDate).add(-1).days();
	    		}
	    		previousDayDate = previousDayDate.toString().split(" ");
	            splitpreviousDayDate = previousDayDate[3]+"-"+previousDayDate[1]+"-"+previousDayDate[2];
	            var formattedpreviousDayDate = formatDate.reverseDateFormatter(splitpreviousDayDate);
	            if(hashMap1.has(formattedpreviousDayDate)){
	            	var second = hashMap1.get(formattedpreviousDayDate);
	            	dailyPreviousDayCF = (second.get('balance'));
	            }
	    		
	    
	    		if(hashMap1.has(selectedDate)){
					second = hashMap1.get(selectedDate);  //DS
					dailyCallsClosed = (second.get('callsClosed'));
					dailyTargetCalls = (second.get('targetCalls'));
					dailyCardPayments = (second.get('cardPayments'));
					dailyTermCollections = (second.get('termCollections'));
					dailyOtherCollections = (second.get('otherCollections'));
					dailyRefund = (second.get('refund'));
					dailyLoansIssued = (second.get('loansIssued'));
					dailyFloatWithdrawn = (second.get('floatWithdrawn'));
					dailyCashBanked = (second.get('cashBanked'));
					dailyOther = (second.get('other'));
					//dailyBalance = (second.get('balance'));
					dailyBalance = dailyPreviousDayCF + dailyTermCollections + dailyOtherCollections - dailyRefund - dailyLoansIssued + dailyFloatWithdrawn - dailyCashBanked - dailyOther;   
					//dailyBalance = dailyBalance + dailyPreviousDayCF;
		    	}
	    		//if data is not present in hashmap for the selected date, set the default data to zero
	    		else{
	    			//dailyPreviousDayCF = 0;
	    			dailyCallsClosed = 0;
					dailyTargetCalls = 0;
					dailyCardPayments = 0;
					dailyTermCollections = 0;
					dailyOtherCollections = 0;
					dailyRefund = 0;
					dailyLoansIssued = 0;
					dailyFloatWithdrawn = 0;
					dailyCashBanked = 0;
					dailyOther = 0;
					dailyBalance = 0;
	    		}
			}
    	}//else		
    	//color coding for PreviousDayCF
    	if(dailyPreviousDayCF>=0){
    		$('span.dailyPreviousDayCF').removeClass('red');
    		$('span.dailyPreviousDayCF').addClass('green');
			$('img#previousDayArrow').attr('src','css/themes/images/icons-png/green-arrow.png');
    	}
    	else{
    		$('span.dailyPreviousDayCF').removeClass('green');
    		$('span.dailyPreviousDayCF').addClass('red');
			$('img#previousDayArrow').attr('src','css/themes/images/icons-png/red-arrow.png');
    	}

    	if(hashMap1.has(selectedDate)){
    		
    		var second = hashMap1.get(selectedDate);
        	second.set('balance',dailyBalance);
    		
    	}
    	else{
    		
    		var hashMap2 = new HashMap();
    		hashMap2.set('balance',dailyPreviousDayCF);
    		//hashMap2.set('finalBalance',finalBalance);
    		hashMap1.set(selectedDate,hashMap2);
    	}
     	
    	//color coding for balance
    	if(dailyBalance<0){
    		$('span.dailyBalance').removeClass('green');
    		$('span.dailyBalance').addClass('red');
    	}
    	else{
    		$('span.dailyBalance').removeClass('red');
    		$('span.dailyBalance').addClass('green');
    	}
    	//attach calculated data to respective elements
    	$('span.dailyCallsClosed').html(dailyCallsClosed);
    	$('span.dailyTargetCalls').html(dailyTargetCalls);
    	$('span.dailyCardPayments').html("&pound;"+common.convertToAmount(dailyCardPayments));
    	$('span.dailyPreviousDayCF').html("&pound;"+common.convertToAmount(Math.abs(dailyPreviousDayCF)));
    	$('span.dailyTermCollections').html("&pound;"+common.convertToAmount(dailyTermCollections));
    	$('span.dailyOtherCollections').html("&pound;"+common.convertToAmount(dailyOtherCollections));
		$('span.dailyRefund').html("&pound;"+common.convertToAmount(Math.abs(dailyRefund)));
    	$('span.dailyLoansIssued').html("&pound;"+common.convertToAmount(dailyLoansIssued));
    	$('span.dailyFloatWithdrawn').html("&pound;"+common.convertToAmount(dailyFloatWithdrawn));
    	$('span.dailyCashBanked').html("&pound;"+common.convertToAmount(dailyCashBanked));
    	$('span.dailyOther').html("&pound;"+common.convertToAmount(dailyOther));
    	$('span.dailyBalance').html("&pound;"+common.convertToAmount(Math.abs(dailyBalance)));
    	$(".dailyBar-one .dailyBar").dailyProgress();
	    
    },
    refreshWeeklyPage: function(){
    	//console.log(selectedDate);
    	
		var weekStartDate = dataStorage.getData(WEEK_START_DATE);
		var weekEndDate = dataStorage.getData(WEEK_END_DATE);
		weeklyCallsClosed = 0;
		weeklyTargetCalls = 0;
		weeklyCardPayments = 0;
		weeklyTermCollections = 0;
		weeklyOtherCollections = 0;
		weeklyRefund = 0;
		weeklyLoansIssued = 0;
		weeklyFloatWithdrawn = 0;
		weeklyCashBanked = 0;
		weeklyOther = 0;
		weeklyBalance = 0;
		
		//if there are no visits for the journey
		if(noVisitsForJourney == 1){
			weeklyCallsClosed = 0;
			weeklyTargetCalls = 0;
			weeklyCardPayments = 0;
			weeklyTermCollections = 0;
			weeklyOtherCollections = 0;
			weeklyRefund = 0;
			weeklyLoansIssued = 0;
			weeklyFloatWithdrawn = 0;
			weeklyCashBanked = 0;
			weeklyOther = 0;
			weeklyBalance = 0;	
		}
		else{
		var hashMap3 = new HashMap();
		for(var i=0;i<7;i++){
			var weeklyDate = Date.parse(weekStartDate).add(i).days();
			weeklyDate = weeklyDate.toString().split(" ");
            splitweeklyDate = weeklyDate[3]+"-"+weeklyDate[1]+"-"+weeklyDate[2];
            var formattedweeklyDate = formatDate.reverseDateFormatter(splitweeklyDate);
            
			if(hashMap1.has(formattedweeklyDate)){
				var second = hashMap1.get(formattedweeklyDate);
				weeklyCallsClosed = weeklyCallsClosed + (second.get('callsClosed'));
				weeklyTargetCalls = weeklyTargetCalls + (second.get('targetCalls'));
				weeklyCardPayments = weeklyCardPayments + (second.get('cardPayments'));
				weeklyTermCollections = weeklyTermCollections + (second.get('termCollections'));
				weeklyOtherCollections = weeklyOtherCollections + (second.get('otherCollections'));
				weeklyRefund = weeklyRefund + (second.get('refund'));
				weeklyLoansIssued = weeklyLoansIssued + (second.get('loansIssued'));
				weeklyFloatWithdrawn = weeklyFloatWithdrawn + (second.get('floatWithdrawn'));
				weeklyCashBanked = weeklyCashBanked + (second.get('cashBanked'));
				weeklyOther = weeklyOther + (second.get('other'));
				//weeklyBalance = weeklyBalance + (second.get('balance'));
				weeklyBalance = weeklyTermCollections + weeklyOtherCollections - weeklyRefund - weeklyLoansIssued + weeklyFloatWithdrawn - weeklyCashBanked - weeklyOther; 
				//weekClosureCollections = (weeklyTermCollections + weeklyOtherCollections - weeklyRefund);
				hashMap3.set(formattedweeklyDate,weeklyBalance);
/*				var hashMap2 = new HashMap();
	    		hashMap2.set('weeklyBalance',weeklyBalance);
	    		//hashMap2.set('finalBalance',finalBalance);
	    		hashMap1.set(formattedweeklyDate,hashMap2);*/
			}
		}
		}
		
		
		
		/*
		//save weeklybalance in journeytable
		var dbObj = dataStorage.initializeDB();
		var params = [weeklyBalance,weekClosureCollections,selectedJourneyId];
		dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.updateWeeklyBalance,params);
        },function(){console.log("Error");}, function success(){console.log("Success");});
		*/
		
    	//color coding for balance
		if(weeklyBalance<0){
    		$('span.labelWeeklyBalance').html('Over');
    		$('span.weeklyBalance').removeClass('green');
    		$('span.weeklyBalance').addClass('amber');
    	}
    	else if(weeklyBalance>0){
    		$('span.labelWeeklyBalance').html('Short');
    		$('span.weeklyBalance').removeClass('green');
    		$('span.weeklyBalance').addClass('amber');
    	}
    	else{
    		$('span.labelWeeklyBalance').html('Balance');
    		$('span.weeklyBalance').removeClass('amber');
    		$('span.weeklyBalance').addClass('green');
    	}
		
    	
    	//attach calculated data to respective elements
    	$('span.weeklyCallsClosed').html(weeklyCallsClosed);
    	$('span.weeklyTargetCalls').html(weeklyTargetCalls);
    	$('span.weeklyCardPayments').html("&pound;"+common.convertToAmount(weeklyCardPayments));
    	$('span.weeklyTermCollections').html("&pound;"+common.convertToAmount(weeklyTermCollections));
    	$('span.weeklyOtherCollections').html("&pound;"+common.convertToAmount(weeklyOtherCollections));
		$('span.weeklyRefund').html("&pound;"+common.convertToAmount(Math.abs(weeklyRefund)));
    	$('span.weeklyLoansIssued').html("&pound;"+common.convertToAmount(weeklyLoansIssued));
    	$('span.weeklyFloatWithdrawn').html("&pound;"+common.convertToAmount(weeklyFloatWithdrawn));
    	$('span.weeklyCashBanked').html("&pound;"+common.convertToAmount(weeklyCashBanked));
    	$('span.weeklyOther').html("&pound;"+common.convertToAmount(weeklyOther));
    	$('span.weeklyBalance').html("&pound;"+common.convertToAmount(Math.abs(weeklyBalance)));
    	$(".weeklyBar-one .weeklyBar").weeklyProgress();

    },   
   
   //Close week function start here
   closeWeek: function(){
       
       closeWeek.isCallsClosed();
	   /*
       closeWeek.isCallsClosed(function callback(isCallsClosed){
			if(isCallsClosed){
				var isBalancedZero = closeWeek.isBalancedZero(balanceCloseWeekC,balanceCloseWeekS,function(){
				   var transactionRecorded = closeWeek.checkClosedWeekTransaction(balanceCloseWeekC,balanceCloseWeekS);
				   //var transactionRecorded = closeWeek.checkClosedWeekTransaction(balanceCloseWeekS);
				});
			}
	   });
       */
       /*
	   if(isCloseWeek){
       
		   var isBalancedZero = closeWeek.isBalancedZero(balanceCloseWeekC,balanceCloseWeekS,function(){
			   var transactionRecorded = closeWeek.checkClosedWeekTransaction(balanceCloseWeekC,balanceCloseWeekS);
			   //var transactionRecorded = closeWeek.checkClosedWeekTransaction(balanceCloseWeekS);
		   });
       } 
		*/
   },
   renderJourneyDetails: function(){
	   var dbObj = dataStorage.initializeDB();
	   var primaryJourneyId,journeyId,primaryJourneyDescription,isPrimaryJourney;
	   journeyId = dataStorage.getData(JOURNEY_ID);
	   
		if(dataStorage.getData(IS_SELECTED_JOURNEY_PRIMARY) == 0){
		  $('li.cardPayments').css('display','none');
		   $('img.journeyIndicator').attr("src","css/themes/images/icons-png/d-icon.png");
		   $('span#journeyIndicator').html("D");
		   $('span#journeyIndicator').css("background-color","#c5c5c5");
		   $('div#closeWeekBtnGroup').css('display','none');
		   $('.pageFooter').append('<div class="">Please select primary journey to close the week.</div>');
		  
		}
		else{
		   $('li.cardPayments').css('display','block');
		   $('img.journeyIndicator').attr("src","css/themes/images/icons-png/p-icon.png");
		   $('span#journeyIndicator').html("P");
		   $('span#journeyIndicator').css("background-color","#ccd627");
		   $('div#closeWeekBtnGroup').css('display','block');
		}
		
		
		//$('span#journeyDesc').html(dataStorage.getData(JOURNEY_DESCRIPTION));
		//$('span#primaryAgentName').html(dataStorage.getData(PRIMARY_AGENT_NAME));
											   
											   
	   dbObj.transaction(function(tx) {
            tx.executeSql(dbQueries.selectPrimaryJourneyData,[journeyId],function(tx,res){
                var len = res.rows.length;
                if(len==0){
					console.log(len);
                }
                if(len > 0) {
					console.log("Fetched Data length "+len);
					primaryJourneyId = res.rows.item(0)["JourneyID"];
					primaryJourneyDescription = res.rows.item(0)["JourneyDescription"];
					primaryAgentName = res.rows.item(0)["PrimaryAgentName"];
					isPrimaryJourney = res.rows.item(0)["IsPrimaryJourney"];
					
						
						dataStorage.setData(IS_SELECTED_JOURNEY_PRIMARY,isPrimaryJourney);
						dataStorage.setData(PRIMARY_AGENT_NAME,primaryAgentName);
						dataStorage.setData(JOURNEY_DESCRIPTION,primaryJourneyDescription);
					
                }

            });
        },function(){console.log("Error");}, function success(){
											   $('span#primaryAgentName').html(dataStorage.getData(PRIMARY_AGENT_NAME));
											   $('span#journeyDesc').html(dataStorage.getData(JOURNEY_DESCRIPTION));
											});
		
	   
   }
};

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    
	dataStorage.setData(IS_WEEKLY_VIEW,"");

	
	//call function
	dashboard.mapDateDay(); 
	//dashboard.getDashboardDataFromOfflineDB();
	 
	var dbObj = dataStorage.initializeDB();
	
	//display week date	
	//format start date as "07th, April" if "7th, April"
	var momentStartDate = moment(weekStartDate).format("Do, MMMM");
	var formatedStartDate = momentStartDate.split(",");
	//alert(date[0]);
	if(formatedStartDate[0].length<=3){
		formatedStartDate[0]="0"+formatedStartDate[0];
		formatedStartDate=formatedStartDate[0]+", "+formatedStartDate[1];
	}
	
	//format end date as "07th, April" if "7th, April"
	var momentEndDate = moment(weekEndDate).format("Do, MMMM");
	var formatedEndDate = momentEndDate.split(",");
	if(formatedEndDate[0].length<=3){formatedEndDate[0]="0"+formatedEndDate[0];
	formatedEndDate=formatedEndDate[0]+","+formatedEndDate[1];}
	$('div.weekDisplay').text(formatedStartDate + " - " + formatedEndDate);
	//alert(formatedStartDate + " - " + formatedEndDate);
	
	//day on click of daily
    var selectedDate;
    $('div#day0').on('click',function(){
           selectedDate = $('div#hidden_day0').text();
           dashboard.setAndHighlight(selectedDate,week.DAY0,"div#day0");
           //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
           dashboard.refreshDailyPage(selectedDate);
    });
    $('div#day1').on('click',function(){
           selectedDate = $('div#hidden_day1').text();
           dashboard.setAndHighlight(selectedDate,week.DAY1,"div#day1");
           //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
           dashboard.refreshDailyPage(selectedDate);
    });
    $('div#day2').on('click',function(){
           selectedDate = $('div#hidden_day2').text();
           dashboard.setAndHighlight(selectedDate,week.DAY2,"div#day2");
           //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
           dashboard.refreshDailyPage(selectedDate);
    });
    $('div#day3').on('click',function(){
           selectedDate = $('div#hidden_day3').text();
           dashboard.setAndHighlight(selectedDate,week.DAY3,"div#day3");
           //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
           dashboard.refreshDailyPage(selectedDate);
    });
    $('div#day4').on('click',function(){
           selectedDate = $('div#hidden_day4').text();
           dashboard.setAndHighlight(selectedDate,week.DAY4,"div#day4");
           //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
           dashboard.refreshDailyPage(selectedDate);
    });
    $('div#day5').on('click',function(){
           selectedDate = $('div#hidden_day5').text();
           dashboard.setAndHighlight(selectedDate,week.DAY5,"div#day5");
           //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
           dashboard.refreshDailyPage(selectedDate);
    });
    $('div#day6').on('click',function(){
           selectedDate = $('div#hidden_day6').text();
           dashboard.setAndHighlight(selectedDate,week.DAY6,"div#day6");
           //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
           dashboard.refreshDailyPage(selectedDate);
    });
    $('div.loansIssued').on('click',function(){
		   //dashboard.callBalanceTransaction(viewType,)
		   if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="daily")
		   {
				if(dataStorage.getData(SELECTED_VISIT_DATE)){
				selectedBalanceType = 'L'; 
				dashboard.setAndRedirectBalanceTransaction(selectedBalanceType);
				}
				else{
					common.alertMessage(messageboxError.messageSelectVisitDate, callbackReturn, messageboxError.messageTitleError);
				}
		   }
		   else if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="weekly")
		   {
				var todaysDate=Date.today();
			  todaysDate = todaysDate.toString().split(" ");
			  var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
			  var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
			  dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
			  var weekStartDate = dataStorage.getData(WEEK_START_DATE);
			  var weekEndDate = dataStorage.getData(WEEK_END_DATE);
		    
				if(formattedTodaysDate<weekStartDate){
					//format start date as "07th, April" if "7th, April"
					var momentStartDate = moment(formattedTodaysDate).format("Do, MMMM YY");
					var formatedStartDate = momentStartDate.split(",");
					//alert(date[0]);
					if(formatedStartDate[0].length<=3){
						   formatedStartDate[0]="0"+formatedStartDate[0];
						   formatedStartDate=formatedStartDate[0]+","+formatedStartDate[1];
					}
					message = "The device date "+formatedStartDate+" is not in the current week.";
					common.alertMessage(message,callbackReturn,messageboxCommonMessages.messageTitleError);
				}
				else
				{
		   selectedBalanceType = 'L'; 
		   dashboard.setAndRedirectBalanceTransaction(selectedBalanceType);
		   }
		   }
		   
		   
    });
    $('div.floatWithdrawn').on('click',function(){
		   //dashboard.callBalanceTransaction(viewType,)
		   if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="daily")
		   {
				if(dataStorage.getData(SELECTED_VISIT_DATE)){
		   selectedBalanceType = 'F'; 
		   dashboard.setAndRedirectBalanceTransaction(selectedBalanceType);
				}
				else{
					common.alertMessage(messageboxError.messageSelectVisitDate, callbackReturn, messageboxError.messageTitleError);
				}
		   }
		   else if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="weekly")
		   {
				var todaysDate=Date.today();
			  todaysDate = todaysDate.toString().split(" ");
			  var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
			  var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
			  dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
			  var weekStartDate = dataStorage.getData(WEEK_START_DATE);
			  var weekEndDate = dataStorage.getData(WEEK_END_DATE);
		    
				if(formattedTodaysDate<weekStartDate){
					//format start date as "07th, April" if "7th, April"
					var momentStartDate = moment(formattedTodaysDate).format("Do, MMMM YY");
					var formatedStartDate = momentStartDate.split(",");
					//alert(date[0]);
					if(formatedStartDate[0].length<=3){
						   formatedStartDate[0]="0"+formatedStartDate[0];
						   formatedStartDate=formatedStartDate[0]+","+formatedStartDate[1];
					}
					message = "The device date "+formatedStartDate+" is not in the current week.";
					common.alertMessage(message,callbackReturn,messageboxCommonMessages.messageTitleError);
				}
				else
				{
				selectedBalanceType = 'F'; 
				dashboard.setAndRedirectBalanceTransaction(selectedBalanceType);
		   }
		   
		   }
		   
    });
    $('div.cashBanked').on('click',function(){
		   //dashboard.callBalanceTransaction(viewType,)
		   if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="daily")
		   {
				if(dataStorage.getData(SELECTED_VISIT_DATE)){
				selectedBalanceType = 'B'; 
				dashboard.setAndRedirectBalanceTransaction(selectedBalanceType);
				}
				else{
					common.alertMessage(messageboxError.messageSelectVisitDate, callbackReturn, messageboxError.messageTitleError);
				}
		   }
		   else if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="weekly")
		   {
				var todaysDate=Date.today();
			  todaysDate = todaysDate.toString().split(" ");
			  var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
			  var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
			  dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
			  var weekStartDate = dataStorage.getData(WEEK_START_DATE);
			  var weekEndDate = dataStorage.getData(WEEK_END_DATE);
		    
				if(formattedTodaysDate<weekStartDate){
					//format start date as "07th, April" if "7th, April"
					var momentStartDate = moment(formattedTodaysDate).format("Do, MMMM YY");
					var formatedStartDate = momentStartDate.split(",");
					//alert(date[0]);
					if(formatedStartDate[0].length<=3){
						   formatedStartDate[0]="0"+formatedStartDate[0];
						   formatedStartDate=formatedStartDate[0]+","+formatedStartDate[1];
					}
					message = "The device date "+formatedStartDate+" is not in the current week.";
					common.alertMessage(message,callbackReturn,messageboxCommonMessages.messageTitleError);
				}
				else
				{
		   selectedBalanceType = 'B'; 
		   dashboard.setAndRedirectBalanceTransaction(selectedBalanceType);
		   }
		   
		   }
		   
    });
    $('div.other').on('click',function(){
		   //dashboard.callBalanceTransaction(viewType,)
		   if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="daily")
		   {
				if(dataStorage.getData(SELECTED_VISIT_DATE)){
		   selectedBalanceType = 'O'; 
		   dashboard.setAndRedirectBalanceTransaction(selectedBalanceType);
				}
				else{
					common.alertMessage(messageboxError.messageSelectVisitDate, callbackReturn, messageboxError.messageTitleError);
				}
		   }
		   else if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="weekly")
		   {
				var todaysDate=Date.today();
			  todaysDate = todaysDate.toString().split(" ");
			  var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
			  var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
			  dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
			  var weekStartDate = dataStorage.getData(WEEK_START_DATE);
			  var weekEndDate = dataStorage.getData(WEEK_END_DATE);
		    
				if(formattedTodaysDate<weekStartDate){
					//format start date as "07th, April" if "7th, April"
					var momentStartDate = moment(formattedTodaysDate).format("Do, MMMM YY");
					var formatedStartDate = momentStartDate.split(",");
					//alert(date[0]);
					if(formatedStartDate[0].length<=3){
						   formatedStartDate[0]="0"+formatedStartDate[0];
						   formatedStartDate=formatedStartDate[0]+","+formatedStartDate[1];
					}
					message = "The device date "+formatedStartDate+" is not in the current week.";
					common.alertMessage(message,callbackReturn,messageboxCommonMessages.messageTitleError);
				}
				else
				{
				selectedBalanceType = 'O';  
				dashboard.setAndRedirectBalanceTransaction(selectedBalanceType);
		   }
		   
		   }
		   
    });
    
    $('li#weekly').on('click',function(){
        $('div#weeklyDashboard').show();
        $('div#dailyDashboard').hide();
        $('li#daily').removeClass('ui-tabs-active ui-state-active') ;
        $('li#weekly').addClass('ui-tabs-active ui-state-active') ;
        dataStorage.setData(IS_WEEKLY_VIEW,"1");
        dataStorage.setData(DASHBOARD_ACTIVE_TAB,"weekly");
        //dashboard.getWeeklyCallsClosedFromOfflineDB(dbObj);
        dashboard.refreshWeeklyPage();
    });
    $('li#daily').on('click',function(){
       $('div#dailyDashboard').show();
       $('div#weeklyDashboard').hide();
       $('li#weekly').removeClass('ui-tabs-active ui-state-active') ;
       $('li#daily').addClass('ui-tabs-active ui-state-active') ;
       dataStorage.setData(IS_WEEKLY_VIEW,"");
       dataStorage.setData(DASHBOARD_ACTIVE_TAB,"daily");
       var selectedDate = dataStorage.getData(SELECTED_VISIT_DATE);
       //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
       dashboard.refreshDailyPage(selectedDate);
    });
    
    //default daily tab
    if(!dataStorage.getData(DASHBOARD_ACTIVE_TAB)){
        dataStorage.setData(DASHBOARD_ACTIVE_TAB,"daily"); //set daily tab as active
    }
    //if weekly tab is active
    if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="weekly"){     
        var activePage = $.mobile.pageContainer.pagecontainer("getActivePage");
        $('[data-role="tabs"] ul:first', activePage).each(function(){
            var ul = this;
            var as = $('a', ul);
            $(as).click(function(){
                $(as).removeClass('ui-btn-active');
                $(this).addClass('ui-btn-active');
                //$('li#pending').addClass('ui-tabs-active ui-state-active"');
            });
            $(as).first().click();
        });
    }
    //if daily tab is active
    else if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="daily"){
        //$(document).on('pagecontainerbeforeshow', function() {
        $('li#weekly').removeClass('ui-tabs-active ui-state-active');
        $('li#daily').addClass('ui-tabs-active ui-state-active');
        $('li#daily a').addClass('ui-btn-active');
        $('div#dailyDashboard').css('display','block');
        var selectedDate = dataStorage.getData(SELECTED_VISIT_DATE);
        //dashboard.getDailyCallsClosedFromOfflineDB(dbObj,selectedDate);
        //});    
    }
    
    //onclick of view schedule button
    $('#viewDailySchedule').on('click',function(){
    	if(dataStorage.getData(SELECTED_VISIT_DATE)){
    		common.redirect('scheduledCustomers.html');
    	}
    	else{
    		common.alertMessage(messageboxError.messageSelectVisitDate, callbackReturn, messageboxError.messageTitleError);
    	}
    });
    //Weekly View
    $('#viewWeeklySchedule').on('click',function(){
    	dataStorage.setData(IS_WEEKLY_VIEW,"1");
    	common.redirect('scheduledCustomers.html');
    });
    
    //Close week
    $('#closeWeek').on('click',function(){
    	dashboard.closeWeek();
    });
    
    //If any scroll position is previously set, reset it to 0 (required for Scheduled Customers Page)
    if(dataStorage.getData(SCROLL_POSITION)){
        var scrollPosition = 0;
        dataStorage.setData(SCROLL_POSITION, scrollPosition);
    }
});

/************************************Progress bar*****************************/
(function ( $ ) {
  $.fn.dailyProgress = function() {
    var callsClosed = $('span.dailyCallsClosed').text();
    var targetCalls = $('span.dailyTargetCalls').text();
    var percent;
    if(callsClosed==0 && targetCalls==0){
    	percent = 0;
    }
    else{
    	percent = (parseInt(callsClosed)/parseInt(targetCalls))*100;
    }
    
    //var percent = this.data("percent");
    this.css("width", percent+"%");
  };
}( jQuery ));
(function ( $ ) {
  $.fn.weeklyProgress = function() {
    var callsClosed = $('span.weeklyCallsClosed').text();
    var targetCalls = $('span.weeklyTargetCalls').text();
    var percent;
    if(callsClosed==0 && targetCalls==0){
    	percent = 0;
    }
    else{
    	percent = (parseInt(callsClosed)/parseInt(targetCalls))*100;
    }
    
    //var percent = this.data("percent");
    this.css("width", percent+"%");
  };
}( jQuery ));

$(document).ready(function(){
  $(".dailyBar-one .dailyBar").dailyProgress();
  $(".weeklyBar-one .weeklyBar").weeklyProgress();
  
  //Check for delegated journeys and disable select journey option all sideMenu 
  sideMenu.checkDeligatedJourneys();

  document.addEventListener("deviceready", onDeviceReady, false);
  sideMenu.getSideMenuAgentDetails();
  dashboard.getDashboardDataFromOfflineDB(); //DS
  dashboard.renderJourneyDetails();
  
  if (buildAttributes.isTrainingApp){
  	$('#closeWeek').attr("disabled", true);	
  }
  
	$("#journeyOrderNoSelection").click(function(){		
			$('#journeyOrderNoSelectionPopup').popup();
			$('#journeyOrderNoSelectionPopup').popup('open');
	});	
	
	$('#closePopUp').on('click',function(){
		$('#journeyOrderNoSelectionPopup').popup('close');
	});	
});

//session validation
$(document).on('click',function(){ 
    session.sessionValidate(selectedUserId);
});

function onDeviceReady() {
	console.log(navigator.notification);
    session.sessionValidate(selectedUserId);
    document.addEventListener("resume", onResume, false);
}

function onResume() {
    session.sessionValidate(selectedUserId);
}

$(document).on('pageinit',function (f) {
    $('[data-role=collapsible]').find("*").click(function () {
    	session.sessionValidate(selectedUserId);
    });
});

$(document).on("scrollstart",function(){
	  session.sessionValidate(selectedUserId);
});
