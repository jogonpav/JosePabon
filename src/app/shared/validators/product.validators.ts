import { AbstractControl, ValidationErrors } from '@angular/forms'

export function ReleaseDateValidator(control: AbstractControl): ValidationErrors | null {
    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);
    const dateForm = new Date(control.value + "T00:00:00");
    if (dateForm < dateNow) {
        return { 'releaseDateInvalid': true };
    }
    return null;
}