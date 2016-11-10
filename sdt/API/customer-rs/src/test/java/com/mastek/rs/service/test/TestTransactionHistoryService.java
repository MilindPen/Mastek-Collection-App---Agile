package com.mastek.rs.service.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.mastek.business.service.TransactionService;
import com.mastek.domain.TransactionHistoryDO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "/application-context.xml"})
public class TestTransactionHistoryService
{
	@Autowired
	TransactionService transactionServiceImpl;
	
	@Test
	public void testGetTransactionHistory(){
		List<Long> agreementIds = new ArrayList<Long>();
		agreementIds.add(1L);
		agreementIds.add(2L);
		agreementIds.add(52L);
		agreementIds.add(3L);
		
		try
		{
			List<TransactionHistoryDO> transHistoryList = transactionServiceImpl.getTransactionHistory("2016-04-14", "2016-04-20", agreementIds);
			Assert.assertTrue(transHistoryList.size()>0);
			TransactionHistoryDO historyDO = transHistoryList.get(0);
			Assert.assertTrue(historyDO.getTransactionId()>0);
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		
	}

}
