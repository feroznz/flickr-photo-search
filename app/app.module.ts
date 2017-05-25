import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { JsonpModule }    from '@angular/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FlickrService } from './flickr.service';

@NgModule({
  imports:      [BrowserModule, JsonpModule,FormsModule, ReactiveFormsModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [FlickrService]
})
export class AppModule { }