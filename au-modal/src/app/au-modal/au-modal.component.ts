import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {AuModalService} from "./modal.service";
import {EventManager} from '@angular/platform-browser';

@Component({
    selector: 'au-modal',
    templateUrl: './au-modal.component.html',
    styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent implements OnInit {

    @Input()
    body: TemplateRef<any>;

    @Input()
    context:any;

    @Input()
    hideOnEsc = true;

    @Input()
    hideOnClickOutside = true;


    constructor(private modalService: AuModalService,
                private eventManager: EventManager) {



    }

    ngOnInit() {

        this.eventManager.addGlobalEventListener("window",'keyup.esc', () => {
            if (this.hideOnEsc) {
                console.log("Close event is monitored in ngOnInit of au modal component");
                this.close();
            }
        });

    }


    onClickOutsideModal() { // not triggered when click area outside modal
        if (this.hideOnClickOutside) {
            console.log("onClickOutsideModal method in au modal component is triggered");
            this.close();
        }

    }

    close() {
        console.log("close method in au modal component is triggered");
        this.modalService.close();
    }


    cancelClick(evt: KeyboardEvent) { // for preventing the email/password inputs from being clicked and closing the modal
        evt.preventDefault();
        evt.stopPropagation();
    }

}
