import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const EVENTS_QUERY = gql`
  query events($status: String, $orderBy: String, $orderDir: String, $startIndex: Int, $pageSize: Int){
    events(status: $status, orderBy: $orderBy, orderDir: $orderDir, startIndex: $startIndex, pageSize: $pageSize) {
      uuid
      description
      amount
      currency
      status
      created_at
      employee {
        uuid
        first_name
        last_name
      }
    }
  }
  `;

const EVENT_MUTATION = gql`
  mutation updateEvent($uuid: String!, $status: String!){
    updateEvent(uuid: $uuid, status: $status) {
      uuid
      description
      amount
      currency
      status
      created_at
      employee {
        uuid
        first_name
        last_name
      }
    }
  }
  `;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apollo: Apollo) { }

  getEvents(status: string, orderBy: string, orderDir: string, startIndex: number, pageSize: number) {
    return this.apollo.watchQuery({
      query: EVENTS_QUERY,
      variables: {
        status: status,
        orderBy: orderBy,
        orderDir: orderDir,
        startIndex: startIndex,
        pageSize: pageSize
      }
    }).valueChanges;
  }

  updateEvent(uuid: string, status: string) {
    return this.apollo.mutate({
      mutation: EVENT_MUTATION,
      variables: {
        uuid: uuid,
        status: status
      }
    });
  }
}
