import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './core/theme.service';
import { NotificationToastComponent } from './shared/components/notification-toast/notification-toast.component';
import { Cluster2LogoComponent } from './shared/components/cluster2-logo/cluster2-logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NotificationToastComponent, Cluster2LogoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private themeService = inject(ThemeService);

  // Expose the theme service signal for template binding
  get isDark() {
    return this.themeService.isDarkMode();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
