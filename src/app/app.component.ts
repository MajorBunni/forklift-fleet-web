import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { ForkliftListComponent } from "./forklift-list/forklift-list.component";
import { ForkliftMovementComponent } from "./forklift-movement/forklift-movement.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet,
    RouterLink, RouterLinkActive,
    ForkliftListComponent,
    ForkliftMovementComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'forklift-fleet-web'
}
