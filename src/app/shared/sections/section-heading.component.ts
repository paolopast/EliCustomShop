import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="split() ? 'grid gap-5 lg:grid-cols-[0.95fr,1.05fr] lg:items-end' : 'max-w-3xl'">
      <div>
        @if (eyebrow()) {
          <p class="eyebrow">{{ eyebrow() }}</p>
        }
        <h2 [class.display-title-compact]="compact()" [class.display-title]="!compact()">
          {{ title() }}
        </h2>
      </div>

      @if (description()) {
        <p class="body-copy max-w-2xl lg:justify-self-end">{{ description() }}</p>
      }
    </div>
  `
})
export class SectionHeadingComponent {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly description = input('');
  readonly split = input(false);
  readonly compact = input(true);
}
