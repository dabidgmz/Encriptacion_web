import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexUsersComponent } from './index-user/index-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IndexUsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Encriptacion_web';
}
