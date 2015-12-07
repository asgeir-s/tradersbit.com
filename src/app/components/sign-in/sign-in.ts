
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

    constructor(private auth: any, private store: any, private $window: any, private $location: any) {
        auth.config.auth0lib.$container = null;
        console.log('constructor rusn');


        auth.signin({
            container: 'hiw-login-container',
            authParams: {
                scope: "openid name email"
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
                    this.$location.path("/");
                    var apigClient = this.getAwsCli();

                    apigClient.streamsPostGet({}, {}, {})
                        .then((res) => {
                            console.log("resss: " + res.data.message);
                        })


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
