import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-read-note',
  templateUrl: './read-note.component.html',
  styleUrls: ['./read-note.component.css']
})
export class ReadNoteComponent implements OnInit {

  pageId: string;
  noteContent: string;
  error = null;
  constructor(private route:ActivatedRoute, private router:Router, private noteService:NoteService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : ParamMap)=> {  
      this.pageId = params.get('pageId');     

      this.noteService.getNote(this.pageId)
      .subscribe((note)=>{
        this.noteContent = note.content;
      },(err)=>{
        this.error = err.error.message;
        console.log(err.error.message);
      }) 
    });
  }

  goHome(){
    this.router.navigateByUrl('/')
  }

}
