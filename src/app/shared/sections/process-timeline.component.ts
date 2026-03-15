import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { ProcessStep } from '../../core/models/site.models';

@Component({
  selector: 'app-process-timeline',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <ol class="grid gap-6 lg:grid-cols-4">
      @for (step of steps(); track step.step) {
        <li class="editorial-card flex h-full flex-col">
          <div class="relative overflow-hidden">
            <img
              [ngSrc]="step.image"
              [width]="960"
              [height]="1200"
              [alt]="step.title"
              class="aspect-[4/5] object-cover"
              [class.max-h-52]="compact()"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-[rgba(67,49,36,0.72)] via-transparent to-transparent"></div>
            <span class="absolute left-4 top-4 rounded-full border border-[rgba(255,248,240,0.66)] bg-[rgba(250,244,236,0.86)] px-3 py-2 font-[var(--font-display)] text-2xl leading-none text-[color:var(--text-strong)]">
              {{ step.step }}
            </span>
          </div>

          <div class="flex flex-1 flex-col gap-4 p-5">
            <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Step {{ step.step }}
            </p>
            <h3 class="font-[var(--font-display)] text-3xl leading-none">{{ step.title }}</h3>
            <p class="body-small">{{ step.description }}</p>
            @if (!compact()) {
              <p class="mt-auto border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-soft)]">
                {{ step.detail }}
              </p>
            }
          </div>
        </li>
      }
    </ol>
  `
})
export class ProcessTimelineComponent {
  readonly steps = input.required<ProcessStep[]>();
  readonly compact = input(false);
}
