import { StreamsAttribute, Stream} from '../../../app/typings/types';

/** @ngInject */
export function tbStreamsTable(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/streams-table/streams-table.html',
    bindToController: {
      streams: '&',
      attributes: '&'
    },
    controller: tbStreamsTableCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class tbStreamsTableCtrl {
  
  // inputs
  streams: any;
  attributes: () => Array<StreamsAttribute>;

  direction = 1;
  selectedAttribute: StreamsAttribute;


  /* @ngInject */
  constructor() {
    console.log('hei ' + this.streams());
    this.streams().subscribe((item) => console.log('from table ' + item));
  }

  sort(attribute: StreamsAttribute) {
    this.sortFunc(attribute, this.streams())
  }

  private sortFunc(atribute: StreamsAttribute, streams: Array<Stream>) {
    if (this.selectedAttribute === atribute) {
      this.direction = -this.direction;
    }
    else {
      this.direction = 1;
    }
    this.selectedAttribute = atribute;

    streams.sort((a, b) => {
      if (atribute.getIt(a) === atribute.getIt(b)) {
        return 0;
      }
      else if (atribute.getIt(a) > atribute.getIt(b)) {
        return this.direction;
      }
      else {
        return -this.direction;
      }
    });
  }

}
