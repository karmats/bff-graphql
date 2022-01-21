import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';

import { AppComponent } from './app.component';

function createApollo(): ApolloClientOptions<unknown> {
  return {
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [{ provide: APOLLO_OPTIONS, useFactory: createApollo }],
  bootstrap: [AppComponent],
})
export class AppModule {}
