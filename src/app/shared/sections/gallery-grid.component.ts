import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  computed,
  inject,
  input
} from '@angular/core';
import { GalleryItem } from '../../core/models/site.models';

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div #gallery class="columns-1 gap-4 sm:columns-2 xl:columns-3">
      @for (item of displayedItems(); track item.id) {
        <a
          [href]="item.image"
          [attr.data-pswp-width]="item.width"
          [attr.data-pswp-height]="item.height"
          [attr.data-category]="item.category"
          class="editorial-card group mb-4 block break-inside-avoid overflow-hidden"
        >
          <div class="overflow-hidden">
            <img
              [ngSrc]="item.thumb"
              [width]="item.width"
              [height]="item.height"
              [alt]="item.title"
              class="aspect-auto object-cover transition duration-500 group-hover:scale-[1.03]"
            >
          </div>
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(63,46,34,0.82)] via-[rgba(63,46,34,0.42)] to-transparent p-5">
            <p class="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              {{ item.category }}
            </p>
            <h3 class="mt-2 font-[var(--font-display)] text-3xl leading-none text-[color:#fbf7f0]">{{ item.title }}</h3>
            <p class="mt-3 max-w-md text-sm leading-6 text-[rgba(251,247,240,0.78)]">{{ item.caption }}</p>
          </div>
        </a>
      }
    </div>
  `
})
export class GalleryGridComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private lightbox?: { init: () => void; destroy: () => void };

  readonly items = input.required<GalleryItem[]>();
  readonly limit = input<number | null>(null);
  readonly displayedItems = computed(() =>
    this.limit() ? this.items().slice(0, this.limit() as number) : this.items()
  );

  @ViewChild('gallery', { static: true }) private readonly gallery?: ElementRef<HTMLElement>;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.gallery) {
      return;
    }

    const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox');
    this.lightbox = new PhotoSwipeLightbox({
      gallery: this.gallery.nativeElement,
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    this.lightbox.init();
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy();
  }
}
