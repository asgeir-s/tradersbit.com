import { WebDevTecService, ITecThing } from '../../services/webDevTec/webDevTec.service';

/** @ngInject */
export function main(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/main/main.html',
    controller: MainController,
    controllerAs: 'main',
    bindToController: true
  };

}

/** @ngInject */
export class MainController {
  public awesomeThings: ITecThing[];
  public webDevTec: WebDevTecService;
  public classAnimation: string;
  public creationDate: number;

  /* @ngInject */
  constructor ($timeout: angular.ITimeoutService, webDevTec: WebDevTecService) {
    this.awesomeThings = new Array();
    this.webDevTec = webDevTec;
    this.classAnimation = '';
    this.creationDate = 1447940717730;
    this.activate($timeout);
  }

  /** @ngInject */
  activate($timeout: angular.ITimeoutService) {
    this.getWebDevTec();

    var self = this;

    $timeout(function() {
      self.classAnimation = 'rubberBand';
    }, 4000);
  }

  getWebDevTec() {
    this.awesomeThings = this.webDevTec.tec;
  }
}

