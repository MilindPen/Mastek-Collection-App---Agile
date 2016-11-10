var rowCount;
var dailyCallsClosed, dailyTargetCalls, dailyCardPayments, dailyPreviousDayCF, dailyTermCollections, dailyOtherCollections, dailyLoansIssued, dailyFloatWithdrawn, dailyCashBanked, dailyOther, dailyBalance;
var weeklyCallsClosed, weeklyTargetCalls, weeklyCardPayments, weeklyPreviousDayCF, weeklyTermCollections, weeklyOtherCollections, weeklyLoansIssued, weeklyFloatWithdrawn, weeklyCashBanked, weeklyOther, weeklyBalance;
var selectedUserId = dataStorage.getData(USER_ID);

var dashboard = {
	/***************************************mapping the day with date of the current week************************************************/	
    mapDateDay: function(){
        //determining todays day and date
        var todaysDay = Date.today().getDayName();
        dataStorage.setData(TODAYS_DAY,todaysDay);
        dataStorage.setData(SELECTED_VISIT_DAY,todaysDay);
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
        dataStorage.setData(SELECTED_VISIT_DATE,formattedDayZero);
        
        
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
        }
    },
    setAndHighlight: function(selectedDate,weekDay,divId){
        dataStorage.setData(SELECTED_VISIT_DATE,selectedDate);
        dataStorage.setData(SELECTED_VISIT_DAY,weekDay);
        $('div#day'+dataStorage.getData(TODAYS_DAY_ID)).removeClass('dashboardDailyDaySelected');
        $('div#day'+dataStorage.getData(TODAYS_DAY_ID)).addClass('dashboardDailyDay');
        
        for(i=0;i<7;i++){
        	if($('div#day'+i).hasClass("dashboardDailyDaySelected")){
        		$('div#day'+i).removeClass("dashboardDailyDaySelected");
        		$('div#day'+i).addClass("dashboardDailyDay");
        	}
        }
        $(divId).addClass('dashboardDailyDaySelected');
    },
    getDailyCallsClosedFromOfflineDB: function(dbObj){

    	var dailyCallsClosedParams = [dataStorage.getData(SELECTED_VISIT_DATE),dataStorage.getData(JOURNEY_ID),dataStorage.getData(USER_ID)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectDailyCallsClosed,dailyCallsClosedParams,function(tx, res) {
				rowCount = res.rows.item(0)["COUNT(*)"];
				console.log("CallsClosed: "+rowCount);
				
			});
    	},function getDailyCallsClosedErr(){},function getDailyCallsClosedSuccess(){
    											dailyCallsClosed = rowCount;
												dashboard.getDailyTargetCalls(dbObj);
    										});
    },
    getDailyTargetCalls: function(dbObj){
    	var dailyTargetCallsParams = [dataStorage.getData(SELECTED_VISIT_DATE),dataStorage.getData(JOURNEY_ID),dataStorage.getData(USER_ID)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectDailyTargetCalls,dailyTargetCallsParams,function(tx, res) {
				rowCount = res.rows.item(0)["COUNT(*)"];
				console.log("TargetCalls: "+rowCount);
				
			});
    	},function getDailyTargetCallsErr(){},function getDailyTargetCallsSuccess(){
    											dailyTargetCalls = rowCount;
												dashboard.getDailyCardPayments(dbObj);
    										});
    },
    getDailyCardPayments: function(dbObj){
    	var dailyCardPaymentsParams = [dataStorage.getData(JOURNEY_ID),dataStorage.getData(SELECTED_VISIT_DATE)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectDailyCardPayments,dailyCardPaymentsParams,function(tx, res) {
				if(res.rows.length>0){
					rowCount = res.rows.item(0);
				}
				else{
					rowCount=0;
				}
				
			});
    	},function getDailyCardPaymentsErr(){},function getDailyCardPaymentsSuccess(){
    											dailyCardPayments = common.convertToAmount(rowCount.CashSUM);
    											console.log("DailyCardPayments: "+dailyCardPayments);
												dashboard.getDailyPreviousDayCF(dbObj);
    										});
    	/*dailyCardPayments = common.convertToAmount(0);
    	console.log("CardPayments: "+dailyCardPayments);
    	dashboard.getDailyPreviousDayCF(dbObj);*/
    },
    getDailyPreviousDayCF: function(dbObj){
    	dailyPreviousDayCF = common.convertToAmount(0);
    	if(dailyPreviousDayCF>=0){
    		$('span.dailyPreviousDayCF').addClass('green');
    	}
    	else{
    		$('span.dailyPreviousDayCF').addClass('red');
    	}
    	console.log("PreviousDayCF: "+dailyPreviousDayCF);
    	dashboard.getDailyTermCollections(dbObj);
    	
    },
    getDailyTermCollections: function(dbObj){
    	var dailyTermCollectionsParams = [dataStorage.getData(SELECTED_VISIT_DATE),dataStorage.getData(JOURNEY_ID),dataStorage.getData(USER_ID)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectDailyTermCollcetions,dailyTermCollectionsParams,function(tx, res) {
				rowCount = res.rows.item(0);
			
			});
    	},function getDailyTermCollectionsErr(){console.log("error");},function getDailyTermCollectionsSuccess(){
    											dailyTermCollections = common.convertToAmount(rowCount.CashSUM);
    											console.log("TermCollections: "+dailyTermCollections);
												dashboard.getDailyOtherCollections(dbObj);
    										});
    	/*dailyTermCollections = 0;
    	console.log("TermCollections: "+dailyTermCollections);
    	dashboard.getDailyOtherCollections(dbObj);*/
    },
    getDailyOtherCollections: function(dbObj){
    	var dailyOtherCollectionsParams = [dataStorage.getData(SELECTED_VISIT_DATE),dataStorage.getData(JOURNEY_ID),dataStorage.getData(USER_ID)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectDailyOtherCollcetions,dailyOtherCollectionsParams,function(tx, res) {
				rowCount = res.rows.item(0);
				//console.log("OtherCollections: "+rowCount.CashSUM);
			});
    	},function getDailyOtherCollectionsErr(){},function getDailyOtherCollectionsSuccess(){
    											dailyOtherCollections = common.convertToAmount(rowCount.CashSUM);
    											console.log("dailyOtherCollections: "+dailyOtherCollections);
												dashboard.getDailyLoansIssued(dbObj);
    										});
    	/*dailyOtherCollections = 0;
    	console.log("dailyOtherCollections: "+dailyOtherCollections);
    	dashboard.getDailyLoansIssued(dbObj);*/
    },
    getDailyLoansIssued: function(dbObj){
    	dailyLoansIssued = common.convertToAmount(0);
    	console.log("dailyLoansIssued: "+dailyLoansIssued);
    	dashboard.getDailyFloatWithdrawn(dbObj);
    	
    },
    getDailyFloatWithdrawn: function(dbObj){
    	dailyFloatWithdrawn = common.convertToAmount(0);
    	console.log("FloatWithdrawn: "+dailyFloatWithdrawn);
    	dashboard.getDailyCashBanked(dbObj);
    	
    },
    getDailyCashBanked: function(dbObj){
    	dailyCashBanked = common.convertToAmount(0);
    	console.log("dailyCashBanked: "+dailyCashBanked);
    	dashboard.getDailyOther(dbObj);
    	
    },
    getDailyOther: function(dbObj){
    	dailyOther = common.convertToAmount(0);
    	console.log("dailyOther: "+dailyOther);
    	dashboard.getDailyBalance(dbObj);
    	
    },
    getDailyBalance: function(dbObj){
    	dailyBalance = common.convertToAmount(0);
    	if(dailyBalance>=0){
    		$('span.dailyBalance').addClass('green');
    	}
    	else{
    		$('span.dailyBalance').addClass('red');
    	}
    	console.log("dailyBalance: "+dailyBalance);
    	dashboard.refreshDailyPage();
    },
    refreshDailyPage: function(){
    	$('span.dailyCallsClosed').html(dailyCallsClosed);
    	$('span.dailyTargetCalls').html(dailyTargetCalls);
    	$('span.dailyCardPayments').html("&pound;"+dailyCardPayments);
    	$('span.dailyPreviousDayCF').html("&pound;"+dailyPreviousDayCF);
    	$('span.dailyTermCollections').html("&pound;"+dailyTermCollections);
    	$('span.dailyOtherCollections').html("&pound;"+dailyOtherCollections);
    	$('span.dailyLoansIssued').html("&pound;"+dailyLoansIssued);
    	$('span.dailyFloatWithdrawn').html("&pound;"+dailyFloatWithdrawn);
    	$('span.dailyCashBanked').html("&pound;"+dailyCashBanked);
    	$('span.dailyOther').html("&pound;"+dailyOther);
    	$('span.dailyBalance').html("&pound;"+dailyBalance);
    	$(".dailyBar-one .dailyBar").dailyProgress();
    },
    /***********************************************weekly******************************************************************/
    getWeeklyCallsClosedFromOfflineDB: function(dbObj){
    	var weeklyCallsClosedParams = [dataStorage.getData(JOURNEY_ID),dataStorage.getData(USER_ID),dataStorage.getData(WEEK_START_DATE),dataStorage.getData(WEEK_END_DATE)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectWeeklyCallsClosed,weeklyCallsClosedParams,function(tx, res) {
				rowCount = res.rows.item(0)["COUNT(*)"];
				console.log("CallsClosed: "+rowCount);
				
			});
    	},function getWeeklyCallsClosedErr(){},function getWeeklyCallsClosedSuccess(){
    											weeklyCallsClosed = rowCount;
												dashboard.getWeeklyTargetCalls(dbObj);
    										});
    },
    getWeeklyTargetCalls: function(dbObj){
    	var weeklyTargetCallsParams = [dataStorage.getData(JOURNEY_ID),dataStorage.getData(USER_ID),dataStorage.getData(WEEK_START_DATE),dataStorage.getData(WEEK_END_DATE)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectWeeklyTargetCalls,weeklyTargetCallsParams,function(tx, res) {
				rowCount = res.rows.item(0)["COUNT(*)"];
				console.log("TargetCalls: "+rowCount);
				
			});
    	},function getWeeklyTargetCallsErr(){},function getWeeklyTargetCallsSuccess(){
    											weeklyTargetCalls = rowCount;
												dashboard.getWeeklyCardPayments(dbObj);
    										});
    },
    getWeeklyCardPayments: function(dbObj){
    	var weeklyCardPaymentsParams = [dataStorage.getData(JOURNEY_ID),dataStorage.getData(WEEK_START_DATE),dataStorage.getData(WEEK_END_DATE)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectWeeklyCardPayments,weeklyCardPaymentsParams,function(tx, res) {
				if(res.rows.length>0){
					rowCount = res.rows.item(0);
				}
				else{
					rowCount=0;
				}
				
			});
    	},function getWeeklyCardPaymentsErr(){},function getWeeklyCardPaymentsSuccess(){
    											weeklyCardPayments = common.convertToAmount(rowCount.CashSUM);
                                                                                        console.log("WeeklyCardPayments: "+weeklyCardPayments);
												dashboard.getWeeklyTermCollections(dbObj);
    										});
    /*	weeklyCardPayments = common.convertToAmount(0);
    	console.log("CardPayments: "+weeklyCardPayments);
    	dashboard.getWeeklyTermCollections(dbObj);*/
    },
    getWeeklyTermCollections: function(dbObj){
    	var weeklyTermCollectionsParams = [dataStorage.getData(JOURNEY_ID),dataStorage.getData(USER_ID),dataStorage.getData(WEEK_START_DATE),dataStorage.getData(WEEK_END_DATE)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectWeeklyTermCollcetions,weeklyTermCollectionsParams,function(tx, res) {
				rowCount = res.rows.item(0);
				//console.log("TermCollections: "+rowCount);
				
			});
    	},function getWeeklyTermCollectionsErr(){console.log("error");},function getWeeklyTermCollectionsSuccess(){
    											weeklyTermCollections = common.convertToAmount(rowCount.CashSUM);
    											console.log("TermCollections: "+weeklyTermCollections);
												dashboard.getWeeklyOtherCollections(dbObj);
    										});
    	/*weeklyTermCollections = 0;
    	console.log("TermCollections: "+weeklyTermCollections);
    	dashboard.getWeeklyOtherCollections(dbObj);*/
    },
    getWeeklyOtherCollections: function(dbObj){
    	var weeklyOtherCollectionsParams = [dataStorage.getData(JOURNEY_ID),dataStorage.getData(USER_ID),dataStorage.getData(WEEK_START_DATE),dataStorage.getData(WEEK_END_DATE)];
    	dbObj.transaction(function(tx) {	  
			tx.executeSql(dbQueries.selectWeeklyOtherCollcetions,weeklyOtherCollectionsParams,function(tx, res) {
				rowCount = res.rows.item(0);
				//console.log("OtherCollections: "+rowCount);
			});
    	},function getWeeklyOtherCollectionsErr(){console.log("error");},function getWeeklyOtherCollectionsSuccess(){
    											weeklyOtherCollections = common.convertToAmount(rowCount.CashSUM);
    											console.log("OtherCollections: "+weeklyOtherCollections);
												dashboard.getWeeklyLoansIssued(dbObj);
    										});
    	/*weeklyOtherCollections = 0;
    	console.log("weeklyOtherCollections: "+weeklyOtherCollections);
    	dashboard.getWeeklyLoansIssued(dbObj);*/
    },
    getWeeklyLoansIssued: function(dbObj){
    	weeklyLoansIssued = common.convertToAmount(0);
    	console.log("weeklyLoansIssued: "+weeklyLoansIssued);
    	dashboard.getWeeklyFloatWithdrawn(dbObj);
    	
    },
    getWeeklyFloatWithdrawn: function(dbObj){
    	weeklyFloatWithdrawn = common.convertToAmount(0);
    	console.log("FloatWithdrawn: "+weeklyFloatWithdrawn);
    	dashboard.getWeeklyCashBanked(dbObj);
    	
    },
    getWeeklyCashBanked: function(dbObj){
    	weeklyCashBanked = common.convertToAmount(0);
    	console.log("weeklyCashBanked: "+weeklyCashBanked);
    	dashboard.getWeeklyOther(dbObj);
    	
    },
    getWeeklyOther: function(dbObj){
    	weeklyOther = common.convertToAmount(0);
    	console.log("weeklyOther: "+weeklyOther);
    	dashboard.getWeeklyBalance(dbObj);
    },
    getWeeklyBalance: function(dbObj){
    	weeklyBalance = 0;
    	if(weeklyBalance<0){
    		weeklyBalance = Math.abs(weeklyBalance);
    		$('span.labelWeeklyBalance').html('Short');
    		$('span.weeklyBalance').addClass('amber');
    	}
    	else if(weeklyBalance>0){
    		$('span.labelWeeklyBalance').html('Over');
    		$('span.weeklyBalance').addClass('amber');
    	}
    	else{
    		$('span.labelWeeklyBalance').html('Balanced');
    		$('span.weeklyBalance').addClass('green');
    	}
    	weeklyBalance = common.convertToAmount(weeklyBalance);
    	console.log("weeklyBalance: "+weeklyBalance);
    	dashboard.refreshWeeklyPage();
    },
    refreshWeeklyPage: function(){
    	$('span.weeklyCallsClosed').html(weeklyCallsClosed);
    	$('span.weeklyTargetCalls').html(weeklyTargetCalls);
    	$('span.weeklyCardPayments').html("&pound;"+weeklyCardPayments);
    	$('span.weeklyPreviousDayCF').html("&pound;"+weeklyPreviousDayCF);
    	$('span.weeklyTermCollections').html("&pound;"+weeklyTermCollections);
    	$('span.weeklyOtherCollections').html("&pound;"+weeklyOtherCollections);
    	$('span.weeklyLoansIssued').html("&pound;"+weeklyLoansIssued);
    	$('span.weeklyFloatWithdrawn').html("&pound;"+weeklyFloatWithdrawn);
    	$('span.weeklyCashBanked').html("&pound;"+weeklyCashBanked);
    	$('span.weeklyOther').html("&pound;"+weeklyOther);
    	$('span.weeklyBalance').html("&pound;"+weeklyBalance);
    	$(".weeklyBar-one .weeklyBar").weeklyProgress();
    },
};

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    
	dataStorage.setData(IS_WEEKLY_VIEW,"");
	//call function
	dashboard.mapDateDay(); 

	var dbObj = dataStorage.initializeDB();
	
	//display week date
	var weekDays = common.calcWeekDays();
	startEndDates = common.calcStartEndDates(weekDays[0],weekDays[1]);
	var startDate = startEndDates[0];
	var endDate = startEndDates[1];
	
	//format start date as "07th, April" if "7th, April"
	var momentStartDate = moment(startDate).format("Do, MMMM");
	var formatedStartDate = momentStartDate.split(",");
	//alert(date[0]);
	if(formatedStartDate[0].length<=3){formatedStartDate[0]="0"+formatedStartDate[0];
	formatedStartDate=formatedStartDate[0]+formatedStartDate[1];}
	
	//format end date as "07th, April" if "7th, April"
	var momentEndDate = moment(endDate).format("Do, MMMM");
	var formatedEndDate = momentEndDate.split(",");
	if(formatedEndDate[0].length<=3){formatedEndDate[0]="0"+formatedEndDate[0];
	formatedEndDate=formatedEndDate[0]+","+formatedEndDate[1];}
	$('div.weekDisplay').text(formatedStartDate + " - " + formatedEndDate);
	
	//day on click of daily
    var selectedDate;
    $('div#day0').on('click',function(){
           selectedDate = $('div#hidden_day0').text();
           dashboard.setAndHighlight(selectedDate,week.DAY0,"div#day0");
           dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
    });
    $('div#day1').on('click',function(){
           selectedDate = $('div#hidden_day1').text();
           dashboard.setAndHighlight(selectedDate,week.DAY1,"div#day1");
           dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
    });
    $('div#day2').on('click',function(){
           selectedDate = $('div#hidden_day2').text();
           dashboard.setAndHighlight(selectedDate,week.DAY2,"div#day2");
           dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
    });
    $('div#day3').on('click',function(){
           selectedDate = $('div#hidden_day3').text();
           dashboard.setAndHighlight(selectedDate,week.DAY3,"div#day3");
           dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
    });
    $('div#day4').on('click',function(){
           selectedDate = $('div#hidden_day4').text();
           dashboard.setAndHighlight(selectedDate,week.DAY4,"div#day4");
           dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
    });
    $('div#day5').on('click',function(){
           selectedDate = $('div#hidden_day5').text();
           dashboard.setAndHighlight(selectedDate,week.DAY5,"div#day5");
           dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
    });
    $('div#day6').on('click',function(){
           selectedDate = $('div#hidden_day6').text();
           dashboard.setAndHighlight(selectedDate,week.DAY6,"div#day6");
           dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
    });
       
    $('li#weekly').on('click',function(){
        $('div#weeklyDashboard').show();
        $('div#dailyDashboard').hide();
        $('li#daily').removeClass('ui-tabs-active ui-state-active') ;
        $('li#weekly').addClass('ui-tabs-active ui-state-active') ;
        dataStorage.setData(IS_WEEKLY_VIEW,"1");
        dataStorage.setData(DASHBOARD_ACTIVE_TAB,"weekly");
        dashboard.getWeeklyCallsClosedFromOfflineDB(dbObj);
    });
    $('li#daily').on('click',function(){
       $('div#dailyDashboard').show();
       $('div#weeklyDashboard').hide();
       $('li#weekly').removeClass('ui-tabs-active ui-state-active') ;
       $('li#daily').addClass('ui-tabs-active ui-state-active') ;
       dataStorage.setData(IS_WEEKLY_VIEW,"");
       dataStorage.setData(DASHBOARD_ACTIVE_TAB,"daily");
       dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
    });
    
    //default daily tab
    if(!dataStorage.getData(DASHBOARD_ACTIVE_TAB)){
        dataStorage.setData(DASHBOARD_ACTIVE_TAB,"daily");
    }
    if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="weekly"){     //set weekly tab as active
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
    else if(dataStorage.getData(DASHBOARD_ACTIVE_TAB)==="daily"){    //set daily tab as active
        //$(document).on('pagecontainerbeforeshow', function() {
        $('li#weekly').removeClass('ui-tabs-active ui-state-active');
        $('li#daily').addClass('ui-tabs-active ui-state-active');
        $('li#daily a').addClass('ui-btn-active');
        $('div#dailyDashboard').css('display','block');
        dashboard.getDailyCallsClosedFromOfflineDB(dbObj);
        //});    
    }
    
    //onclick of view schedule button
    $('#viewDailySchedule').on('click',function(){
    	common.redirect('scheduledCustomers.html');
    });
    //Weekly View
    $('#viewWeeklySchedule').on('click',function(){
    	dataStorage.setData(IS_WEEKLY_VIEW,"1");
    	common.redirect('scheduledCustomers.html');
    });
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
  document.addEventListener("deviceready", onDeviceReady, false);
  sideMenu.getSideMenuAgentDetails();
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

 $(document).on('click','#menuSyncData', function(){
			syncData.initSync();
	});