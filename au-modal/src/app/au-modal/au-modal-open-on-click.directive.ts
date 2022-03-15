import {
    AfterContentInit,
    ContentChild,
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
    OnDestroy
} from '@angular/core';
import {AuModalComponent} from "./au-modal.component";
import {AuModalService} from "./modal.service";

@Directive({
    selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {


    elements: HTMLBaseElement[];

    constructor(private templateRef: TemplateRef<any>, // for directive can be used in ng template
                private viewContainer: ViewContainerRef, // viewContainer represents a container where one or more views can be attached
                private modalService: AuModalService) {

    }

    ngOnInit() {
        console.log("close$ observable in au modal directive is subscribed");
        this.modalService.close$.subscribe(() => 
        this.viewContainer.clear()
        ); // for running the observable close$ and doing the close modal ACTION

    }

    ngOnDestroy() {
        console.log("OnDestory: remove event listener");
        this.elements.forEach(el => el.removeEventListener('click', this.clickHandler));
    }


    @Input()
    set auModalOpenOnClick(els) {

        if (els.length) {
            console.log("els has length: " + els.length);
            this.elements = els;
        }
        else {
            console.log("els doesn't have length as it is not an array: " + els);
            this.elements = [els];
        }
        // previously:
        // this.elements.forEach(el => el.addEventListener('click', () => {
        //     this.viewContainer.clear();
        //     this.viewContainer.createEmbeddedView(this.templateRef);
        // }));
        // above is equivalent to below
        this.elements.forEach(el => el.addEventListener('click', this.clickHandler));
    }

    clickHandler = (() => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
    }).bind(this)

}









