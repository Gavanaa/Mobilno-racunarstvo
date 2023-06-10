import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})
export class BookModalComponent  implements OnInit {

  constructor(private modalCtrl:ModalController) { }
@ViewChild('f',{static:true}) form:NgForm
@Input() title:string;
  ngOnInit() {}
  onClose(){
    this.modalCtrl.dismiss();
  }
  onAddBook(){
if(!this.form.valid){
  return;
}
this.modalCtrl.dismiss({bookData:{title:this.form.value.title,author:this.form.value.author, mark:this.form.value.mymark, description:this.form.value.description}},"confirm");
  }

}
