import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideIconsModule } from '../icons/lucide-icons';

@Component({
  selector: 'app-cta-block',
  standalone: true,
  imports: [RouterLink, LucideIconsModule],
  template: `
    <section class="section-shell section-space">
      <div class="editorial-card overflow-hidden border-[rgba(var(--accent-rgb),0.22)] bg-[linear-gradient(135deg,rgba(255,251,245,0.94),rgba(233,218,201,0.88))] px-6 py-8 sm:p-8 lg:p-12">
        <div class="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-end">
          <div>
            <p class="eyebrow">{{ eyebrow() }}</p>
            <h2 class="display-title-compact">{{ title() }}</h2>
            <p class="body-copy mt-5 max-w-2xl">{{ description() }}</p>
          </div>

          <div class="flex flex-wrap gap-3 lg:justify-end">
            <a [routerLink]="primaryLink()" class="tactile-button">
              {{ primaryLabel() }}
              <lucide-icon name="arrow-right" class="h-4 w-4"></lucide-icon>
            </a>
            <a [routerLink]="secondaryLink()" class="tactile-button-dark">
              {{ secondaryLabel() }}
              <lucide-icon name="arrow-up-right" class="h-4 w-4"></lucide-icon>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CtaBlockComponent {
  readonly eyebrow = input('Custom request');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly primaryLabel = input('Richiedi il tuo paio');
  readonly primaryLink = input('/contact');
  readonly secondaryLabel = input('Scopri il processo');
  readonly secondaryLink = input('/how-it-works');
}
