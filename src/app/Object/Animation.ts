import { animate, group, query, style, transition, trigger } from "@angular/animations";

export let routerAnimation =  trigger('routerAnimation',[
    transition('1=>2, 1=>3, 1=>4, 2=>3, 2=>4,  3=>4',[
        style({height:'!'}),
        query(':enter',style({opacity:1,transform:'translateX(100%)'})),
        query(':enter,:leave', style({position:'absolute',top:'0',right:'0',left:'0'})),
        group([
            query(':leave',animate('1s cubic-bezier(.35,0,.25,1)',style({transform:'translateX(-100%)',opacity:0}))),
            query(':enter',animate('1s cubic-bezier(.35,0,.25,1)',style({opacity:1,transform:'translateX(0%)'}))),
        ])
    ]),
    transition('2=>1, 3=>1, 3=>2, 4=>1, 4=>2, 4=>3',[
        style({height:'!'}),
        query(':enter',style({opacity:1,transform:'translateX(-100%)'})),
        query(':enter,:leave', style({position:'absolute',top:'0',right:'0',left:'0'})),
        group([
            query(':leave',animate('1s cubic-bezier(.35,0,.25,1)',style({transform:'translateX(100%)',opacity:0}))),
            query(':enter',animate('1s cubic-bezier(.35,0,.25,1)',style({opacity:1,transform:'translateX(0%)'}))),
        ])
    ])
]);