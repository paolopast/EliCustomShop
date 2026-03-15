import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroStat } from '../../core/models/site.models';
import { LucideIconsModule } from '../icons/lucide-icons';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [RouterLink, LucideIconsModule],
  template: `
    <section class="section-shell pt-32 pb-10 sm:pt-36 lg:pt-40">
      <div class="editorial-card grid-lines overflow-hidden px-6 py-8 sm:p-8 lg:p-12">
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),0.55)] to-transparent"></div>
        <div class="relative grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
          <div class="space-y-5">
            <p class="eyebrow">{{ eyebrow() }}</p>
            <h1 class="display-title">{{ title() }}</h1>
            <p class="body-copy max-w-2xl">{{ description() }}</p>

            <div class="flex flex-wrap gap-3 pt-2">
              <a [routerLink]="primaryLink()" class="tactile-button">
                {{ primaryLabel() }}
                <lucide-icon name="arrow-right" class="h-4 w-4"></lucide-icon>
              </a>

              @if (secondaryLabel()) {
                <a [routerLink]="secondaryLink()" class="tactile-button-dark">
                  {{ secondaryLabel() }}
                  <lucide-icon name="arrow-up-right" class="h-4 w-4"></lucide-icon>
                </a>
              }
            </div>
          </div>

          @if (stats().length) {
            <div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              @for (stat of stats(); track stat.label) {
                <div class="rounded-[1.1rem] border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.68)] p-4">
                  <p class="font-[var(--font-display)] text-3xl leading-none">{{ stat.value }}</p>
                  <p class="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
                    {{ stat.label }}
                  </p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class PageHeroComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly primaryLabel = input('Richiedi il tuo paio');
  readonly primaryLink = input('/contact');
  readonly secondaryLabel = input('Scopri le collezioni');
  readonly secondaryLink = input('/collections');
  readonly stats = input<HeroStat[]>([]);
}
