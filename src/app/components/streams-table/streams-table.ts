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
        controller: TbStreamsTableCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbStreamsTableCtrl {
    // inputs
    inAttributes: () => Array<StreamsAttribute>;
    inStreams: () => Array<Stream>;

    reverse: Boolean = true;
    predicate: String = "stats.averageMonthlyProfitIncl";

    /* @ngInject */
    constructor(private $state: any) {
    }

    order(predicate: String) {
        this.reverse = (this.predicate === predicate) ? !this.reverse : false;
        this.predicate = predicate;
    }
    
    goToStream(streamID: string) {
        this.$state.go('stream', {'streamId': streamID});
    }

}
