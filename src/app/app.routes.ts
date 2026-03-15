import { Routes } from '@angular/router';
import { SeoRouteData } from './core/models/site.models';

const seo = (description: string): SeoRouteData => ({
  description,
  ogImage: '/og-image.svg'
});

export const routes: Routes = [
  {
    path: '',
    title: 'Eli Atelier | Scarpe custom su misura',
    data: seo(
      'Eli Atelier realizza scarpe custom e sneakers su misura con una sensibilita elegante, materie pregiate e una lavorazione artigianale dal gusto italiano.'
    ),
    loadComponent: () =>
      import('./pages/home/home-page.component').then((module) => module.HomePageComponent)
  },
  {
    path: 'collections',
    title: 'Collezioni Bespoke | Eli Atelier',
    data: seo(
      'Scopri le collezioni bespoke di Eli Atelier: sneakers raffinate, scarpe eleganti, modelli da cerimonia e soluzioni luxury casual su misura.'
    ),
    loadComponent: () =>
      import('./pages/collections/collections-page.component').then(
        (module) => module.CollectionsPageComponent
      )
  },
  {
    path: 'how-it-works',
    title: 'Come Funziona | Eli Atelier',
    data: seo(
      'Dal modello base alla consegna, il processo di Eli Atelier accompagna ogni richiesta con calma, cura dei materiali e approccio su misura.'
    ),
    loadComponent: () =>
      import('./pages/how-it-works/how-it-works-page.component').then(
        (module) => module.HowItWorksPageComponent
      )
  },
  {
    path: 'gallery',
    title: 'Gallery | Eli Atelier',
    data: seo(
      'Una gallery editoriale di texture, pellami, cuciture e finiture che raccontano la qualita artigianale di Eli Atelier.'
    ),
    loadComponent: () =>
      import('./pages/gallery/gallery-page.component').then((module) => module.GalleryPageComponent)
  },
  {
    path: 'about',
    title: 'About The Brand | Eli Atelier',
    data: seo(
      'La storia del brand, la filosofia progettuale e l attenzione per il dettaglio dietro ogni paio custom firmato Eli Atelier.'
    ),
    loadComponent: () =>
      import('./pages/about/about-page.component').then((module) => module.AboutPageComponent)
  },
  {
    path: 'faq',
    title: 'FAQ | Eli Atelier',
    data: seo(
      'Tempi, materiali, taglie, revisioni, spedizioni e manutenzione: tutte le risposte sul servizio custom di Eli Atelier.'
    ),
    loadComponent: () =>
      import('./pages/faq/faq-page.component').then((module) => module.FaqPageComponent)
  },
  {
    path: 'contact',
    title: 'Richiedi Il Tuo Paio | Eli Atelier',
    data: seo(
      'Compila il form di richiesta su misura di Eli Atelier per ricevere una proposta dedicata, calibrata su stile, materiali e occasione d uso.'
    ),
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then((module) => module.ContactPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
