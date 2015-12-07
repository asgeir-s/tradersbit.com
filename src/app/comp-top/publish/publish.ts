
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

  constructor(private auth: any, private store: any) { }

  logout() {
    console.log("sign out");
    this.auth.signout();
    this.store.remove('profile');
    this.store.remove('token');
  };
}