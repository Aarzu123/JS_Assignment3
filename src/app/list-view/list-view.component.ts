// import { Component, OnInit } from '@angular/core';
// import { Note } from '../note';

// @Component({
//   selector: 'app-list-view',
//   templateUrl: './list-view.component.html',
//   styleUrls: ['./list-view.component.css']
// })
// export class ListViewComponent {

//   notStartedNotes: Array<Note>;
//   startedNotes: Array<Note>;
//   completedNotes: Array<Note>;
// }
import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() notStartedNotes: Array<Note>;
  @Input() startedNotes: Array<Note>;
  @Input() completedNotes: Array<Note>;

  constructor(private noteService: NotesService) {
  }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(
      data => {
        this.notStartedNotes = data.filter(p => p.state === 'not-started');
        this.startedNotes = data.filter(p => p.state === 'started');
        this.completedNotes = data.filter(p => p.state === 'completed');
      }
    );
  }
}