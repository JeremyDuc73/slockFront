export class Globals {
  public static baseUrl = "https://localhost:8000/api";

  public static isLoggedIn(){
    return localStorage.getItem("Token") != null
  }
}
