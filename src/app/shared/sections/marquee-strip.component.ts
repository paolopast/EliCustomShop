import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject, input } from '@angular/core';
import { initMarquee } from '../../core/animations/motion';

@Component({
  selector: 'app-marquee-strip',
  standalone: true,
  template: `
    <section class="border-y border-white/8 bg-white/[0.02] py-4">
      <div class="overflow-hidden">
        <div #track class="marquee-track text-xl font-semibold uppercase tracking-[0.34em] text-white/68 sm:text-2xl">
          @for (item of repeatedItems(); track $index) {
            <span class="flex items-center gap-8">
              <span>{{ item }}</span>
              <span class="h-1.5 w-1.5 bg-[var(--accent)]"></span>
            </span>
          }
        </div>
      </div>
    </section>
  `
})
export class MarqueeStripComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private cleanup?: () => void;

  readonly items = input.required<string[]>();

  @ViewChild('track', { static: true }) private readonly track?: ElementRef<HTMLElement>;

  protected repeatedItems = () => [...this.items(), ...this.items()];

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.track) {
      return;
    }

    this.cleanup = await initMarquee(this.track.nativeElement);
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }
}
