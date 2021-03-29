import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  @Output() confirmDeactivation: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
  }

  confirm() {
    this.modal.dismiss();
    this.confirmDeactivation.emit(true);
  }

  cancel() {
    this.modal.dismiss();
    this.confirmDeactivation.emit(false);
  }
}
