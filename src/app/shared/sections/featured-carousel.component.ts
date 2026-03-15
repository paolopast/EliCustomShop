import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
  input
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CollectionModel } from '../../core/models/site.models';
import { LucideIconsModule } from '../icons/lucide-icons';

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, LucideIconsModule],
  template: `
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="eyebrow">Featured custom models</p>
        <h3 class="display-title-compact">Modelli pensati per essere interpretati con misura, materia e carattere.</h3>
      </div>

      <div class="hidden gap-2 sm:flex">
        <button
          #prevButton
          type="button"
          class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.78)] text-[color:var(--text-strong)]"
          aria-label="Slide precedente"
        >
          <lucide-icon name="chevron-left" class="h-5 w-5"></lucide-icon>
        </button>
        <button
          #nextButton
          type="button"
          class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.78)] text-[color:var(--text-strong)]"
          aria-label="Slide successiva"
        >
          <lucide-icon name="chevron-right" class="h-5 w-5"></lucide-icon>
        </button>
      </div>
    </div>

    <div #container class="swiper mt-8 overflow-hidden">
      <div class="swiper-wrapper">
        @for (item of items(); track item.slug) {
          <article class="swiper-slide editorial-card h-full">
            <div class="relative overflow-hidden">
              <img
                [ngSrc]="item.image"
                [width]="1200"
                [height]="1450"
                [alt]="item.name"
                class="aspect-[5/6] object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-[rgba(67,49,36,0.66)] via-transparent to-transparent"></div>
              <span class="absolute left-4 top-4 meta-pill">{{ item.styleTag }}</span>
              <span class="absolute bottom-4 right-4 meta-pill">{{ item.startingPrice }}</span>
            </div>

            <div class="flex h-full flex-col gap-5 p-5">
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                  {{ item.baseModel }}
                </p>
                <h4 class="mt-2 font-[var(--font-display)] text-4xl leading-none">{{ item.name }}</h4>
              </div>

              <p class="body-small">{{ item.description }}</p>

              <div class="grid gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--text-soft)]">
                <div class="flex items-center justify-between gap-3 border-t border-[color:var(--line-soft)] pt-3">
                  <span>Palette</span>
                  <span class="text-right text-[color:var(--text-muted)]">{{ item.palette }}</span>
                </div>
                <div class="flex items-center justify-between gap-3 border-t border-[color:var(--line-soft)] pt-3">
                  <span>Lead time</span>
                  <span class="text-right text-[color:var(--text-muted)]">{{ item.leadTime }}</span>
                </div>
              </div>

              <a routerLink="/contact" class="tactile-button mt-auto w-full">
                Richiedi informazioni
                <lucide-icon name="arrow-right" class="h-4 w-4"></lucide-icon>
              </a>
            </div>
          </article>
        }
      </div>

      <div class="swiper-pagination !static mt-6"></div>
    </div>
  `
})
export class FeaturedCarouselComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private swiper?: { destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void };

  readonly items = input.required<CollectionModel[]>();

  @ViewChild('container', { static: true }) private readonly container?: ElementRef<HTMLElement>;
  @ViewChild('prevButton', { static: true }) private readonly prevButton?: ElementRef<HTMLElement>;
  @ViewChild('nextButton', { static: true }) private readonly nextButton?: ElementRef<HTMLElement>;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.container) {
      return;
    }

    const [{ default: Swiper }, modules] = await Promise.all([import('swiper'), import('swiper/modules')]);
    this.swiper = new Swiper(this.container.nativeElement, {
      modules: [modules.Navigation, modules.Pagination, modules.Keyboard, modules.A11y],
      slidesPerView: 1.08,
      spaceBetween: 20,
      keyboard: { enabled: true },
      navigation: {
        prevEl: this.prevButton?.nativeElement,
        nextEl: this.nextButton?.nativeElement
      },
      pagination: {
        el: this.container.nativeElement.querySelector('.swiper-pagination') as HTMLElement | null,
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 1.45, spaceBetween: 24 },
        1200: { slidesPerView: 2.15, spaceBetween: 28 }
      }
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }
}
