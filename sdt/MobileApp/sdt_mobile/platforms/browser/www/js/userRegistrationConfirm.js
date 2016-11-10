var verifiedUser;
var isLocked;

function validatePin(){
  var pin1 = $('#gen-pin-1').val();
  var pin2 = $('#gen-pin-2').val();
  var pin3 = $('#gen-pin-3').val();
  var pin4 = $('#gen-pin-4').val();
  
  var cpin1 = $('#confirm-pin-1').val();
  var cpin2 = $('#confirm-pin-2').val();
  var cpin3 = $('#confirm-pin-3').val();
  var cpin4 = $('#confirm-pin-4').val(); 
  
  var pinTotal = pin1 + pin2 + pin3 + pin4;
  var cpinTotal = cpin1 + cpin2 + cpin3 + cpin4;
  var macid = dataStorage.getData(DEVICE_MACADDRESS);
  
  if(pinTotal.length != 4){
        common.alertMessage(messageboxUserRegConfirmPage.checkDigits, callbackReturn, messageboxUserRegConfirmPage.messageTitleWarning);
        clearPin();
  }
  else if(pin1 == pin2 && pin2 == pin3 && pin3 == pin4){
        common.alertMessage(messageboxUserRegConfirmPage.checkSimilar, callbackReturn, messageboxUserRegConfirmPage.messageTitleWarning);
        clearPin();
  }
  else if(parseInt(pin2)-parseInt(pin1) == 1 && parseInt(pin3)-parseInt(pin2) == 1 && parseInt(pin4)-parseInt(pin3) == 1){
        common.alertMessage(messageboxUserRegConfirmPage.checkConsecutive, callbackReturn, messageboxUserRegConfirmPage.messageTitleWarning);
        clearPin();
      
  }
  else if(pinTotal != cpinTotal){
        common.alertMessage(messageboxUserRegConfirmPage.checkPinMismatch, callbackReturn, messageboxUserRegConfirmPage.messageTitleWarning);
        clearPin();
        
  }
  else{
        var encryptedPass = CryptoJS.AES.encrypt(pinTotal, KEY);
        validateNewUser.sendNewRegistrationToDatabase(verifiedUser.userId.toString(), verifiedUser.title, verifiedUser.firstName, verifiedUser.middleName, verifiedUser.lastName, macid, pinTotal, encryptedPass, isLocked);

 }

};

function clearPin(){
    $("input.pin-box").each(function(){
        $(this).val("");
     });
     $('#gen-pin-1').focus();
    $("input.confirm-pin-box").each(function(){
            $(this).val("");
        });
};


function generateFullUserName(){
   var dbObj = dataStorage.initializeDB();
   verifiedUser = JSON.parse(dataStorage.getData(USERREG_AGENT_DATA));
   isLocked = (verifiedUser.isActive==true)?0:1;
   
   var userFullName = "";
    if(verifiedUser.title){
            userFullName = userFullName + verifiedUser.title+" ";
        }
        if(verifiedUser.firstName){
            userFullName = userFullName + verifiedUser.firstName+" ";
        }
        if(verifiedUser.middleName){
            userFullName = userFullName + verifiedUser.middleName+" ";
        }
        if(verifiedUser.lastName){
            userFullName = userFullName + verifiedUser.lastName+" ";
        }
        
   $("label#user-fullName").text(userFullName);
};

function onDeviceReady() {
    console.log(navigator.notification);
};

$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);	
    generateFullUserName();
});

$(window).on('load',function(){
	$('.pin-box').autotab({format: 'number'});
	$('.confirm-pin-box').autotab({format: 'number'});
});
