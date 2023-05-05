import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookMarksService } from '../book-marks.service';
import { ModalController } from '@ionic/angular';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
// books:Book[]=[
//   {id:'b1',title:'Na Drini cuprija',author:'Andric',mymark :10,averagemark:10},
//   {id:'b2',title:'Tvrdjava',author:'Mesa',mymark:10,averagemark:10}]
books:Book[];
data:Book[];
results:Book[];
  constructor(private bookService:BookMarksService,private modalCtrl:ModalController) { 
this.books=bookService.books;
// this.data = this.books;
// this.results = [...this.data];
  }
  
  

  // handleInput( event:any) {
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.data.filter(d => d.title.toLowerCase().indexOf(query) > -1);
  // }

  ngOnInit() {
  }
  openModal(){
    this.modalCtrl.create(
      {component:BookModalComponent,componentProps:{title:'Add new book'}}
    ).then((modal)=>{modal.present();
    return  modal.onDidDismiss()
    }).then((resultData)=>{
      if(resultData.role=='confirm'){}
    })
  }


}
