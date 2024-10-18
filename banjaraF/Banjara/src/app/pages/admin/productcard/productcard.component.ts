import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../models/Products';

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductcardComponent {


  @Input({ required: false })
  product!: Product;


  renderCheck(id: number): void{
    console.log("render");
  }


}
