package com.mastek.commons.domain;

import org.codehaus.jackson.annotate.JsonProperty;

public class DelegationCustomersDO {

	@JsonProperty(value = "customerJourneyId")
	Integer customerJourneyId;
	
	@JsonProperty(value = "journeyId")
	Integer journeyId;
	
	@JsonProperty(value = "primaryAgent")
	Integer primaryAgent;
	
	@JsonProperty(value = "customerId")
	Integer customerId;
	
	/** The collection day. */
	@JsonProperty(value = "collectionDay")
	Integer collectionDay;

	/** The journey order. */
	@JsonProperty(value = "journeyOrder")
	Integer journeyOrder;
	
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
	
	/** The phone. */
	@JsonProperty(value = "phone")
	String phone;

	/** The mobile. */
	@JsonProperty(value = "mobile")
	String mobile;

	/** The email. */
	@JsonProperty(value = "email")
	String email;

	/** The city. */
	@JsonProperty(value = "city")
	String city;

	/** The postcode. */
	@JsonProperty(value = "postcode")
	String postcode;
	
	/** The customer ref number. */
	@JsonProperty(value = "customerRefNumber")
	String customerRefNumber;
	
	/** The dob. */
	@JsonProperty(value = "dob")
	String dob;
	
	/** The payment performance. */
	@JsonProperty(value = "paymentPerformance")
	Double paymentPerformance;

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getAddressLine3() {
		return addressLine3;
	}

	public void setAddressLine3(String addressLine3) {
		this.addressLine3 = addressLine3;
	}

	public String getAddressLine4() {
		return addressLine4;
	}

	public void setAddressLine4(String addressLine4) {
		this.addressLine4 = addressLine4;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public Integer getCollectionDay() {
		return collectionDay;
	}

	public void setCollectionDay(Integer collectionDay) {
		this.collectionDay = collectionDay;
	}

	public Integer getJourneyOrder() {
		return journeyOrder;
	}

	public void setJourneyOrder(Integer journeyOrder) {
		this.journeyOrder = journeyOrder;
	}

	public Integer getCustomerJourneyId() {
		return customerJourneyId;
	}

	public void setCustomerJourneyId(Integer customerJourneyId) {
		this.customerJourneyId = customerJourneyId;
	}

	public Integer getJourneyId() {
		return journeyId;
	}

	public void setJourneyId(Integer journeyId) {
		this.journeyId = journeyId;
	}

	public Integer getPrimaryAgent() {
		return primaryAgent;
	}

	public void setPrimaryAgent(Integer primaryAgent) {
		this.primaryAgent = primaryAgent;
	}

	public String getCustomerRefNumber() {
		return customerRefNumber;
	}

	public void setCustomerRefNumber(String customerRefNumber) {
		this.customerRefNumber = customerRefNumber;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public Double getPaymentPerformance() {
		return paymentPerformance;
	}

	public void setPaymentPerformance(Double paymentPerformance) {
		this.paymentPerformance = paymentPerformance;
	}
	
}
