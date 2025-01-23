import { Injectable } from "@angular/core";
import { AbstractControl,FormArray,FormControl,FormGroup,ValidationErrors, ValidatorFn } from "@angular/forms";
@Injectable({
    providedIn:'root'
})

export  class CommonHelper{
    validateAllFormFields(formGroup:FormGroup){
        console.log("Validating form fields");
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
    }
});
    }
    public CalculateAge(birthdate: Date): number {
        if (birthdate) {
            var timeDiff = Math.abs(Date.now() - birthdate.getTime());
            return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
        }
        return 0;
    }

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (!control.value) {
                return null;
            }
            const valid = regex.test(control.value);
            return valid ? null : error;
        };
    }
}