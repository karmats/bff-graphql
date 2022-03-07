import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Client, ClientColumn } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  constructor(private readonly apollo: Apollo) {}

  getHello(): Observable<string> {
    return this.apollo
      .watchQuery<{ hello: { name: string } }>({
        query: gql`
          {
            hello {
              name
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.hello.name));
  }

  getClients(columns: ClientColumn[]): Observable<Client[]> {
    return this.apollo
      .watchQuery<{ clients: Client[] }>({
        query: gql`
          {
            clients {
              ${columns.map((c) => c.field).join('\n')}
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.clients));
  }
}
