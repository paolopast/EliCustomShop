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
import { initSectionReveal } from '../../core/animations/motion';
import { BRAND_STATS, GALLERY_ITEMS } from '../../core/data/site.data';
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
        title="Una gallery curata per raccontare pellami, cuciture, luce e finiture."
        description="La materia viene osservata da vicino, con un ritmo editoriale sobrio e pensato per lasciare spazio alla qualita del dettaglio."
        [stats]="stats"
      />

      <section class="section-shell section-space pt-4">
        <app-section-heading
          data-reveal
          eyebrow="Editorial grid"
          title="Texture, tono e lavorazione diventano il vero linguaggio visivo del progetto."
          description="Ogni immagine isola un aspetto della costruzione: profondita della pelle, delicatezza del suede, cucitura, equilibrio delle superfici."
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
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {{ detail.tag }}
              </p>
              <h2 class="mt-4 font-[var(--font-display)] text-4xl leading-none">{{ detail.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{{ detail.description }}</p>
            </article>
          }
        </div>
      </section>

      <app-cta-block
        title="Se una materia, un tono o una finitura ti sembra gia vicina, possiamo partire da li."
        description="Condividi il tuo riferimento e costruiremo una proposta coerente con il tuo guardaroba, il tuo momento e la tua sensibilita."
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
      tag: 'Pelle',
      title: 'La luce restituisce la qualita del materiale.',
      description:
        'Un buon pellame non ha bisogno di effetti forti: racconta da solo profondita, morbidezza e densita cromatica.'
    },
    {
      tag: 'Cucitura',
      title: 'La precisione si percepisce nei dettagli minimi.',
      description:
        'Linea, allineamento e pulizia accompagnano la forma generale e contribuiscono a dare ordine all intero paio.'
    },
    {
      tag: 'Finitura',
      title: 'Ogni progetto chiude con un controllo visivo e tattile.',
      description:
        'La cura finale serve a confermare equilibrio, continuita delle superfici e coerenza rispetto alla proposta iniziale.'
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
