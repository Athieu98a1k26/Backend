export class BaseLocalStorage {
  //key của người dùng
  private static readonly ConstIdentity:string='Identity';
  //key sản phẩm
  private static readonly ConstItemCart:string='ItemCart';

  private static readonly ConstToken:string='token';
  private static readonly ConstRefreshToken:string='refreshToken';
  private static readonly ConstExpire:string='expire';

  public static SetExpire(expire:string){
    let expireOld=localStorage.getItem(this.ConstExpire);
    if(expireOld!=null)
    {
      this.RemoveExpire();
    }
    localStorage.setItem(this.ConstExpire,expire);
  }
  public static RemoveExpire(){
    localStorage.removeItem(this.ConstExpire);
  }
  public static GetExpire(){
    return localStorage.getItem(this.ConstExpire);
  }






  public static SetToken(token:string){
    let tokenOld=localStorage.getItem(this.ConstToken);
    if(tokenOld!=null)
    {
      this.RemoveToken();
    }
    localStorage.setItem(this.ConstToken,token);
  }
  public static RemoveToken(){
    localStorage.removeItem(this.ConstToken);
  }
  public static GetToken(){
    return localStorage.getItem(this.ConstToken);
  }

  public static SetrefreshToken(refreshToken:string){
    let tokenOld=localStorage.getItem(this.ConstRefreshToken);
    if(tokenOld!=null)
    {
      this.RemoverefreshToken();
    }
    localStorage.setItem(this.ConstRefreshToken,refreshToken);
  }
  public static RemoverefreshToken(){
    localStorage.removeItem(this.ConstRefreshToken);
  }
  public static GetrefreshToken(){
      return localStorage.getItem(this.ConstRefreshToken);
  }

  public static IsUserNotLogin(){
    let Identity = localStorage.getItem(this.ConstIdentity);
    if(Identity==null){
      return true;
    }
    return false;
  }


  public static GetItemCart(){
    return localStorage.getItem(this.ConstItemCart);
  }
  public static ClearItemCart(){
    return localStorage.removeItem(this.ConstItemCart);
  }


}

