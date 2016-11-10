package com.mastek.branchbalancing.login;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.microsoft.aad.adal4j.AuthenticationResult;

@Controller
@RequestMapping(value={"/", "/app"})
public class ADController {

    @RequestMapping(method = { RequestMethod.GET, RequestMethod.POST })
    public String getDirectoryObjects(ModelMap model, HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession();
        AuthenticationResult result = (AuthenticationResult) session.getAttribute(AuthHelper.PRINCIPAL_SESSION_NAME);
                
        if (result == null) {
            model.addAttribute("error", new Exception("AuthenticationResult not found in session."));
            return "app/error";
        } 
        else {
           
            try {
            	User user = null;
            	String graphApiVersion = "1.6";
            	String userType = "";
            	            	
                user = this.getUserFromGraph(result.getAccessToken(), session.getServletContext().getInitParameter("tenant"), graphApiVersion);
                
                if(user!=null){
                
                	String adSuperUserGroupID = "af208be5-085c-4cc6-b6ad-2d8ff1866b2b";
                	boolean isUserMemberOfSuperUserGroup = isUserMemberOfGroup(adSuperUserGroupID, result.getAccessToken(), session.getServletContext().getInitParameter("tenant"), user, graphApiVersion);
                	
                	if(isUserMemberOfSuperUserGroup==false){
                		
                		String adGroupID = "974dbb58-f38b-4e80-9d65-3dcbf7ce19c5";
                		boolean isUserMemberOfBBGroup = isUserMemberOfGroup(adGroupID, result.getAccessToken(), session.getServletContext().getInitParameter("tenant"), user, graphApiVersion);
                		
                		if(isUserMemberOfBBGroup==false){
	                		model.addAttribute("firstName", user.getGivenName());
	                        model.addAttribute("lastName", user.getSurname());
	                		return "app/error";
                		}else{
                			userType = "Admin"; 
                		}
                	}else{
                		userType = "SuperUser";
                	}
                }
                
                model.addAttribute("firstName", user.getGivenName());
                model.addAttribute("lastName", user.getSurname());
                model.addAttribute("emailID", user.getUserPrincipalName());
                model.addAttribute("userType", userType);
                
            } catch (Exception e) {
                model.addAttribute("error", e);
                return "app/error";
            }
        }
        return "app/dashboard";
    }

    private User getUserFromGraph(String accessToken, String tenant, String graphApiVersion) throws Exception {
        String graphAPIGetUserURL = "https://graph.windows.net/%s/me?api-version=2013-04-05";
    	
    	URL url = new URL(String.format(graphAPIGetUserURL, tenant, accessToken));

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        
        conn.setRequestProperty("api-version", graphApiVersion);
        conn.setRequestProperty("Authorization", accessToken);
        conn.setRequestProperty("Accept", "application/json;odata=minimalmetadata");
        String responseFromConnection = HttpClientHelper.getResponseStringFromConn(conn, true);
       
        int responseCode = conn.getResponseCode();
        JSONObject response = HttpClientHelper.processGoodRespStr(responseCode, responseFromConnection);
        
        JSONObject userInfo = new JSONObject();
        userInfo = JSONHelper.fetchDirectoryObjectJSONObject(response);
        
        User user = new User(); 
        JSONHelper.convertJSONObjectToDirectoryObject(userInfo, user);
        
        return user;
    }
    
    private boolean isUserMemberOfGroup(String adGroupID,String accessToken, String tenant, User userInfo, String graphApiVersion) throws Exception{
    	
    	String graphAPIURL = "https://graph.windows.net/%s/isMemberOf?api-version";
    	URL url = new URL(String.format(graphAPIURL, tenant));
    	
    	HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("api-version", graphApiVersion);
        conn.setRequestProperty("Authorization", accessToken);
        conn.setRequestProperty("Accept", "application/json");
        
        JSONObject inputJson = new JSONObject();
        inputJson.put("groupId", adGroupID);
        inputJson.put("memberId", userInfo.getObjectId());
        
		OutputStream os = conn.getOutputStream();
		os.write(inputJson.toString().getBytes());
		os.flush();
		
		String responseFromConnection = HttpClientHelper.getResponseStringFromConn(conn, true);
	       
        int responseCode = conn.getResponseCode();
        JSONObject response = HttpClientHelper.processGoodRespStr(responseCode, responseFromConnection);
        
        JSONObject responseJsonObj = new JSONObject();
        responseJsonObj = JSONHelper.fetchDirectoryObjectJSONObject(response);
        
        boolean isMemberOfGroup = responseJsonObj.getBoolean("value");
    	return isMemberOfGroup;
    }
}
