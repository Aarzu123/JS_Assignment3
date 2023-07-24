import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterService } from './services/router.service';
import { NotesService } from './services/notes.service';
import { AuthenticationService } from './services/authentication.service';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

/*const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard] },
  {
    path: '',
    redirectTo: '/dashboard/view/listview',
    pathMatch: 'full'
  }
];

const childRoot: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      // // {
      // //   path: 'note', component: EditNoteOpenerComponent,
      // //   children: [
      // //     {
      // //       path: ':noteId/edit',
      // //       component: EditNoteViewComponent,
      // //       outlet: 'noteEditOutlet'
      // //     }], canActivate: [CanActivateRouteGuard]
      // // },
      {path: 'note/:noteId/edit', component: EditNoteOpenerComponent, outlet: 'noteEditOutlet'}
    ], canActivate: [CanActivateRouteGuard]
  },
];*/
//

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo : 'login', pathMatch : 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children : [
      {path : '', redirectTo : 'view/noteview', pathMatch : 'full'},
      {path : 'view/noteview', component : NoteViewComponent},
      {path : 'view/listview', component : ListViewComponent},
      {path : 'view/editview', component : EditNoteOpenerComponent},
      {path : 'note/:noteId/edit', component: EditNoteOpenerComponent , outlet: 'noteEditOutlet'}
    ]
  }
];


@NgModule({
  declarations: [AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteTakerComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule],
  providers: [RouterService,
    NotesService,
    AuthenticationService,
    CanActivateRouteGuard,
    MatDialog],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})

export class AppModule { }