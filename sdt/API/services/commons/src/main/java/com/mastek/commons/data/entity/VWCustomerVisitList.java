package com.mastek.commons.data.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The Class VWCustomerVisitList.
 */
@NamedQueries({@NamedQuery(name = "VWCustomerVisitList.getScheduledCustomers", query = "select cv from VWCustomerVisitList cv where " + "cv.visitDate>= :fromDate and " + "cv.visitDate<= :toDate and " + "cv.userId = :userId ")})

@Entity
@Table(name = "[mobile].[vwCustomerVisitList]")
public class VWCustomerVisitList
{

	/** The visit id. */
	@Column(name = "VisitID")
	private long visitId;

	/** The collection day. */
	@Column(name = "CollectionDay")
	private int collectionDay;

	/** The journey order. */
	@Column(name = "JourneyOrderBy")
	private int journeyOrder;

	/** The status. */
	@Column(name = "StatusID")
	private int status;

	/** The visit status. */
	@Column(name = "VisitStatus")
	private String visitStatus;

	/** The user id. */
	@Column(name = "UserID")
	private long userId;

	/** The journey id. */
	@Column(name = "JourneyID")
	private long journeyId;
	
	/** The journey Description. */
	@Column(name = "JourneyDescription")
	private String journeyDescription;

	/** The customer id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CustomerID")
	private long customerId;

	/** The customer ref number. */
	@Column(name = "CustomerNumber")
	private String customerRefNumber;

	/** The title. */
	@Column(name = "Title")
	private String title;

	/** The first name. */
	@Column(name = "FirstName")
	private String firstName;

	/** The middle name. */
	@Column(name = "MiddleName")
	private String middleName;

	/** The last name. */
	@Column(name = "LastName")
	private String lastName;

	/** The payment type id. */
	@Column(name = "PaymentTypeID")
	private Integer paymentTypeId;

	/** The total paid amount. */
	@Column(name = "TotalPaidAmount")
	private Double totalPaidAmount;

	/** The total term amount. */
	@Column(name = "TotalTermAmount")
	private Double totalTermAmount;

	/** The payment performance. */
	@Column(name = "PaymentPerformance")
	private Integer paymentPerformance;

	/** The address line1. */
	@Column(name = "AddressLine1")
	private String addressLine1;

	/** The address line2. */
	@Column(name = "AddressLine2")
	private String addressLine2;

	/** The address line3. */
	@Column(name = "AddressLine3")
	private String addressLine3;

	/** The address line4. */
	@Column(name = "AddressLine4")
	private String addressLine4;

	/** The city. */
	@Column(name = "City")
	private String city;

	/** The postcode. */
	@Column(name = "PostCode")
	private String postcode;

	/** The phone. */
	@Column(name = "PhoneNumber")
	private String phone;

	/** The mobile. */
	@Column(name = "MobileNumber")
	private String mobile;

	/** The dob. */
	@Column(name = "DOB")
	private String dob;

	/** The email. */
	@Column(name = "Email")
	private String email;

	/** The visit date. */
	@Column(name = "VisitDate")
	private Date visitDate;

	/** The agreements. */
	@OneToMany(mappedBy = "customerId", fetch = FetchType.EAGER)
	private Set<VWAgreementList> agreements = new HashSet<>(0);

	/** The at risk. */
	@Column(name = "AtRisk")
	private Integer atRisk;

	/** The vulnerable. */
	@Column(name = "Vulnerable")
	private String vulnerable;

	@Column(name = "primaryAgent")
	long primaryAgent;
	
	@Column(name = "primaryAgentFirstName")
	String primaryAgentFirstName;
	
	@Column(name = "primaryAgentLastName")
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
	 * Gets the collection day.
	 *
	 * @return the collection day
	 */
	public int getCollectionDay()
	{
		return collectionDay;
	}

	/**
	 * Sets the collection day.
	 *
	 * @param collectionDay the collection day
	 */
	public void setCollectionDay(int collectionDay)
	{
		this.collectionDay = collectionDay;
	}

	/**
	 * Gets the journey order.
	 *
	 * @return the journey order
	 */
	public int getJourneyOrder()
	{
		return journeyOrder;
	}

	/**
	 * Sets the journey order.
	 *
	 * @param journeyOrder the journey order
	 */
	public void setJourneyOrder(int journeyOrder)
	{
		this.journeyOrder = journeyOrder;
	}

	/**
	 * Gets the status.
	 *
	 * @return the status
	 */
	public int getStatus()
	{
		return status;
	}

	/**
	 * Sets the status.
	 *
	 * @param status the status
	 */
	public void setStatus(int status)
	{
		this.status = status;
	}

	/**
	 * Gets the visit status.
	 *
	 * @return the visit status
	 */
	public String getVisitStatus()
	{
		return visitStatus;
	}

	/**
	 * Sets the visit status.
	 *
	 * @param visitStatus the visit status
	 */
	public void setVisitStatus(String visitStatus)
	{
		this.visitStatus = visitStatus;
	}

	/**
	 * Gets the user id.
	 *
	 * @return the user id
	 */
	public long getUserId()
	{
		return userId;
	}

	/**
	 * Sets the user id.
	 *
	 * @param userId the user id
	 */
	public void setUserId(long userId)
	{
		this.userId = userId;
	}

	/**
	 * Gets the journey id.
	 *
	 * @return the journey id
	 */
	public long getJourneyId()
	{
		return journeyId;
	}

	/**
	 * Sets the journey id.
	 *
	 * @param journeyId the journey id
	 */
	public void setJourneyId(long journeyId)
	{
		this.journeyId = journeyId;
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
	 * Gets the visit date.
	 *
	 * @return the visit date
	 */
	public Date getVisitDate()
	{
		return visitDate;
	}

	/**
	 * Sets the visit date.
	 *
	 * @param visitDate the visit date
	 */
	public void setVisitDate(Date visitDate)
	{
		this.visitDate = visitDate;
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
	 * Gets the agreements.
	 *
	 * @return the agreements
	 */
	public Set<VWAgreementList> getAgreements()
	{
		return agreements;
	}

	/**
	 * Sets the agreements.
	 *
	 * @param agreements the agreements
	 */
	public void setAgreements(Set<VWAgreementList> agreements)
	{
		this.agreements = agreements;
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
