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
import { FAQ_GROUPS } from '../../core/data/site.data';
import { CtaBlockComponent } from '../../shared/sections/cta-block.component';
import { FaqAccordionComponent } from '../../shared/sections/faq-accordion.component';
import { PageHeroComponent } from '../../shared/sections/page-hero.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [PageHeroComponent, FaqAccordionComponent, CtaBlockComponent],
  template: `
    <main id="main-content" #pageRoot>
      <app-page-hero
        eyebrow="FAQ"
        title="Tempi, taglie, materiali e tutto cio che serve sapere prima di iniziare."
        description="Risposte essenziali ma precise sul servizio su misura. Se la tua richiesta ha esigenze particolari, il form resta il punto migliore per parlarne."
        secondaryLabel="Apri il form"
        secondaryLink="/contact"
      />

      <section class="section-shell section-space pt-4">
        <div class="grid gap-10">
          @for (group of groups; track group.category) {
            <section data-reveal class="grid gap-5 lg:grid-cols-[0.34fr,0.66fr] lg:items-start">
              <div>
                <p class="eyebrow">{{ group.category }}</p>
                <h2 class="display-title-compact">Domande frequenti sul tema.</h2>
              </div>

              <app-faq-accordion [items]="group.items" />
            </section>
          }
        </div>
      </section>

      <app-cta-block
        title="Se desideri chiarire una richiesta particolare o una tempistica delicata, preferiamo parlarne con un brief completo."
        description="Indicaci modello, occasione, palette e data di riferimento. Ti diremo subito se il progetto puo essere sviluppato nei tempi giusti."
      />
    </main>
  `
})
export class FaqPageComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private cleanup?: () => void;

  protected readonly groups = FAQ_GROUPS;

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
