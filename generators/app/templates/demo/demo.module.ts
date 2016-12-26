import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { <%- ngModuleName %> } from '../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, <%- ngModuleName %>],
  bootstrap: [DemoComponent],
  providers: []
})
export class DemoModule {}