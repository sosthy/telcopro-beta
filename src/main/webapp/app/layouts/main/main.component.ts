import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, ActivatedRoute } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const SMALL_WIDTH_BREAKPOINT = 991;

export interface Options {
    heading?: string;
    removeFooter?: boolean;
    mapHeader?: boolean;
}

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit, OnDestroy, AfterViewInit {
    private _router: Subscription;
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

    routeOptions: Options;

    options = {
        lang: 'en',
        theme: 'light',
        settings: false,
        docked: false,
        boxed: false,
        opened: true,
        mode: 'push'
    };

    _mode = this.options.mode;
    _autoCollapseWidth = 991;

    currentLang = 'en';

    @ViewChild('sidebar') sidebar;

    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private modalService: NgbModal,
        private _element: ElementRef,
        private route: ActivatedRoute
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'telcoproApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this._router = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                // Scroll to top on view load
                document.querySelector('.main-content').scrollTop = 0;

                if (this.isOver()) {
                    this._mode = 'over';
                    this.options.opened = false;
                }

                this.runOnRouteChange();
            });

        this.runOnRouteChange();

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(_ => this.runOnRouteChange());
    }

    ngOnDestroy() {
        this._router.unsubscribe();
    }

    runOnRouteChange(): void {
        if (this.isOver() || this.router.url === '/maps/fullscreen') {
            this.options.opened = false;
        }

        this.route.children.forEach((route: ActivatedRoute) => {
            let activeRoute: ActivatedRoute = route;
            while (activeRoute.firstChild) {
                activeRoute = activeRoute.firstChild;
            }
            this.routeOptions = activeRoute.snapshot.data;
        });
    }

    isOver(): boolean {
        return this.mediaMatcher.matches;
    }

    toogleSidebar(): void {
        this.options.opened = !this.options.opened;
    }

    receiveMessage($event) {
        this.options = $event;
    }

    openSearch(search) {
        this.modalService.open(search, { windowClass: 'search', backdrop: false });
    }

    toggleFullscreen(): void {
        const elem = this._element.nativeElement.querySelector('.main-content');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullScreen) {
            elem.msRequestFullScreen();
        }
    }
}
