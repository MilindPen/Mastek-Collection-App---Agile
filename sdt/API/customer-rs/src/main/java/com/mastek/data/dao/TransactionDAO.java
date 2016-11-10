package com.mastek.data.dao;

import java.util.List;

import com.mastek.domain.TransactionHistoryDO;
import com.mastek.exception.DataStoreException;

public interface TransactionDAO
{
	List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate, List<Long> agreementIds) throws DataStoreException;
}
