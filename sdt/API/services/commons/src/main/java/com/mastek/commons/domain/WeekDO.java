package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

public class WeekDO
{

@JsonProperty(value = "weekNumber")
int weekNo;

@JsonProperty(value = "yearNumber")
int yearNo;

@JsonProperty(value = "startDate")
String startDate;

@JsonProperty(value = "endDate")
String endDate;
/**
 * @return the weekNumber
 */
public int getWeekNo()
{
	return weekNo;
}

/**
 * @param weekNumber the weekNumber to set
 */
public void setWeekNo(int weekNumber)
{
	this.weekNo = weekNumber;
}

/**
 * @return the yearNumber
 */
public int getYearNo()
{
	return yearNo;
}

/**
 * @param yearNumber the yearNumber to set
 */
public void setYearNo(int yearNumber)
{
	this.yearNo = yearNumber;
}

/**
 * @return the startDate
 */
public String getStartDate()
{
	return startDate;
}

/**
 * @param startDate the startDate to set
 */
public void setStartDate(String startDate)
{
	this.startDate = startDate;
}

/**
 * @return the endDate
 */
public String getEndDate()
{
	return endDate;
}

/**
 * @param endDate the endDate to set
 */
public void setEndDate(String endDate)
{
	this.endDate = endDate;
}



}
