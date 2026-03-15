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
import { PROCESS_STEPS } from '../../core/data/site.data';
import { initSectionReveal } from '../../core/animations/motion';
import { CtaBlockComponent } from '../../shared/sections/cta-block.component';
import { PageHeroComponent } from '../../shared/sections/page-hero.component';
import { ProcessTimelineComponent } from '../../shared/sections/process-timeline.component';
import { SectionHeadingComponent } from '../../shared/sections/section-heading.component';

@Component({
  selector: 'app-how-it-works-page',
  standalone: true,
  imports: [PageHeroComponent, ProcessTimelineComponent, SectionHeadingComponent, CtaBlockComponent],
  template: `
    <main id="main-content" #pageRoot>
      <app-page-hero
        eyebrow="How it works"
        title="Un processo in quattro step, pensato per trasformare gusto e brief in un paio credibile."
        description="Nessun passaggio superfluo: partiamo dalla silhouette giusta, definiamo materiali e dettagli, approvi il concept, poi produciamo e consegniamo."
        secondaryLabel="Richiedi il tuo paio"
        secondaryLink="/contact"
      />

      <section class="section-shell section-space pt-4">
        <app-section-heading
          data-reveal
          eyebrow="Il metodo"
          title="Ogni fase riduce il rumore e aumenta precisione."
          description="Il valore del custom non sta solo nel risultato finale, ma nel fatto che ogni decisione venga presa con un motivo chiaro."
        />

        <div class="mt-10">
          <app-process-timeline [steps]="steps" />
        </div>
      </section>

      <section class="section-shell section-space">
        <div class="grid gap-5 lg:grid-cols-3">
          @for (item of workflowNotes; track item.title) {
            <article data-reveal class="editorial-card p-5">
              <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                {{ item.label }}
              </p>
              <h2 class="mt-4 font-[var(--font-display)] text-4xl leading-none">{{ item.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-white/72">{{ item.description }}</p>
            </article>
          }
        </div>
      </section>

      <app-cta-block
        title="Hai già una data evento o un drop da preparare? Il briefing parte da qui."
        description="Più ci dai contesto, più la proposta arriva pulita: modello, palette, deadline, references e budget."
      />
    </main>
  `
})
export class HowItWorksPageComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private cleanup?: () => void;

  protected readonly steps = PROCESS_STEPS;
  protected readonly workflowNotes = [
    {
      label: '01',
      title: 'Base model',
      description:
        'La forma conta. Una custom forte parte dalla silhouette che regge davvero il tipo di outfit e l’occasione d’uso.'
    },
    {
      label: '02',
      title: 'Direzione creativa',
      description:
        'Palette, materiali, lettering e grado di impatto vengono messi in ordine prima di toccare il prodotto finale.'
    },
    {
      label: '03',
      title: 'Execution',
      description:
        'Produzione, finitura, controllo qualità e consegna restano allineati alla direzione approvata, senza scorciatoie.'
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
