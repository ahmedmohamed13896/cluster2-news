import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cluster2-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cluster2-logo.component.html',
  styleUrls: ['./cluster2-logo.component.scss'],
})
export class Cluster2LogoComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showText: boolean = true;
}
