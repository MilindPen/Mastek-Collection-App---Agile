package com.mastek.data.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mastek.data.dao.TransactionDAO;
import com.mastek.data.entity.VWTransaction;
import com.mastek.data.entity.VWTransactionAllocation;
import com.mastek.domain.TransactionHistoryDO;
import com.mastek.exception.DataStoreException;
import com.mastek.exception.SystemException;
import com.mastek.util.CommonUtil;

import ma.glasnost.orika.MapperFacade;

@Repository
public class TransactionDAOImpl extends AbstractDAO implements TransactionDAO
{
	/** The mapper facade. */
	@Autowired
	private MapperFacade mapperFacade;

	@Override
	public List<TransactionHistoryDO> getTransactionHistory(String startDate, String endDate, List<Long> agreementIds) throws DataStoreException
	{
		List<TransactionHistoryDO> transactions = new ArrayList<TransactionHistoryDO>();

		try
		{
			Date transHistoryEndDate = CommonUtil.getTransHistoryEndDate(startDate);//startDate - 1 day
			Date transHistoryStartDate = CommonUtil.getTransHistoryStartDate(startDate);//startDate - 91 days

			Query query = openSession().getNamedQuery("VWTransaction.getTransactionHistory");
			query.setDate("startDate", transHistoryStartDate);
			query.setDate("endDate", transHistoryEndDate);
			query.setParameterList("agreementIds", agreementIds);
			List<Object[]> transHistoryList = query.list();

			TransactionHistoryDO tranDO = null;
			for (Object[] obj : transHistoryList)
			{
				VWTransaction transaction = (VWTransaction) obj[0];
				VWTransactionAllocation allocation = (VWTransactionAllocation) obj[1];

				tranDO = this.mapperFacade.map(allocation, TransactionHistoryDO.class);
				tranDO.setTransactionId(transaction.getTransactionId());
				tranDO.setCustomerId(transaction.getCustomerId());
				tranDO.setPaidDate(transaction.getPaidDate().toString());
				tranDO.setStatus(transaction.getResponseStatusID().toString());
				transactions.add(tranDO);
			}
		}
		catch (HibernateException hibernateException)
		{
			throw new DataStoreException(new SystemException(SystemException.Type.HE, hibernateException));
		}

		return transactions;
	}

}
