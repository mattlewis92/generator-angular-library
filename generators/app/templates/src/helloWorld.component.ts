import { Component } from '@angular/core';

@Component({
  selector: '<%- selectorPrefix %>-hello-world',
  template: 'Hello world from the {{ projectTitle }} module!'
})
export class HelloWorldComponent {
  projectTitle: string = '<%- projectTitle %>';
}
