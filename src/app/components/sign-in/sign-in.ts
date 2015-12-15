
/** @ngInject */
export function tbSignIn(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/sign-in/sign-in.html',
        bindToController: {
        },
        controller: TbSignInCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbSignInCtrl {

    constructor(private auth: any, private store: any, private $window: any, private $location: any, authApi: any) {
        auth.config.auth0lib.$container = null;
        console.log('constructor rusn');

        auth.signin({
            container: 'hiw-login-container',
            authParams: {
                scope: "user_id openid email app_metadata"
            },
            dict: {
                signin: {
                    title: ' Sign in '
                }
            }
        }, (profile, token) => {
            // Success callback
            this.store.set('profile', profile);
            this.store.set('token', token);

            console.log("profile: " + JSON.stringify(profile));
            console.log("token: " + token);

            var options = {
                "id_token": token,
                "role": "arn:aws:iam::525932482084:role/auth0-api-role",
                "principal": "arn:aws:iam::525932482084:saml-provider/auth0"
            }

            this.auth.getToken(options)
                .then(
                (delegation) => {
                    console.log('awstoken: ' + JSON.stringify(delegation.Credentials));
                    this.store.set('awstoken', delegation.Credentials);  //add to local storage
                    
                    this.getAwsCli().streamsGet({ "x-auth-token": this.store.get('token') }, {}, {})
                        .then((res: any) => {
                            //This is where you would put a success callback
                            console.log('res: ' + JSON.stringify(res));

                        })
                        .catch((err: any) => {
                            //This is where you would put an error callback
                            console.log('error: ' + err);
                        });


                },
                (err) => {
                    console.log('failed to acquire delegation token', err);
                });

        }, () => {
            // Error callback
        });
    }

    getAwsCli = () => {
        console.log("getAwsCli");
        var awstoken = this.store.get('awstoken');

        console.log("awstoken: " + awstoken)

        return this.$window.apigClientFactory.newClient({
            accessKey: awstoken.AccessKeyId,
            secretKey: awstoken.SecretAccessKey,
            sessionToken: awstoken.SessionToken,
            region: 'us-west-2' // Set to your region
        });

    };
}
