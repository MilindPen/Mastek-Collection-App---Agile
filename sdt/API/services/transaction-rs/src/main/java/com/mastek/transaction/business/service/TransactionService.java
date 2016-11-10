package com.mastek.transaction.business.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.exception.SystemException;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;

/**
 * The Interface TransactionService.
 */
@Component
public interface TransactionService
{

	/**
	 * Gets the transaction history.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @return the transaction history
	 * @throws ServiceException the service exception
	 * @throws SystemException the system exception
	 */
	List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate, long userId) throws ServiceException;

	/**
	 * Gets the card payments.
	 *
	 * @param userID the user id
	 * @param journeyID the journey id
	 * @param startDate the start date
	 * @param endDate the end date
	 * @return the card payments
	 * @throws ServiceException the service exception
	 */
	List<CardPaymentDO> getCardPayments(long userID, long journeyID, String startDate, String endDate) throws ServiceException;

	/**
	 * Gets the transaction synchroniz result.
	 *
	 * @param transactionSyncRequest the transaction sync request
	 * @return the transaction synchroniz result
	 * @throws ServiceException the service exception
	 */
	boolean getTransactionSynchronizResult(TransactionSyncRequest transactionSyncRequest) throws ServiceException;

	/**
	 * Sync balance transactions.
	 *
	 * @param balanceTransactionRequest the balance transaction request
	 * @return true, if successful
	 * @throws ServiceException the service exception
	 */
	boolean syncBalanceTransactions(BalanceTransactionRequest balanceTransactionRequest) throws ServiceException;
	
	/**
	 * Gets the transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the transactions
	 * @throws ServiceException the service exception
	 */
	List<SynchronizDO> getTransactions(String startDate, String endDate,long userId) throws ServiceException;
		
	/**
	 * Gets the balance transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the balance transactions
	 * @throws ServiceException the service exception
	 */
	List<BalanceTransactionDO> getBalanceTransactions(String startDate, String endDate,long journeyId,long userId) throws ServiceException;
	
	List<RetrieveTransactionsDO> retrieveBalanceTransactions(String startDate, String endDate, long userId) throws ServiceException;
}
