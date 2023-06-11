import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-book-marks',
  templateUrl: './book-marks.page.html',
  styleUrls: ['./book-marks.page.scss'],
})
export class BookMarksPage implements OnInit {
  constructor(private menuCtrl: MenuController) {}
  openMenu() {
    this.menuCtrl.open();
  }

  ngOnInit() {}
}
