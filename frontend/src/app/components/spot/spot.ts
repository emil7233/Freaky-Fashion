import { Component, Input } from '@angular/core';
import { Spot as SpotModel } from '../../models/spot'; //Döper om så att det inte blir namnkrock. TS vet inte vilken Spot som menas annars; kompileringsfel

@Component({
  selector: 'app-spot',
  imports: [],
  templateUrl: './spot.html',
  styleUrl: './spot.css',
})
export class Spot {
  //Obligatorisk input, skickas in från home.html: <app-spot [spot]="spot" />
  @Input({ required: true }) spot!: SpotModel;
}

/*@Input({ required: true }) – dekoratorn. 
Gör att en förälderkomponent (t.ex. Home) 
kan skicka in data utifrån, och required: 
true tvingar TypeScript att varna om det glöms bort */
