export class User {
  constructor(
    public email:string ,
    public id:string,
    private _token:string,
    private _tokenExpirationDate: Date,
    ){}

    get token() {
      return (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)? null : this._token
    }

    static formJSON(json:any){
      return new User(json.email,json.id,json._token, new Date(json._tokenExpirationDate))
    }

}
