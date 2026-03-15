import { Dialog } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { COLLECTION_FILTERS, NAV_LINKS } from '../../core/data/site.data';
import { NavLink } from '../../core/models/site.models';
import { LucideIconsModule } from '../icons/lucide-icons';
import { MobileMenuDialogComponent } from './mobile-menu-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CdkMenuModule, LucideIconsModule],
  template: `
    <header class="sticky top-0 z-50 border-b border-[color:var(--line-soft)] bg-[rgba(249,243,234,0.84)] backdrop-blur-xl">
      <div class="section-shell flex h-20 items-center justify-between gap-4">
        <a routerLink="/" class="flex items-center gap-3 text-[var(--text-strong)]">
          <span class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.88)] text-[10px] font-semibold uppercase tracking-[0.26em] text-[color:var(--text-muted)]">
            EA
          </span>
          <span>
            <span class="block font-[var(--font-display)] text-[2rem] font-semibold leading-none">ELI ATELIER</span>
            <span class="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
              bespoke custom footwear
            </span>
          </span>
        </a>

        <nav class="hidden items-center gap-6 lg:flex">
          <a
            routerLink="/"
            routerLinkActive="text-[var(--accent)]"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)] transition hover:text-[color:var(--text-strong)]"
          >
            Home
          </a>

          <div class="relative" cdkMenuBar>
            <button
              type="button"
              [cdkMenuTriggerFor]="collectionsMenu"
              class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)] transition hover:text-[color:var(--text-strong)]"
            >
              Collezioni
              <lucide-icon name="chevron-down" class="h-4 w-4"></lucide-icon>
            </button>
          </div>

          @for (link of secondaryLinks; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="text-[var(--accent)]"
              class="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)] transition hover:text-[color:var(--text-strong)]"
            >
              {{ link.label }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-3">
          <a routerLink="/contact" class="tactile-button hidden lg:inline-flex">
            Richiedi il tuo paio
            <lucide-icon name="arrow-right" class="h-4 w-4"></lucide-icon>
          </a>

          <button
            type="button"
            class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.74)] text-[color:var(--text-strong)] lg:hidden"
            (click)="openMobileMenu()"
            aria-label="Apri menu"
          >
            <lucide-icon name="menu" class="h-5 w-5"></lucide-icon>
          </button>
        </div>
      </div>

      <ng-template #collectionsMenu>
        <div cdkMenu class="w-80 rounded-[1.4rem] border border-[color:var(--line-soft)] bg-[rgba(252,247,240,0.98)] p-3 shadow-[0_24px_50px_rgba(86,61,42,0.08)]">
          @for (link of collectionLinks; track link.label) {
            <a
              cdkMenuItem
              [routerLink]="link.path"
              [queryParams]="link.queryParams"
              class="flex items-center justify-between gap-4 rounded-[1rem] px-3 py-3 text-sm font-medium uppercase tracking-[0.16em] text-[color:var(--text-muted)] transition hover:bg-[rgba(255,250,244,0.92)] hover:text-[color:var(--text-strong)]"
            >
              <span>{{ link.label }}</span>
              <lucide-icon name="arrow-up-right" class="h-4 w-4"></lucide-icon>
            </a>
          }
        </div>
      </ng-template>
    </header>
  `
})
export class NavbarComponent {
  private readonly dialog = inject(Dialog);

  protected readonly secondaryLinks = NAV_LINKS.filter(
    (link) => !['Home', 'Collezioni', 'Contatti'].includes(link.label)
  );

  protected readonly collectionLinks: NavLink[] = COLLECTION_FILTERS.filter(
    (filter) => filter.value !== 'all'
  ).map((filter) => ({
    label: filter.label,
    path: '/collections',
    queryParams: { category: filter.value }
  }));

  protected openMobileMenu(): void {
    this.dialog.open(MobileMenuDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'mobile-menu-panel'
    });
  }
}
