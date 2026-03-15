import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { initSectionReveal } from '../../core/animations/motion';
import { COLLECTION_FILTERS, COLLECTION_MODELS } from '../../core/data/site.data';
import { CollectionFilter, CollectionModel } from '../../core/models/site.models';
import { LucideIconsModule } from '../../shared/icons/lucide-icons';
import { CtaBlockComponent } from '../../shared/sections/cta-block.component';
import { PageHeroComponent } from '../../shared/sections/page-hero.component';

@Component({
  selector: 'app-collections-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, CtaBlockComponent, LucideIconsModule],
  template: `
    <main id="main-content" #pageRoot>
      <app-page-hero
        eyebrow="Collections / Custom models"
        title="Una selezione di direzioni bespoke tra sneakers raffinate, calzature eleganti e modelli da cerimonia."
        description="Ogni collezione e pensata come una base progettuale da interpretare con toni, materiali e dettagli scelti in relazione alla persona che la indossera."
      />

      <section class="section-shell section-space pt-4">
        <div data-reveal class="flex flex-wrap gap-3">
          @for (filter of filters; track filter.value) {
            <button
              type="button"
              class="rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition"
              [class.border-[rgba(var(--accent-rgb),0.42)]]="activeFilter() === filter.value"
              [class.bg-[rgba(var(--accent-rgb),0.1)]]="activeFilter() === filter.value"
              [class.text-[color:var(--text-strong)]]="activeFilter() === filter.value"
              [class.border-[color:var(--line-soft)]]="activeFilter() !== filter.value"
              [class.text-[color:var(--text-soft)]]="activeFilter() !== filter.value"
              (click)="setFilter(filter.value)"
            >
              {{ filter.label }}
            </button>
          }
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          @for (model of filteredModels(); track model.slug) {
            <article data-reveal class="editorial-card flex h-full flex-col">
              <div class="relative overflow-hidden">
                <img [src]="model.image" [alt]="model.name" class="aspect-[5/6] object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-[rgba(67,49,36,0.62)] via-transparent to-transparent"></div>
                <span class="absolute left-4 top-4 meta-pill">{{ model.styleTag }}</span>
                <span class="absolute bottom-4 right-4 meta-pill">{{ model.startingPrice }}</span>
              </div>

              <div class="flex flex-1 flex-col gap-5 p-6">
                <div>
                  <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                    {{ labelFor(model) }}
                  </p>
                  <h2 class="mt-2 font-[var(--font-display)] text-4xl leading-none">{{ model.name }}</h2>
                </div>

                <p class="body-small">{{ model.description }}</p>

                <div class="grid gap-2">
                  @for (material of model.materials; track material) {
                    <span class="inline-flex w-fit rounded-full border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.74)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-soft)]">
                      {{ material }}
                    </span>
                  }
                </div>

                <div class="grid gap-2 border-t border-[color:var(--line-soft)] pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
                  <div class="flex items-center justify-between gap-3">
                    <span>Palette</span>
                    <span class="text-right text-[color:var(--text-muted)]">{{ model.palette }}</span>
                  </div>
                  <div class="flex items-center justify-between gap-3">
                    <span>Lead time</span>
                    <span class="text-right text-[color:var(--text-muted)]">{{ model.leadTime }}</span>
                  </div>
                </div>

                <a routerLink="/contact" class="tactile-button mt-auto w-full">
                  Richiedi una proposta
                  <lucide-icon name="arrow-right" class="h-4 w-4"></lucide-icon>
                </a>
              </div>
            </article>
          }
        </div>
      </section>

      <app-cta-block
        title="La collezione e solo il punto di partenza: il paio finale nasce sempre dalla conversazione."
        description="Scegli la famiglia che senti piu vicina e raccontaci toni, materiali, occasione e dettagli desiderati."
        secondaryLabel="Apri il form"
        secondaryLink="/contact"
      />
    </main>
  `
})
export class CollectionsPageComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private cleanup?: () => void;

  protected readonly filters = COLLECTION_FILTERS;
  protected readonly activeFilter = signal<CollectionFilter['value']>('all');
  protected readonly filteredModels = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all'
      ? COLLECTION_MODELS
      : COLLECTION_MODELS.filter((model) => model.category === filter);
  });

  @ViewChild('pageRoot', { static: true }) private readonly pageRoot?: ElementRef<HTMLElement>;

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const filter = params.get('category') as CollectionFilter['value'] | null;
      const valid = this.filters.some((item) => item.value === filter);
      this.activeFilter.set(valid && filter ? filter : 'all');
    });
  }

  protected setFilter(value: CollectionFilter['value']): void {
    this.activeFilter.set(value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: value === 'all' ? null : value },
      queryParamsHandling: 'merge'
    });
  }

  protected labelFor(model: CollectionModel): string {
    return this.filters.find((filter) => filter.value === model.category)?.label ?? model.category;
  }

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
