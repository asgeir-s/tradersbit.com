/** @ngInject */
export function tbHome(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/home/home.html',
    controller: tbHomeCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class tbHomeCtrl {
  public relativeDate: string;
  public creationDate: number;
  public streamsObs: any;

  constructor(publicApiService: any) {
    this.relativeDate = moment(this.creationDate).fromNow();
    this.streamsObs = publicApiService.allStreams();
  }
}