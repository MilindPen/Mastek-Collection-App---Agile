var offlinePin;
var devMac;

var login = {
   initializePage: function(){
               //call function to initialize database
        //sessionStorage.clear();
	   window.localStorage.clear();
        //alert(devMac);
        var dbObj = dataStorage.initializeDB();
        //dataStorage.setData(DEVICE_MACADDRESS, devMac);
        dataStorage.checkAgentTableInOfflineDB(dbObj);
       return;
       
   }
};

function validateLogin(){
    var pin1 = $('#gen-pin-1').val();
    var pin2 = $('#gen-pin-2').val();
    var pin3 = $('#gen-pin-3').val();
    var pin4 = $('#gen-pin-4').val();
  
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
        var journeyId = $("input#journey-id").val();
        dataStorage.setData(JOURNEY_ID, journeyId);
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
    console.log(device.platform);
    dataStorage.setData(DEVICE_TYPE, device.platform);
    var devMac = "1";
    dataStorage.setData(DEVICE_MACADDRESS, devMac);
    dataStorage.setData(DEVICE_TYPE, dataStorage.getData(DEVICE_TYPE));
    login.initializePage();

};


$(document).on("pagebeforeshow","#loginPage", function() {
    
     document.addEventListener("deviceready", onDeviceReady, false);
      
  });


$(window).on('load',function(){
	$('.pin-box').autotab({format: 'number'});
});
