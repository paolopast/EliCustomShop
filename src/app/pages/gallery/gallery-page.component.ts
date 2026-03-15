import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { BRAND_STATS, GALLERY_ITEMS } from '../../core/data/site.data';
import { initSectionReveal } from '../../core/animations/motion';
import { CtaBlockComponent } from '../../shared/sections/cta-block.component';
import { GalleryGridComponent } from '../../shared/sections/gallery-grid.component';
import { PageHeroComponent } from '../../shared/sections/page-hero.component';
import { SectionHeadingComponent } from '../../shared/sections/section-heading.component';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [PageHeroComponent, SectionHeadingComponent, GalleryGridComponent, CtaBlockComponent],
  template: `
    <main id="main-content" #pageRoot>
      <app-page-hero
        eyebrow="Gallery / Portfolio"
        title="Texture, close-up e paia finite costruite per mostrare mano e carattere."
        description="Una selezione di dettagli reali: superfici, layering, materiali e tagli visivi che raccontano il livello del lavoro."
        [stats]="stats"
      />

      <section class="section-shell section-space pt-4">
        <app-section-heading
          data-reveal
          eyebrow="Editorial grid"
          title="Una gallery pensata come un lookbook tecnico."
          description="Ogni scatto mette a fuoco qualcosa di diverso: shape, finish, contrasto, lettering, texture, equilibrio."
          [split]="true"
        />

        <div class="mt-10" data-reveal>
          <app-gallery-grid [items]="items" />
        </div>
      </section>

      <section class="section-shell section-space">
        <div class="grid gap-5 lg:grid-cols-3">
          @for (detail of craftsmanshipNotes; track detail.title) {
            <article data-reveal class="editorial-card p-5">
              <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                {{ detail.tag }}
              </p>
              <h2 class="mt-4 font-[var(--font-display)] text-4xl leading-none">{{ detail.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-white/72">{{ detail.description }}</p>
            </article>
          }
        </div>
      </section>

      <app-cta-block
        title="Hai visto una direzione che senti vicina? Portiamola sul tuo brief."
        description="Compila la richiesta con i riferimenti giusti e costruiamo un concept che abbia la tua stessa intensità visiva."
      />
    </main>
  `
})
export class GalleryPageComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private cleanup?: () => void;

  protected readonly items = GALLERY_ITEMS;
  protected readonly stats = BRAND_STATS;
  protected readonly craftsmanshipNotes = [
    {
      tag: 'Texture',
      title: 'La materia deve reggere la luce dura.',
      description:
        'Pelle, mesh, vernice e trattamenti vengono scelti per funzionare dal vivo, non solo per una foto ben riuscita.'
    },
    {
      tag: 'Proporzione',
      title: 'Il dettaglio serve la silhouette.',
      description:
        'Una custom forte non è piena di elementi. È piena di decisioni utili che rispettano forma, proporzione e outfit.'
    },
    {
      tag: 'Finish',
      title: 'Ogni paio chiude con un controllo finale.',
      description:
        'Pulizia, uniformità, resistenza e resa visiva vengono rivisti prima di box e spedizione.'
    }
  ];

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
