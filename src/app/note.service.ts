import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from './models/node.model';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url:string = "http://localhost:3000/note"

  constructor(private http:HttpClient) {

  }

  addNote(note: Note):Observable<Note>{
    return this.http.post<Note>(`${this.url}/new`, note)
  }

  getNote(pageId: string){
    return this.http.get<Note>(`${this.url}/${pageId}`)
  }
}
