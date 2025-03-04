import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WebhookService {
  private webhookUrl = environment.webhookUrl;
  private verifyToken = environment.whatsappVerifyToken;

  constructor(private http: HttpClient) {}

  // Handle webhook verification
  verifyWebhook(mode: string, token: string, challenge: string): Observable<any> {
    const params = new HttpParams()
      .set('hub.mode', mode)
      .set('hub.verify_token', token)
      .set('hub.challenge', challenge);

    return this.http.get(this.webhookUrl, { params });
  }

  // Handle incoming webhook events
  handleWebhookEvent(event: any): Observable<any> {
    return this.http.post(this.webhookUrl, event);
  }
}