import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface OAuthResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ssoConfigurationUrl =
    'https://dev-api.wolterskluwercloud.se/dev1/SSOConfiguration';
  private readonly portalName = 'WebDemoLocal';

  constructor(private readonly http: HttpClient) {}

  redirectToAAA() {
    this.http
      .get<string>(`${this.ssoConfigurationUrl}/api/portal/auth/aaa`, {
        params: {
          portalName: this.portalName,
        },
      })
      .subscribe((uri: string) => {
        location.href = uri;
      });
  }

  loginToAAA(code: string): Observable<OAuthResponse> {
    return this.http.get<OAuthResponse>(
      `${this.ssoConfigurationUrl}/api/portal/auth/login`,
      {
        params: { portalName: this.portalName, code: code },
      }
    );
  }
}
