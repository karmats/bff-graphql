import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private readonly apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .query({
        query: gql`
          {
            hello(id: "123") {
              name
            }
            bye
          }
        `,
      })
      .subscribe(console.log);
  }
}
