package com.mastek.business.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mastek.business.service.TransactionService;
import com.mastek.data.dao.TransactionDAO;
import com.mastek.domain.TransactionHistoryDO;
import com.mastek.exception.ApplicationException;
import com.mastek.exception.DataStoreException;
import com.mastek.exception.SystemException;

@Component
public class TransactionServiceImpl implements TransactionService
{
	@Autowired
	TransactionDAO transactionDAO;
	
	@Override
	public List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate, List<Long> agreementIds) throws SystemException, ApplicationException
	{
		try
		{
			return transactionDAO.getTransactionHistory(startDate, endDate, agreementIds);
		}
		catch (DataStoreException dataStoreException)
		{
			SystemException systemException = dataStoreException.getSystemException();
			throw systemException;
		}
	}

}
