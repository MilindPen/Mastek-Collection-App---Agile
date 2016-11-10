/**
 * 
 */
package com.mastek.balancing.rest.service;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

public class SwaggerConfiguration extends Application {

	HashSet<Object> singletons = new HashSet<Object>();

	   public SwaggerConfiguration()
	   {
		   singletons.add(new BalancingRESTImpl());
	   }

	   //register provider here like exceptionhandler in resteasy
	   @Override
	   public Set<Class<?>> getClasses()
	   {
	      HashSet<Class<?>> set = new HashSet<Class<?>>();
	      return set;
	   }

	   @Override
	   public Set<Object> getSingletons()
	   {
	      return singletons;  
	   }
}
