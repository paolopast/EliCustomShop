import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_DETAILS, NAV_LINKS } from '../../core/data/site.data';
import { LucideIconsModule } from '../icons/lucide-icons';

@Component({
  selector: 'app-premium-footer',
  standalone: true,
  imports: [RouterLink, LucideIconsModule],
  template: `
    <footer class="border-t border-[color:var(--line-soft)] bg-[rgba(246,239,229,0.86)]">
      <div class="section-shell grid gap-10 py-12 lg:grid-cols-[1fr,0.7fr,0.7fr]">
        <div class="space-y-4">
          <p class="eyebrow">Premium custom footwear</p>
          <h2 class="display-title-compact">ELI ATELIER</h2>
          <p class="body-small max-w-lg">
            Scarpe custom e sneakers su misura pensate con equilibrio, materiali selezionati e una cura artigianale dal gusto discreto.
          </p>
          <a routerLink="/contact" class="tactile-button">
            Richiedi il tuo paio
            <lucide-icon name="arrow-right" class="h-4 w-4"></lucide-icon>
          </a>
        </div>

        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-soft)]">Pagine</p>
          <nav class="mt-5 grid gap-3 text-sm uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
            @for (link of navLinks; track link.path) {
              <a [routerLink]="link.path" class="transition hover:text-[color:var(--text-strong)]">{{ link.label }}</a>
            }
          </nav>
        </div>

        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-soft)]">Atelier</p>
          <div class="mt-5 grid gap-3 text-sm text-[color:var(--text-muted)]">
            @for (detail of details; track detail.label) {
              <a
                [href]="detail.href ?? null"
                [attr.target]="detail.href?.startsWith('http') ? '_blank' : null"
                [attr.rel]="detail.href?.startsWith('http') ? 'noreferrer' : null"
                class="flex items-center justify-between gap-3 border-b border-[color:var(--line-soft)] pb-3 last:border-b-0 last:pb-0"
              >
                <span class="uppercase tracking-[0.18em] text-[color:var(--text-soft)]">{{ detail.label }}</span>
                <span class="text-right text-[color:var(--text-strong)]">{{ detail.value }}</span>
              </a>
            }
          </div>
        </div>
      </div>

      <div class="section-shell flex flex-col gap-3 border-t border-[color:var(--line-soft)] py-5 text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Eli Atelier</p>
        <p>Made to order footwear with an editorial Italian sensibility.</p>
      </div>
    </footer>
  `
})
export class PremiumFooterComponent {
  protected readonly navLinks = NAV_LINKS;
  protected readonly details = CONTACT_DETAILS;
}
