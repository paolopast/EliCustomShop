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
          <h3 class="display-title-compact">Parlaci del paio che desideri realizzare.</h3>
          <p class="body-small mt-4">
            Un brief preciso ci permette di proporti una direzione coerente con occasione d uso, materiali, toni e livello di personalizzazione.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div class="editorial-card p-5">
            <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Cosa ricevi
            </p>
            <ul class="mt-4 space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
              <li>Una lettura iniziale del brief e della fattibilita</li>
              <li>Indicazioni su materiali, palette e dettagli consigliati</li>
              <li>Una timeline chiara prima della messa in lavorazione</li>
            </ul>
          </div>

          <div class="editorial-card p-5">
            <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Contatti atelier
            </p>
            <div class="mt-4 grid gap-3 text-sm text-[color:var(--text-muted)]">
              @for (detail of details; track detail.label) {
                <a
                  [href]="detail.href ?? null"
                  [attr.target]="detail.href?.startsWith('http') ? '_blank' : null"
                  [attr.rel]="detail.href?.startsWith('http') ? 'noreferrer' : null"
                  class="flex items-center justify-between gap-3 border-b border-[color:var(--line-soft)] pb-3 last:border-b-0 last:pb-0"
                >
                  <span class="uppercase tracking-[0.18em] text-[color:var(--text-soft)]">{{ detail.label }}</span>
                  <span class="text-right text-[color:var(--text-strong)]">{{ detail.value }}</span>
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
              placeholder="sand, warm ivory, taupe, mocha"
            >
            @if (errorFor('preferredColors')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('preferredColors') }}</p>
            }
          </div>

          <div>
            <label class="form-label" for="materialPreferences">Material preferences</label>
            <input
              id="materialPreferences"
              class="form-field"
              type="text"
              formControlName="materialPreferences"
              placeholder="pelle liscia, suede, finitura satinata"
            >
            @if (errorFor('materialPreferences')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('materialPreferences') }}</p>
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
              placeholder="Look, mood, brand reference, occasione d uso, abito o ispirazioni visive."
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
              placeholder="Iniziali, data, esigenze di comfort, dettagli da evitare o note aggiuntive."
            ></textarea>
            @if (errorFor('extraNotes')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('extraNotes') }}</p>
            }
          </div>

          <div class="sm:col-span-2">
            <label class="form-label">File upload placeholder area</label>
            <label class="block cursor-pointer rounded-[1.2rem] border border-dashed border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.7)] p-5 transition hover:border-[rgba(var(--accent-rgb),0.45)]">
              <input type="file" class="hidden" multiple accept=".jpg,.jpeg,.png,.pdf" (change)="onFilesSelected($event)">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-strong)]">
                    Carica reference, immagini o moodboard
                  </p>
                  <p class="mt-2 text-sm text-[color:var(--text-soft)]">
                    JPG, PNG o PDF. Anche pochi riferimenti aiutano a definire la proposta con piu precisione.
                  </p>
                </div>
                <span class="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-soft)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-strong)]">
                  <lucide-icon name="upload" class="h-4 w-4"></lucide-icon>
                  Seleziona file
                </span>
              </div>
            </label>

            @if (files().length) {
              <div class="mt-4 grid gap-2">
                @for (file of files(); track file.name) {
                  <div class="flex items-center justify-between gap-3 rounded-[1rem] border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.84)] px-4 py-3 text-sm text-[color:var(--text-muted)]">
                    <span>{{ file.name }}</span>
                    <span>{{ readableSize(file) }}</span>
                  </div>
                }
              </div>
            }
          </div>

          <div class="sm:col-span-2">
            <label class="flex items-start gap-3 rounded-[1.2rem] border border-[color:var(--line-soft)] bg-[rgba(255,251,245,0.78)] p-4 text-sm text-[color:var(--text-muted)]">
              <input type="checkbox" class="mt-1 h-4 w-4 accent-[var(--accent)]" formControlName="consent">
              <span>
                Acconsento a essere ricontattato in merito alla mia richiesta su misura.
              </span>
            </label>
            @if (errorFor('consent')) {
              <p class="mt-2 text-sm text-[var(--accent)]">{{ errorFor('consent') }}</p>
            }
          </div>
        </div>

        @if (submitState() === 'invalid' || submitState() === 'error') {
          <div class="mt-6 rounded-[1rem] border border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.08)] p-4 text-sm text-[color:var(--text-strong)]">
            Ti invitiamo a controllare i campi evidenziati e a completare il brief prima dell invio.
          </div>
        }

        @if (submitState() === 'success') {
          <div class="mt-6 rounded-[1rem] border border-emerald-700/20 bg-emerald-50 p-4 text-sm text-emerald-900">
            Richiesta inviata. Ti ricontatteremo con un primo riscontro su fattibilita, tempi e direzione progettuale entro 24/48 ore lavorative.
          </div>
        }

        <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
            Un brief dettagliato ci permette una proposta piu accurata.
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
        materialPreferences: '',
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
