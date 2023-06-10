import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookMarksService {
  books:Book[]=[
    {id:'b1',title:'Na Drini cuprija',author:'Andric',mymark :10,averagemark:10},
    {id:'b2',title:'Tvrdjava',author:'Mesa',mymark:10,averagemark:10}]
    bk:Book={id:"2",author:"nema",title:"nema",mymark:0,averagemark:0}
 // constructor() { }
 getBook(id:string){
  return this.books.find((b:Book)=>b.id===id);
 }
}
