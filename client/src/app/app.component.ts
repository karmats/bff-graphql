import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client, ClientColumn } from './models/client.model';
import { ApolloService } from './services/apollo.service';
import { AuthService } from './services/auth.service';

const LOCAL_STORAGE_KEYS = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  expiresIn: 'expires_in',
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  clients$: Observable<Client[]> = of([]);
  columns: ClientColumn[] = [
    {
      label: '#',
      field: 'Id',
    },
    {
      label: 'Company name',
      field: 'CompanyName',
    },
    {
      label: 'Company type',
      field: 'CompanyType',
    },
    { label: 'Client number', field: 'ClientNumber' },
    { label: 'Client owner', field: 'ClientOwner' },
  ];
  selectedColumns: ClientColumn[] = this.columns.slice(0, 3);

  constructor(
    private readonly apolloService: ApolloService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');
    if (location.hash) {
      const code = location.hash.split('&')[0].replace('#code=', '');
      this.authService.loginToAAA(code).subscribe((response) => {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.accessToken,
          response.access_token
        );
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.refreshToken,
          response.refresh_token
        );
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.expiresIn,
          (new Date().getTime() + response.expires_in * 1000).toString()
        );
        location.hash = '';
        this.clients$ = this.apolloService.getClients(this.selectedColumns);
      });
    } else if (!accessToken) {
      this.authService.redirectToAAA();
    } else {
      this.clients$ = this.apolloService.getClients(this.selectedColumns);
    }
  }

  toggleColumn(column: ClientColumn) {
    if (this.selectedColumns.includes(column)) {
      this.selectedColumns = this.selectedColumns.filter((c) => c !== column);
    } else {
      this.selectedColumns.push(column);
    }
    this.clients$ = this.apolloService.getClients(this.selectedColumns);
  }
}
