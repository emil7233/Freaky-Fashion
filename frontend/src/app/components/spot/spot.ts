import { Component, Input } from '@angular/core';
import { Spot as SpotModel } from '../../models/spot'; //Döper om så att det inte blir namnkrock. TS vet inte vilken Spot som menas annars; kompeleringsfel

@Component({
  selector: 'app-spot',
  imports: [],
  templateUrl: './spot.html',
  styleUrl: './spot.css',
})
export class Spot {
  @Input({ required: true }) spot!: SpotModel;
}
