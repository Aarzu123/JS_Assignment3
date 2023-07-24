import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  private bearerToken: string;
  apiUrl: string;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.bearerToken = authService.getBearerToken();
    this.notes = [];
    this.notesSubject = <BehaviorSubject<Array<Note>>>new BehaviorSubject([]);
    this.apiUrl = 'http://localhost:3000/api/v1/notes';
  }

  fetchNotesFromServer(): Observable<Array<Note>> {
    return this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    this.fetchNotesFromServer().subscribe(
      data => {
        this.notes = data;
        this.notesSubject.next(this.notes);
      },
      err => { console.log(err); }
    );

    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(this.apiUrl + '/' + note.id, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }

  getNoteById(noteId: Number): Note {
    return this.notes.find(p => p.id == noteId);
  }
}

