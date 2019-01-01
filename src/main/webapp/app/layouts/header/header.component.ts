import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginService, JhiLanguageHelper, AccountService, LoginModalService } from 'app/core';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { ProfileService } from '../profiles/profile.service';
import { Router } from '@angular/router';

import { VERSION } from 'app/app.constants';

@Component({
    selector: 'jhi-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() heading: string;
    @Output() toggleSidebar = new EventEmitter<void>();
    @Output() openSearch = new EventEmitter<void>();
    @Output() toggleFullscreen = new EventEmitter<void>();

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private sessionStorage: SessionStorageService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    }
}
