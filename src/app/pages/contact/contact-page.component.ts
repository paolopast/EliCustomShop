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
import { CONTACT_DETAILS } from '../../core/data/site.data';
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
        title="Raccontaci il tuo paio: modello, materiali, palette, budget e occasione."
        description="Il form e pensato per trasformare il tuo gusto in una proposta chiara. Piu il brief e preciso, piu il progetto potra essere calibrato con accuratezza."
        [stats]="heroStats"
        secondaryLabel="FAQ"
        secondaryLink="/faq"
      />

      <section class="section-shell section-space pt-4">
        <div data-reveal class="mb-8 grid gap-4 md:grid-cols-3">
          @for (detail of heroStats; track detail.label) {
            <article class="editorial-card p-5">
              <p class="font-[var(--font-display)] text-4xl leading-none">{{ detail.value }}</p>
              <p class="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
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
