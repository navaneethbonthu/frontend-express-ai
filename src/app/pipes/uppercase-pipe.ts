import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'CustomUpperCasePipe',
})

export class CustomUpperCasePipe implements PipeTransform {

    transform(value: string | null | undefined, ...args: any[]): string {
        if (!value) {
            return '';
        }

        const prefix = args[0] || ''; // First argument
        const suffix = args[1] || ''; // Second argument

        return `${prefix} ${value.toUpperCase()} ${suffix}`.trim();
    }

}