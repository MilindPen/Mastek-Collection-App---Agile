package com.mastek.transaction.rest.service;

import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_BALANCE_TRANSACTIONS;
import static com.mastek.commons.util.ApplicationConstants.GET_CARD_PAYMENTS;
import static com.mastek.commons.util.ApplicationConstants.GET_TRANSACTIONS;
import static com.mastek.commons.util.ApplicationConstants.GET_TRANSACTION_HISTORY;
import static com.mastek.commons.util.ApplicationConstants.GET_TRANSACTION_SYNC_RESULT;
import static com.mastek.commons.util.ApplicationConstants.RETRIEVE_BALANCE_TRANSACTIONS;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.SYNC_BALANCE_TRANSACTIONS;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.exception.SystemException;
import com.mastek.transaction.business.service.TransactionService;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;

/**
 * The Class TransactionBusinessDelegate.
 */
@Component
public class TransactionBusinessDelegate implements TransactionService
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(TransactionBusinessDelegate.class);
	/** The transaction service. */
	@Autowired
	private TransactionService transactionService;

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
	@Override
	public List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate, long userId) throws ServiceException
	{
		logger.info(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + START);

		try
		{
			List<TransactionHistoryDO> transactionHistoryList = transactionService.getTransactionHistory(startDate, endDate, userId);

			logger.info(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + END);
			return transactionHistoryList;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
	}

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
	@Override
	public List<CardPaymentDO> getCardPayments(long userID, long journeyID, String startDate, String endDate) throws ServiceException
	{

		logger.info(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + START);

		try
		{
			List<CardPaymentDO> cardPaymentDOList = transactionService.getCardPayments(userID, journeyID, startDate, endDate);

			logger.info(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + END);
			return cardPaymentDOList;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}

	}

	/**
	 * Gets the transaction synchroniz result.
	 *
	 * @param transactionSyncRequest the transaction sync request
	 * @return the transaction synchroniz result
	 * @throws ServiceException the service exception
	 */
	@Override
	public boolean getTransactionSynchronizResult(TransactionSyncRequest transactionSyncRequest) throws ServiceException
	{
		try
		{
			logger.info(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + START);
			boolean response = transactionService.getTransactionSynchronizResult(transactionSyncRequest);
			logger.info(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + END);

			return response;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}

	}

	/**
	 * Sync balance transactions.
	 *
	 * @param balanceTransactionRequest the balance transaction request
	 * @return true, if successful
	 * @throws ServiceException the service exception
	 */
	@Override
	public boolean syncBalanceTransactions(BalanceTransactionRequest balanceTransactionRequest) throws ServiceException
	{
		try
		{
			logger.info(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + START);
			boolean response = transactionService.syncBalanceTransactions(balanceTransactionRequest);
			logger.info(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + END);

			return response;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
	}
	
	/**
	 * Gets the transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the transactions
	 * @throws ServiceException the service exception
	 */
	@Override
	public List<SynchronizDO> getTransactions(String startDate, String endDate, long userId) throws ServiceException
	{
		logger.info(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + START);

		try
		{
			List<SynchronizDO> transactionsList = transactionService.getTransactions(startDate, endDate, userId);

			logger.info(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);
			return transactionsList;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
	}

	/**
	 * Gets the balance transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the balance transactions
	 * @throws ServiceException the service exception
	 */
	@Override
	public List<BalanceTransactionDO> getBalanceTransactions(String startDate, String endDate,long journeyId,long userId) throws ServiceException
	{
		logger.info(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + START);

		try
		{
			List<BalanceTransactionDO> transactionsList = transactionService.getBalanceTransactions(startDate, endDate,journeyId, userId);

			logger.info(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);
			return transactionsList;
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}

	}
	
	@Override
	public List<RetrieveTransactionsDO> retrieveBalanceTransactions(String startDate, String endDate,long userId) throws ServiceException
	{
		List<RetrieveTransactionsDO> transactions;
		try
		{
			logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + START);
			transactions = transactionService.retrieveBalanceTransactions(startDate, endDate, userId);
			logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);
		}
		catch (SystemException systemException)
		{
			ServiceException serviceException = new ServiceException();
			serviceException.setSystemException(systemException);
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + systemException.getType().getErrorCode() + DELIMITER + systemException.getType().getMessage());
			throw serviceException;
		}
		return transactions;
	}

}
