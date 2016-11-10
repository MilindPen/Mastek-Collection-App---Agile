package com.mastek.transaction.rest.service.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mastek.commons.domain.SynchronizDO;
import com.mastek.commons.rest.service.dto.BaseRequest;

public class TransactionSyncRequest extends BaseRequest{

@JsonProperty(value="transactionDetails")	
private List<SynchronizDO> transactionDetails;

/**
 * @return the transactionDetails
 */
public List<SynchronizDO> getTransactionDetails() {
	return transactionDetails;
}

/**
 * @param transactionDetails the transactionDetails to set
 */
public void setTransactionDetails(List<SynchronizDO> transactionDetails) {
	this.transactionDetails = transactionDetails;
}	
	
}
