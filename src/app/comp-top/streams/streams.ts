import { Stream } from "../../typings/types.d.ts"
import { TbSession } from "../../services/session/session"

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
  windowWidth: number
  isMobile: boolean
  showFilters: boolean

  constructor(
    private $mdSidenav: ng.material.ISidenavService,
    private $window: ng.IWindowService,
    public tbSession: TbSession) {
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
    this.tbSession.streams.streamAttributes.forEach(attr => {
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