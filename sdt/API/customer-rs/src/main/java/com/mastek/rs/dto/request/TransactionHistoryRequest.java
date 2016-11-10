package com.mastek.rs.dto.request;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class TransactionHistoryRequest
{
	/** The start date. */
	@JsonProperty(value = "startDate")
	String startDate;

	/** The end date. */
	@JsonProperty(value = "endDate")
	String endDate;
	
	/** The agreement id. */
	@JsonProperty(value = "agreementIds")
	List<Long> agreementIds;
	
	public List<Long> getAgreementIds()
	{
		return agreementIds;
	}

	public void setAgreementIds(List<Long> agreementIds)
	{
		this.agreementIds = agreementIds;
	}

	/**
	 * Gets the start date.
	 *
	 * @return the start date
	 */
	public String getStartDate()
	{
		return startDate;
	}

	/**
	 * Sets the start date.
	 *
	 * @param startDate the start date
	 */
	public void setStartDate(String startDate)
	{
		this.startDate = startDate;
	}

	/**
	 * Gets the end date.
	 *
	 * @return the end date
	 */
	public String getEndDate()
	{
		return endDate;
	}

	/**
	 * Sets the end date.
	 *
	 * @param endDate the end date
	 */
	public void setEndDate(String endDate)
	{
		this.endDate = endDate;
	}
	
	public static void main(String[] args){
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			List<Long> agreementIds = new ArrayList<Long>();
			agreementIds.add(1L);
			agreementIds.add(2L);
			agreementIds.add(52L);
			agreementIds.add(3L);
			
			TransactionHistoryRequest u = new TransactionHistoryRequest();
			u.setStartDate("2016-02-15");
			u.setEndDate("2016-02-21");
			u.setAgreementIds(agreementIds);
			String s = mapper.writeValueAsString(u);
			System.out.println(s);
			
			//GetPendingCustomersRequest r = mapper.readValue("{\"accessDO\":{\"token\":null,\"agentId\":0,\"areaId\":1},\"visitDate\":\"2016-02-12\"}", GetPendingCustomersRequest.class);
			//System.out.println(r.getVisitDate());		
			
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}
