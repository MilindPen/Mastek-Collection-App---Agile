package com.mastek.transaction.data.service;

import java.util.List;

import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;

/**
 * The Interface TransactionDAO.
 */
public interface TransactionDAO
{

	/**
	 * Gets the transaction history.
	 *
	 * @param userID the user id
	 * @param journeyID the journey id
	 * @param startDate the start date
	 * @param endDate the end date
	 * @return the transaction history
	 * @throws DataStoreException the data store exception
	 */
	List<CardPaymentDO> getCardPayments(long userID, long journeyID, String startDate, String endDate) throws DataStoreException;

	/**
	 * Gets the transaction synchroniz result.
	 *
	 * @param transactionSyncRequest the transaction sync request
	 * @return the transaction synchroniz result
	 * @throws DataStoreException the data store exception
	 */
	boolean getTransactionSynchronizResult(TransactionSyncRequest transactionSyncRequest) throws DataStoreException;

	/**
	 * Gets the transaction history.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @return the transaction history
	 * @throws DataStoreException the data store exception
	 */
	List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate, long userId) throws DataStoreException;

	/**
	 * Sync balance transactions.
	 *
	 * @param balanceTransactionRequest the balance transaction request
	 * @return true, if successful
	 * @throws DataStoreException the data store exception
	 */
	boolean syncBalanceTransactions(BalanceTransactionRequest balanceTransactionRequest) throws DataStoreException;
	
	/**
	 * Gets the transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the transactions
	 * @throws DataStoreException the data store exception
	 */
	List<SynchronizDO> getTransactions(String startDate, String endDate,long userId) throws DataStoreException;
	
	/**
	 * Gets the balance transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the balance transactions
	 * @throws DataStoreException the data store exception
	 */
	List<BalanceTransactionDO> getBalanceTransactions(String startDate, String endDate,long journeyId,long userId) throws DataStoreException;
	
	
	List<RetrieveTransactionsDO> retrieveBalanceTransactions(String startDate, String endDate,long userId) throws DataStoreException;

}
