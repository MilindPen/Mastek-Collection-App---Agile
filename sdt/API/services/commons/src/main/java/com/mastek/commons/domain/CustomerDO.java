package com.mastek.commons.domain;
import org.codehaus.jackson.annotate.JsonProperty;
/**
 * The Class CustomerDO.
 */
public class CustomerDO
{
	
	/** The mobile number. */
	@JsonProperty(value="mobileNumber")
	private String mobileNumber;

	/** The phone number. */
	@JsonProperty(value="phoneNumber")
	private String phoneNumber;

	/** The email. */
	@JsonProperty(value="email")
	private String email;

	/** The address line1. */
	@JsonProperty(value="addressLine1")
	private String addressLine1;

	/** The address line2. */
	@JsonProperty(value="addressLine2")
	private String addressLine2;

	/** The address line3. */
	@JsonProperty(value="addressLine3")
	private String addressLine3;

	/** The address line4. */
	@JsonProperty(value="addressLine4")
	private String addressLine4;

	/** The city. */
	@JsonProperty(value="city")
	private String city;

	/** The post code. */
	@JsonProperty(value="postCode")
	private String postCode;

	/** The journey id. */
	@JsonProperty(value="journeyId")
	private long journeyId;

	/** The customer id. */
	@JsonProperty(value="customerId")
	private long customerId;

	/** The journey order. */
	@JsonProperty(value="journeyOrder")
	private String journeyOrder;
	
	/** The collection day. */
	@JsonProperty(value="collectionDay")
	private long collectionDay;

	/** The updated date. */
	@JsonProperty(value="updatedDate")
	private String updatedDate;
	
	/**
	 * Gets the mobile number.
	 *
	 * @return the mobileNumber
	 */
	public String getMobileNumber() {
		return mobileNumber;
	}

	/**
	 * Sets the mobile number.
	 *
	 * @param mobileNumber the mobileNumber to set
	 */
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	/**
	 * Gets the phone number.
	 *
	 * @return the phoneNumber
	 */
	public String getPhoneNumber() {
		return phoneNumber;
	}

	/**
	 * Sets the phone number.
	 *
	 * @param phoneNumber the phoneNumber to set
	 */
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	/**
	 * Gets the email.
	 *
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Sets the email.
	 *
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Gets the address line1.
	 *
	 * @return the addressLine1
	 */
	public String getAddressLine1() {
		return addressLine1;
	}

	/**
	 * Sets the address line1.
	 *
	 * @param addressLine1 the addressLine1 to set
	 */
	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	/**
	 * Gets the address line2.
	 *
	 * @return the addressLine2
	 */
	public String getAddressLine2() {
		return addressLine2;
	}

	/**
	 * Sets the address line2.
	 *
	 * @param addressLine2 the addressLine2 to set
	 */
	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	/**
	 * Gets the address line3.
	 *
	 * @return the addressLine3
	 */
	public String getAddressLine3() {
		return addressLine3;
	}

	/**
	 * Sets the address line3.
	 *
	 * @param addressLine3 the addressLine3 to set
	 */
	public void setAddressLine3(String addressLine3) {
		this.addressLine3 = addressLine3;
	}

	/**
	 * Gets the address line4.
	 *
	 * @return the addressLine4
	 */
	public String getAddressLine4() {
		return addressLine4;
	}

	/**
	 * Sets the address line4.
	 *
	 * @param addressLine4 the addressLine4 to set
	 */
	public void setAddressLine4(String addressLine4) {
		this.addressLine4 = addressLine4;
	}

	/**
	 * Gets the city.
	 *
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * Sets the city.
	 *
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * Gets the post code.
	 *
	 * @return the postCode
	 */
	public String getPostCode() {
		return postCode;
	}

	/**
	 * Sets the post code.
	 *
	 * @param postCode the postCode to set
	 */
	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	/**
	 * Gets the journey id.
	 *
	 * @return the journeyId
	 */
	public long getJourneyId() {
		return journeyId;
	}

	/**
	 * Sets the journey id.
	 *
	 * @param journeyId the journeyId to set
	 */
	public void setJourneyId(long journeyId) {
		this.journeyId = journeyId;
	}

	/**
	 * Gets the customer id.
	 *
	 * @return the customerId
	 */
	public long getCustomerId() {
		return customerId;
	}

	/**
	 * Sets the customer id.
	 *
	 * @param customerId the customerId to set
	 */
	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	/**
	 * Gets the journey order.
	 *
	 * @return the journeyOrder
	 */
	public String getJourneyOrder() {
		return journeyOrder;
	}

	/**
	 * Sets the journey order.
	 *
	 * @param journeyOrder the journeyOrder to set
	 */
	public void setJourneyOrder(String journeyOrder) {
		this.journeyOrder = journeyOrder;
	}

	/**
	 * Gets the collection day.
	 *
	 * @return the collectionDay
	 */
	public long getCollectionDay() {
		return collectionDay;
	}

	/**
	 * Sets the collection day.
	 *
	 * @param collectionDay the collectionDay to set
	 */
	public void setCollectionDay(long collectionDay) {
		this.collectionDay = collectionDay;
	}

	/**
	 * Gets the updated date.
	 *
	 * @return the updatedDate
	 */
	public String getUpdatedDate() {
		return updatedDate;
	}

	/**
	 * Sets the updated date.
	 *
	 * @param updatedDate the updatedDate to set
	 */
	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}
	
}
