import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoPayload {
  title?: string;
  description: string;
  ogImage?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  update(payload: SeoPayload): void {
    const pageTitle = payload.title ?? 'ELI Custom Studio';
    const ogImage = payload.ogImage ?? '/og-image.svg';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: payload.description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: payload.description });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ property: 'twitter:description', content: payload.description });
    this.meta.updateTag({ property: 'twitter:image', content: ogImage });
    this.meta.updateTag({ property: 'twitter:card', content: 'summary_large_image' });

    this.document.documentElement.style.setProperty('--seo-updated', '1');
  }
}
