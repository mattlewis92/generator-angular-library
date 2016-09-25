import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {<%- ngModuleName %>} from '../src';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, <%- ngModuleName %>],
  bootstrap: [Demo],
  providers: []
})
export class DemoModule {}