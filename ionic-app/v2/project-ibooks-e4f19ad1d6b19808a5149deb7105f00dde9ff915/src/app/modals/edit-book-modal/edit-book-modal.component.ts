import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Book } from 'src/app/book-marks/book';
import { modalMode } from 'src/app/utils';

@Component({
  selector: 'app-edit-book-modal',
  templateUrl: './edit-book-modal.component.html',
  styleUrls: ['./edit-book-modal.component.scss'],
})
export class EditBookModalComponent implements OnInit {
  @Input() book: Book;

  form = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.initializeForm();
  }

  onClose() {
    this.modalCtrl.dismiss();
  }

  onUpdate() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.modalCtrl.dismiss({
      mode: 'edit' as modalMode,
      book: this.form.value,
    });
  }

  private initializeForm() {
    this.form.controls['title'].setValue(this.book.title);
    this.form.controls['author'].setValue(this.book.author);
    this.form.controls['description'].setValue(this.book.description);
  }
}
