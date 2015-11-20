/** @ngInject */
function tbStreamsTable() {
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
exports.tbStreamsTable = tbStreamsTable;
/** @ngInject */
var tbStreamsTableCtrl = (function () {
    /* @ngInject */
    function tbStreamsTableCtrl() {
        this.direction = 1;
        console.log('hei ' + this.streams());
    }
    tbStreamsTableCtrl.prototype.sort = function (attribute) {
        this.sortFunc(attribute, this.streams());
    };
    tbStreamsTableCtrl.prototype.sortFunc = function (atribute, streams) {
        var _this = this;
        if (this.selectedAttribute === atribute) {
            this.direction = -this.direction;
        }
        else {
            this.direction = 1;
        }
        this.selectedAttribute = atribute;
        streams.sort(function (a, b) {
            if (atribute.getIt(a) === atribute.getIt(b)) {
                return 0;
            }
            else if (atribute.getIt(a) > atribute.getIt(b)) {
                return _this.direction;
            }
            else {
                return -_this.direction;
            }
        });
    };
    return tbStreamsTableCtrl;
})();
exports.tbStreamsTableCtrl = tbStreamsTableCtrl;
