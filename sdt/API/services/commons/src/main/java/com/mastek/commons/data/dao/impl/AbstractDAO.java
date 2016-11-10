package com.mastek.commons.data.dao.impl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * The Class AbstractDAO.
 */
public abstract class AbstractDAO
{

	/** The session factory. */
	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * Gets the session.
	 *
	 * @return the session
	 */
	protected Session getSession()
	{
		return sessionFactory.getCurrentSession();
	}

	/**
	 * Open session.
	 *
	 * @return the session
	 */
	protected Session openSession()
	{
		return sessionFactory.openSession();
	}

	/**
	 * Persist.
	 *
	 * @param entity the entity
	 */
	public void persist(Object entity)
	{
		getSession().persist(entity);
	}

	/**
	 * Delete.
	 *
	 * @param entity the entity
	 */
	public void delete(Object entity)
	{
		getSession().delete(entity);
	}

	/**
	 * Gets the session factory.
	 *
	 * @return the session factory
	 */
	public SessionFactory getSessionFactory()
	{
		return sessionFactory;
	}

	/**
	 * Sets the session factory.
	 *
	 * @param sessionFactory the session factory
	 */
	public void setSessionFactory(SessionFactory sessionFactory)
	{
		this.sessionFactory = sessionFactory;
	}

}
