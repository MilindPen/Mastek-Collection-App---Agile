/**
 * 
 */
package com.mastek.commons.util;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class PropertyResolver
{

	private static final Logger logger=LoggerFactory.getLogger(PropertyResolver.class);
	/** The prop. */
	static Properties msgProp;
	static Properties applicationProp;

	/**
	 * Instantiates a new property resolver.
	 *
	 * @param propFileName the prop file name
	 */
	private PropertyResolver(String[] propFileNames)
	{
		if(validateArrayForNullSize(propFileNames)){

			for(String propFileName:propFileNames){
				try(InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propFileName))
				{
					if (inputStream != null)
					{
						if(propFileName.startsWith("messages")){
							msgProp = new Properties();
							msgProp.load(inputStream);  
						}else if(propFileName.startsWith("application")){
							applicationProp =new Properties();
							applicationProp.load(inputStream);
						}else{
							throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
						}
					}
					else
					{
						throw new FileNotFoundException("property file '" + propFileName + "' not found in the classpath");
					}
				}
				catch (Exception e)
				{
					logger.info("PropertyResolver"+e);
				}
			}
		}
	}

	/**
	 * Gets the property.
	 *
	 * @param id the id
	 * @return the property
	 */
	public static String getProperty(String id)
	{
		return msgProp.getProperty(id);
	}

	public static String getAppProperty(String id){
		return applicationProp.getProperty(id);
	}
	
	private boolean validateArrayForNullSize(String[] propFileNames){
		if(propFileNames == null || propFileNames.length==0)
			return false;
		else
			return true;
	}
}
