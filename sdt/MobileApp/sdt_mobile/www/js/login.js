var offlinePin;
var devMac;

var login = {
   
	initializePage: function(){
		//call function to initialize database
   
		window.localStorage.clear();
		//alert(devMac);
		var dbObj = dataStorage.initializeDB();
		//dataStorage.setData(DEVICE_MACADDRESS, devMac);
		dataStorage.checkAgentTableInOfflineDB(dbObj);
		login.getSDTWeek();
		//return;
        
        if (buildAttributes.isTrainingApp){
        	$('#id-training-label').show();	
        } else {
        	$('#id-training-label').hide();
        }
   },

   getSDTWeek: function(){
  	 var dbObj = dataStorage.initializeDB();
	 try{
		//execute SQL query
	     dbObj.transaction(function(tx) {
	         tx.executeSql(dbQueries.selectSDTWeekStatement,[],function(tx,res){
	             var len = res.rows.length;
	             if(len > 0) {
	           			var weekStartDate = res.rows.item(0)["StartDate"];
	           			var weekEndDate = res.rows.item(0)["EndDate"];
	           			dataStorage.setData(WEEK_START_DATE,weekStartDate);
	           			dataStorage.setData(WEEK_END_DATE,weekEndDate);
	           			//common.redirect("dashboard.html");
	             }

	         });
	     },function error(){},function success(){
	 	  						login.isUserLocked();
	   						});
	 }	
     catch(e){
    	console.log("Error fetching SDT Week data"); 
     }
},
isUserLocked: function(){
	 var dbObj = dataStorage.initializeDB();
	 var isLocked;
	 try{
		//execute SQL query
	     dbObj.transaction(function(tx) {
	         tx.executeSql(dbQueries.selectUserLocked,[],function(tx,res){
	             var len = res.rows.length;
	             if(len > 0) {
	           			isLocked = res.rows.item(0)["IsLocked"];
	           			dataStorage.setData(IS_USER_LOCKED,isLocked);
	           		//get todays date
	           			var todaysDate=Date.today();
	           			todaysDate = todaysDate.toString().split(" ");
	           		    var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
	           		    var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
	           		    dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
	           		    var weekStartDate = dataStorage.getData(WEEK_START_DATE);
	           		    var weekEndDate = dataStorage.getData(WEEK_END_DATE);
	           		    var isLocked = dataStorage.getData(IS_USER_LOCKED);
	           		    
	           		    //check if user is already locked
	           			if(isLocked==1){
	           				/*if(formattedTodaysDate>weekEndDate){
	           					common.alertMessage(messageboxLoginPage.messageUserBlocked, callbackReturn, messageboxLoginPage.messageTitleError);
	           					//disable the login button
	           			    	$('.login-btn').attr('disabled','disabled');
	           				}*/
	           				/*
	           				 //if user is locked on the device and device date is within SDT Week, check on staging db
	           				if(formattedTodaysDate>=weekStartDate && formattedTodaysDate<=weekEndDate){
	           					service.checkUserIsActive();
	           				}
	           				 */
	           				//if user is locked on the device, check on staging db
	           				//service.checkUserIsActive();
	           				var networkState = navigator.connection.type;

		           		     if (networkState !== Connection.NONE) {
		           		    	//service.checkUserIsActive();
								isSyncingForLockedUser = true;
								syncData.initSync(false);
		           		     }
		           		     else{
		           		    	common.alertMessage(messageboxLoginPage.messageUserBlocked, callbackReturn, messageboxLoginPage.messageTitleError);
		           		    	//disable the login button
		           		    	$('.login-btn').attr('disabled','disabled');
		           		     }
	           			}
	           			else if(formattedTodaysDate>weekEndDate){
	           		    	//update mtbUser table to lock the user
	           		    	dataStorage.updateMtbUserTable(1);
	           		    	
	           		    	var networkState = navigator.connection.type;

		           		     if (networkState !== Connection.NONE) {
		           		    	service.checkUserIsActive();
		           		     }
		           		     else{
		           		    	common.alertMessage(messageboxLoginPage.messageUserBlocked, callbackReturn, messageboxLoginPage.messageTitleError);
		           		    	//disable the login button
		           		    	$('.login-btn').attr('disabled','disabled');
		           		     }
	           		    	
	           		    	
	           		    	/*common.alertMessage(messageboxLoginPage.messageUserBlocked, callbackReturn, messageboxLoginPage.messageTitleError);
	           				//disable the login button
	           		    	$('.login-btn').attr('disabled','disabled');*/
	           		    }
	             }

	         });
	   });
	 }//try
	 catch(e){
		 console.log("Error checking locking mode of user");
	 }
	
   }
};

function validateLogin(){
    var pin1 = $('#gen-pin-1').val();
    var pin2 = $('#gen-pin-2').val();
    var pin3 = $('#gen-pin-3').val();
    var pin4 = $('#gen-pin-4').val();
	Keyboard.shrinkView(false);
    var enteredPin = pin1 + pin2 + pin3 + pin4;
    
    if(enteredPin.length != 4){
      common.alertMessage(messageboxLoginPage.checkPinLength, callbackReturn, messageboxLoginPage.messageTitleWarning);
      $("input.pin-box").each(function(){
         $(this).val("");
      });
      $('#gen-pin-1').focus();
      return;
  }
  else{
        var dbObj = dataStorage.initializeDB();
        var offlineDbAgentID = [dataStorage.getData(USER_ID)];
        dbObj.transaction(function(tx){
            tx.executeSql(dbQueries.selectAgentPinStatement, offlineDbAgentID, function(tx,res){
                offlinePin = res.rows.item(0)["Pin"];
                var decrypted = CryptoJS.AES.decrypt(offlinePin, KEY);
			var dbPassword=decrypted.toString(CryptoJS.enc.Utf8);
                if(enteredPin == dbPassword){
                    dataStorage.checkDataInOfflineDB(dbObj);
                }
                else{
                    common.alertMessage(messageboxLoginPage.validateUserLogin, callbackReturn, messageboxLoginPage.messageTitleWarning);
                    $("input.pin-box").each(function(){
                        $(this).val("");
                    });
                    $('#gen-pin-1').focus();
                }
        });
            
    });
  }
};

/*function callbackReturn(){
    return false;
};*/

function onDeviceReady() {
    /*console.log(navigator.notification);*/
    //alert("ondeviceready");
    console.log(device.platform);
    dataStorage.setData(DEVICE_TYPE, device.platform);
    var devMac = "1";
    dataStorage.setData(DEVICE_MACADDRESS, devMac);
    dataStorage.setData(DEVICE_TYPE, dataStorage.getData(DEVICE_TYPE));
    login.initializePage();
	document.addEventListener("resume", onResume, false);
	document.addEventListener("backbutton", onBackKeyDown, false);
}

function onResume() {
	//alert("onresume");
	console.log(device.platform);
    dataStorage.setData(DEVICE_TYPE, device.platform);
    var devMac = "1";
    dataStorage.setData(DEVICE_MACADDRESS, devMac);
    dataStorage.setData(DEVICE_TYPE, dataStorage.getData(DEVICE_TYPE));
    login.initializePage();
   
 }

function onBackKeyDown(e) {
	e.preventDefault();
}

$(document).on("pagebeforeshow","#loginPage", function() {
     window.sessionStorage.clear();
     document.addEventListener("deviceready", onDeviceReady, false);
     
  });


$(window).on('load',function(){
	//$('.pin-box').autotab({format: 'number'});
	
	//get todays date
	var todaysDate=Date.today();
	todaysDate = todaysDate.toString().split(" ");
	 var splitTodaysDate = todaysDate[3]+"-"+todaysDate[1]+"-"+todaysDate[2];
	 var formattedTodaysDate = formatDate.reverseDateFormatter(splitTodaysDate);
	 dataStorage.setData(TODAYS_DATE,formattedTodaysDate);
             
     Keyboard.shrinkView(true);
     window.scrollTo(0,50);
});


function moveOnMax(e,field, nextFieldID) {
    
    Keyboard.shrinkView(true)
    if (field.value.length === field.maxLength) {
        window.scrollTo(0,50);
        nextFieldID.focus();
    }else{
		field.value = "";
	}
}