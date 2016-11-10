package com.mastek.commons.data.mapper;

import ma.glasnost.orika.MapperFactory;

/**
 * The Interface MappingConfigurer.
 */
@FunctionalInterface
public interface MappingConfigurer {
	
	/**
	 * Configure.
	 *
	 * @param factory the factory
	 */
	void configure(MapperFactory factory);
}
