import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component, input } from '@angular/core';
import { FaqItem } from '../../core/models/site.models';
import { LucideIconsModule } from '../icons/lucide-icons';

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  imports: [CdkAccordionModule, LucideIconsModule],
  template: `
    <div cdkAccordion class="grid gap-4">
      @for (item of items(); track item.question) {
        <article cdkAccordionItem #accordionItem="cdkAccordionItem" class="editorial-card overflow-hidden">
          <button
            type="button"
            class="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
            (click)="accordionItem.toggle()"
          >
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                {{ item.category }}
              </p>
              <h3 class="mt-2 text-lg font-semibold leading-7 text-[color:var(--text-strong)]">{{ item.question }}</h3>
            </div>

            <span
              class="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.68)] transition"
              [class.rotate-180]="accordionItem.expanded"
            >
              <lucide-icon name="chevron-down" class="h-5 w-5"></lucide-icon>
            </span>
          </button>

          @if (accordionItem.expanded) {
            <div class="border-t border-[color:var(--line-soft)] px-5 py-5 text-sm leading-7 text-[color:var(--text-muted)] sm:px-6">
              {{ item.answer }}
            </div>
          }
        </article>
      }
    </div>
  `
})
export class FaqAccordionComponent {
  readonly items = input.required<FaqItem[]>();
}
