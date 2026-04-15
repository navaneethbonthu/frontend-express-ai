import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'initials'
})

export class InitialsPipe implements PipeTransform {

    transform(value: string) {
        if (!value) {
            return ''
        } else {
            return value.trim().split(' ').map((word) => word[0]).join('').toUpperCase()
        }
    }
}