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
import { CONTACT_DETAILS } from '../../core/data/site.data';
import { initSectionReveal } from '../../core/animations/motion';
import { ContactFormComponent } from '../../shared/sections/contact-form.component';
import { PageHeroComponent } from '../../shared/sections/page-hero.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [PageHeroComponent, ContactFormComponent],
  template: `
    <main id="main-content" #pageRoot>
      <app-page-hero
        eyebrow="Contact / Request your custom pair"
        title="Parlaci del tuo paio: brief, colori, budget, deadline e riferimenti."
        description="Questo form è pensato per trasformare gusto e intent in un progetto leggibile. Più dettagli ci dai, più la proposta sarà netta."
        [stats]="heroStats"
        secondaryLabel="FAQ"
        secondaryLink="/faq"
      />

      <section class="section-shell section-space pt-4">
        <div data-reveal class="mb-8 grid gap-4 md:grid-cols-3">
          @for (detail of heroStats; track detail.label) {
            <article class="editorial-card p-5">
              <p class="font-[var(--font-display)] text-4xl leading-none">{{ detail.value }}</p>
              <p class="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/54">
                {{ detail.label }}
              </p>
            </article>
          }
        </div>

        <div data-reveal>
          <app-contact-form />
        </div>
      </section>
    </main>
  `
})
export class ContactPageComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private cleanup?: () => void;

  protected readonly heroStats = CONTACT_DETAILS.map((detail) => ({
    value: detail.value,
    label: detail.label
  }));

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
