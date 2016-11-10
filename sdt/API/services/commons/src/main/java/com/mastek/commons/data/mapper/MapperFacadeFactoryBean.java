package com.mastek.commons.data.mapper;

import java.util.HashSet;
import java.util.Set;
import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * The Class MapperFacadeFactoryBean.
 */
@Component()
public class MapperFacadeFactoryBean implements FactoryBean<MapperFacade> {

	/** The configurers. */
	private final Set<MappingConfigurer> configurers;

	/**
	 * Instantiates a new mapper facade factory bean.
	 */
	public MapperFacadeFactoryBean() {
		super();
		this.configurers = new HashSet<>();
	}

	/**
	 * Instantiates a new mapper facade factory bean.
	 *
	 * @param configurers the configurers
	 */
	@Autowired(required = true)
	public MapperFacadeFactoryBean(final Set<MappingConfigurer> configurers) {
		super();
		this.configurers = configurers;
	}

	/** 
	 * Mapper Configuration
	 */
	@SuppressWarnings("deprecation")
	@Override
	public MapperFacade getObject() throws Exception {
		final MapperFactory mapperFactory = new DefaultMapperFactory.Builder().useBuiltinConverters(true).build();

		for(final MappingConfigurer configurer : this.configurers) {
			configurer.configure(mapperFactory);
		}
		mapperFactory.build();
		return mapperFactory.getMapperFacade();
	}

	/** 
	 * Get mapper class
	 */
	@Override
	public Class<?> getObjectType() {
		return MapperFacade.class;
	}

	/** 
	 * Check is singleton
	 */
	@Override
	public boolean isSingleton() {
		return true;
	}
}
