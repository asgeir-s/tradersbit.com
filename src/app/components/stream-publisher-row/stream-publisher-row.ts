
export class StreamPublisherRow implements ng.IComponentOptions {
    controller: any
    templateUrl: string

    constructor() {
        this.controller = StreamPublisherRowCtrl
        this.templateUrl = "app/components/stream-publisher-row/stream-publisher-row.html"
    }
}

class StreamPublisherRowCtrl {
    constructor(private $state: ng.ui.IStateService) {
        "ngInject"
    }

    goToPublish() {
        this.$state.go("publish")
    }
}