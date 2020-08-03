import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Note } from '../models/note.model';
@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  noteData = this.data;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Note) {
    console.log(data);
  }

  ngOnInit(): void {
  }

}
