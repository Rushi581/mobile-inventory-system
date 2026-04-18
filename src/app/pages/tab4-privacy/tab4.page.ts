import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonText } from '@ionic/angular/standalone';
import { shieldCheckmarkOutline, lockClosedOutline, checkmarkDoneOutline, keyOutline, warningOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HelpWidgetComponent } from '../../components/help-widget/help-widget';

/*
 * Tab 4 - Privacy & Security Page
 * Displays privacy and security information about the app
 * Student ID: 25108934
 */

interface SecurityInfo {
  title: string;
  icon: string;
  color: string;
  description: string;
  borderColor: string;
}

@Component({
  selector: 'app-tab4',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonText,
    HelpWidgetComponent
  ],
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  securityInfos: SecurityInfo[] = [
    {
      title: 'Data Privacy',
      icon: 'shield-checkmark-outline',
      color: '#5b5fc7',
      borderColor: '#7b7fdb',
      description: 'Your inventory data is stored securely on our servers with encryption. We never share your data with third parties. You have full control over your data and can request deletion at any time.'
    },
    {
      title: 'HTTPS Encryption',
      icon: 'lock-closed-outline',
      color: '#22c55e',
      borderColor: '#4ade80',
      description: 'All communication between your device and our servers is encrypted using HTTPS (SSL/TLS). This prevents unauthorized access to your data while in transit over the internet.'
    },
    {
      title: 'Input Validation',
      icon: 'checkmark-done-outline',
      color: '#0ea5e9',
      borderColor: '#38bdf8',
      description: 'All user inputs are validated both on the client-side and server-side to prevent SQL injection, XSS attacks, and other security vulnerabilities. Only valid data is accepted into the system.'
    },
    {
      title: 'Access Control',
      icon: 'key-outline',
      color: '#f59e0b',
      borderColor: '#fbbf24',
      description: 'The system implements role-based access control. Only authorized users can view, edit, or delete inventory items. Sensitive operations require proper authentication and authorization.'
    },
    {
      title: 'Security Best Practices',
      icon: 'warning-outline',
      color: '#ef4444',
      borderColor: '#f87171',
      description: 'We follow OWASP security standards and regularly update our systems with security patches. Protected items like "Laptop" cannot be deleted to maintain data integrity. All operations are logged for audit purposes.'
    }
  ];

  constructor() {
    addIcons({ shieldCheckmarkOutline, lockClosedOutline, checkmarkDoneOutline, keyOutline, warningOutline });
  }
}
