import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AppComponent } from './app.component';

function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  const token = localStorage.getItem('access_token');
  return {
    link: httpLink.create({
      uri: 'http://localhost:4000/graphql',
      headers: new HttpHeaders({
        authorization: token ? `Bearer ${token}` : '',
      }),
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: APOLLO_OPTIONS, useFactory: createApollo, deps: [HttpLink] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
