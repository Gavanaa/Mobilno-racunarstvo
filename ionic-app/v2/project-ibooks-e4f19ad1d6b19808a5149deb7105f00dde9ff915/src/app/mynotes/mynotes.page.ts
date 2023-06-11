import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.page.html',
  styleUrls: ['./mynotes.page.scss'],
})
export class MynotesPage implements OnInit {
  myNotes = [{ title: 'Test note', content: 'Testing testing' }];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  addNoteModal() {
    this.alertController
      .create({
        header: 'Add new note',
        cssClass: ['note-modal'],
        backdropDismiss: false,
        inputs: [
          {
            placeholder: 'Note title',
          },
          {
            placeholder: 'Note content',
            type: 'textarea',
          },
        ],
        buttons: [
          {
            text: 'Add',
          },
          {
            text: 'Cancel',
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
