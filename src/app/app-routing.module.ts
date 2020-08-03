import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ReadNoteComponent }from './read-note/read-note.component';
import { CreateNoteComponent } from './create-note/create-note.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'create'},
  {path: 'create', component:CreateNoteComponent},
  {path: 'read/:pageId', component:ReadNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
