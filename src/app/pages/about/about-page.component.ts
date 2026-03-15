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
import { initSectionReveal } from '../../core/animations/motion';
import { ABOUT_PILLARS, BRAND_STATS } from '../../core/data/site.data';
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
        title="Un atelier che interpreta il bespoke con calma, cultura materiale e gusto italiano."
        description="Eli Atelier nasce per dare forma a scarpe custom e sneakers su misura che uniscano artigianalita, tatto, proporzione e una presenza sempre misurata."
        [stats]="stats"
        secondaryLabel="Apri la gallery"
        secondaryLink="/gallery"
      />

      <section class="section-shell section-space pt-4">
        <div class="editorial-card p-6 sm:p-8 lg:p-10" data-reveal>
          <p class="eyebrow">Brand story</p>
          <p class="max-w-4xl text-2xl leading-10 text-[color:var(--text-strong)] sm:text-3xl sm:leading-[1.35]">
            L idea e semplice: creare un paio su misura che si integri con naturalezza nel modo di vestire di chi lo sceglie, senza eccessi ma con una presenza chiara.
          </p>
        </div>
      </section>

      <section class="section-shell section-space">
        <div class="grid gap-6">
          @for (pillar of pillars; track pillar.title) {
            <article data-reveal class="grid gap-6 border-t border-[color:var(--line-soft)] pt-6 lg:grid-cols-[0.42fr,0.58fr] lg:items-center">
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
                <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  0{{ $index + 1 }}
                </p>
                <h2 class="display-title-compact">{{ pillar.title }}</h2>
                <p class="body-copy max-w-2xl">{{ pillar.description }}</p>
                <p class="text-sm uppercase tracking-[0.18em] text-[color:var(--text-soft)]">{{ pillar.note }}</p>
              </div>
            </article>
          }
        </div>
      </section>

      <app-cta-block
        title="Se cerchi un paio capace di accompagnare il tuo stile con eleganza naturale, il dialogo puo iniziare qui."
        description="Raccontaci occasione, sensibilita cromatica e dettagli desiderati. Il progetto prendera forma con misura e precisione."
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
