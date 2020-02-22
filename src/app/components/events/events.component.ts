import { Component, OnInit } from "@angular/core";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { EventService } from '../../services/event.service';

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventComponent implements OnInit {
  private events: Event[];
  private errorMessage: string;
  private loadingError: boolean;
  private startIndex: number;
  private pageSize: number;
  private orderBy: string;
  private asc: boolean;
  private status: string;
  private pageNumber: number;

  constructor(private spinnerService: Ng4LoadingSpinnerService,
    private eventService: EventService) {
  }

  ngOnInit() {
    this.loadingError = false;
    this.startIndex = 0;
    this.pageSize = 9;
    this.orderBy = 'created_at';
    this.asc = false;
    this.status = '';
    this.pageNumber = 1;
    this.getEvents();
  }

  private getEvents() {
    this.startIndex = (this.pageNumber - 1) * this.pageSize;

    this.spinnerService.show();
    this.eventService.getEvents(this.status, this.orderBy, this.asc ? 'ASC' : 'DESC', this.startIndex, this.pageSize)
      .subscribe(
        ({ data }) => {
          if (data && data.events) {
            this.events = data.events;
          }        
          this.spinnerService.hide();
        },
        error => {
          this.loadingError = true;
          this.spinnerService.hide();
        });
  }

  private filter(status) {
    this.status = status;
    this.getEvents();
  }

  private order() {
    switch (this.orderBy) {
      case 'created_at': this.asc = false; break;
      case 'amount': this.asc = true; break;
      case 'currency': this.asc = true; break;
      case 'employee.last_name': this.asc = true; break;
    }
    this.getEvents();
  }

  private goPrevious() {
    this.pageNumber--;
    this.getEvents();
  }

  private goNext() {
    this.pageNumber++;
    this.getEvents();
  }
}
