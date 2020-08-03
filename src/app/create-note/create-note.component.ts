import { Component, OnInit } from '@angular/core';
import { Note } from '../models/node.model';
import { FormBuilder, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  noteForm = this.fb.group({
    'content': ['',[Validators.required]]
  })

  constructor(private fb:FormBuilder, private noteService:NoteService, public dialog: MatDialog){

  }

  onSubmit(){
    this.noteService.addNote(this.noteForm.value)
    .subscribe((note:Note)=>{
      this.openDialog(note);
    })
    this.noteForm.reset();
    //fix of issue 4190 on angular github
    Object.keys(this.noteForm.controls).forEach(key => {
      this.noteForm.controls[key].setErrors(null)
    });
  }

  openDialog(note:Note): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      data: {note}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void{
    
  }

}
