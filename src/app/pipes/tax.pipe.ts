import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'caluculateTax',
    pure: true,
})

export class CaluculateTax implements PipeTransform {
    transform(price: any, ...args: any[]) {

        // if (type === 'electronics') return price * 0.15;
        // if (type === 'clothing') return price * 0.05;
        return price * 0.10;
    }
}