
/** @ngInject */
export function tbPublish(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/publish/publish.html',
    controller: TbPublishCtrl,
    controllerAs: 'ctrl',
    bindToController: {
    }
  };

}

/** @ngInject */
export class TbPublishCtrl {
  
  constructor(private auth: any, private store: any, private $window: any, private $location: any) {}

signIn() {
        this.auth.signin({
          authParams: {
            scope: "openid name email"
          }
        }, function(profile, token) {
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
            function(delegation) {
              console.log('awstoken: ' + JSON.stringify(delegation.Credentials));
              this.store.set('awstoken', delegation.Credentials);  //add to local storage
              this.$location.path("/");
              var apigClient = this.getAwsCli();

              apigClient.streamsPostGet({}, {}, {})
                .then((res) => {
                  console.log("resss: " + res.data.message);
                })


            },
            function(err) {
              console.log('failed to acquire delegation token', err);
            });

        }, function() {
          // Error callback
        });
      };

      logout() {
        console.log("sign out");
        this.auth.signout();
        this.store.remove('profile');
        this.store.remove('token');
      };


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