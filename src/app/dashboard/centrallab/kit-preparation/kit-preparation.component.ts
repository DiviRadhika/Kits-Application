import { Component } from '@angular/core';

@Component({
  selector: 'app-kit-preparation',
  templateUrl: './kit-preparation.component.html',
  styleUrls: ['./kit-preparation.component.css']
})
export class KitPreparationComponent {
  selectedOption!: string;
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  public KitType: any = ''

}
