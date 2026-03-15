import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  BUDGET_OPTIONS,
  CONTACT_DETAILS,
  SHOE_TYPE_OPTIONS,
  SIZE_OPTIONS,
  URGENCY_OPTIONS
} from '../../core/data/site.data';
import {
  buildCustomRequestForm,
  CustomRequestForm,
  extractUploadedReferences
} from '../../core/forms/custom-request-form';
import { UploadedReference } from '../../core/models/site.models';
import { LucideIconsModule } from '../icons/lucide-icons';

type SubmitState = 'idle' | 'invalid' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextFieldModule, LucideIconsModule],
  template: `
    <div class="grid gap-8 xl:grid-cols-[0.82fr,1.18fr]">
      <aside class="space-y-6">
        <div class="editorial-card p-6">
          <p class="eyebrow">Request brief</p>
          <h3 class="display-title-compact">Parlaci del paio che vuoi costruire.</h3>
          <p class="body-small mt-4">
            Più il brief è preciso, più il concept parte forte. Indica mood, colori, budget e data chiave.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div class="editorial-card p-5">
            <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Cosa ricevi
            </p>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-white/72">
              <li>Brief review e direzione creativa iniziale</li>
              <li>Proposta materiali, palette e dettagli</li>
              <li>Timeline chiara prima della produzione</li>
            </ul>
          </div>

          <div class="editorial-card p-5">
            <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Contatti studio
            </p>
            <div class="mt-4 grid gap-3 text-sm text-white/72">
              @for (detail of details; track detail.label) {
                <a
                  [href]="detail.href ?? null"
                  [attr.target]="detail.href?.startsWith('http') ? '_blank' : null"
                  [attr.rel]="detail.href?.startsWith('http') ? 'noreferrer' : null"
                  class="flex items-center justify-between gap-3 border-b border-white/8 pb-3 last:border-b-0 last:pb-0"
                >
                  <span class="uppercase tracking-[0.22em] text-white/46">{{ detail.label }}</span>
                  <span class="text-right text-white">{{ detail.value }}</span>
                </a>
              }
            </div>
          </div>
        </div>
      </aside>

      <form [formGroup]="form" class="editorial-card p-6 sm:p-8" (ngSubmit)="submit()">
        <div class="grid gap-5 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="form-label" for="fullName">Full name</label>
            <input id="fullName" class="form-field" type="text" formControlName="fullName" placeholder="Nome e cognome">
            @if (errorFor('fullName')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('fullName') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="email">Email</label>
            <input id="email" class="form-field" type="email" formControlName="email" placeholder="nome@email.com">
            @if (errorFor('email')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('email') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="phone">Phone</label>
            <input id="phone" class="form-field" type="tel" formControlName="phone" placeholder="+39 3xx xxx xxxx">
            @if (errorFor('phone')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('phone') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="shoeType">Shoe type</label>
            <select id="shoeType" class="form-field" formControlName="shoeType">
              <option value="">Seleziona</option>
              @for (option of shoeTypes; track option.value) {
                <option [value]="option.value">{{ option.label }}</option>
              }
            </select>
            @if (errorFor('shoeType')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('shoeType') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="size">Size</label>
            <select id="size" class="form-field" formControlName="size">
              <option value="">Seleziona</option>
              @for (option of sizes; track option.value) {
                <option [value]="option.value">{{ option.label }}</option>
              }
            </select>
            @if (errorFor('size')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('size') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="preferredColors">Preferred colors</label>
            <input
              id="preferredColors"
              class="form-field"
              type="text"
              formControlName="preferredColors"
              placeholder="nero, gesso, arancio safety"
            >
            @if (errorFor('preferredColors')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('preferredColors') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="budgetRange">Budget range</label>
            <select id="budgetRange" class="form-field" formControlName="budgetRange">
              <option value="">Seleziona</option>
              @for (option of budgets; track option.value) {
                <option [value]="option.value">{{ option.label }}</option>
              }
            </select>
            @if (errorFor('budgetRange')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('budgetRange') }}</p>
            }
          </div>

          <div class="sm:col-span-2">
            <label class="form-label" for="styleReferences">Style references</label>
            <textarea
              id="styleReferences"
              class="form-field min-h-28"
              formControlName="styleReferences"
              cdkTextareaAutosize
              cdkAutosizeMinRows="4"
              cdkAutosizeMaxRows="8"
              placeholder="Mood, riferimenti Instagram/Pinterest, outfit, artista, capsule, evento..."
            ></textarea>
            @if (errorFor('styleReferences')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('styleReferences') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="deadline">Deadline</label>
            <input id="deadline" class="form-field" type="date" formControlName="deadline">
            @if (errorFor('deadline')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('deadline') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="urgency">Urgency</label>
            <select id="urgency" class="form-field" formControlName="urgency">
              @for (option of urgencies; track option.value) {
                <option [value]="option.value">{{ option.label }}</option>
              }
            </select>
          </div>

          <div class="sm:col-span-2">
            <label class="form-label" for="extraNotes">Extra notes</label>
            <textarea
              id="extraNotes"
              class="form-field min-h-28"
              formControlName="extraNotes"
              cdkTextareaAutosize
              cdkAutosizeMinRows="4"
              cdkAutosizeMaxRows="8"
              placeholder="Eventuali iniziali, data speciale, materiali da evitare, info aggiuntive."
            ></textarea>
            @if (errorFor('extraNotes')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('extraNotes') }}</p>
            }
          </div>

          <div class="sm:col-span-2">
            <label class="form-label">File upload placeholder area</label>
            <label class="block cursor-pointer border border-dashed border-white/16 bg-white/[0.02] p-5 transition hover:border-[var(--accent)]">
              <input type="file" class="hidden" multiple accept=".jpg,.jpeg,.png,.pdf" (change)="onFilesSelected($event)">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.22em] text-white">
                    Carica reference, screenshot o moodboard
                  </p>
                  <p class="mt-2 text-sm text-white/56">
                    JPG, PNG o PDF. Utile per accelerare il concept.
                  </p>
                </div>
                <span class="inline-flex items-center gap-2 border border-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                  <lucide-icon name="upload" class="h-4 w-4"></lucide-icon>
                  Seleziona file
                </span>
              </div>
            </label>

            @if (files().length) {
              <div class="mt-4 grid gap-2">
                @for (file of files(); track file.name) {
                  <div class="flex items-center justify-between gap-3 border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-white/74">
                    <span>{{ file.name }}</span>
                    <span>{{ readableSize(file) }}</span>
                  </div>
                }
              </div>
            }
          </div>

          <div class="sm:col-span-2">
            <label class="flex items-start gap-3 border border-white/10 bg-white/[0.02] p-4 text-sm text-white/70">
              <input type="checkbox" class="mt-1 h-4 w-4 accent-[var(--accent)]" formControlName="consent">
              <span>
                Accetto il trattamento dei dati per essere ricontattato in merito alla mia richiesta custom.
              </span>
            </label>
            @if (errorFor('consent')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('consent') }}</p>
            }
          </div>
        </div>

        @if (submitState() === 'invalid' || submitState() === 'error') {
          <div class="mt-6 border border-[rgba(var(--accent-rgb),0.35)] bg-[rgba(var(--accent-rgb),0.08)] p-4 text-sm text-white/86">
            Controlla i campi evidenziati e assicurati che il brief sia completo prima di inviare.
          </div>
        }

        @if (submitState() === 'success') {
          <div class="mt-6 border border-emerald-500/35 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            Richiesta inviata. Riceverai un primo riscontro con fattibilita e next step entro 24/48 ore lavorative.
          </div>
        }

        <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p class="text-xs font-semibold uppercase tracking-[0.26em] text-white/44">
            Form completo, risposta piu precisa.
          </p>

          <button type="submit" class="tactile-button min-w-56" [disabled]="isSubmitting()">
            @if (isSubmitting()) {
              Invio in corso...
            } @else {
              Invia richiesta
            }
            <lucide-icon name="send" class="h-4 w-4"></lucide-icon>
          </button>
        </div>
      </form>
    </div>
  `
})
export class ContactFormComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly announcer = inject(LiveAnnouncer);

  protected readonly details = CONTACT_DETAILS;
  protected readonly shoeTypes = SHOE_TYPE_OPTIONS;
  protected readonly sizes = SIZE_OPTIONS;
  protected readonly budgets = BUDGET_OPTIONS;
  protected readonly urgencies = URGENCY_OPTIONS;
  protected readonly form: CustomRequestForm = buildCustomRequestForm(this.formBuilder);
  protected readonly submitState = signal<SubmitState>('idle');
  protected readonly files = signal<UploadedReference[]>([]);
  protected readonly isSubmitting = computed(() => this.submitState() === 'submitting');

  protected onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = extractUploadedReferences(input.files);
    this.files.set(files);
    this.form.controls.files.setValue(files);
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitState.set('invalid');
      await this.announcer.announce('Controlla i campi obbligatori del form.');
      return;
    }

    this.submitState.set('submitting');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      this.form.reset({
        fullName: '',
        email: '',
        phone: '',
        shoeType: '',
        size: '',
        preferredColors: '',
        styleReferences: '',
        budgetRange: '',
        deadline: '',
        urgency: 'standard',
        extraNotes: '',
        files: [],
        consent: false
      });
      this.files.set([]);
      this.submitState.set('success');
      await this.announcer.announce('Richiesta inviata con successo.');
    } catch {
      this.submitState.set('error');
    }
  }

  protected errorFor(controlName: keyof CustomRequestForm['controls']): string | null {
    const control = this.form.controls[controlName];
    if (!control || !(control.touched || control.dirty) || !control.errors) {
      return null;
    }

    if (control.errors['required'] || control.errors['requiredTrue']) {
      return 'Campo obbligatorio';
    }

    if (control.errors['email']) {
      return 'Inserisci una email valida';
    }

    if (control.errors['pattern']) {
      return 'Formato non valido';
    }

    if (control.errors['minlength']) {
      return `Inserisci almeno ${control.errors['minlength'].requiredLength} caratteri`;
    }

    if (control.errors['maxlength']) {
      return `Superato il limite di ${control.errors['maxlength'].requiredLength} caratteri`;
    }

    if (control.errors['pastDate']) {
      return 'La data deve essere futura';
    }

    return 'Controlla questo campo';
  }

  protected readableSize(file: UploadedReference): string {
    return file.size > 1024 * 1024
      ? `${(file.size / 1024 / 1024).toFixed(1)} MB`
      : `${Math.max(1, Math.round(file.size / 1024))} KB`;
  }
}
