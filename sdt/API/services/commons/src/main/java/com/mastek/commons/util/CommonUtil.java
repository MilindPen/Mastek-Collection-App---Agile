package com.mastek.commons.util;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mastek.commons.exception.SystemException;
import com.mastek.commons.exception.SystemException.Type;

/**
 * The Class CommonUtil.
 */
public class CommonUtil
{
	
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(CommonUtil.class);

	/** The Constant DATE_FORMAT. */
	public static final String DATE_FORMAT = "yyyy-MM-dd";
	
	/** The Constant DATETIME_FORMAT. */
	public static final String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

	/** The Constant TIME_FORMAT. */
	public static final String TIME_FORMAT = "HH:mm";

	/** The Constant RECEIPTNUM_DATE_FORMAT. */
	public static final String RECEIPTNUM_DATE_FORMAT = "ddMMyyHHmm";
	
	/** The Constant TIME_LOG_FORMAT. */
	public static final String TIME_LOG_FORMAT = "HH:mm:ss";
	
	/**
	 * Gets the formatted date.
	 *
	 * @param date the date
	 * @param format the format
	 * @return the formatted date
	 */
	public static String getFormattedDate(Date date, String format)
	{
		if (date != null)
		{
			SimpleDateFormat dformatter = new SimpleDateFormat(format);
			return dformatter.format(date);
		}
		return "";
	}

	/**
	 * Gets the date.
	 *
	 * @param date the date
	 * @param format the format
	 * @return the date
	 */
	public static Date getDate(String date, String format)
	{

		if (date != null && !date.isEmpty())
		{
			try
			{
				SimpleDateFormat formatter = new SimpleDateFormat(format);
				return formatter.parse(date);
			}
			catch (ParseException e)
			{
				logger.info("getDate" + e);
			}
		}
		return null;
	}

	/**
	 * Gets the SDT week start date.
	 *
	 * @param date the date
	 * @return the SDT week start date
	 */
	// Do not delete
	public static Date getSDTWeekStartDate(Date date)
	{
		Calendar cs = Calendar.getInstance();
		cs.setTime(date);
		int dayOfWeek = cs.get(Calendar.DAY_OF_WEEK);

		switch(dayOfWeek)
		{

			case 1:
				cs.add(Calendar.DATE, -3);
				break;
			case 2:
				cs.add(Calendar.DATE, -4);
				break;
			case 3:
				cs.add(Calendar.DATE, -5);
				break;
			case 4:
				cs.add(Calendar.DATE, -6);
				break;
			case 5:
				cs.add(Calendar.DATE, 0);
				break;
			case 6:
				cs.add(Calendar.DATE, -1);
				break;
			case 7:
				cs.add(Calendar.DATE, -2);
				break;
			default:
				throw new SystemException(Type.UE);
		}

		return  cs.getTime();
	}

	/**
	 * Gets the SDT week end date.
	 *
	 * @param date the date
	 * @return the SDT week end date
	 */
	// Do not delete
	public static Date getSDTWeekEndDate(Date date)
	{
		Calendar ce = Calendar.getInstance();
		ce.setTime(date);
		int dayOfWeek = ce.get(Calendar.DAY_OF_WEEK);

		switch(dayOfWeek)
		{

		case 1:
			ce.add(Calendar.DATE, 3);
			break;
		case 2:
			ce.add(Calendar.DATE, 2);
			break;
		case 3:
			ce.add(Calendar.DATE, 1);
			break;
		case 4:
			ce.add(Calendar.DATE, 0);
			break;
		case 5:
			ce.add(Calendar.DATE, 6);
			break;
		case 6:
			ce.add(Calendar.DATE, 5);
			break;
		case 7:
			ce.add(Calendar.DATE, 4);
			break;
		default:
			throw new SystemException(Type.UE);
		}

		return ce.getTime();
	}

	/**
	 * First day of last week.
	 *
	 * @param date the date
	 * @return the date
	 */
	public static Date firstDayOfLastWeek(Date date)
	{
		Calendar c = Calendar.getInstance();
		c.setTime(date);

		// last week
		c.add(Calendar.WEEK_OF_YEAR, -1);
		// first day
		c.set(Calendar.DAY_OF_WEEK, c.getFirstDayOfWeek());
		return c.getTime();
	}

	/**
	 * Last day of last week.
	 *
	 * @param date the date
	 * @return the date
	 */
	public static Date lastDayOfLastWeek(Date date)
	{
		Calendar c = Calendar.getInstance();
		c.setTime(date);

		// first day of this week
		c.set(Calendar.DAY_OF_WEEK, c.getFirstDayOfWeek());
		// last day of previous week
		c.add(Calendar.DAY_OF_MONTH, -1);
		return c.getTime();
	}

	/**
	 * Gets the previous sdt week end date.
	 *
	 * @param date the date
	 * @return the previous sdt week end date
	 */
	public static Date getPreviousSDTWeekEndDate(Date date)
	{
		// Pass date as today
		Date sdtStart = getSWeekStartDate(date);
		Date lastDayPreWeek = lastDayOfLastWeek(sdtStart);
		return getSWeekEndDate(lastDayPreWeek);
	}

	/**
	 * Gets the agreement start week end date.
	 *
	 * @param date the date
	 * @return the agreement start week end date
	 */
	public static Date getAgreementStartWeekEndDate(Date date)
	{
		// Pass agreement start date
		return getSWeekEndDate(date);
	}

	/**
	 * Gets the elapsed week.
	 *
	 * @param currentDate the current date
	 * @param agreementDate the agreement date
	 * @return the elapsed week
	 */
	public static long getElapsedWeek(Date currentDate, Date agreementDate)
	{
		long elapsedWeek=0;
		if(getFormattedDate(currentDate,DATE_FORMAT).equals(getFormattedDate(agreementDate,DATE_FORMAT)) || getFormattedDate(agreementDate,DATE_FORMAT) > getFormattedDate(currentDate,DATE_FORMAT)){
			elapsedWeek = 0;
		}else{
			long diff = getPreviousSDTWeekEndDate(currentDate).getTime() - getAgreementStartWeekEndDate(agreementDate).getTime();
			long diffDays = diff / (24 * 60 * 60 * 1000);
			elapsedWeek = ((diffDays / 7) + 1);
			if (elapsedWeek < 0)
			{
				elapsedWeek = 0;
			}
		}
		return elapsedWeek;
	}
	
	/**
	 * Gets the trans history start date.
	 *
	 * @param startDate the start date
	 * @return the trans history start date
	 */
	public static Date getTransHistoryStartDate(String startDate){
		int weeks = Integer.parseInt(PropertyResolver.getAppProperty("sdt.history.week"));
		int days = Integer.parseInt(PropertyResolver.getAppProperty("sdt.history.week.days"));
		int subDays = weeks*days;
		Date date = getDate(startDate,DATE_FORMAT);
		Calendar ce = Calendar.getInstance();
		ce.setTime(date);
		ce.add(Calendar.DATE,-subDays);
		return ce.getTime();
	}
	
	/**
	 * Gets the trans history end date.
	 *
	 * @param startDate the start date
	 * @return the trans history end date
	 */
	public static Date getTransHistoryEndDate(String startDate){
		Date date = getDate(startDate,DATE_FORMAT);
		Calendar ce = Calendar.getInstance();
		ce.setTime(date);
		ce.add(Calendar.DATE,-1);
		return ce.getTime();
	}
	
	/**
	 * Obj to json.
	 *
	 * @param obj the obj
	 * @return the string
	 */
	public static String objToJson(Object obj) {
		ObjectMapper mapper = new ObjectMapper();
		try
		{
			return mapper.writeValueAsString(obj);
		}
		catch (IOException e)
		{
			logger.info("objToJson" + e);
		}
		return null;
	}
	
	/**
	 * Gets the s week start date.
	 *
	 * @param date the date
	 * @return the s week start date
	 */
	public static Date getSWeekStartDate(Date date)
	{
		String sdtStartDay = PropertyResolver.getAppProperty("sdt.week.start.day");
		Calendar cs = Calendar.getInstance();
		cs.setTime(date);
		int dayOfWeek = cs.get(Calendar.DAY_OF_WEEK);

		int[] arr_thu = {-3,-4,-5,-6,0,-1,-2};
		int[] arr_wed = {-4,-5,-6,0,-1,-2,-3};
		int[] arr_tue = {-5,-6,0,-1,-2,-3,-4};
		int[] arr_mon = {-6,0,-1,-2,-3,-4,-5};
		int[] arr_sun = {0,-1,-2,-3,-4,-5,-6};
		int[] arr_sat = {-1,-2,-3,-4,-5,-6,0};
		int[] arr_fri = {-2,-3,-4,-5,-6,0,-1};
		
		Map counter = new HashMap();
		counter.put("4", arr_wed);
		counter.put("5", arr_thu);
		counter.put("6", arr_fri);
		counter.put("7", arr_sat);
		counter.put("1", arr_sun);
		counter.put("2", arr_mon);
		counter.put("3", arr_tue);
		int[] arr = (int[])counter.get(sdtStartDay);
			
		switch(dayOfWeek)
		{
			case 1:
				cs.add(Calendar.DATE, arr[0]);
				break;
			case 2:
				cs.add(Calendar.DATE, arr[1]);
				break;
			case 3:
				cs.add(Calendar.DATE, arr[2]);
				break;
			case 4:
				cs.add(Calendar.DATE, arr[3]);
				break;
			case 5:
				cs.add(Calendar.DATE, arr[4]);
				break;
			case 6:
				cs.add(Calendar.DATE, arr[5]);
				break;
			case 7:
				cs.add(Calendar.DATE, arr[6]);
				break;
			default:
				throw new SystemException(Type.UE);
		}

		return  cs.getTime();
	}
	
	/**
	 * Gets the s week end date.
	 *
	 * @param date the date
	 * @return the s week end date
	 */
	public static Date getSWeekEndDate(Date date)
	{
		String sdtStartDay = PropertyResolver.getAppProperty("sdt.week.start.day");
		Calendar ce = Calendar.getInstance();
		ce.setTime(date);
		int dayOfWeek = ce.get(Calendar.DAY_OF_WEEK);
		
		int[] arr_thu = {3,2,1,0,6,5,4};
		int[] arr_wed = {2,1,0,6,5,4,3};
		int[] arr_tue = {1,0,6,5,4,3,2};
		int[] arr_mon = {0,6,5,4,3,2,1};
		int[] arr_sun = {6,5,4,3,2,1,0};
		int[] arr_sat = {5,4,3,2,1,0,6};
		int[] arr_fri = {4,3,2,1,0,6,5};
		
		Map counter = new HashMap();
		counter.put("4", arr_wed);
		counter.put("5", arr_thu);
		counter.put("6", arr_fri);
		counter.put("7", arr_sat);
		counter.put("1", arr_sun);
		counter.put("2", arr_mon);
		counter.put("3", arr_tue);
		int[] arr = (int[])counter.get(sdtStartDay);

		switch(dayOfWeek)
		{

		case 1:
			ce.add(Calendar.DATE, arr[0]);
			break;
		case 2:
			ce.add(Calendar.DATE, arr[1]);
			break;
		case 3:
			ce.add(Calendar.DATE, arr[2]);
			break;
		case 4:
			ce.add(Calendar.DATE, arr[3]);
			break;
		case 5:
			ce.add(Calendar.DATE, arr[4]);
			break;
		case 6:
			ce.add(Calendar.DATE, arr[5]);
			break;
		case 7:
			ce.add(Calendar.DATE, arr[6]);
			break;
		default:
			throw new SystemException(Type.UE);
		}

		return ce.getTime();
	}
	
	/**
    * Gets the agreement start date.
    *
    * @param agreementStartDate the agreement start date
    * @return the agreement start date
    */
   public static Date getAgreementStartDate(Date agreementStartDate){
      Calendar ce = Calendar.getInstance();
      ce.setTime(agreementStartDate);
      int dayOfWeek = ce.get(Calendar.DAY_OF_WEEK);
      if(dayOfWeek==5){   // if Thursday
             ce.add(Calendar.DATE, -1);
      }
      return ce.getTime();
   }
}
