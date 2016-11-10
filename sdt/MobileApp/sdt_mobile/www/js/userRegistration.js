
function onDeviceReady() {
    console.log(navigator.notification);
    //alert("notification plugin added");
};


$(document).ready(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});

//Next Button - Go to Pin and Register
$(document).on('click','#submit',function(){
    var userid = $("input#user-id").val();
    var surname = $("input#surname").val();
        
    // if both fields empty
    if(userid == "" && surname == ""){
        $("input#user-id").focus();
        common.alertMessage(messageboxUserRegPage.checkEmptyFields, callbackReturn, messageboxUserRegPage.messageTitleError);
    }
    else if(userid == ""){ //if userid empty
        $("input#user-id").focus();
        common.alertMessage(messageboxUserRegPage.checkEmptyFields, callbackReturn, messageboxUserRegPage.messageTitleError);
    }
    else if(surname == ""){ //if surname empty
        $("input#surname").focus();
        common.alertMessage(messageboxUserRegPage.checkEmptyFields, callbackReturn, messageboxUserRegPage.messageTitleError);
    }
    else{ //if all fields filled
    	var mac = dataStorage.getData(DEVICE_MACADDRESS);
        validateNewUser.getUser(userid,surname,mac);
    }
});

/*function callbackReturn(){
    return false;
};*/




