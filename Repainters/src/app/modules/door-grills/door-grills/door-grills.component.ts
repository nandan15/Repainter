import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-door-grills',
  templateUrl: './door-grills.component.html',
  styleUrls: ['./door-grills.component.css']
})
export class DoorGrillsComponent implements OnInit {
  ngOnInit(): void {
    document.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('form-input') && 
          !target.classList.contains('window-length') && 
          !target.classList.contains('window-height') &&
          !target.classList.contains('balcony-length') && 
          !target.classList.contains('balcony-height')) {
        this.updatePrice(e);
      }
    });

    document.addEventListener('change', (e: Event) => {
      if ((e.target as HTMLInputElement).type === 'radio') {
        this.updatePrice(e);
      }
    });
  }

  addMainDoor(): void {
    const section = document.getElementById('mainDoorSection');
    const clone = section?.firstElementChild?.cloneNode(true) as HTMLElement;
    if (clone) {
      const inputs = clone.querySelectorAll('input');
      inputs.forEach(input => {
        input.value = '';
        if (input.type === 'radio') {
          input.checked = false;
        }
      });
      section?.appendChild(clone);
    }
  }

  addInternalDoor(): void {
    const section = document.getElementById('internalDoorSection');
    const clone = section?.firstElementChild?.cloneNode(true) as HTMLElement;
    if (clone) {
      const inputs = clone.querySelectorAll('input');
      inputs.forEach(input => {
        input.value = '';
        if (input.type === 'radio') {
          input.checked = false;
        }
      });
      section?.appendChild(clone);
    }
  }

  addWindow(): void {
    const section = document.getElementById('windowGrillSection');
    const clone = section?.firstElementChild?.cloneNode(true) as HTMLElement;
    if (clone) {
      const inputs = clone.querySelectorAll('input');
      inputs.forEach(input => input.value = '');
      section?.appendChild(clone);
      
      // Add event listeners to new inputs
      const lengthInput = clone.querySelector('.window-length');
      const heightInput = clone.querySelector('.window-height');
      if (lengthInput) {
        lengthInput.addEventListener('input', (e) => this.calculateWindowGrill(e));
      }
      if (heightInput) {
        heightInput.addEventListener('input', (e) => this.calculateWindowGrill(e));
      }
    }
  }

  addBalcony(): void {
    const section = document.getElementById('balconyGrillSection');
    const clone = section?.firstElementChild?.cloneNode(true) as HTMLElement;
    if (clone) {
      const inputs = clone.querySelectorAll('input');
      inputs.forEach(input => input.value = '');
      section?.appendChild(clone);
      
      // Add event listeners to new inputs
      const lengthInput = clone.querySelector('.balcony-length');
      const heightInput = clone.querySelector('.balcony-height');
      if (lengthInput) {
        lengthInput.addEventListener('input', (e) => this.calculateBalconyGrill(e));
      }
      if (heightInput) {
        heightInput.addEventListener('input', (e) => this.calculateBalconyGrill(e));
      }
    }
  }

  removeSection(event: Event): void {
    const button = event.target as HTMLElement;
    const container = button.closest('.field-container');
    if (container) {
      container.remove();
      this.calculateTotal();
    }
  }

  updatePrice(event: Event): void {
    const input = event.target as HTMLElement;
    const container = input.closest('.field-container');

    if (container) {
      const lengthInput = container.querySelector('input[placeholder="Length"]') as HTMLInputElement;
      const heightInput = container.querySelector('input[placeholder="Height"]') as HTMLInputElement;
      const doorsInput = container.querySelector('input[placeholder="Number of Doors"]') as HTMLInputElement;
      const surfaceInput = container.querySelector('input[type="radio"]:checked') as HTMLInputElement;
      const priceInput = container.querySelector('.price-input') as HTMLInputElement;

      const length = parseFloat(lengthInput?.value) || 0;
      const height = parseFloat(heightInput?.value) || 0;
      const doors = parseFloat(doorsInput?.value) || 0;
      const surface = surfaceInput ? parseFloat(surfaceInput.value) : 1;

      const totalPrice = length * height * doors * surface * 24;

      if (!isNaN(totalPrice)) {
        priceInput.value = totalPrice.toFixed(2);
      }
      this.calculateTotal();
    }
  }

  calculateWindowGrill(event: Event): void {
    const input = event.target as HTMLElement;
    const container = input.closest('.field-container');
    
    if (container) {
      const lengthInput = container.querySelector('.window-length') as HTMLInputElement;
      const heightInput = container.querySelector('.window-height') as HTMLInputElement;
      const priceInput = container.querySelector('.price-input') as HTMLInputElement;

      if (lengthInput && heightInput && priceInput) {
        const length = parseFloat(lengthInput.value) || 0;
        const height = parseFloat(heightInput.value) || 0;
        const price = length * height;
        priceInput.value = price.toString();
        this.calculateTotal();
      }
    }
  }

  calculateBalconyGrill(event: Event): void {
    const input = event.target as HTMLElement;
    const container = input.closest('.field-container');
    
    if (container) {
      const lengthInput = container.querySelector('.balcony-length') as HTMLInputElement;
      const heightInput = container.querySelector('.balcony-height') as HTMLInputElement;
      const priceInput = container.querySelector('.price-input') as HTMLInputElement;

      if (lengthInput && heightInput && priceInput) {
        const length = parseFloat(lengthInput.value) || 0;
        const height = parseFloat(heightInput.value) || 0;
        const price = length * height;
        priceInput.value = price.toString();
        this.calculateTotal();
      }
    }
  }

  calculateTotal(): void {
    const priceInputs = document.querySelectorAll('.price-input') as NodeListOf<HTMLInputElement>;
    let total = 0;
    priceInputs.forEach(input => {
      total += parseFloat(input.value) || 0;
    });
    const totalInput = document.getElementById('sectionTotal') as HTMLInputElement;
    if (totalInput) {
      totalInput.value = total.toFixed(2);
    }
  }
}