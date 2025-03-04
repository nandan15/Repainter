import { Injectable } from "@angular/core";
import { AbstractControl,FormArray,FormControl,FormGroup,ValidationErrors, ValidatorFn } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
@Injectable({
    providedIn:'root'
})

export  class CommonHelper{
    constructor(private toastr: ToastrService) {}

    async showSuccessToast(message: string): Promise<void> {
        this.toastr.success(message);
    }

    async showErrorToast(message: string): Promise<void> {
        this.toastr.error(message);
    }
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