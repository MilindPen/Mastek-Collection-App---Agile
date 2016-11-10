package com.mastek.commons.test;

import java.util.HashSet;
import java.util.Set;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;

import com.mastek.commons.data.mapper.BranchDetailsMapping;
import com.mastek.commons.data.mapper.BranchWeekDetailsMapping;
import com.mastek.commons.data.mapper.CashSummaryMapping;
import com.mastek.commons.data.mapper.CustomerAgreementMapping;
import com.mastek.commons.data.mapper.CustomerVisitListMapping;
import com.mastek.commons.data.mapper.CustomerVisitMapping;
import com.mastek.commons.data.mapper.JourneyMapping;
import com.mastek.commons.data.mapper.JourneySelectionMapping;
import com.mastek.commons.data.mapper.LoginUserMapping;
import com.mastek.commons.data.mapper.MapperFacadeFactoryBean;
import com.mastek.commons.data.mapper.MappingConfigurer;
import com.mastek.commons.data.mapper.TransactionAllocationMapping;
import com.mastek.commons.data.mapper.TransactionHistoryMapping;
import com.mastek.commons.data.mapper.UserMapping;
import com.mastek.commons.data.mapper.UserSelectionMapping;
import com.mastek.commons.data.mapper.VWAgreementListMapping;
import com.mastek.commons.data.mapper.WeekEndingMapping;

import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import ma.glasnost.orika.metadata.ScoringClassMapBuilder;

@RunWith(MockitoJUnitRunner.class)
public class TestMapper
{
	@InjectMocks
	MappingConfigurer customerVisitListMapping = new CustomerVisitListMapping();
	
	@InjectMocks
	MappingConfigurer customerAgreementMapping = new CustomerAgreementMapping();
	
	@InjectMocks
	MappingConfigurer customerVisitMapping = new CustomerVisitMapping();
	
	@InjectMocks
	MappingConfigurer journeyMapping = new JourneyMapping();
	
	@InjectMocks
	MappingConfigurer loginUserMapping = new LoginUserMapping();
	
	@InjectMocks
	MappingConfigurer transactionAllocationMapping = new TransactionAllocationMapping();
	
	@InjectMocks
	MappingConfigurer vWAgreementListMapping = new VWAgreementListMapping();
	
	@InjectMocks
	MappingConfigurer userMapping = new UserMapping();
	
	@InjectMocks
	MappingConfigurer weekEndingMapping = new WeekEndingMapping();
	
	@InjectMocks
	MappingConfigurer transactionHistoryMapping = new TransactionHistoryMapping();
	
	@InjectMocks
	MappingConfigurer branchDetailsMapping = new BranchDetailsMapping();
	
	@InjectMocks
	MappingConfigurer branchWeekDetailsMapping = new BranchWeekDetailsMapping();
	
	@InjectMocks
	MappingConfigurer journeySelectionMapping = new JourneySelectionMapping();
	
	@InjectMocks
	MappingConfigurer cashSummaryMapping = new CashSummaryMapping();
	
	@InjectMocks
	MappingConfigurer userSelectionMapping = new UserSelectionMapping();
		
	MapperFactory factory;
	
	MapperFacadeFactoryBean mbaen = new MapperFacadeFactoryBean();
	
	@Before
	public void init(){
		factory = new DefaultMapperFactory.Builder()
			    .classMapBuilderFactory(new ScoringClassMapBuilder.Factory())
			    .build();
	}
	
	@Test
	public void testMapper(){
		
		customerVisitListMapping.configure(factory);
		customerAgreementMapping.configure(factory);
		customerVisitMapping.configure(factory);
		journeyMapping.configure(factory);
		loginUserMapping.configure(factory);
		transactionAllocationMapping.configure(factory);
		vWAgreementListMapping.configure(factory);
		userMapping.configure(factory);
		weekEndingMapping.configure(factory);
		transactionHistoryMapping.configure(factory);
		branchDetailsMapping.configure(factory);
		branchWeekDetailsMapping.configure(factory);
		journeySelectionMapping.configure(factory);
		cashSummaryMapping.configure(factory);
		userSelectionMapping.configure(factory);
		
		Set<MappingConfigurer> configurers = new HashSet<MappingConfigurer>();
		configurers.add(customerVisitListMapping);
		MapperFacadeFactoryBean mbaen = new MapperFacadeFactoryBean(configurers);
		
		try
		{
			mbaen.getObject();
			mbaen.getObjectType();
			mbaen.isSingleton();
			
			Assert.assertTrue(true);
		}
		catch (Exception e)
		{
			Assert.assertTrue(false);
		}
	}
}
