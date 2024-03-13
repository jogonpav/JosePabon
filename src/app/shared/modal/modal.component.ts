import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  @Input() isOpen: boolean = false;
  @Input() sentData: string = 'id';
  @Output() closed = new EventEmitter<boolean>();
  @Output() confirmed = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  closeModal() {
    this.isOpen = false;
    this.closed.emit(true);
  }

  cancel() {
    this.closeModal();
  }

  confirm() {
    this.confirmed.emit(true);
    this.closeModal();
  }

}
