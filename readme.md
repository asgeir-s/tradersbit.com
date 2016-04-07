##After checkout
	npm install
	bower install
	typings install
	
##Run commands
	gulp serve
	gulp serve:dist
	
#Troubleshout
If 'gulp serve:dist' don't work: remove all (generted) js files in the /app folder.
Also, remember, the order in bower.json mathers

###Get the apiclient generated from AWS API Gateway

set 

    defaultContentType: 'application/json; charset=UTF-8'


####For AIM auth problems:
1.  Give invoke permissions to the role auth0-api-role
2.  Check correct region in  tradersbit.com: createApiClient

https://puy4mxygp6.execute-api.us-east-1.amazonaws.com/prod/lolllolololo/jsgeysmnejsge/gbdb57?scuset=74v54j4veid5392j3b3d76812672154ghFGDGFSDxs55d0

https://8ou6rpduh7.execute-api.us-east-1.amazonaws.com/prod/notifications/coinbase/oiu3289t7234jhvnb234jhkg23rguydahjkl?scuset=74v54j4veid5392j3b3d76812672154ghFGDGFSDxs55d0
