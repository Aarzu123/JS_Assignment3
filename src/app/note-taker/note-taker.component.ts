import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  errMessage: string;
  public note: Note;
  public notes: Note[];
  public notStartedNotes: Array<Note>;
  public startedNotes: Array<Note>;
  public completedNotes: Array<Note>;

  constructor(private notesService: NotesService) {
    this.note = new Note();
    this.notes = [];
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
    this.errMessage = '';
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => {
        this.notes = data;
        this.notStartedNotes = this.notes.filter(p => p.state === 'not-started');
        this.startedNotes = this.notes.filter(p => p.state === 'started');
        this.completedNotes = this.notes.filter(p => p.state === 'completed');
      },
      err => { this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'; }
    );
  }

  addNote() {
    if (!!this.note.text && !!this.note.title) {
      this.notes.push(this.note);
      this.notStartedNotes.push(this.note);
      this.notesService.addNote(this.note).subscribe(
        data => { }, 
        err => { 
          this.errMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found'; });
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }
}
