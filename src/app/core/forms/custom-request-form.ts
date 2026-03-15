import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { UploadedReference } from '../models/site.models';

const phonePattern = /^[+\d\s().-]{8,20}$/;

const futureDateValidator = (
  control: AbstractControl<string | null>
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selected < today ? { pastDate: true } : null;
};

export type CustomRequestForm = FormGroup<{
  fullName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  shoeType: FormControl<string>;
  size: FormControl<string>;
  preferredColors: FormControl<string>;
  materialPreferences: FormControl<string>;
  styleReferences: FormControl<string>;
  budgetRange: FormControl<string>;
  deadline: FormControl<string>;
  urgency: FormControl<string>;
  extraNotes: FormControl<string>;
  files: FormControl<UploadedReference[]>;
  consent: FormControl<boolean>;
}>;

export const buildCustomRequestForm = (
  formBuilder: NonNullableFormBuilder
): CustomRequestForm =>
  formBuilder.group({
    fullName: formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80)
    ]),
    email: formBuilder.control('', [Validators.required, Validators.email]),
    phone: formBuilder.control('', [Validators.required, Validators.pattern(phonePattern)]),
    shoeType: formBuilder.control('', [Validators.required]),
    size: formBuilder.control('', [Validators.required]),
    preferredColors: formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(120)
    ]),
    materialPreferences: formBuilder.control('', [Validators.maxLength(160)]),
    styleReferences: formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(400)
    ]),
    budgetRange: formBuilder.control('', [Validators.required]),
    deadline: formBuilder.control('', [futureDateValidator]),
    urgency: formBuilder.control('standard', [Validators.required]),
    extraNotes: formBuilder.control('', [Validators.maxLength(600)]),
    files: formBuilder.control<UploadedReference[]>([]),
    consent: formBuilder.control(false, [Validators.requiredTrue])
  });

export const extractUploadedReferences = (fileList: FileList | null): UploadedReference[] =>
  fileList ? Array.from(fileList).map(({ name, size, type }) => ({ name, size, type })) : [];
