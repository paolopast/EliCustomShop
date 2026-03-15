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
import { RouterLink } from '@angular/router';
import {
  BRAND_POSITIONING_POINTS,
  FEATURED_MODELS,
  GALLERY_ITEMS,
  HOME_HERO_STATS,
  HOME_MARQUEE_ITEMS,
  PROCESS_STEPS,
  TESTIMONIALS
} from '../../core/data/site.data';
import { initHeroReveal, initParallax, initSectionReveal } from '../../core/animations/motion';
import { CtaBlockComponent } from '../../shared/sections/cta-block.component';
import { FeaturedCarouselComponent } from '../../shared/sections/featured-carousel.component';
import { GalleryGridComponent } from '../../shared/sections/gallery-grid.component';
import { MarqueeStripComponent } from '../../shared/sections/marquee-strip.component';
import { ProcessTimelineComponent } from '../../shared/sections/process-timeline.component';
import { SectionHeadingComponent } from '../../shared/sections/section-heading.component';
import { TestimonialSliderComponent } from '../../shared/sections/testimonial-slider.component';
import { LucideIconsModule } from '../../shared/icons/lucide-icons';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    MarqueeStripComponent,
    SectionHeadingComponent,
    FeaturedCarouselComponent,
    ProcessTimelineComponent,
    GalleryGridComponent,
    TestimonialSliderComponent,
    CtaBlockComponent,
    LucideIconsModule
  ],
  template: `
    <main id="main-content" #pageRoot class="pb-8">
      <section data-hero class="section-shell pt-32 pb-16 sm:pt-36 lg:pt-40">
        <div class="grid gap-8 lg:grid-cols-[1.05fr,0.95fr] lg:items-end">
          <div class="space-y-7">
            <p data-hero-item class="eyebrow">Milano // premium custom footwear</p>
            <h1 data-hero-item class="display-title max-w-4xl">
              Scarpe custom nate per farsi notare, non per passare inosservate.
            </h1>
            <p data-hero-item class="body-copy max-w-2xl">
              Sneakers e scarpe personalizzate con un linguaggio streetwear, taglio editoriale e lavorazione artigianale costruita sul tuo brief.
            </p>

            <div data-hero-item class="flex flex-wrap gap-3">
              <a routerLink="/contact" class="tactile-button">
                Richiedi il tuo paio
                <lucide-icon name="arrow-right" class="h-4 w-4"></lucide-icon>
              </a>
              <a routerLink="/collections" class="tactile-button-dark">
                Scopri le collezioni
                <lucide-icon name="arrow-up-right" class="h-4 w-4"></lucide-icon>
              </a>
            </div>

            <div data-hero-item class="grid gap-3 sm:grid-cols-3">
              @for (stat of heroStats; track stat.label) {
                <div class="border border-white/10 bg-white/[0.03] p-4">
                  <p class="font-[var(--font-display)] text-3xl leading-none">{{ stat.value }}</p>
                  <p class="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/54">
                    {{ stat.label }}
                  </p>
                </div>
              }
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-[0.65fr,0.35fr]">
            <div data-hero-image class="editorial-card relative overflow-hidden">
              <img
                [ngSrc]="heroImage"
                [width]="1200"
                [height]="1450"
                alt="Custom sneaker premium"
                priority
                class="aspect-[4/5] object-cover"
                data-parallax
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 p-5">
                <p class="meta-pill">featured custom</p>
                <p class="mt-3 font-[var(--font-display)] text-4xl leading-none">Metro Volt Low</p>
              </div>
            </div>

            <div class="grid gap-4">
              <div data-hero-image class="editorial-card overflow-hidden">
                <img
                  [ngSrc]="detailImage"
                  [width]="1200"
                  [height]="1450"
                  alt="High top custom limited"
                  class="aspect-[4/5] object-cover"
                >
              </div>

              <div data-hero-item class="editorial-card p-5">
                <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                  Positioning
                </p>
                <p class="mt-4 text-lg leading-8 text-white">
                  Non è merchandising. È un paio pensato per completare un’identità visiva precisa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <app-marquee-strip [items]="marqueeItems" />

      <section class="section-shell section-space">
        <app-section-heading
          data-reveal
          eyebrow="Brand positioning"
          title="Un’estetica scura, netta e personale. Ogni paio nasce con una funzione visiva precisa."
          description="Street culture, silhouettes pulite, dettagli sharp e materiali che tengono il close-up. La customizzazione qui non è rumore: è direzione."
          [split]="true"
          [compact]="false"
        />

        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          @for (point of brandPoints; track point) {
            <article data-reveal class="editorial-card p-5">
              <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                0{{ $index + 1 }}
              </p>
              <p class="mt-4 text-lg leading-8 text-white/80">{{ point }}</p>
            </article>
          }
        </div>
      </section>

      <section class="section-shell section-space">
        <div data-reveal>
          <app-featured-carousel [items]="featuredModels" />
        </div>
      </section>

      <section class="section-shell section-space">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <app-section-heading
            data-reveal
            eyebrow="How it works"
            title="Quattro step, nessun passaggio generico."
            description="Dal base model alla consegna: ogni fase serve a trasformare il brief in un paio credibile, non improvvisato."
          />

          <a data-reveal routerLink="/how-it-works" class="tactile-button-dark">
            Vedi il processo completo
            <lucide-icon name="arrow-up-right" class="h-4 w-4"></lucide-icon>
          </a>
        </div>

        <div class="mt-10">
          <app-process-timeline [steps]="processSteps" [compact]="true" />
        </div>
      </section>

      <section class="section-shell section-space">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <app-section-heading
            data-reveal
            eyebrow="Portfolio teaser"
            title="Dettagli da vedere da vicino."
            description="Close-up, finish, layering e texture: una gallery pensata per mostrare mano, materia e tensione visiva."
          />

          <a data-reveal routerLink="/gallery" class="tactile-button-dark">
            Apri la gallery completa
            <lucide-icon name="arrow-up-right" class="h-4 w-4"></lucide-icon>
          </a>
        </div>

        <div class="mt-10" data-reveal>
          <app-gallery-grid [items]="galleryItems" [limit]="6" />
        </div>
      </section>

      <section class="section-shell section-space">
        <app-section-heading
          data-reveal
          eyebrow="Social proof"
          title="Clienti, stylist, eventi e capsule con richieste ad alto livello di attenzione."
          description="Il valore non è solo nell’impatto finale. È nella capacità del paio di reggere contesto, styling e aspettativa."
        />

        <div class="mt-10" data-reveal>
          <app-testimonial-slider [items]="testimonials" />
        </div>
      </section>

      <app-cta-block
        title="Hai già in testa un outfit, un evento o una capsule? Facciamo partire il brief."
        description="Raccontaci modello, palette, mood e urgenza. Ti rispondiamo con una direzione concreta, non con un template standard."
      />
    </main>
  `
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cleanups: Array<() => void> = [];

  protected readonly heroStats = HOME_HERO_STATS;
  protected readonly brandPoints = BRAND_POSITIONING_POINTS;
  protected readonly featuredModels = FEATURED_MODELS;
  protected readonly processSteps = PROCESS_STEPS;
  protected readonly galleryItems = GALLERY_ITEMS;
  protected readonly testimonials = TESTIMONIALS;
  protected readonly marqueeItems = HOME_MARQUEE_ITEMS;
  protected readonly heroImage = FEATURED_MODELS[0].image;
  protected readonly detailImage = FEATURED_MODELS[3].image;

  @ViewChild('pageRoot', { static: true }) private readonly pageRoot?: ElementRef<HTMLElement>;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.pageRoot) {
      return;
    }

    const root = this.pageRoot.nativeElement;
    const heroCleanup = await initHeroReveal(root.querySelector<HTMLElement>('[data-hero]'));
    const revealCleanup = await initSectionReveal(root);
    const parallaxCleanup = await initParallax(root);

    [heroCleanup, revealCleanup, parallaxCleanup]
      .filter((cleanup): cleanup is () => void => Boolean(cleanup))
      .forEach((cleanup) => this.cleanups.push(cleanup));
  }

  ngOnDestroy(): void {
    this.cleanups.forEach((cleanup) => cleanup());
  }
}
