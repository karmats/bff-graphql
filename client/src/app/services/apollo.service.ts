import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  constructor(private readonly apollo: Apollo) {}

  getHello(): Observable<string> {
    return this.apollo
      .query<{ hello: { name: string } }>({
        query: gql`
          {
            hello {
              name
            }
          }
        `,
      })
      .pipe(map((result) => result.data.hello.name));
  }

  getClients(): Observable<Client[]> {
    return this.apollo
      .query<{ clients: Client[] }>({
        query: gql`
          {
            clients {
              Id
              CompanyType
              CompanyName
            }
          }
        `,
      })
      .pipe(map((result) => result.data.clients));
  }
}
