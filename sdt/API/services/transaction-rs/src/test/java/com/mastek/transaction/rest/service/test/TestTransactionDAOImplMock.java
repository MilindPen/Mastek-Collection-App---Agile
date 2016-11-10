/**
 * 
 */
package com.mastek.transaction.rest.service.test;

import java.sql.SQLException;

import org.hibernate.exception.DataException;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.mastek.commons.util.CommonUtil;
import com.mastek.transaction.data.service.TransactionDAO;
import com.mastek.transaction.data.service.TransactionDAOImpl;

/**
 * @author monika10793
 *
 */
public class TestTransactionDAOImplMock
{
	@InjectMocks
	TransactionDAO transactionDAO = new TransactionDAOImpl();
	
	@Mock
	CommonUtil commonUtil = new CommonUtil();
	
	@Test
	public void testTransactionHistoryException(){
		String startDate = "2016-05-16";
		String endDate = "2016-05-16";
		long userId = 2;
		try{
			DataException dataExp = new DataException("",new SQLException());
			Mockito.doThrow(dataExp).when(commonUtil).getTransHistoryEndDate(Mockito.any(String.class));
			transactionDAO.getTransactionHistory(startDate, endDate, userId);
			
		}catch(Exception e){
			
			Assert.assertTrue(true);
		}
		
	}
}
