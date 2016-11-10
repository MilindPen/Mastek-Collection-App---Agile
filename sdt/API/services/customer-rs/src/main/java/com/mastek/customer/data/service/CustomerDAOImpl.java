package com.mastek.customer.data.service;

import static com.mastek.commons.util.ApplicationConstants.DELEGATION_CUSTOMERS;
import static com.mastek.commons.util.ApplicationConstants.DELIMITER;
import static com.mastek.commons.util.ApplicationConstants.END;
import static com.mastek.commons.util.ApplicationConstants.GET_JOURNEY;
import static com.mastek.commons.util.ApplicationConstants.GET_RESULT;
import static com.mastek.commons.util.ApplicationConstants.GET_SCHEDULED_CUSTOMERS;
import static com.mastek.commons.util.ApplicationConstants.SAVE_DELEGATED_CUSTOMERS;
import static com.mastek.commons.util.ApplicationConstants.START;
import static com.mastek.commons.util.ApplicationConstants.UPDATE_CUSTOMER_DETAILS;
import static com.mastek.commons.util.ApplicationConstants.USER_ID;
import static com.mastek.commons.util.ApplicationConstants.XML;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.hibernate.Query;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.google.gson.Gson;
import com.mastek.commons.data.dao.impl.AbstractDAO;
import com.mastek.commons.data.entity.VWAgreementList;
import com.mastek.commons.data.entity.VWCustomerVisitList;
import com.mastek.commons.data.entity.VWJourneySelection;
import com.mastek.commons.domain.AgreementDO;
import com.mastek.commons.domain.CustomerVisitDO;
import com.mastek.commons.domain.DelegationCustomersDO;
import com.mastek.commons.domain.JourneyDO;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.SystemException;
import com.mastek.commons.util.CommonUtil;
import com.mastek.customer.rest.service.dto.SaveDelegatedCustomerRequest;
import com.mastek.customer.rest.service.dto.UpdateCustomerRequest;

import ma.glasnost.orika.MapperFacade;


/**
 * The Class CustomerDAOImpl.
 */
@Repository
public class CustomerDAOImpl extends AbstractDAO implements CustomerDAO
{

	/** The Constant logger. */
	private static final Logger logger = LoggerFactory.getLogger(CustomerDAOImpl.class);
	/** The mapper facade. */
	@Autowired
	private MapperFacade mapperFacade;

	/**
	 *  Gets the scheduled customers.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param journeyId the journey id
	 * @param userId the user id
	 * @return the scheduled customers
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public List<CustomerVisitDO> getScheduledCustomers(String startDate, String endDate, long userId) throws DataStoreException
	{
		logger.info(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + userId + " | " + "START");

		List<CustomerVisitDO> scheduledCustomers = new ArrayList<>();
		List<Long> journeyIds = new ArrayList<>();
		//journeyIds.add(journeyId);

		try
		{
			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query = openSession().getNamedQuery("VWCustomerVisitList.getScheduledCustomers");
			query.setDate("fromDate", fromDate);
			query.setDate("toDate", toDate);
			//query.setParameterList("journeyIds", journeyIds);
			query.setLong("userId", userId);
			List<VWCustomerVisitList> custVisitList = query.list();

			CustomerVisitDO custVisitDo;
			for (VWCustomerVisitList custVisit : custVisitList)
			{
				custVisitDo = this.mapperFacade.map(custVisit, CustomerVisitDO.class);
				List<AgreementDO> agreements = new ArrayList<>();
				Set<VWAgreementList> agreementList = custVisit.getAgreements();

				agreements = getAgreements(agreementList, agreements);

				custVisitDo.setAgreements(agreements);
				scheduledCustomers.add(custVisitDo);
			}

			logger.debug("Customer visit list size | " + scheduledCustomers.size());
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + userId + " | " + SystemException.Type.DE.getErrorCode() + " | " + SystemException.Type.DE.getMessage());
			logger.error(GET_SCHEDULED_CUSTOMERS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + userId + " | " + SystemException.Type.JDBCCE.getErrorCode() + " | " + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_SCHEDULED_CUSTOMERS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + userId + " | " + SystemException.Type.SQLGE.getErrorCode() + " | " + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_SCHEDULED_CUSTOMERS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_SCHEDULED_CUSTOMERS + " | " + USER_ID + userId + " | " + "END");

		return scheduledCustomers;
	}

	/**
	 * Gets the agreements.
	 *
	 * @param agreementList the agreement list
	 * @param agreements the agreements
	 * @return the agreements
	 */
	private List<AgreementDO> getAgreements(Set<VWAgreementList> agreementList, List<AgreementDO> agreements)
	{
		AgreementDO agreementDO;
		for (VWAgreementList agreement : agreementList)
		{
			agreementDO = this.mapperFacade.map(agreement, AgreementDO.class);
			if (agreement.getAgreementStartDate() != null){
            agreementDO.setElapsedWeek(String.valueOf(CommonUtil.getElapsedWeek(new Date(), CommonUtil.getAgreementStartDate(agreement.getAgreementStartDate()))));
			}

			agreementDO.setTotalPayableAmount(getTotalPayableAmount(agreement));
			agreementDO.setSettlementAmount(getSettlementAmount(agreement));
			agreements.add(agreementDO);
		}
		return agreements;
	}

	/**
	 * Gets the total payable amount.
	 *
	 * @param vwAgreement the vw agreement
	 * @return the total payable amount
	 */
	private Double getTotalPayableAmount(VWAgreementList vwAgreement)
	{
		return vwAgreement.getPrincipal() + vwAgreement.getCharges();
	}

	/**
	 * Gets the settlement amount.
	 *
	 * @param vwAgreement the vw agreement
	 * @return the settlement amount
	 */
	private Double getSettlementAmount(VWAgreementList vwAgreement)
	{
		if (vwAgreement.getSettlementRebate() != null && vwAgreement.getBalance() != null)
		{
			return vwAgreement.getBalance() - vwAgreement.getSettlementRebate();
		}
		else
		{
			return vwAgreement.getBalance();
		}
	}

	/**
	 * Update customer details.
	 *
	 * @param getUpdateCustomerRequest the get update customer request
	 * @return true, if successful
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public boolean updateCustomerDetails(UpdateCustomerRequest getUpdateCustomerRequest) throws DataStoreException
	{

		logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + START);

		String xml = null;
		boolean isSyncSuccess = true;
		try
		{
			String jsonStr = new Gson().toJson(getUpdateCustomerRequest);
			JSONObject jsonObj = new JSONObject(jsonStr);
			xml = org.json.XML.toString(jsonObj);
			xml = "'" + xml + "'";
			logger.debug(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + XML + " | " + xml);
			Query query = openSession().createSQLQuery(" Declare @SyncOutPut int,@ErrorCode varchar(10),@ErrorMessage varchar(4000) , @MyXML XML SET @MyXML=" + xml + "EXec [mobile].[AP_X_CustomerDetails] " + getUpdateCustomerRequest.getAccess().getUserId() + ",@MyXML,@SyncOutPut OUTPUT,@ErrorCode OUTPUT,@ErrorMessage OUTPUT Select @SyncOutPut Result,@ErrorCode errCode,@ErrorMessage errMsg");
			List<Object[]> list = query.list();

			isSyncSuccess = getResult(list,getUpdateCustomerRequest);
		}

		catch (org.hibernate.exception.DataException de)
		{
			logger.error(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + SystemException.Type.DE.getErrorCode() + " | " + SystemException.Type.DE.getMessage());
			logger.error(UPDATE_CUSTOMER_DETAILS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + SystemException.Type.JDBCCE.getErrorCode() + " | " + SystemException.Type.JDBCCE.getMessage());
			logger.error(UPDATE_CUSTOMER_DETAILS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + SystemException.Type.SQLGE.getErrorCode() + " | " + SystemException.Type.SQLGE.getMessage());
			logger.error(UPDATE_CUSTOMER_DETAILS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + END);
		return isSyncSuccess;
	}

	/**
	 * Gets the result.
	 *
	 * @param list the list
	 * @param getUpdateCustomerRequest the get update customer request
	 * @return the result
	 */
	private boolean getResult(List<Object[]> list,UpdateCustomerRequest getUpdateCustomerRequest)
	{
		logger.info(GET_RESULT + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + START);
		boolean isSyncSuccess = false;
		if (!list.isEmpty())
		{
			Object[] arr = list.get(0);

			Integer result = (Integer) arr[0];

			if ((result != null) && (result != 1))
			{
				isSyncSuccess = false;
				String errCode = (String) arr[1];
				String errMsg = (String) arr[2];

				if ("ERR-151".equals(errCode))
				{
					logger.error(GET_RESULT + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + errCode + " | " + errMsg);
					throw new SystemException(SystemException.Type.SQLCSP);
				}
				else if ("ERR-251".equals(errCode))
				{
					logger.error(GET_RESULT + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " +errCode + " | " + errMsg);
					throw new SystemException(SystemException.Type.NRECU);
				}

			}
			else
			{
				isSyncSuccess = true;
			}
		}
		logger.info(UPDATE_CUSTOMER_DETAILS + " | " + USER_ID + getUpdateCustomerRequest.getAccess().getUserId() + " | " + END);
		return isSyncSuccess;
	}

	
	/**
	 * Gets the journey.
	 *
	 * @param startDate the start date
	 * @param endDate the end date
	 * @param userId the user id
	 * @return the journey
	 * @throws DataStoreException the data store exception
	 */
	@Override
	public JourneyDO getJourney(String startDate, String endDate, long userId) throws DataStoreException
	{
		logger.info(GET_JOURNEY + " | " + USER_ID + userId + " | " + START);

		JourneyDO journeyDo = null;
		try
		{
			Date fromDate = CommonUtil.getDate(startDate, CommonUtil.DATE_FORMAT);
			Date toDate = CommonUtil.getDate(endDate, CommonUtil.DATE_FORMAT);

			Query query = openSession().getNamedQuery("VWJourneySelection.getPrimaryJourney");
			query.setDate("fromDate", fromDate);
			query.setDate("toDate", toDate);
			query.setLong("userId", userId);
			List<VWJourneySelection> journeyList = query.list();

			if (journeyList != null && journeyList.size() > 1)
			{
				throw new SystemException(SystemException.Type.MJFE);
			}
			else if (journeyList != null && journeyList.size() == 1)
			{
				VWJourneySelection journeySelection = journeyList.get(0);
				journeyDo = new JourneyDO();
				journeyDo.setJourneyId(journeySelection.getJourneyId());
				journeyDo.setDescription(journeySelection.getJourneyDescription());
				journeyDo.setBranchId(journeySelection.getBranchId());
				journeyDo.setBranchName(journeySelection.getBranchName());
				journeyDo.setJourneyAgentStartDate(journeySelection.getJourneyAgentStartDate()!=null?CommonUtil.getFormattedDate(journeySelection.getJourneyAgentStartDate(), CommonUtil.DATE_FORMAT):null);
				journeyDo.setJourneyAgentEndDate(journeySelection.getJourneyAgentEndDate()!=null?CommonUtil.getFormattedDate(journeySelection.getJourneyAgentEndDate(), CommonUtil.DATE_FORMAT):null);
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(GET_JOURNEY + " | " + USER_ID + userId + " | " + SystemException.Type.DE.getErrorCode() + " | " + SystemException.Type.DE.getMessage());
			logger.error(GET_JOURNEY, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(GET_JOURNEY + " | " + USER_ID + userId + " | " + SystemException.Type.JDBCCE.getErrorCode() + " | " + SystemException.Type.JDBCCE.getMessage());
			logger.error(GET_JOURNEY, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(GET_JOURNEY + " | " + USER_ID + userId + " | " + SystemException.Type.SQLGE.getErrorCode() + " | " + SystemException.Type.SQLGE.getMessage());
			logger.error(GET_JOURNEY, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(GET_JOURNEY + " | " + USER_ID + userId + " | " + END);

		return journeyDo;
	}

	@Override
	public List<DelegationCustomersDO> delegationCustomers(String startDate, String endDate, long journeyId,
			long userId) throws DataStoreException {

		logger.info(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + START);
		
		List<DelegationCustomersDO> customerList = new ArrayList<DelegationCustomersDO>();
		try
		{
			Query query = openSession().createSQLQuery("Exec [mobile].[AP_S_CustomerListForJourneyDelegation] " + journeyId + "," + userId + "," + "'" + startDate + "'"+"," + "'" + endDate + "'");
			List<Object[]> result = (List<Object[]>) query.list();
			
			if (result != null)
			{
				logger.debug("Delegation customers size | " + result.size());

				DelegationCustomersDO delegationCustomersDO;
				for (Object[] res : result)
				{
					if (res.length > 2)
					{
						delegationCustomersDO = new DelegationCustomersDO();
						delegationCustomersDO.setCustomerJourneyId((Integer)res[0]);
						delegationCustomersDO.setJourneyId((Integer)res[1]);
						delegationCustomersDO.setPrimaryAgent((Integer)res[2]);
						delegationCustomersDO.setCustomerId((Integer)res[3]);
						delegationCustomersDO.setJourneyOrder((Integer)res[4]);
						delegationCustomersDO.setCollectionDay((Integer)res[5]);
						delegationCustomersDO.setCustomerRefNumber(res[8] != null?(String)res[8]:null);
						delegationCustomersDO.setTitle(res[9] != null?(String)res[9]:null);
						delegationCustomersDO.setFirstName(res[10] != null?(String)res[10]:null);
						delegationCustomersDO.setMiddleName(res[11] != null?(String)res[11]:null);
						delegationCustomersDO.setLastName(res[12] != null?(String)res[12]:null);
						delegationCustomersDO.setAddressLine1(res[13] != null?(String)res[13]:null);
						delegationCustomersDO.setAddressLine2(res[14] != null?(String)res[14]:null);
						delegationCustomersDO.setAddressLine3(res[15] != null?(String)res[15]:null);
						delegationCustomersDO.setAddressLine4(res[16] != null?(String)res[16]:null);
						delegationCustomersDO.setCity((res[17] != null?(String)res[17]:null));
						delegationCustomersDO.setPostcode(res[18] != null?(String)res[18]:null);
						delegationCustomersDO.setMobile(res[19] != null?(String)res[19]:null);
						delegationCustomersDO.setPhone(res[20] != null?(String)res[20]:null);
						delegationCustomersDO.setEmail(res[21] != null?(String)res[21]:null);
						delegationCustomersDO.setDob(res[22] != null?CommonUtil.getFormattedDate(new Date(((java.sql.Date)res[22]).getTime()), CommonUtil.DATE_FORMAT):null);
						delegationCustomersDO.setPaymentPerformance(res[23] != null?(Double)res[23]:null);
						customerList.add(delegationCustomersDO);
					}
					else
					{
						String errCode = (String) res[0];
						String errMsg = (String) res[1];
						if (errCode.equals("ERR-157"))
						{
							SystemException systemException = new SystemException(SystemException.Type.JDCSP);
							logger.error(DELEGATION_CUSTOMERS + DELIMITER + USER_ID + userId + DELIMITER + errCode + DELIMITER + errMsg);
							throw systemException;
						}
					}
				}
			}
		}
		catch (org.hibernate.exception.DataException de)
		{
			logger.error(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + SystemException.Type.DE.getErrorCode() + " | " + SystemException.Type.DE.getMessage());
			logger.error(DELEGATION_CUSTOMERS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + SystemException.Type.JDBCCE.getErrorCode() + " | " + SystemException.Type.JDBCCE.getMessage());
			logger.error(DELEGATION_CUSTOMERS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + SystemException.Type.SQLGE.getErrorCode() + " | " + SystemException.Type.SQLGE.getMessage());
			logger.error(DELEGATION_CUSTOMERS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(DELEGATION_CUSTOMERS + " | " + USER_ID + userId + " | " + END);
		
		return customerList;
	}

	@Override
	public boolean saveDelegatedCustomers(SaveDelegatedCustomerRequest saveDelegatedCustomerRequest)
			throws DataStoreException {
		logger.info(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + START);

		String xml = null;
		boolean isSuccess = false;
		try
		{
			String jsonStr = new Gson().toJson(saveDelegatedCustomerRequest);
			JSONObject jsonObj = new JSONObject(jsonStr);
			xml = org.json.XML.toString(jsonObj);
			xml = "'" + xml + "'";
			logger.debug(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + XML + DELIMITER + xml);

			Query query = openSession().createSQLQuery("Declare @IsSyncDone int,@ErrorCode varchar(10),@ErrorMessage varchar(4000), @MyXML XML SET @MyXML=" + xml + " EXEC [mobile].[AP_X_CustomersForJourneyDelegation] " + saveDelegatedCustomerRequest.getAccess().getUserId() + ",@MyXML,@IsSyncDone OUTPUT,@ErrorCode OUTPUT,@ErrorMessage OUTPUT Select @IsSyncDone result,@ErrorCode errCode,@ErrorMessage errMsg");
			Object[] result = (Object[]) query.uniqueResult();
			Integer syncDone = (Integer) result[0];
			
			if (syncDone != null && syncDone == 0)
			{
				String errCode = (String) result[1];
				String errMsg = (String) result[2];

				if (errCode.equals("ERR-158"))
				{
					SystemException systemException = new SystemException(SystemException.Type.SDCSP);
					logger.error(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + errCode + DELIMITER + errMsg);
					throw systemException;
				}else if (errCode.equals("ERR-250"))
				{
					SystemException systemException = new SystemException(SystemException.Type.NRE);
					logger.error(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + errCode + DELIMITER + errMsg);
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
			logger.error(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.DE.getErrorCode() + DELIMITER + SystemException.Type.DE.getMessage());
			logger.error(SAVE_DELEGATED_CUSTOMERS, de);
			throw new DataStoreException(new SystemException(SystemException.Type.DE, de));
		}
		catch (org.hibernate.exception.JDBCConnectionException jdbcce)
		{
			logger.error(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.JDBCCE.getErrorCode() + DELIMITER + SystemException.Type.JDBCCE.getMessage());
			logger.error(SAVE_DELEGATED_CUSTOMERS, jdbcce);
			throw new DataStoreException(new SystemException(SystemException.Type.JDBCCE, jdbcce));
		}
		catch (org.hibernate.exception.SQLGrammarException sqlge)
		{
			logger.error(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + SystemException.Type.SQLGE.getErrorCode() + DELIMITER + SystemException.Type.SQLGE.getMessage());
			logger.error(SAVE_DELEGATED_CUSTOMERS, sqlge);
			throw new DataStoreException(new SystemException(SystemException.Type.SQLGE, sqlge));
		}

		logger.info(SAVE_DELEGATED_CUSTOMERS + DELIMITER + USER_ID + saveDelegatedCustomerRequest.getAccess().getUserId() + DELIMITER + END);
		return isSuccess;
	}

}
