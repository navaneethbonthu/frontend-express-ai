export interface ValidatorConfig {
    type: 'required' | 'email' | 'min' | 'max' | 'minLength' | 'pattern';
    value?: any;
    message: string; // Custom error message
}

export interface FormFieldConfig {
    name: string;
    label: string;
    type: 'text' | 'number' | 'dropdown' | 'checkbox';
    value?: any;
    options?: { label: string; value: any }[]; // For dropdowns
    validators?: ValidatorConfig[];
    placeholder?: string;
}

// export type FieldType = 'text' | 'number' | 'dropdown';