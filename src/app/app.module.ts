import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { ReadNoteComponent } from './read-note/read-note.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ClipboardModule } from '@angular/cdk/clipboard'


@NgModule({
  declarations: [
    AppComponent,
    NoteDialogComponent,
    ReadNoteComponent,
    CreateNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[NoteDialogComponent]
})
export class AppModule { }
