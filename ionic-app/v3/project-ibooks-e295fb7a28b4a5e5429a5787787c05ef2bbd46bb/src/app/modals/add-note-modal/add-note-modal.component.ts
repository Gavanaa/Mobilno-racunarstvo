import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-note-modal',
  templateUrl: './add-note-modal.component.html',
  styleUrls: ['./add-note-modal.component.scss'],
})
export class AddNoteModalComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onClose() {
    this.modalCtrl.dismiss();
  }

  onAddNote() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.modalCtrl.dismiss({
      note: this.form.value,
    });
  }
}
