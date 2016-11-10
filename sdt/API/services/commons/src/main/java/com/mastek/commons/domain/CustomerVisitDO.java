package com.mastek.commons.domain;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * The Class CustomerVisitDO.
 */
public class CustomerVisitDO
{
	/** * Customer visit Details **. */

	@JsonProperty(value = "visitId")
	long visitId;

	/** The visit date. */
	@JsonProperty(value = "visitDate")
	String visitDate;

	/** The total term amount. */
	@JsonProperty(value = "totalTermAmount")
	Double totalTermAmount;

	/** The total paid amount. */
	@JsonProperty(value = "totalPaidAmount")
	Double totalPaidAmount;

	/** The payment type id. */
	@JsonProperty(value = "paymentTypeId")
	Integer paymentTypeId;

	/** The status. */
	@JsonProperty(value = "status")
	String status;

	/** * Customer visit Details **. */

	/*** Customer Details ***/

	@JsonProperty(value = "customerId")
	long customerId;

	/** The customer ref number. */
	@JsonProperty(value = "customerRefNumber")
	String customerRefNumber;

	/** The title. */
	@JsonProperty(value = "title")
	String title;

	/** The first name. */
	@JsonProperty(value = "firstName")
	String firstName;

	/** The middle name. */
	@JsonProperty(value = "middleName")
	String middleName;

	/** The last name. */
	@JsonProperty(value = "lastName")
	String lastName;

	/** The payment performance. */
	@JsonProperty(value = "paymentPerformance")
	Integer paymentPerformance;

	/** The phone. */
	@JsonProperty(value = "phone")
	String phone;

	/** The mobile. */
	@JsonProperty(value = "mobile")
	String mobile;

	/** The email. */
	@JsonProperty(value = "email")
	String email;

	/** The address line1. */
	@JsonProperty(value = "addressLine1")
	String addressLine1;

	/** The address line2. */
	@JsonProperty(value = "addressLine2")
	String addressLine2;

	/** The address line3. */
	@JsonProperty(value = "addressLine3")
	String addressLine3;

	/** The address line4. */
	@JsonProperty(value = "addressLine4")
	String addressLine4;

	/** The city. */
	@JsonProperty(value = "city")
	String city;

	/** The postcode. */
	@JsonProperty(value = "postcode")
	String postcode;

	/** The collection day. */
	@JsonProperty(value = "collectionDay")
	String collectionDay;

	/** The journey order. */
	@JsonProperty(value = "journeyOrder")
	String journeyOrder;

	/** The dob. */
	@JsonProperty(value = "dob")
	String dob;

	/** The at risk. */
	@JsonProperty(value = "atRisk")
	Integer atRisk;

	/** The vulnerable. */
	@JsonProperty(value = "vulnerable")
	String vulnerable;

	@JsonProperty(value = "journeyId")
	Long journeyId;
	
	@JsonProperty(value = "journeyDescription")
	String journeyDescription;
	
	/** * Customer Details **. */

	@JsonProperty(value = "agreementList")
	List<AgreementDO> agreements;

	@JsonProperty(value = "primaryAgent")
	long primaryAgent;
	
	@JsonProperty(value = "primaryAgentFirstName")
	String primaryAgentFirstName;
	
	@JsonProperty(value = "primaryAgentLastName")
	String primaryAgentLastName;

	/**
	 * Gets the visit id.
	 *
	 * @return the visit id
	 */
	public long getVisitId()
	{
		return visitId;
	}

	/**
	 * Sets the visit id.
	 *
	 * @param visitId the visit id
	 */
	public void setVisitId(long visitId)
	{
		this.visitId = visitId;
	}

	/**
	 * Gets the total term amount.
	 *
	 * @return the total term amount
	 */
	public Double getTotalTermAmount()
	{
		return totalTermAmount;
	}

	/**
	 * Sets the total term amount.
	 *
	 * @param totalTermAmount the total term amount
	 */
	public void setTotalTermAmount(Double totalTermAmount)
	{
		this.totalTermAmount = totalTermAmount;
	}

	/**
	 * Gets the total paid amount.
	 *
	 * @return the total paid amount
	 */
	public Double getTotalPaidAmount()
	{
		return totalPaidAmount;
	}

	/**
	 * Sets the total paid amount.
	 *
	 * @param totalPaidAmount the total paid amount
	 */
	public void setTotalPaidAmount(Double totalPaidAmount)
	{
		this.totalPaidAmount = totalPaidAmount;
	}

	/**
	 * Gets the payment type id.
	 *
	 * @return the payment type id
	 */
	public Integer getPaymentTypeId()
	{
		return paymentTypeId;
	}

	/**
	 * Sets the payment type id.
	 *
	 * @param paymentTypeId the payment type id
	 */
	public void setPaymentTypeId(Integer paymentTypeId)
	{
		this.paymentTypeId = paymentTypeId;
	}

	/**
	 * Gets the status.
	 *
	 * @return the status
	 */
	public String getStatus()
	{
		return status;
	}

	/**
	 * Sets the status.
	 *
	 * @param status the status
	 */
	public void setStatus(String status)
	{
		this.status = status;
	}

	/**
	 * Gets the customer id.
	 *
	 * @return the customer id
	 */
	public long getCustomerId()
	{
		return customerId;
	}

	/**
	 * Sets the customer id.
	 *
	 * @param customerId the customer id
	 */
	public void setCustomerId(long customerId)
	{
		this.customerId = customerId;
	}

	/**
	 * Gets the customer ref number.
	 *
	 * @return the customer ref number
	 */
	public String getCustomerRefNumber()
	{
		return customerRefNumber;
	}

	/**
	 * Sets the customer ref number.
	 *
	 * @param customerRefNumber the customer ref number
	 */
	public void setCustomerRefNumber(String customerRefNumber)
	{
		this.customerRefNumber = customerRefNumber;
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public String getTitle()
	{
		return title;
	}

	/**
	 * Sets the title.
	 *
	 * @param title the title
	 */
	public void setTitle(String title)
	{
		this.title = title;
	}

	/**
	 * Gets the first name.
	 *
	 * @return the first name
	 */
	public String getFirstName()
	{
		return firstName;
	}

	/**
	 * Sets the first name.
	 *
	 * @param firstName the first name
	 */
	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}

	/**
	 * Gets the middle name.
	 *
	 * @return the middle name
	 */
	public String getMiddleName()
	{
		return middleName;
	}

	/**
	 * Sets the middle name.
	 *
	 * @param middleName the middle name
	 */
	public void setMiddleName(String middleName)
	{
		this.middleName = middleName;
	}

	/**
	 * Gets the last name.
	 *
	 * @return the last name
	 */
	public String getLastName()
	{
		return lastName;
	}

	/**
	 * Sets the last name.
	 *
	 * @param lastName the last name
	 */
	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

	/**
	 * Gets the payment performance.
	 *
	 * @return the payment performance
	 */
	public Integer getPaymentPerformance()
	{
		return paymentPerformance;
	}

	/**
	 * Sets the payment performance.
	 *
	 * @param paymentPerformance the payment performance
	 */
	public void setPaymentPerformance(Integer paymentPerformance)
	{
		this.paymentPerformance = paymentPerformance;
	}

	/**
	 * Gets the phone.
	 *
	 * @return the phone
	 */
	public String getPhone()
	{
		return phone;
	}

	/**
	 * Sets the phone.
	 *
	 * @param phone the phone
	 */
	public void setPhone(String phone)
	{
		this.phone = phone;
	}

	/**
	 * Gets the mobile.
	 *
	 * @return the mobile
	 */
	public String getMobile()
	{
		return mobile;
	}

	/**
	 * Sets the mobile.
	 *
	 * @param mobile the mobile
	 */
	public void setMobile(String mobile)
	{
		this.mobile = mobile;
	}

	/**
	 * Gets the email.
	 *
	 * @return the email
	 */
	public String getEmail()
	{
		return email;
	}

	/**
	 * Sets the email.
	 *
	 * @param email the email
	 */
	public void setEmail(String email)
	{
		this.email = email;
	}

	/**
	 * Gets the address line1.
	 *
	 * @return the address line1
	 */
	public String getAddressLine1()
	{
		return addressLine1;
	}

	/**
	 * Sets the address line1.
	 *
	 * @param addressLine1 the address line1
	 */
	public void setAddressLine1(String addressLine1)
	{
		this.addressLine1 = addressLine1;
	}

	/**
	 * Gets the address line2.
	 *
	 * @return the address line2
	 */
	public String getAddressLine2()
	{
		return addressLine2;
	}

	/**
	 * Sets the address line2.
	 *
	 * @param addressLine2 the address line2
	 */
	public void setAddressLine2(String addressLine2)
	{
		this.addressLine2 = addressLine2;
	}

	/**
	 * Gets the address line3.
	 *
	 * @return the address line3
	 */
	public String getAddressLine3()
	{
		return addressLine3;
	}

	/**
	 * Sets the address line3.
	 *
	 * @param addressLine3 the address line3
	 */
	public void setAddressLine3(String addressLine3)
	{
		this.addressLine3 = addressLine3;
	}

	/**
	 * Gets the address line4.
	 *
	 * @return the address line4
	 */
	public String getAddressLine4()
	{
		return addressLine4;
	}

	/**
	 * Sets the address line4.
	 *
	 * @param addressLine4 the address line4
	 */
	public void setAddressLine4(String addressLine4)
	{
		this.addressLine4 = addressLine4;
	}

	/**
	 * Gets the city.
	 *
	 * @return the city
	 */
	public String getCity()
	{
		return city;
	}

	/**
	 * Sets the city.
	 *
	 * @param city the city
	 */
	public void setCity(String city)
	{
		this.city = city;
	}

	/**
	 * Gets the postcode.
	 *
	 * @return the postcode
	 */
	public String getPostcode()
	{
		return postcode;
	}

	/**
	 * Sets the postcode.
	 *
	 * @param postcode the postcode
	 */
	public void setPostcode(String postcode)
	{
		this.postcode = postcode;
	}

	/**
	 * Gets the collection day.
	 *
	 * @return the collection day
	 */
	public String getCollectionDay()
	{
		return collectionDay;
	}

	/**
	 * Sets the collection day.
	 *
	 * @param collectionDay the collection day
	 */
	public void setCollectionDay(String collectionDay)
	{
		this.collectionDay = collectionDay;
	}

	/**
	 * Gets the journey order.
	 *
	 * @return the journey order
	 */
	public String getJourneyOrder()
	{
		return journeyOrder;
	}

	/**
	 * Sets the journey order.
	 *
	 * @param journeyOrder the journey order
	 */
	public void setJourneyOrder(String journeyOrder)
	{
		this.journeyOrder = journeyOrder;
	}

	/**
	 * Gets the dob.
	 *
	 * @return the dob
	 */
	public String getDob()
	{
		return dob;
	}

	/**
	 * Sets the dob.
	 *
	 * @param dob the dob
	 */
	public void setDob(String dob)
	{
		this.dob = dob;
	}

	/**
	 * Gets the agreements.
	 *
	 * @return the agreements
	 */
	public List<AgreementDO> getAgreements()
	{
		return agreements;
	}

	/**
	 * Sets the agreements.
	 *
	 * @param agreements the agreements
	 */
	public void setAgreements(List<AgreementDO> agreements)
	{
		this.agreements = agreements;
	}

	/**
	 * Gets the visit date.
	 *
	 * @return the visit date
	 */
	public String getVisitDate()
	{
		return visitDate;
	}

	/**
	 * Sets the visit date.
	 *
	 * @param visitDate the visit date
	 */
	public void setVisitDate(String visitDate)
	{
		this.visitDate = visitDate;
	}

	/**
	 * Gets the at risk.
	 *
	 * @return the at risk
	 */
	public Integer getAtRisk()
	{
		return atRisk;
	}

	/**
	 * Sets the at risk.
	 *
	 * @param atRisk the at risk
	 */
	public void setAtRisk(Integer atRisk)
	{
		this.atRisk = atRisk;
	}

	/**
	 * Gets the vulnerable.
	 *
	 * @return the vulnerable
	 */
	public String getVulnerable()
	{
		return vulnerable;
	}

	/**
	 * Sets the vulnerable.
	 *
	 * @param vulnerable the vulnerable
	 */
	public void setVulnerable(String vulnerable)
	{
		this.vulnerable = vulnerable;
	}

	public Long getJourneyId() {
		return journeyId;
	}

	public void setJourneyId(Long journeyId) {
		this.journeyId = journeyId;
	}

	public long getPrimaryAgent() {
		return primaryAgent;
	}

	public void setPrimaryAgent(long primaryAgent) {
		this.primaryAgent = primaryAgent;
	}

	public String getPrimaryAgentFirstName() {
		return primaryAgentFirstName;
	}

	public void setPrimaryAgentFirstName(String primaryAgentFirstName) {
		this.primaryAgentFirstName = primaryAgentFirstName;
	}

	public String getPrimaryAgentLastName() {
		return primaryAgentLastName;
	}

	public void setPrimaryAgentLastName(String primaryAgentLastName) {
		this.primaryAgentLastName = primaryAgentLastName;
	}
	
	/**
	 * Gets the journeyDescription.
	 *
	 * @return the journeyDescription
	 */
	public String getJourneyDescription()
	{
		return journeyDescription;
	}

	/**
	 * Sets the journeyDescription.
	 *
	 * @param journeyDescription
	 */
	public void setJourneyDescription(String journeyDescription)
	{
		this.journeyDescription = journeyDescription;
	}
	
}
