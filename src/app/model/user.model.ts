export class User{
  constructor(public id: number,
              public firstname: string,
              public lastname: string,
              public username: string,
              public email: number,
              public phoneNumber: any,
              public siret: number,
              public garages: [],
              public roles: []
              ){
  }
}
