import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-elemnt',
  templateUrl: './book-elemnt.component.html',
  styleUrls: ['./book-elemnt.component.scss'],
})
export class BookElemntComponent  implements OnInit {
@Input() book:Book={author:'neki',title:"neki",mymark:10,averagemark:10,id:'b3'};

  constructor(private alertController:AlertController) {

   }

  ngOnInit() {
 
  }
  openAlert(){
   this.alertController.create({
    header:"Mark this book",
  buttons:[{
    text: 'Edit'
  }]


   }).then((alert)=>{
    alert.present();
   })
  }

}
