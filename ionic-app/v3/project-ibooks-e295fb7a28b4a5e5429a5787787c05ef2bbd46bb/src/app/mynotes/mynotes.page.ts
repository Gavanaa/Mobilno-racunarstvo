import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddNoteModalComponent } from '../modals/add-note-modal/add-note-modal.component';
import { FirebaseDBService } from '../fireBaseData.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.page.html',
  styleUrls: ['./mynotes.page.scss'],
})
export class MynotesPage implements OnInit, OnDestroy {
  myNotes: { title: string; text: string }[] = [];
  destroy = new Subject<void>();

  constructor(
    private modalCtrl: ModalController,
    private db: FirebaseDBService
  ) {}

  ngOnInit() {
    this.db
      .getAllNotes()
      .pipe(takeUntil(this.destroy))
      .subscribe((notes) => (this.myNotes = notes));
  }

  openModal() {
    this.modalCtrl
      .create({
        component: AddNoteModalComponent,
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss().then(({ data }) => {
          if (!data) return;
          this.db.postNote(data.note);
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
