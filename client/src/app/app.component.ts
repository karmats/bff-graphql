import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloService } from './services/apollo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  result?: Observable<string>;

  constructor(private readonly apolloService: ApolloService) {}

  ngOnInit(): void {
    this.result = this.apolloService.getHello();
  }
}
