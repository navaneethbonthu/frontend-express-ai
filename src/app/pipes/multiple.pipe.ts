import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'Multiply',
})

export class MultiplePipe implements PipeTransform {
    transform(value: number, mutiplier: number) {
        return value * mutiplier;
    }
}