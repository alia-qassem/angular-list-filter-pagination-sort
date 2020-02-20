import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { EventComponent } from './components/events/events.component';
import { EventCardComponent } from './components/event-card/event-card.component';

import { EventService } from './services/event.service';

import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    GraphQLModule
  ],
  providers: [
    EventService
  ],
  bootstrap: [AppComponent],
  exports: [
    CommonModule
  ]
})
export class AppModule { }

