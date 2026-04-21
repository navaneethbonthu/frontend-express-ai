import { Pipe, PipeTransform } from "@angular/core";
import { arrRemove } from "rxjs/internal/util/arrRemove";



@Pipe({
    name: 'Multiple',
})

export class MultiplePipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        return (value * args[0]) + args[1]
    }

}