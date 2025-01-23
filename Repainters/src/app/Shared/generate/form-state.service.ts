import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private dirtyFormsCount = 0; // Track how many forms are dirty
  private formDirtyState = new BehaviorSubject<boolean>(false);
  formDirty$ = this.formDirtyState.asObservable();

  // Call this when a form becomes dirty or clean
  setFormDirty(isDirty: boolean) {
    if (isDirty) {
      this.dirtyFormsCount++;
    } else {
      this.dirtyFormsCount = Math.max(0, this.dirtyFormsCount - 1);
    }
    this.formDirtyState.next(this.dirtyFormsCount > 0);
  }

  // Reset all forms' dirty state
  resetAllForms() {
    this.dirtyFormsCount = 0;
    this.formDirtyState.next(false);
  }
}
