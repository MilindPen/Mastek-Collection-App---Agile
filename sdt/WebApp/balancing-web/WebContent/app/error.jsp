<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="icon" href="../img/favicon.png">
    <title>Error</title>

    <!-- load from CDN -->
	<!-- <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> 
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script> -->
  
    <!-- CSS Libraries-->
    <link href="../css/lib/bootstrap.min.css" rel="stylesheet">
	<!-- Custom Fonts -->
    <link href="../css/lib/font-awesome.min.css" rel="stylesheet" type="text/css">
	
	<!-- Custom CSS -->
	<link href="../css/common.css" rel="stylesheet">
	<link href="../css/dashboard.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body oncontextmenu="return false">

    <div id="wrapper">
        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <img src="../img/logo.png" alt="logo" class="img-rounded">
				<!-- <div class="menuItemsDiv">
					<a href="" class="menuHome font17px">Home</a>
				</div>
				<div class="menuRight" align="right">
					<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
					<span class="menuAgentName">${firstName}&nbsp;${lastName}</span>
					<span class="menuAgentEmailId">${emailID}</span>
				</div> -->
            </div>
            <!-- /.navbar-header -->
        </nav>
  
   
   
    <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container">
                <!-- /.row -->
            <div class="vertical-center-row-error">
				<div class="col-lg-12">
                	<p class="errors"><span class="errorMsg">You do not have access to the application. Please contact the system administrator.</span><span class="errorCode"></span></p>
                </div>
            </div>
            <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->
   
         
		<footer class="footer">
			<div class="container">
				<p class="text-muted"></p>
			</div>
		</footer>
  </div> 

	<!-- JS Libraries -->
    <script src="../js/lib/jquery.min.js"></script>
	<script src="../js/lib/bootstrap.min.js"></script>
	
    <!-- Custom JS -->
    <script src="../js/common/constants.js"></script>
    <script src="../js/common/services.js"></script>
	<script src="../js/common/common.js"></script>
	<script src="../js/common/callService.js"></script>
	
	
</body>
<script>
var errorCode = session.getData(ERROR_CODE);

if(errorCode !=null)
	{
		(function ($) {
			if(errorCode == "ERR-109")
			{
				$('.errorMsg').html("System error. Please contact the helpdesk.");
				$('.errorCode').html("("+errorCode+")");
			}
			else
			{
				$('.errorCode').html("("+errorCode+")");
			}
			
		}(jQuery));
	}
</script>
</html>
