package com.mastek.transaction.data.service;

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
import static com.mastek.commons.util.ApplicationConstants.XML;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.gson.Gson;
import com.mastek.commons.data.dao.impl.AbstractDAO;
import com.mastek.commons.data.entity.VWAgreementTransaction;
import com.mastek.commons.data.entity.VWCardPaymentSummary;
import com.mastek.commons.data.entity.VWCashSummary;
import com.mastek.commons.data.entity.VWDashboardAmount;
import com.mastek.commons.data.entity.VWTransactionHistory;
import com.mastek.commons.domain.BalanceTransactionDO;
import com.mastek.commons.domain.CardPaymentDO;
import com.mastek.commons.domain.RetrieveTransactionsDO;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.domain.TransactionHistoryDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.commons.util.CommonUtil;
import com.mastek.transaction.rest.service.dto.BalanceTransactionRequest;
import com.mastek.transaction.rest.service.dto.TransactionSyncRequest;

import ma.glasnost.orika.MapperFacade;

/**
 * The Class TransactionDAOImpl.
 */
@Repository
public class TransactionDAOImpl extends AbstractDAO implements TransactionDAO
{
	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(TransactionDAOImpl.class);

	/** The mapper facade. */
	@Autowired
	private MapperFacade mapperFacade;

	/**
	 * This method returns transaction history for last 13 weeks.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @return the transaction history
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate, long userId) throws DataStoreException
	{
		logger.info(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + START);

		List<TransactionHistoryDO> transactions = new ArrayList<>();

		try
		{
			Date transHistoryEndDate = CommonUtil.getTransHistoryEndDate(startDate);//startDate - 1 day
			Date transHistoryStartDate = CommonUtil.getTransHistoryStartDate(startDate);//startDate - 91 days

			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query = openSession().getNamedQuery("VWTransactionHistory.getTransactionHistory");
			query.setLong("userId", userId);
			query.setDate("startDate", transHistoryStartDate);
			query.setDate("endDate", transHistoryEndDate);
			query.setDate("fromDate", fromDate);
			query.setDate("toDate", toDate);
			List<VWTransactionHistory> transHistoryList = query.list();

			for (VWTransactionHistory transactionHistory : transHistoryList)
			{
				TransactionHistoryDO tranDO = this.mapperFacade.map(transactionHistory, TransactionHistoryDO.class);
				tranDO.setStatus(transactionHistory.getResponseStatusID()+"");
				transactions.add(tranDO);
			}
			logger.debug("Transaction history list size | " + transactions.size());
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + " | " + SystemException.Type.DE.getMessage());
			logger.error(GET_TRANSACTION_HISTORY, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + " | " + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_TRANSACTION_HISTORY, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + " | " + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_TRANSACTION_HISTORY, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_TRANSACTION_HISTORY + DELIMITER + USER_ID + userId + DELIMITER + END);
		return transactions;
	}

	/**
	 * This method returns card payments for all customers of the agent.
	 *
	 * @param userID the user id
	 * @param journeyID the journey id
	 * @param startDate the start date
	 * @param endDate the end date
	 * @return the card payments
	 * @throws DataStoreException the data store exception
	 */
	public List<CardPaymentDO> getCardPayments(long userID, long journeyID, String startDate, String endDate) throws DataStoreException
	{

		logger.info(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + START);

		List<CardPaymentDO> listcardPaymentDO = new ArrayList<CardPaymentDO>();

		List<VWCardPaymentSummary> listVWCardPaymentSummary = new ArrayList<VWCardPaymentSummary>();

		try
		{

			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query = openSession().getNamedQuery("VWCardPaymentSummary.getCardPayments");
			query.setLong("journeyID", journeyID);
			query.setDate("fromDate", fromDate);
			query.setDate("toDate", toDate);

			listVWCardPaymentSummary = query.list();

			CardPaymentDO cardPaymentDO = null;

			for (VWCardPaymentSummary vwCardPaymentSummary : listVWCardPaymentSummary)
			{

				cardPaymentDO = this.mapperFacade.map(vwCardPaymentSummary, CardPaymentDO.class);
				listcardPaymentDO.add(cardPaymentDO);

			}
			logger.debug("Card Payment list size | " + listcardPaymentDO.size());
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + SystemException.Type.DE.getErrorCode() + " | " + SystemException.Type.DE.getMessage());
			logger.error(GET_CARD_PAYMENTS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_CARD_PAYMENTS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + " | " + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_CARD_PAYMENTS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_CARD_PAYMENTS + DELIMITER + USER_ID + userID + DELIMITER + END);
		return listcardPaymentDO;

	}

	/**
	 * This method saves transactions from offline database.
	 *
	 * @param transactionSyncRequest the transaction sync request
	 * @return the transaction synchroniz result
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public boolean getTransactionSynchronizResult(TransactionSyncRequest transactionSyncRequest) throws DataStoreException
	{

		logger.info(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + START);

		String xml = null;
		boolean isSync = true;
		try
		{
			String jsonStr = new Gson().toJson(transactionSyncRequest);
			JSONObject jsonObj = new JSONObject(jsonStr);
			xml = org.json.XML.toString(jsonObj);
			xml = "'" + xml + "'";
			logger.debug("getTransactionSynchronizResult" + " | " + USER_ID + transactionSyncRequest.getAccess().getUserId() + " | " + XML + " | " + xml);
			Query query = openSession().createSQLQuery(" Declare @SyncOutPut int,@ErrorCode varchar(10),@ErrorMessage varchar(4000) , @MyXML XML SET @MyXML=" + xml + "EXec [mobile].[AP_X_Transactions_From_Device] " + transactionSyncRequest.getAccess().getUserId() + ",@MyXML,@SyncOutPut OUTPUT,@ErrorCode OUTPUT,@ErrorMessage OUTPUT Select @SyncOutPut Result,@ErrorCode errCode,@ErrorMessage errMsg");
			List<Object[]> list = query.list();
			Integer result = null;
			String errCode = null;
			String errMsg = null;

			if (!list.isEmpty())
			{
				Object[] arr = list.get(0);

				result = (Integer) arr[0];

				if ((result != null) && (result != 1))
				{
					isSync = false;
					errCode = (String) arr[1];
					errMsg = (String) arr[2];

					if (errCode.equals("ERR-150"))
					{
						SystemException systemException = new SystemException(SystemException.Type.SQLSP);
						logger.error(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + errCode + DELIMITER + errMsg);
						throw systemException;
					}
					else if (errCode.equals("ERR-250"))
					{
						SystemException systemException = new SystemException(SystemException.Type.NRE);
						logger.error(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + errCode + DELIMITER + errMsg);
						throw systemException;
					}

				}
				else
				{
					isSync = true;
				}
			}

		}

		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_TRANSACTION_SYNC_RESULT, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_TRANSACTION_SYNC_RESULT, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_TRANSACTION_SYNC_RESULT, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_TRANSACTION_SYNC_RESULT + DELIMITER + USER_ID + transactionSyncRequest.getAccess().getUserId() + DELIMITER + END);
		return isSync;
	}

	/**
	 * Sync balance transactions.
	 *
	 * @param balanceTransactionRequest the balance transaction request
	 * @return true, if successful
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public boolean syncBalanceTransactions(BalanceTransactionRequest balanceTransactionRequest) throws DataStoreException
	{
		logger.info(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + START);

		String xml = null;
		boolean isSuccess = false;
		try
		{
			String jsonStr = new Gson().toJson(balanceTransactionRequest);
			JSONObject jsonObj = new JSONObject(jsonStr);
			xml = org.json.XML.toString(jsonObj);
			xml = "'" + xml + "'";
			logger.debug(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + XML + DELIMITER + xml);
			Query query = openSession().createSQLQuery("Declare @IsSyncDone int,@ErrorCode varchar(10),@ErrorMessage varchar(4000), @MyXML XML SET @MyXML=" + xml + " Exec [mobile].[AP_X_BalanceTransactions] " + balanceTransactionRequest.getAccess().getUserId() + ",@MyXML,@IsSyncDone OUTPUT,@ErrorCode OUTPUT,@ErrorMessage OUTPUT Select @IsSyncDone result,@ErrorCode errCode,@ErrorMessage errMsg");
			Object[] result = (Object[]) query.uniqueResult();
			Integer syncDone = (Integer) result[0];
			if (syncDone != null && syncDone == 0)
			{
				String errCode = (String) result[1];
				String errMsg = (String) result[2];

				if (errCode.equals("ERR-152"))
				{
					SystemException systemException = new SystemException(SystemException.Type.BTSP);
					logger.error(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + errCode + DELIMITER + errMsg);
					throw systemException;
				}
				else if (errCode.equals("ERR-252"))
				{
					SystemException systemException = new SystemException(SystemException.Type.NRBTE);
					logger.error(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + errCode + DELIMITER + errMsg);
					throw systemException;
				}
			}
			else if (syncDone != null && syncDone == 1)
			{
				isSuccess = true;
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(SYNC_BALANCE_TRANSACTIONS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(SYNC_BALANCE_TRANSACTIONS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(SYNC_BALANCE_TRANSACTIONS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(SYNC_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + balanceTransactionRequest.getAccess().getUserId() + DELIMITER + END);
		return isSuccess;
	}
	
	/**
	 * Gets the transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the transactions
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<SynchronizDO> getTransactions(String startDate, String endDate, long userId) throws DataStoreException
	{
		logger.info(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + START);

		List<SynchronizDO> transactions = new ArrayList<SynchronizDO>();
		try
		{
			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);
			
			Calendar cs = Calendar.getInstance();
			cs.setTime(toDate);
			cs.add(Calendar.HOUR, 23);
			cs.add(Calendar.MINUTE, 59);
			cs.add(Calendar.SECOND, 59);
			toDate = cs.getTime();
			
			String formattedFromDate = CommonUtil.getFormattedDate(fromDate, CommonUtil.DATETIME_FORMAT);
			String formattedtoDate = CommonUtil.getFormattedDate(toDate, CommonUtil.DATETIME_FORMAT);
			
			fromDate = CommonUtil.getDate(formattedFromDate, CommonUtil.DATETIME_FORMAT);
			toDate = CommonUtil.getDate(formattedtoDate, CommonUtil.DATETIME_FORMAT);

			Query query = openSession().getNamedQuery("VWAgreementTransaction.getTransactions");
			query.setLong("userId", userId);
			query.setParameter(0, fromDate);
			query.setParameter(1, toDate);
			List<VWAgreementTransaction> transactionsList = query.list();
			for (VWAgreementTransaction transaction : transactionsList)
			{
				SynchronizDO syncDO = this.mapperFacade.map(transaction, SynchronizDO.class);
				transactions.add(syncDO);
			}
			
			logger.debug("Transactions list size | " + transactions.size());
			
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_TRANSACTIONS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_TRANSACTIONS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_TRANSACTIONS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);
		return transactions;
	}

	/**
	 * Gets the balance transactions.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the balance transactions
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<BalanceTransactionDO> getBalanceTransactions(String startDate, String endDate, long journeyId, long userId) throws DataStoreException
	{
		logger.info(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<BalanceTransactionDO> transactions = new ArrayList<BalanceTransactionDO>();
		try
		{

			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query = openSession().getNamedQuery("VWDashboardAmount.getBalanceTransactions");
			//query.setLong("journeyId", journeyId);
			query.setDate("fromDate", fromDate);
			query.setDate("toDate", toDate);
			List<VWDashboardAmount> balanceTransactions = query.list();
			for (VWDashboardAmount dashboardAmount : balanceTransactions)
			{
				BalanceTransactionDO balanceTransactionDO = this.mapperFacade.map(dashboardAmount, BalanceTransactionDO.class);
				balanceTransactionDO.setIsDeleted("false");
				transactions.add(balanceTransactionDO);
			}

			logger.debug("Balance transactions list size | " + transactions.size());
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(GET_BALANCE_TRANSACTIONS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_BALANCE_TRANSACTIONS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_BALANCE_TRANSACTIONS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);
		return transactions;
	}
	
	@Override
	public List<RetrieveTransactionsDO> retrieveBalanceTransactions(String startDate, String endDate,long userId) throws DataStoreException
	{
		logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + START);
		List<RetrieveTransactionsDO> transactions = new ArrayList<RetrieveTransactionsDO>();
		try
		{
			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query = openSession().getNamedQuery("VWCashSummary.getBalTransactions");
			query.setDate("fromDate", fromDate);
			query.setDate("toDate", toDate);
			query.setLong("userId", userId);
			
			List<VWCashSummary> transactionList = query.list();

			RetrieveTransactionsDO retrieveTransactionsDO;
			for (VWCashSummary transaction : transactionList)
			{
				retrieveTransactionsDO = mapperFacade.map(transaction, RetrieveTransactionsDO.class);
				transactions.add(retrieveTransactionsDO);
			}

		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(RETRIEVE_BALANCE_TRANSACTIONS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(RETRIEVE_BALANCE_TRANSACTIONS + DELIMITER + USER_ID + userId + DELIMITER + END);

		return transactions;
	}
}
