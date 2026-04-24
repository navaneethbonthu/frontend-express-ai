import { Directive, inject, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { HomeService } from "../components/home/home.service";



interface contextRepeat {
    $implict: number,
    index: number
}

@Directive({
    selector: '[appRepeat]'
})

export class RepeatDirective {




}