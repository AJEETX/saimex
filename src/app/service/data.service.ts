import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  public locations=[
    {
      id: 1,
      name: 'Charlestown',
    },
    {
      id: 2,
      name: 'New Castle'
    },
    {
      id: 3,
      name: 'Melbourne'
    }
  ];
  public states = [
    {
      id: 1,
      name: 'ACT',
    },
    {
      id: 2,
      name: 'NSW',
    },
    {
      id: 3,
      name: 'VIC',
    },
    {
      id: 4,
      name: 'QLD',
    },
    {
      id: 5,
      name: 'SA',
    },
    {
      id: 6,
      name: 'WA',
    },
    {
      id: 7,
      name: 'NT',
    },
    {
      id: 8,
      name: 'TAS',
    }
  ];
}
