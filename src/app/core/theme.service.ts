import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _isDarkMode = signal<boolean>(this.getInitialTheme());

  readonly isDarkMode = this._isDarkMode.asReadonly();

  constructor() {
    // Apply theme on service initialization
    this.applyTheme(this._isDarkMode());
  }

  toggleDarkMode(): void {
    const newTheme = !this._isDarkMode();
    this._isDarkMode.set(newTheme);
    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
  }

  setDarkMode(isDark: boolean): void {
    this._isDarkMode.set(isDark);
    this.applyTheme(isDark);
    this.saveTheme(isDark);
  }

  private getInitialTheme(): boolean {
    // Check localStorage first
    const savedTheme = localStorage.getItem('cluster2-theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }

    // Default to light mode (false)
    return false;
  }

  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;

    if (isDark) {
      // Set data-theme attribute for CSS custom properties
      html.setAttribute('data-theme', 'dark');

      // Remove any conflicting classes
      html.classList.remove('dark-mode');
      html.removeAttribute('data-bs-theme');
    } else {
      // Remove data-theme attribute to use default light theme
      html.removeAttribute('data-theme');

      // Remove any conflicting classes
      html.classList.remove('dark-mode');
      html.removeAttribute('data-bs-theme');
    }
  }

  private saveTheme(isDark: boolean): void {
    localStorage.setItem('cluster2-theme', isDark ? 'dark' : 'light');
  }
}
