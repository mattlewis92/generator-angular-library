import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {<%- ngModuleName %>} from './../<%- npmModuleName %>';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, <%- ngModuleName %>],
  bootstrap: [Demo],
  providers: []
})
export class DemoModule {}