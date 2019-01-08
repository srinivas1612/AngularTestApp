export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) { }
}

export class UserDetails {
  constructor(
    public userID: number,
    public name: string,
    public emailID: string,
    public password: string,
    public phoneNumber: string
  ) { }
}

export class Store {
  constructor(
    public StoreId: number,
    public StoreNumber: string,
    public StorePhoneNo: string,
    public PharmacyName: string,
    public DistrictName: string,
    public RegionName: string
  ) { }
}