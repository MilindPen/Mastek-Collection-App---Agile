package com.mastek.commons.test;

import org.hibernate.SessionFactory;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.data.dao.impl.AbstractDAO;

@RunWith(MockitoJUnitRunner.class)
public class TestAbstractDAOMock {

	@InjectMocks
	AbstractDAOImpl abstractDAOImpl =new AbstractDAOImpl();

	SessionFactory factory;
	
	@Test
	public void testSetSessionFactory(){
		abstractDAOImpl.setSessionFactory(factory);
		
	}
	
	@Test
	public void testGetSessionFactory(){
		abstractDAOImpl.getSessionFactory();
		
	}
}

class AbstractDAOImpl extends AbstractDAO{
	
}

