<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

	<link rel="icon" href="../img/favicon.png">
    <title>Branch Balancing Home</title>

    <!-- load from CDN -->
	<!-- <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> 
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script> -->
  
    <!-- CSS Libraries-->
    <link href="../css/lib/bootstrap.min.css" rel="stylesheet">
    <link href="../css/lib/chosen.min.css" rel="stylesheet">
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
				<div class="menuItemsDiv">
					<a href="" class="menuHome font17px">Home</a>
				</div>
				<div class="menuRight" align="right">
					<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
					<span class="menuAgentName" id="menuAgentName">${firstName}&nbsp;${lastName}</span>
					<span class="menuAgentEmailId">${emailID}</span>
					<span class="menuAgentUserType">${userType}</span>
				</div>
            </div>
            <!-- /.navbar-header -->

        </nav>
		
			
        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container">
                <!-- /.row -->
            <div class="row vertical-center-row">
				<!-- Show the messages in .errors -->
				<div class="form-group" id="errorDiv">
					
					<div class="col-lg-12">
						<p><span class="errors"></span></p>
					</div>
				
				</div>
				<!--Selection inputs -->
				<div class="col-lg-12 selectionGrp">
					
						<form class="form-inline">
							<div class="form-group">
							<label for="SDTWeekSelection">Week</label>
							<br><select id="SDTWeekSelection" class="form-control">
								
							</select>
								
							</div>
							
							<div class="form-group selectionGrpSpace">
							<label for="SDTBranchSelection">Branch</label>
							<br><select id="SDTBranchSelection" class="form-control chosen-select">
								
							</select>
								
							</div>
						</form>
					
				</div>
				<div class="col-lg-12 dashboardMenu">
                <div class="col-lg-4 col-md-6">
                    <div class="panel center-block" class="text-center">
                        <a href="../branchBalance.html" class="branchBalanceLink">
							<div class="panel-body">
                             <img src="../img/branch_balance_icon.png" alt="BRANCH BALANCE" class="img-circle center-block">
							</div>		
							<div class="panel-footer">	
                             <span class="text-center">BRANCH BALANCE</span>
							 </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="panel center-block" class="text-center">
                        <a href="../selectionSummary.html" class="weeklyCashSummaryLink">
							<div class="panel-body">
                             <img src="../img/week_cash_summary.png" alt="WEEKLY CASH SUMMARY" class="img-circle center-block">
							</div>		
							<div class="panel-footer">	
                             <span class="text-center">WEEKLY CASH SUMMARY</span>
							 </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="panel center-block" class="text-center">
                        <a href="../selectionSummary.html" class="journeyBalanceLink">
							<div class="panel-body">
                             <img src="../img/journey_balance.png" alt="JOURNEY BALANCE" class="img-circle center-block">
							</div>		
							<div class="panel-footer">	
                             <span class="text-center">JOURNEY BALANCE</span>
							</div>
                        </a>
                    </div>
                </div>
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
    <!-- /#wrapper -->
	
	<img src="../img/382.gif" id="loading-indicator" style="display:none" />
	<div id="disablingDiv" ></div>
	
	<!-- JS Libraries -->
    <script src="../js/lib/jquery.min.js"></script>
	<script src="../js/lib/bootstrap.min.js"></script>
	<script src="../js/lib/moment.min.js"></script>
	<script src="../js/lib/bootbox.min.js"></script>
	<script src="../js/lib/chosen.jquery.min.js"></script>
	
    <!-- Custom JS -->
    <script src="../js/common/constants.js"></script>
    <script src="../js/common/services.js"></script>
	<script src="../js/common/common.js"></script>
	<script src="../js/common/callService.js"></script>
	<script src="../js/dashboard.js"></script>
	
</body>

</html>
