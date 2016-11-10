package com.mastek.transaction.business.service;

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

import java.util.ArrayList;
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
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.ServiceException;
import com.mastek.transaction.data.service.TransactionDAO;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;

/**
 * The Class TransactionServiceImpl.
 */
@Component
public class TransactionServiceImpl implements TransactionService
{	
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(TransactionServiceImpl.class);

	/** The transaction dao. */
	@Autowired
	TransactionDAO transactionDAO;
	
	/**
	 *  
	 *  Gets transaction history.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @return the transaction history
	 */
	@Override
	public List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate,long userId)
	{
		logger.info(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + START);
		try
		{
			List<TransactionHistoryDO> transactionHistoryList = transactionDAO.getTransactionHistory(startDate, endDate,userId);
			
			logger.info(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + END);
			return transactionHistoryList;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_TRANSACTION_HISTORY, dataStoreException);
			throw dataStoreException.getSystemException();
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
	 */
	@Override
	public List<CardPaymentDO> getCardPayments(long userID, long journeyID,	String startDate, String endDate){
		
	logger.info(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + START);
		
		try
		{
			List<CardPaymentDO> lstCardPaymentDO = transactionDAO.getCardPayments(userID, journeyID, startDate, endDate);
			
			logger.info(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + END);
			return lstCardPaymentDO;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_CARD_PAYMENTS, dataStoreException);
			throw dataStoreException.getSystemException();
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
	public boolean getTransactionSynchronizResult(TransactionSyncRequest transactionSyncRequest) 
	{
		
		boolean response;
		try {
			
			logger.info(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + START);
			response = transactionDAO.getTransactionSynchronizResult(transactionSyncRequest);
			logger.info(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + END);
			 return response;
		} catch (DataStoreException dataStoreException) {
			logger.error(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_TRANSACTION_SYNC_RESULT, dataStoreException);
			throw dataStoreException.getSystemException();
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
	public boolean syncBalanceTransactions(BalanceTransactionRequest balanceTransactionRequest) 
	{
		boolean response;
		try
		{
			logger.info(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + START);
			response = transactionDAO.syncBalanceTransactions(balanceTransactionRequest);
			logger.info(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + END);
			return response;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(SYNC_BALANCE_TRANSACTIONS, dataStoreException);
			throw dataStoreException.getSystemException();
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
			List<SynchronizDO> transactionsList = transactionDAO.getTransactions(startDate, endDate, userId);

			logger.info(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);
			return transactionsList;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_TRANSACTIONS, dataStoreException);
			throw dataStoreException.getSystemException();
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
	public List<BalanceTransactionDO> getBalanceTransactions(String startDate, String endDate,long journeyId, long userId) throws ServiceException
	{
		logger.info(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + START);
		try
		{
			List<BalanceTransactionDO> transactionsList = transactionDAO.getBalanceTransactions(startDate, endDate,journeyId, userId);

			logger.info(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);
			return transactionsList;
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(GET_BALANCE_TRANSACTIONS, dataStoreException);
			throw dataStoreException.getSystemException();
		}
	}
	
	@Override
	public List<RetrieveTransactionsDO> retrieveBalanceTransactions(String startDate, String endDate,long userId) throws ServiceException
	{
		logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<RetrieveTransactionsDO> transactions = new ArrayList<RetrieveTransactionsDO>();
		try
		{
			transactions = transactionDAO.retrieveBalanceTransactions(startDate, endDate, userId);
			logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);
		}
		catch (DataStoreException dataStoreException)
		{
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + dataStoreException.getSystemException().getType().getErrorCode() + DELIMITER + dataStoreException.getSystemException().getType().getMessage());
			logger.info(RETRIEVE_BALANCE_TRANSACTIONS, dataStoreException);
			throw dataStoreException.getSystemException();
		}
		
		return transactions;
	}
}
