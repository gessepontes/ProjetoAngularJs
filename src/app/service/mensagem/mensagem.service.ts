import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MensagemService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
        alert(message);
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
        alert(message);
    }

    info(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'info', text: message });
        alert(message);
    }

    warn(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'warn', text: message });
        alert(message);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}