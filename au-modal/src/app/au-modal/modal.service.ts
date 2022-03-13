import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable()
export class AuModalService {

    private subject = new Subject();

    close$: Observable<any> = this.subject.asObservable(); // nameing convention for 'close$' means close$ is an observable

    constructor() {

    }

    close() {
        console.log("close method in au modal service is triggered");
        this.subject.next(); // next() triggers viewContainer.clear() func after close$ observable's subscribe in au modal directive
    }
}
