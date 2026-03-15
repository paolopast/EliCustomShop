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
  PROCESS_STEPS,
  TESTIMONIALS
} from '../../core/data/site.data';
import { initHeroReveal, initParallax, initSectionReveal } from '../../core/animations/motion';
import { LucideIconsModule } from '../../shared/icons/lucide-icons';
import { CtaBlockComponent } from '../../shared/sections/cta-block.component';
import { FeaturedCarouselComponent } from '../../shared/sections/featured-carousel.component';
import { GalleryGridComponent } from '../../shared/sections/gallery-grid.component';
import { ProcessTimelineComponent } from '../../shared/sections/process-timeline.component';
import { SectionHeadingComponent } from '../../shared/sections/section-heading.component';
import { TestimonialSliderComponent } from '../../shared/sections/testimonial-slider.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
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
        <div class="grid gap-8 lg:grid-cols-[1.02fr,0.98fr] lg:items-end">
          <div class="space-y-7">
            <p data-hero-item class="eyebrow">Milano atelier // made to order</p>
            <h1 data-hero-item class="display-title max-w-4xl">
              Scarpe custom pensate per accompagnare il tuo stile con naturale eleganza.
            </h1>
            <p data-hero-item class="body-copy max-w-2xl">
              Eli Atelier crea sneakers e scarpe su misura con una sensibilita calda, essenziale e artigianale, costruita attorno a materiali, proporzione e uso reale.
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
                <div class="rounded-[1.2rem] border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.68)] p-4">
                  <p class="font-[var(--font-display)] text-3xl leading-none">{{ stat.value }}</p>
                  <p class="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
                    {{ stat.label }}
                  </p>
                </div>
              }
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-[0.66fr,0.34fr]">
            <div data-hero-image class="editorial-card relative overflow-hidden">
              <img
                [ngSrc]="heroImage"
                [width]="1200"
                [height]="1450"
                alt="Custom sneaker elegante"
                priority
                class="aspect-[4/5] object-cover"
                data-parallax
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[rgba(63,46,34,0.7)] via-transparent to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 p-5">
                <p class="meta-pill">featured model</p>
                <p class="mt-3 font-[var(--font-display)] text-4xl leading-none text-[color:#fbf7f0]">
                  Lido Bespoke Sneaker
                </p>
              </div>
            </div>

            <div class="grid gap-4">
              <div data-hero-image class="editorial-card overflow-hidden">
                <img
                  [ngSrc]="detailImage"
                  [width]="1200"
                  [height]="1450"
                  alt="Scarpa custom da cerimonia"
                  class="aspect-[4/5] object-cover"
                >
              </div>

              <div data-hero-item class="editorial-card p-5">
                <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  Atelier note
                </p>
                <p class="mt-4 text-lg leading-8 text-[color:var(--text-muted)]">
                  Personalizzazione significa misura: niente effetti gridati, solo dettagli pensati per durare e restare attuali.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-shell section-space">
        <app-section-heading
          data-reveal
          eyebrow="Brand positioning"
          title="Un atelier che lavora su equilibrio, materie calde e dettagli scelti con calma."
          description="Ogni paio nasce per accompagnare una persona, un guardaroba e un occasione, con una presenza distinta ma sempre composta."
          [split]="true"
          [compact]="false"
        />

        <div class="mt-10 grid gap-4 lg:grid-cols-3">
          @for (point of brandPoints; track point) {
            <article data-reveal class="editorial-card p-6">
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                0{{ $index + 1 }}
              </p>
              <p class="mt-4 text-lg leading-8 text-[color:var(--text-muted)]">{{ point }}</p>
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
        <div class="grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
          <div data-reveal class="editorial-card overflow-hidden">
            <img
              [ngSrc]="craftImage"
              [width]="1200"
              [height]="1600"
              alt="Dettagli di materiali e finiture"
              class="aspect-[4/5] object-cover"
              data-parallax
            >
          </div>

          <div class="space-y-6">
            <app-section-heading
              data-reveal
              eyebrow="Craftsmanship"
              title="Materiali, toni e finiture lavorano insieme per restituire tatto, profondita e continuita."
              description="La bellezza del bespoke non dipende da un dettaglio isolato, ma dall armonia tra forma, materia e luce."
            />

            <div class="grid gap-4 sm:grid-cols-3">
              @for (note of craftsmanshipNotes; track note.title) {
                <article data-reveal class="editorial-card p-5">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    {{ note.label }}
                  </p>
                  <h2 class="mt-4 font-[var(--font-display)] text-4xl leading-none">{{ note.title }}</h2>
                  <p class="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{{ note.description }}</p>
                </article>
              }
            </div>
          </div>
        </div>
      </section>

      <section class="section-shell section-space">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <app-section-heading
            data-reveal
            eyebrow="How it works"
            title="Un percorso semplice, ordinato e pensato per lasciare spazio alle scelte giuste."
            description="Dal modello base alla consegna, ogni fase aiuta a definire il paio con chiarezza e tranquillita."
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
            eyebrow="Gallery teaser"
            title="Una selezione di texture, cuciture e finiture da osservare da vicino."
            description="La gallery e pensata come un racconto visivo della materia: morbidezza, tono, precisione e controllo del dettaglio."
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
          eyebrow="Testimonials"
          title="Fiducia, discrezione e un dialogo progettuale attento."
          description="Clienti privati, wedding pair e richieste su misura trovano qui una risposta calma, elegante e realmente personale."
        />

        <div class="mt-10" data-reveal>
          <app-testimonial-slider [items]="testimonials" />
        </div>
      </section>

      <app-cta-block
        title="Se desideri un paio che rifletta il tuo gusto con grazia e precisione, il percorso puo iniziare da qui."
        description="Raccontaci modello, materiali, toni e occasione. Ti restituiremo una direzione chiara, pensata con attenzione artigianale."
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
  protected readonly heroImage = FEATURED_MODELS[0].image;
  protected readonly detailImage = FEATURED_MODELS[2].image;
  protected readonly craftImage = GALLERY_ITEMS[2].image;
  protected readonly craftsmanshipNotes = [
    {
      label: 'Materiali',
      title: 'Pellami scelti',
      description:
        'Pelle e suede vengono selezionati per resa tattile, profondita visiva e coerenza con il contesto d uso.'
    },
    {
      label: 'Finiture',
      title: 'Dettagli sobri',
      description:
        'Cuciture, profili, iniziali e note personali entrano nel progetto con misura, senza togliere armonia alla silhouette.'
    },
    {
      label: 'Comfort',
      title: 'Uso reale',
      description:
        'Ogni scelta considera anche il passo, il tempo di utilizzo e il modo in cui il paio dovra accompagnarti.'
    }
  ];

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
