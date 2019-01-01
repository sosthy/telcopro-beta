import { Component, EventEmitter, Output, Input } from '@angular/core';
import { VERSION } from 'app/app.constants';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Input() mode: string;
    @Output() toggleSidebar = new EventEmitter<void>();
    version: string;

    constructor() {
        this.version = VERSION ? 'v' + VERSION : '';
    }
}
