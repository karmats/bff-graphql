import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './models/client.model';
import { ApolloService } from './services/apollo.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  clients$: Observable<Client[]> = of([]);

  constructor(
    private readonly apolloService: ApolloService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');
    if (location.hash) {
      const code = location.hash.split('&')[0].replace('#code=', '');
      this.authService.loginToAAA(code).subscribe((response) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem(
          'expires_in',
          (new Date().getTime() + response.expires_in * 1000).toString()
        );
        location.hash = '';
        this.clients$ = this.apolloService.getClients();
      });
    } else if (!accessToken) {
      this.authService.redirectToAAA();
    } else {
      this.clients$ = this.apolloService.getClients();
    }
  }
}
