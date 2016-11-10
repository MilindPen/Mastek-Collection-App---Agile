package com.mastek.transaction.filter;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
@Component
public class CORSServletTransactionFilter implements Filter
{

	private static final Logger logger = LoggerFactory.getLogger(CORSServletTransactionFilter.class);
	
	/** 
	 * Destroys filter
	 */
	@Override
	public void destroy()
	{
		//Overridden method
	}

	/** 
	 * Add headers in http request
	 */
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException
	{
		HttpServletResponse response = (HttpServletResponse) res;
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Content-Type", "application/json");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Expose-Headers", "*");

		logger.debug("CORSServletTransactionFilter Content-Type: "+req.getContentType());
		chain.doFilter(req, res);
	}

	/** 
	 * Instantiates filter
	 */
	@Override
	public void init(FilterConfig init) throws ServletException
	{
		//Overridden method
	}

}
