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
import { PROCESS_STEPS } from '../../core/data/site.data';
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
        title="Un processo in quattro passaggi, costruito per accompagnare ogni scelta con calma e chiarezza."
        description="Dal modello base alla consegna, il percorso resta essenziale e leggibile: forma, materiali, approvazione e lavorazione finale."
        secondaryLabel="Richiedi il tuo paio"
        secondaryLink="/contact"
      />

      <section class="section-shell section-space pt-4">
        <app-section-heading
          data-reveal
          eyebrow="Il metodo"
          title="Ogni fase serve a dare ordine al progetto e continuita al risultato finale."
          description="Il valore di una creazione su misura non sta solo nel dettaglio finale, ma nella qualita delle decisioni prese lungo il percorso."
        />

        <div class="mt-10">
          <app-process-timeline [steps]="steps" />
        </div>
      </section>

      <section class="section-shell section-space">
        <div class="grid gap-5 lg:grid-cols-3">
          @for (item of workflowNotes; track item.title) {
            <article data-reveal class="editorial-card p-5">
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {{ item.label }}
              </p>
              <h2 class="mt-4 font-[var(--font-display)] text-4xl leading-none">{{ item.title }}</h2>
              <p class="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{{ item.description }}</p>
            </article>
          }
        </div>
      </section>

      <app-cta-block
        title="Hai una data importante o un idea gia molto chiara? Il percorso puo iniziare con un brief ordinato."
        description="Condividi modello, toni, riferimenti e tempistiche: ti aiuteremo a definire una proposta coerente e realizzabile."
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
      title: 'Silhouette',
      description:
        'La forma viene scelta in relazione all occasione d uso, alla presenza desiderata e al comfort necessario.'
    },
    {
      label: '02',
      title: 'Materia',
      description:
        'Toni, pellami, suede e finiture entrano nel progetto con un equilibrio pensato per durare nel tempo.'
    },
    {
      label: '03',
      title: 'Cura finale',
      description:
        'Produzione, controllo e consegna restano allineati alla proposta approvata, senza passaggi superflui.'
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
