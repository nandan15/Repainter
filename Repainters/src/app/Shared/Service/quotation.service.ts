// quotation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private sectionsSource = new BehaviorSubject<any[]>([]);
  currentSections = this.sectionsSource.asObservable();
    updateSection(sectionData: any) {
    const currentSections = this.sectionsSource.getValue();
    const existingSectionIndex = currentSections.findIndex(
      (section) => section.sectionId === sectionData.sectionId
    );
    if (existingSectionIndex !== -1) {
      currentSections[existingSectionIndex] = sectionData;
    } else {
      currentSections.push(sectionData);
    }

    this.sectionsSource.next(currentSections);
  }
  removeSection(sectionId: string) {
    const currentSections = this.sectionsSource.getValue();
    const updatedSections = currentSections.filter(
      (section) => section.sectionId !== sectionId
    );
    this.sectionsSource.next(updatedSections);
  }
}