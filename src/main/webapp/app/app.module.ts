import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { SidebarModule } from 'ng-sidebar';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { TelcoproSharedModule } from 'app/shared';
import { TelcoproCoreModule } from 'app/core';
import { TelcoproAppRoutingModule } from './app-routing.module';
import { TelcoproHomeModule } from './home/home.module';
import { TelcoproAccountModule } from './account/account.module';
import { TelcoproEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { MenuComponent } from './layouts/menu/menu.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './layouts/menu-accordion';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        TelcoproAppRoutingModule,
        SidebarModule.forRoot(),
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'fr'
        }),
        TelcoproSharedModule.forRoot(),
        TelcoproCoreModule,
        TelcoproHomeModule,
        TelcoproAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        TelcoproEntityModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        MenuComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class TelcoproAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
