import { Injectable, signal } from '@angular/core';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = this._notifications.asReadonly();

  showSuccess(message: string, title?: string, duration: number = 5000) {
    this.addNotification({
      id: this.generateId(),
      type: 'success',
      message,
      title,
      duration
    });
  }

  showError(message: string, title?: string, duration: number = 7000) {
    this.addNotification({
      id: this.generateId(),
      type: 'error',
      message,
      title,
      duration
    });
  }

  showInfo(message: string, title?: string, duration: number = 4000) {
    this.addNotification({
      id: this.generateId(),
      type: 'info',
      message,
      title,
      duration
    });
  }

  showWarning(message: string, title?: string, duration: number = 6000) {
    this.addNotification({
      id: this.generateId(),
      type: 'warning',
      message,
      title,
      duration
    });
  }

  removeNotification(id: string) {
    const currentNotifications = this._notifications();
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this._notifications.set(filteredNotifications);
  }

  private addNotification(notification: Notification) {
    const currentNotifications = this._notifications();
    const newNotifications = [...currentNotifications, notification];
    this._notifications.set(newNotifications);

    // Auto-remove notification after duration
    if (notification.duration) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, notification.duration);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
} 