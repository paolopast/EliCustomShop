import { isPlatformBrowser } from '@angular/common';
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
import { Testimonial } from '../../core/models/site.models';
import { LucideIconsModule } from '../icons/lucide-icons';

@Component({
  selector: 'app-testimonial-slider',
  standalone: true,
  imports: [LucideIconsModule],
  template: `
    <div #container class="swiper overflow-hidden">
      <div class="swiper-wrapper">
        @for (item of items(); track item.name) {
          <article class="swiper-slide editorial-card h-full p-6 sm:p-8">
            <div class="mb-6 flex items-center gap-2 text-[var(--accent)]">
              @for (_ of stars; track $index) {
                <lucide-icon name="star" class="h-4 w-4" [class.opacity-30]="$index >= item.rating"></lucide-icon>
              }
            </div>

            <p class="text-xl leading-8 text-[color:var(--text-strong)] sm:text-2xl sm:leading-9">
              “{{ item.quote }}”
            </p>

            <div class="mt-8 border-t border-[color:var(--line-soft)] pt-4 text-sm uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              <p class="font-semibold text-[color:var(--text-strong)]">{{ item.name }}</p>
              <p class="mt-2">{{ item.role }} // {{ item.city }}</p>
              <p class="mt-1 text-[var(--accent)]">{{ item.pair }}</p>
            </div>
          </article>
        }
      </div>

      <div class="swiper-pagination !static mt-6"></div>
    </div>
  `
})
export class TestimonialSliderComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private swiper?: { destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void };

  readonly items = input.required<Testimonial[]>();
  protected readonly stars = Array.from({ length: 5 });

  @ViewChild('container', { static: true }) private readonly container?: ElementRef<HTMLElement>;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.container) {
      return;
    }

    const [{ default: Swiper }, modules] = await Promise.all([import('swiper'), import('swiper/modules')]);
    this.swiper = new Swiper(this.container.nativeElement, {
      modules: [modules.Pagination, modules.Autoplay, modules.Keyboard, modules.A11y],
      slidesPerView: 1.05,
      spaceBetween: 20,
      autoplay: { delay: 4500, disableOnInteraction: false },
      keyboard: { enabled: true },
      pagination: {
        el: this.container.nativeElement.querySelector('.swiper-pagination') as HTMLElement | null,
        clickable: true
      },
      breakpoints: {
        900: { slidesPerView: 1.6, spaceBetween: 24 },
        1280: { slidesPerView: 2.2, spaceBetween: 28 }
      }
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }
}
