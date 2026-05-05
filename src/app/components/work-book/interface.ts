

export interface FieldConfig {
    name: string,
    label: string,
    type: 'text' | 'number' | 'dropdown'
    validators?: ValidatorConfig[],
    value?: any,
    options?: { label: string, value: any }[]
}

export interface ValidatorConfig {
    type: 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern',
    message: string,
    value?: any
}