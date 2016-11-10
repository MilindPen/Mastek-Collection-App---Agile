var instance;

var session = {

    getInstance: function() {
        if (!instance) {
            instance = session.init();
        }
        return instance;
    },

    init: function() {

        return {
            // Public methods and variables.
            set: function(sessionData) {
                window.localStorage.setItem(SESSION_ID_KEY, JSON.stringify(sessionData));
            },
            get: function() {
                var result = null;
                try {
                    result = JSON.parse(window.localStorage.getItem(SESSION_ID_KEY));
                } catch (e) { }
                return result;
            }
        };
    },

    createSession: function(userId) {
        var today = new Date();
        var expirationDate = new Date();

        expirationDate.setTime(today.getTime() + SESSION_TIMEOUT);  //Calculate session expiration time

        var sessionObject = {
            userId: userId,
            expirationDate: expirationDate
        }

        session.getInstance().set(sessionObject);
    },

    sessionValidate: function(userId) {
    	console.log("validating session");
        var agentSession = session.getInstance().get();
        var today = new Date();

        if (new Date(agentSession.expirationDate).getTime() >= today.getTime()) {
            session.createSession(userId);   //Session is active and reset session expiration date and time               
        } else {
            window.localStorage.clear();      //Session got expired redirect to login screen
            common.redirect("login.html");

        }
    }
}