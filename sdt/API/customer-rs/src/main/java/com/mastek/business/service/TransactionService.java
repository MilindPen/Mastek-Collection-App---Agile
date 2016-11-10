package com.mastek.business.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mastek.domain.TransactionHistoryDO;
import com.mastek.exception.ApplicationException;
import com.mastek.exception.SystemException;

@Component
public interface TransactionService
{
	List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate, List<Long> agreementIds) throws SystemException, ApplicationException;
}
