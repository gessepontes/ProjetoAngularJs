import { Component, OnInit } from '@angular/core';

import { MensagemService } from '../../service/mensagem/mensagem.service';

@Component({
    //moduleId: module.id,
    selector: 'app-mensagem',
    templateUrl: 'mensagem.component.html'
})

export class MensagemComponent {
    message: any;

    constructor(private alertService: MensagemService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}