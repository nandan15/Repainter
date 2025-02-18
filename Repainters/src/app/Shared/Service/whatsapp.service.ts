import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  private apiUrl = 'https://graph.facebook.com/v17.0/510715495463523/messages';// Add this to your environment
  private accessToken = environment.whatsappToken;

  constructor(private http: HttpClient) {}

  sendMessage(phoneNumber: string, message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });

    const body = {
      messaging_product: 'whatsapp',
      to: `91${phoneNumber}`, // Adding country code for India
      type: 'template',
      template: {
        name: 'quote_notification', // Create this template in WhatsApp Business Manager
        language: {
          code: 'en'
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: message
              }
            ]
          }
        ]
      }
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  // Method to verify webhook
  verifyWebhook(mode: string, token: string, challenge: string): boolean {
    const verifyToken = environment.whatsappVerifyToken; // Add this to your environment
    
    if (mode && token) {
      if (mode === 'subscribe' && token === verifyToken) {
        return true;
      }
    }
    return false;
  }
}
