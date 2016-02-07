import { AuthApi } from '../../services/auth-api/auth-api'

/** @ngInject */
export function tbPublish(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/publish/publish.html',
    controller: TbPublishCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inVerify: "="
    }
  };

}

/** @ngInject */
export class TbPublishCtrl {
  inVerify: string;
  verifyed: boolean = false;

  constructor(private authApi: AuthApi, private $mdSidenav: angular.material.ISidenavService) {
   if(typeof this.inVerify !== 'undefined') {
     this.verifyed = true;
   }
  }
  
  signOut() {
    this.authApi.signOut('')
  }
  
  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }
}