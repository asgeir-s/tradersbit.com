import { StreamsAttribute, Stream} from '../../../app/typings/types';

/** @ngInject */
export function tbStreamsTable(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/streams-table/streams-table.html',
    bindToController: {
      inStreams: '&',
      inAttributes: '&'
    },
    controller: tbStreamsTableCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class tbStreamsTableCtrl {
  
  // inputs
  inStreams: () => any;
  inAttributes: () => Array<StreamsAttribute>;

  streams: Array<Stream>;
  reverse: Boolean = false;
  predicate: String = "stats.averageMonthlyProfitIncl";

  /* @ngInject */
  constructor() {
    this.inStreams().subscribe((item) => this.streams = item)
  }

  order(predicate: String) {
    this.reverse = (this.predicate === predicate) ? !this.reverse : false;
    this.predicate = predicate;
  }

}
