package com.mastek.commons.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.exception.ApplicationException;
import com.mastek.commons.exception.DataStoreException;
import com.mastek.commons.exception.ServiceException;
import com.mastek.commons.exception.SystemException;

@RunWith(MockitoJUnitRunner.class)
public class TestException
{
	@InjectMocks
	DataStoreException exp = new DataStoreException(new SystemException(SystemException.Type.DE));
	
	@InjectMocks
	ApplicationException appExp = new ApplicationException(ApplicationException.Type.DRE);
	
	@InjectMocks
	SystemException sysExp = new SystemException(SystemException.Type.DE);
	
	@InjectMocks
	ServiceException seExp = new ServiceException();
	
	@Test
	public void testException(){
		
		DataStoreException exp1 = new DataStoreException(new SystemException(SystemException.Type.DE,new RuntimeException()));
		exp1.getSystemException();
		exp.getSystemException();
		
		ApplicationException appExp1 = new ApplicationException(ApplicationException.Type.DRE,new RuntimeException());
		appExp.getType();
		appExp.getSerialversionuid();
		appExp1.getType();
		appExp1.getType().getErrorCode();
		appExp1.getType().getMessage();
		appExp1.getType().getName();
		
		SystemException sysExp1 = new SystemException(SystemException.Type.DE,new RuntimeException());
		sysExp.getType();
		sysExp.getSerialversionuid();
		sysExp1.getType();
		sysExp1.getType().getErrorCode();
		sysExp1.getType().getMessage();
		sysExp1.getType().getName();
		
		seExp.getErrorCode();
		seExp.setApplicationException(appExp1);
		seExp.getApplicationException(); 
		seExp.getErrorCode();
		seExp.setSystemException(sysExp1);
		seExp.getSystemException();
		seExp.getErrorCode();
	}

}
