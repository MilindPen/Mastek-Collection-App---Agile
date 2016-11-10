package com.mastek.commons.data.entity;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "[dbo].[vwCustomer]")
public class VWCustomer
{

	/** The customer id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CustomerID")
	private long customerId;

	/** The customer number. */
	@Column(name = "CustomerNumber")
	private String customerNumber;

	/** The title. */
	@Column(name = "Title")
	private String title;

	/** The first name. */
	@Column(name = "FirstName")
	private String firstName;

	/** The middle name. */
	@Column(name = "MiddleName")
	private String middleName;

	/** The surname. */
	@Column(name = "LastName")
	private String surname;

	/** The dob. */
	@Column(name = "DOB")
	private String dob;

	/** The address1. */
	@Column(name = "AddressLine1")
	private String address1;

	/** The address2. */
	@Column(name = "AddressLine2")
	private String address2;

	/** The address3. */
	@Column(name = "AddressLine3")
	private String address3;

	/** The address4. */
	@Column(name = "AddressLine4")
	private String address4;

	/** The city. */
	@Column(name = "City")
	private String city;

	/** The postcode. */
	@Column(name = "PostCode")
	private String postcode;

	/** The phone number. */
	@Column(name = "PhoneNumber")
	private String phoneNumber;

	/** The mobile. */
	@Column(name = "MobileNumber")
	private String mobile;

	/** The email. */
	@Column(name = "Email")
	private String email;

	/** The payment performance. */
	@Column(name = "PaymentPerformance")
	private Integer paymentPerformance;

	/** The created date. */
	@Column(name = "CreatedDate")
	private Date createdDate;

	/** The created by. */
	@Column(name = "CreatedBy")
	private String createdBy;

	/** The updated date. */
	@Column(name = "UpdatedDate")
	private Date updatedDate;

	/** The updated by. */
	@Column(name = "UpdatedBy")
	private String updatedBy;

	/** The journey customer. */
	@OneToMany(mappedBy = "customer")
	private Set<VWJourneyCustomer> journeyCustomer = new HashSet<>(0);

	/** The customer visits. */
	@OneToMany(mappedBy = "customer")
	private Set<VWVisitSummary> customerVisits = new HashSet<>(0);

	/** The agreements. */
	@OneToMany(mappedBy = "customerId")
	private Set<VWAgreement> agreements = new HashSet<>(0);

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
	 * Gets the customer number.
	 *
	 * @return the customer number
	 */
	public String getCustomerNumber()
	{
		return customerNumber;
	}

	/**
	 * Sets the customer number.
	 *
	 * @param customerNumber the customer number
	 */
	public void setCustomerNumber(String customerNumber)
	{
		this.customerNumber = customerNumber;
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
	 * Gets the surname.
	 *
	 * @return the surname
	 */
	public String getSurname()
	{
		return surname;
	}

	/**
	 * Sets the surname.
	 *
	 * @param surname the surname
	 */
	public void setSurname(String surname)
	{
		this.surname = surname;
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
	 * Gets the address1.
	 *
	 * @return the address1
	 */
	public String getAddress1()
	{
		return address1;
	}

	/**
	 * Sets the address1.
	 *
	 * @param address1 the address1
	 */
	public void setAddress1(String address1)
	{
		this.address1 = address1;
	}

	/**
	 * Gets the address2.
	 *
	 * @return the address2
	 */
	public String getAddress2()
	{
		return address2;
	}

	/**
	 * Sets the address2.
	 *
	 * @param address2 the address2
	 */
	public void setAddress2(String address2)
	{
		this.address2 = address2;
	}

	/**
	 * Gets the address3.
	 *
	 * @return the address3
	 */
	public String getAddress3()
	{
		return address3;
	}

	/**
	 * Sets the address3.
	 *
	 * @param address3 the address3
	 */
	public void setAddress3(String address3)
	{
		this.address3 = address3;
	}

	/**
	 * Gets the address4.
	 *
	 * @return the address4
	 */
	public String getAddress4()
	{
		return address4;
	}

	/**
	 * Sets the address4.
	 *
	 * @param address4 the address4
	 */
	public void setAddress4(String address4)
	{
		this.address4 = address4;
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
	 * Gets the phone number.
	 *
	 * @return the phone number
	 */
	public String getPhoneNumber()
	{
		return phoneNumber;
	}

	/**
	 * Sets the phone number.
	 *
	 * @param phoneNumber the phone number
	 */
	public void setPhoneNumber(String phoneNumber)
	{
		this.phoneNumber = phoneNumber;
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
	 * Gets the created date.
	 *
	 * @return the created date
	 */
	public Date getCreatedDate()
	{
		return createdDate;
	}

	/**
	 * Sets the created date.
	 *
	 * @param createdDate the created date
	 */
	public void setCreatedDate(Date createdDate)
	{
		this.createdDate = createdDate;
	}

	/**
	 * Gets the created by.
	 *
	 * @return the created by
	 */
	public String getCreatedBy()
	{
		return createdBy;
	}

	/**
	 * Sets the created by.
	 *
	 * @param createdBy the created by
	 */
	public void setCreatedBy(String createdBy)
	{
		this.createdBy = createdBy;
	}

	/**
	 * Gets the updated date.
	 *
	 * @return the updated date
	 */
	public Date getUpdatedDate()
	{
		return updatedDate;
	}

	/**
	 * Sets the updated date.
	 *
	 * @param updatedDate the updated date
	 */
	public void setUpdatedDate(Date updatedDate)
	{
		this.updatedDate = updatedDate;
	}

	/**
	 * Gets the updated by.
	 *
	 * @return the updated by
	 */
	public String getUpdatedBy()
	{
		return updatedBy;
	}

	/**
	 * Sets the updated by.
	 *
	 * @param updatedBy the updated by
	 */
	public void setUpdatedBy(String updatedBy)
	{
		this.updatedBy = updatedBy;
	}

	/**
	 * Gets the journey customer.
	 *
	 * @return the journey customer
	 */
	public Set<VWJourneyCustomer> getJourneyCustomer()
	{
		return journeyCustomer;
	}

	/**
	 * Sets the journey customer.
	 *
	 * @param journeyCustomer the journey customer
	 */
	public void setJourneyCustomer(Set<VWJourneyCustomer> journeyCustomer)
	{
		this.journeyCustomer = journeyCustomer;
	}

	/**
	 * Gets the customer visits.
	 *
	 * @return the customer visits
	 */
	public Set<VWVisitSummary> getCustomerVisits()
	{
		return customerVisits;
	}

	/**
	 * Sets the customer visits.
	 *
	 * @param customerVisits the customer visits
	 */
	public void setCustomerVisits(Set<VWVisitSummary> customerVisits)
	{
		this.customerVisits = customerVisits;
	}

	/**
	 * Gets the agreements.
	 *
	 * @return the agreements
	 */
	public Set<VWAgreement> getAgreements()
	{
		return agreements;
	}

	/**
	 * Sets the agreements.
	 *
	 * @param agreements the agreements
	 */
	public void setAgreements(Set<VWAgreement> agreements)
	{
		this.agreements = agreements;
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

}
