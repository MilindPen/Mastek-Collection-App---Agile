## This is a simple script calling PowerShell scripts from a TFS mobile application build task. 

param
(
	[string] $SubscriptionKey,
    [string] $CustomerURL,
	[string] $TransactionURL,
	[string] $SecurityURL
)

Write-Host "PowerShell Script- start"
Write-Host " "

Write-Output "Input parameter SubscriptionKey:  $SubscriptionKey"
Write-Output "Input parameter CustomerURL:  $CustomerURL"
Write-Output "Input parameter TransactionURL:  $TransactionURL"
Write-Output "Input parameter SecurityURL:  $SecurityURL"

Write-Host " "
cd C:\a\1\s\sdt\MobileApp\sdt_mobile\www\js\common

Write-Host "PowerShell Script- Replacing variable SubscriptionKey"
(Get-Content constants.js) | ForEach-Object { $_ -replace "9bb255f311d94c55934d8750e0242d99", "$SubscriptionKey" } | Set-Content constants.js

Write-Host "PowerShell Script- Replacing variable URL's - INT"
(Get-Content constants.js) | ForEach-Object { $_ -replace "https://sdtmobile.azure-api.net/int/customer", "$CustomerURL" } | Set-Content constants.js
(Get-Content constants.js) | ForEach-Object { $_ -replace "https://sdtmobile.azure-api.net/int/transaction", "$TransactionURL" } | Set-Content constants.js
(Get-Content constants.js) | ForEach-Object { $_ -replace "https://sdtmobile.azure-api.net/int/security", "$SecurityURL" } | Set-Content constants.js


Write-Host "PowerShell Script- Replacing variable URL's - UAT"
(Get-Content constants.js) | ForEach-Object { $_ -replace "https://sdtmobile.azure-api.net/uat/customer", "$CustomerURL" } | Set-Content constants.js
(Get-Content constants.js) | ForEach-Object { $_ -replace "https://sdtmobile.azure-api.net/uat/transaction", "$TransactionURL" } | Set-Content constants.js
(Get-Content constants.js) | ForEach-Object { $_ -replace "https://sdtmobile.azure-api.net/uat/security", "$SecurityURL" } | Set-Content constants.js


Write-Host "PowerShell Script- content of constants.js file"
Get-Content constants.js

Write-Host " "
Write-Host "PowerShell Script- End"

exit 0
