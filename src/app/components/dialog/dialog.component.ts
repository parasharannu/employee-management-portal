import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  modalShow = 1;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  nextDialog() {
    this.modalShow += 1;
  }

  prevDialog() {
    this.modalShow -= 1;
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
