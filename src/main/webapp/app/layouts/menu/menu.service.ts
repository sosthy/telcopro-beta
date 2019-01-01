import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: '/',
        name: 'HOME',
        type: 'link',
        icon: 'basic-accelerator'
    },
    {
        state: 'icons',
        name: 'ICONS',
        type: 'sub',
        icon: 'basic-postcard',
        badge: [
            {
                type: 'success',
                value: '5'
            }
        ],
        children: [
            {
                state: 'linea',
                name: 'LINEA'
            },
            {
                state: 'fontawesome',
                name: 'FONTAWESOME'
            },
            {
                state: 'sli',
                name: 'SLI'
            }
        ]
    },
    {
        state: 'tables',
        name: 'TABLES',
        type: 'sub',
        icon: 'basic-webpage-txt',
        badge: [
            {
                type: 'primary',
                value: '2'
            }
        ],
        children: [
            {
                state: 'basic',
                name: 'BASIC'
            },
            {
                state: 'responsive',
                name: 'RESPONSIVE'
            }
        ]
    },
    {
        state: 'maps',
        name: 'MAPS',
        type: 'sub',
        icon: 'basic-geolocalize-01',
        children: [
            {
                state: 'google',
                name: 'GOOGLE'
            },
            {
                state: 'fullscreen',
                name: 'FULLSCREEN'
            }
        ]
    },
    {
        state: 'landing',
        name: 'LANDING',
        type: 'link',
        icon: 'basic-spread'
    },
    {
        state: 'authentication',
        name: 'AUTHENTICATION',
        type: 'sub',
        icon: 'basic-lock-open',
        children: [
            {
                state: 'signin',
                name: 'SIGNIN'
            },
            {
                state: 'signup',
                name: 'SIGNUP'
            },
            {
                state: 'forgot',
                name: 'FORGOT'
            },
            {
                state: 'lockscreen',
                name: 'LOCKSCREEN'
            }
        ]
    },
    {
        state: 'error',
        name: 'ERROR',
        type: 'sub',
        icon: 'basic-ban',
        children: [
            {
                state: '404',
                name: '404'
            },
            {
                state: '500',
                name: '500'
            },
            {
                state: '503',
                name: '503'
            }
        ]
    },
    {
        state: 'calendar',
        name: 'CALENDAR',
        type: 'link',
        icon: 'basic-calendar'
    },
    {
        state: 'media',
        name: 'MEDIA',
        type: 'sub',
        icon: 'basic-todo-txt',
        children: [
            {
                state: 'grid',
                name: 'GRID'
            },
            {
                state: 'tile',
                name: 'TILE'
            },
            {
                state: 'list',
                name: 'LIST'
            }
        ]
    },
    {
        state: 'docs',
        name: 'DOCS',
        type: 'link',
        icon: 'basic-sheet-txt'
    }
];

@Injectable()
export class MenuService {
    getAll(): Menu[] {
        return MENUITEMS;
    }
}
