import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

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
}
