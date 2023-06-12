import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { modalMode } from 'src/app/utils';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})
export class BookModalComponent {
  constructor(private modalCtrl: ModalController) {}
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });
  onClose() {
    this.modalCtrl.dismiss();
  }
  onAddBook() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.modalCtrl.dismiss({
      mode: 'add' as modalMode,
      book: this.form.value,
    });
  }
}
