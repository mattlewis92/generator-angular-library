import {Component} from '@angular/core';
import {HelloWorld} from './../<%- npmModuleName %>';

@Component({
  selector: 'demo-app',
  directives: [HelloWorld],
  template: '<hello-world></hello-world>'
})
export class DemoApp {}
