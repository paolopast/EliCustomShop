import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, startWith } from 'rxjs';
import { SeoRouteData } from '../../core/models/site.models';
import { SeoService } from '../../core/seo/seo.service';
import { NavbarComponent } from '../navigation/navbar.component';
import { PremiumFooterComponent } from './premium-footer.component';

@Component({
  selector: 'app-site-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, PremiumFooterComponent],
  template: `
    <div class="relative min-h-screen overflow-x-hidden bg-[var(--surface-0)] text-[var(--text-strong)]">
      <a
        href="#main-content"
        class="sr-only absolute left-4 top-4 z-[60] rounded-sm bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-black focus:not-sr-only"
      >
        Salta al contenuto
      </a>

      <div class="noise-overlay"></div>
      <div class="pointer-events-none fixed inset-0 -z-10 grid-lines opacity-30"></div>

      <app-navbar />
      <router-outlet />
      <app-premium-footer />
    </div>
  `
})
export class SiteShellComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(new NavigationEnd(0, this.router.url, this.router.url)),
        takeUntilDestroyed()
      )
      .subscribe(() => this.syncSeo());
  }

  private syncSeo(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.snapshot.data as SeoRouteData | undefined;
    this.seo.update({
      title: route.snapshot.title ?? 'Eli Atelier',
      description:
        data?.description ??
        'Eli Atelier crea scarpe custom e sneakers su misura con toni caldi, materiali selezionati e lavorazione artigianale.',
      ogImage: data?.ogImage
    });
  }
}
