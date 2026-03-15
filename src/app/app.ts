import { Component } from '@angular/core';
import { SiteShellComponent } from './shared/layout/site-shell.component';

@Component({
  selector: 'app-root',
  imports: [SiteShellComponent],
  template: '<app-site-shell />'
})
export class App {}
