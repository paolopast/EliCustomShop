import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { ABOUT_PILLARS, BRAND_STATS } from '../../core/data/site.data';
import { initSectionReveal } from '../../core/animations/motion';
import { CtaBlockComponent } from '../../shared/sections/cta-block.component';
import { PageHeroComponent } from '../../shared/sections/page-hero.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [PageHeroComponent, NgOptimizedImage, CtaBlockComponent],
  template: `
    <main id="main-content" #pageRoot>
      <app-page-hero
        eyebrow="About the brand"
        title="Street culture, craftsmanship e design con una posizione chiara."
        description="ELI Custom Studio nasce per chi non cerca una scarpa personalizzata qualsiasi, ma un paio che abbia intensità, progetto e presenza."
        [stats]="stats"
        secondaryLabel="Apri la gallery"
        secondaryLink="/gallery"
      />

      <section class="section-shell section-space pt-4">
        <div class="editorial-card p-6 sm:p-8 lg:p-10" data-reveal>
          <p class="eyebrow">Brand story</p>
          <p class="max-w-4xl text-2xl leading-10 text-white sm:text-3xl sm:leading-[1.35]">
            L’idea è semplice: costruire custom sneakers e scarpe che abbiano la precisione di un prodotto curato e l’energia di una reference giusta.
          </p>
        </div>
      </section>

      <section class="section-shell section-space">
        <div class="grid gap-6">
          @for (pillar of pillars; track pillar.title) {
            <article data-reveal class="grid gap-6 border-t border-white/8 pt-6 lg:grid-cols-[0.42fr,0.58fr] lg:items-center">
              <div class="editorial-card overflow-hidden">
                <img
                  [ngSrc]="pillar.image"
                  [width]="1000"
                  [height]="1200"
                  [alt]="pillar.title"
                  class="aspect-[4/5] object-cover"
                >
              </div>

              <div class="space-y-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                  0{{ $index + 1 }}
                </p>
                <h2 class="display-title-compact">{{ pillar.title }}</h2>
                <p class="body-copy max-w-2xl">{{ pillar.description }}</p>
                <p class="text-sm uppercase tracking-[0.24em] text-white/48">{{ pillar.note }}</p>
              </div>
            </article>
          }
        </div>
      </section>

      <app-cta-block
        title="Se cerchi un paio che dica qualcosa di preciso sul tuo stile, qui parte il lavoro giusto."
        description="Raccontaci contesto, outfit, mood e modello di partenza. Il resto si costruisce con metodo e occhio."
      />
    </main>
  `
})
export class AboutPageComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private cleanup?: () => void;

  protected readonly pillars = ABOUT_PILLARS;
  protected readonly stats = BRAND_STATS;

  @ViewChild('pageRoot', { static: true }) private readonly pageRoot?: ElementRef<HTMLElement>;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.pageRoot) {
      return;
    }

    this.cleanup = await initSectionReveal(this.pageRoot.nativeElement);
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
