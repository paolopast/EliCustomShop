import { CdkTrapFocus } from '@angular/cdk/a11y';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_DETAILS, NAV_LINKS } from '../../core/data/site.data';
import { LucideIconsModule } from '../icons/lucide-icons';

@Component({
  selector: 'app-mobile-menu-dialog',
  standalone: true,
  imports: [RouterLink, CdkTrapFocus, LucideIconsModule],
  template: `
    <div cdkTrapFocus class="flex h-full min-h-screen flex-col bg-[var(--surface-0)] text-[var(--text-strong)]">
      <div class="flex items-center justify-between border-b border-[color:var(--line-soft)] px-5 py-5">
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">Milano // su appuntamento</p>
          <p class="font-[var(--font-display)] text-4xl leading-none">ELI ATELIER</p>
        </div>

        <button
          type="button"
          class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.72)]"
          (click)="close()"
          aria-label="Chiudi menu"
        >
          <lucide-icon name="x" class="h-5 w-5"></lucide-icon>
        </button>
      </div>

      <div class="flex flex-1 flex-col justify-between gap-10 px-5 py-8">
        <nav class="space-y-2">
          @for (link of navLinks; track link.path) {
            <a
              [routerLink]="link.path"
              class="block border-b border-[color:var(--line-soft)] py-4 font-[var(--font-display)] text-5xl leading-none tracking-[0.02em]"
              (click)="close()"
            >
              {{ link.label }}
            </a>
          }
        </nav>

        <div class="grid gap-4 border-t border-[color:var(--line-soft)] pt-6 text-sm text-[color:var(--text-muted)]">
          @for (detail of details; track detail.label) {
            <a
              [href]="detail.href ?? null"
              [attr.target]="detail.href?.startsWith('http') ? '_blank' : null"
              [attr.rel]="detail.href?.startsWith('http') ? 'noreferrer' : null"
              class="flex items-center justify-between gap-3"
            >
              <span class="uppercase tracking-[0.18em] text-[color:var(--text-soft)]">{{ detail.label }}</span>
              <span class="text-right text-[color:var(--text-strong)]">{{ detail.value }}</span>
            </a>
          }
        </div>
      </div>
    </div>
  `
})
export class MobileMenuDialogComponent {
  private readonly dialogRef = inject(DialogRef<MobileMenuDialogComponent, void>);

  protected readonly navLinks = NAV_LINKS;
  protected readonly details = CONTACT_DETAILS;

  protected close(): void {
    this.dialogRef.close();
  }
}
