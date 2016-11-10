var login = {
   initializePage: function(){
       $('#userId').val("");
        $('#journeyId').val("");
        $('#btnLogin').on('click',function(){
        var userId = $('#userId').val();
        var journeyId = $('#journeyId').val();
        dataStorage.setData(USER_ID,userId);
        dataStorage.setData(JOURNEY_ID,journeyId);
       
        //call function to initialize database
        var dbObj = dataStorage.initializeDB();
        dataStorage.checkDataInOfflineDB(dbObj);
   
        });
   } 
};

/***************************************actions to perform on document ready************************************************/
$(document).on('ready',function(){
    login.initializePage();
});
