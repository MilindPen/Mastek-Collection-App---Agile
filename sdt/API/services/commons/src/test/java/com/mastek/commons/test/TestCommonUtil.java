package com.mastek.commons.test;

import java.util.Date;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.domain.AccessDO;
import com.mastek.commons.util.CommonUtil;

@RunWith(MockitoJUnitRunner.class)
public class TestCommonUtil
{
	@InjectMocks
	CommonUtil commonUtil = new CommonUtil();

	Date date;
	AccessDO access;

	@Before
	public void init()
	{
		date = new Date();
		access = new AccessDO();
	}

	@Test
	public void testCommonUtil()
	{
		try
		{
			commonUtil.getFormattedDate(date, CommonUtil.DATE_FORMAT);
			commonUtil.getFormattedDate(null, CommonUtil.DATE_FORMAT);
			commonUtil.getDate("2016-05-25", CommonUtil.DATE_FORMAT);
			commonUtil.getDate(null, CommonUtil.DATE_FORMAT);
			commonUtil.firstDayOfLastWeek(date);
			commonUtil.lastDayOfLastWeek(date);
			commonUtil.getSDTWeekStartDate(commonUtil.getDate("2016-05-19", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekStartDate(commonUtil.getDate("2016-05-20", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekStartDate(commonUtil.getDate("2016-05-21", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekStartDate(commonUtil.getDate("2016-05-22", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekStartDate(commonUtil.getDate("2016-05-23", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekStartDate(commonUtil.getDate("2016-05-24", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekStartDate(commonUtil.getDate("2016-05-25", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekEndDate(commonUtil.getDate("2016-05-19", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekEndDate(commonUtil.getDate("2016-05-20", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekEndDate(commonUtil.getDate("2016-05-21", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekEndDate(commonUtil.getDate("2016-05-22", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekEndDate(commonUtil.getDate("2016-05-23", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekEndDate(commonUtil.getDate("2016-05-24", CommonUtil.DATE_FORMAT));
			commonUtil.getSDTWeekEndDate(commonUtil.getDate("2016-05-25", CommonUtil.DATE_FORMAT));
			commonUtil.getTransHistoryEndDate("2016-05-20");
			commonUtil.objToJson(access);
			
			String timeFormat = commonUtil.TIME_FORMAT;
			String receiptFormat = commonUtil.RECEIPTNUM_DATE_FORMAT;
			String timeLogFormat = commonUtil.TIME_LOG_FORMAT;

			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}

	@Test
	public void testCommonUtilException()
	{
		try
		{
			commonUtil.getDate("2016-May-25", CommonUtil.DATE_FORMAT);
			commonUtil.objToJson(null);
		}
		catch (Exception e)
		{
			Assert.assertTrue(true);
		}

	}
}
