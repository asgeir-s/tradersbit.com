import { Stream, StreamsAttribute } from "../../typings/types.d.ts"
import { StreamAttributes } from "../../util/stream-attributes"

export class StreamsView implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStreams: "<"
    }
    this.controller = StreamsViewCtrl
    this.templateUrl = "app/comp-top/streams/streams.html"
  }
}

class StreamsViewCtrl {
  inStreams: Array<Stream>
  streamAttributes: Array<StreamsAttribute> = StreamAttributes.allAtributes()
  windowWidth: number
  isMobile: boolean
  showFilters: boolean
  activeLastDays: number = 30
  minNumTrades: number = 5
  minNetProfit: number = 5

  constructor(private $mdSidenav: angular.material.ISidenavService, private $window: angular.IWindowService) {
    "ngInject"
    this.windowWidth = $window.innerWidth

    if (!this.isMobile && this.windowWidth < 600) {
      this.showOnlyMobileAttr()
      this.isMobile = true
    }
    else if (this.windowWidth > 600) {
      this.isMobile = false
    }

    this.showFilters = this.isMobile ? false : true

    angular.element($window).bind("resize", () => {
      this.windowWidth = $window.innerWidth
      // manuall $digest required as resize event
      // is outside of angular

      if (!this.isMobile && this.windowWidth < 600) {
        this.showOnlyMobileAttr()
        this.isMobile = true
      }
      else if (this.windowWidth > 600) {
        this.isMobile = false
      }
    })
  }

  tiggleShowFilters(): void {
    this.showFilters = !this.showFilters
  }

  showOnlyMobileAttr(): void {
    this.streamAttributes.forEach((attr: StreamsAttribute) => {
      if (attr.short === "NP" || attr.short === "Name") {
        attr.on = true
      }
      else {
        attr.on = false
      }
    })
  }

  toggleRightSidebar(): void {
    this.$mdSidenav("right").toggle()
  }

  toggleMenu() {
    return this.$mdSidenav("leftBig").open()
  }
}