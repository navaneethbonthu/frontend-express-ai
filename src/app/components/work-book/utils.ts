import { ValidatorFn, Validators } from "@angular/forms";
import { FieldConfig, ValidatorConfig } from "./interface";



export class DynamicPathValidators {


    static getValidator(config: ValidatorConfig): ValidatorFn | null {

        switch (config.type) {
            case 'required': return Validators.required;
            case 'min': return Validators.min(config.value);
            case 'max': return Validators.max(config.value);
            case 'minLength': return Validators.minLength(config.value);
            case 'maxLength': return Validators.minLength(config.value);
            case 'pattern': return Validators.pattern(config.value);

            default: return null;
        }


    }

}