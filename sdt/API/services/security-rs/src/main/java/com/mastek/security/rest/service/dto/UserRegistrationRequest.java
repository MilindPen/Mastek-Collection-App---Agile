package com.mastek.security.rest.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mastek.commons.rest.service.dto.BaseRequest;

public class UserRegistrationRequest extends BaseRequest{
@JsonProperty("mac")
private String mac;
@JsonProperty("pin")
private String pin;
/**
 * @return the mac
 */
public String getMac() {
	return mac;
}
/**
 * @param mac the mac to set
 */
public void setMac(String mac) {
	this.mac = mac;
}
/**
 * @return the pin
 */
public String getPin() {
	return pin;
}
/**
 * @param pin the pin to set
 */
public void setPin(String pin) {
	this.pin = pin;
}

}
