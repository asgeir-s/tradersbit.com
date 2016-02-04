##After checkout
	npm install
	bower install
	tsd install
	
##Run commands
	gulp serve
	gulp serve:dist
	
##Troubleshout
If 'gulp serve:dist' don't work: remove all (generted) js files in the /app folder.
Also, remember, the order in bower.json mathers


####For AIM auth problems:
1.  Give invoke permissions to the role auth0-api-role
2.  Check correct region in  tradersbit.com: createApiClient