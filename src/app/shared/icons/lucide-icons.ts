import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Factory,
  Instagram,
  LucideAngularModule,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  X,
  LUCIDE_ICONS,
  LucideIconProvider
} from 'lucide-angular';

export const LucideIconsModule = LucideAngularModule;

export const lucideIconProviders = [
  {
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({
      ArrowRight,
      ArrowUpRight,
      BadgeCheck,
      ChevronDown,
      ChevronLeft,
      ChevronRight,
      Clock3,
      Factory,
      Instagram,
      Mail,
      MapPin,
      Menu,
      Palette,
      Phone,
      Send,
      ShieldCheck,
      Sparkles,
      Star,
      Upload,
      X
    })
  }
];
