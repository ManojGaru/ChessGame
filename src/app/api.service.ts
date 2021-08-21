import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: 'http://54.183.117.48:8000/api'

  constructor(private http: HttpClient, private Http: HTTP) { }

  public register(data) {
    return this.http.post(`http://54.183.117.48:8000/api/registration/`, data)
  }
  public login(data) {
    return this.http.post(`http://54.183.117.48:8000/api/login/`, data, {})
  }
  public Dashboard(token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/dashboard/`, { headers: header })
  }
  public home(token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/home/`, { headers: header })
  }
  public Tournamnets(token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/tournament/get_all/`, { headers: header })
  }
  public UserDetails(token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/users/get/`, { headers: header })
  }
  public addTournamentStep1(data, token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/tournament/add/`, data, { headers: header })
  }
  getTimeZone(token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/time_zone/`, { headers: header })
  }
  getTournamentDetails(token, id) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/tournament/get_by_id/${id}/`, { headers: header })
  }
  addPlayer(data, token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/tournament/player/add/`, data, { headers: header })
  }
  addPgn(data, token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/tournament/pgn/add/`, data, { headers: header })
  }
  addRound(data, token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/tournament/rounds/add/`, data, { headers: header })
  }

  updateProfile(data, token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/users/add/`, data, { headers: header })
  }
  updateProfile1(data, token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://192.168.43.163:3001/users/add/`, data, { headers: header })
  }

  chessBoard(id, token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/dashboard/tournament/${id}`, { headers: header })
  }
  chessBoardDetails(id, token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/dashboard/tournament/game/${id}`, { headers: header })
  }
  membershipList(token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/accounts/membership/get`, { headers: header })
  }
  resetPassword(token, data) {
    //   let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/api/password_reset/confirm/`, data)
  }
  deletePGN(token, id) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.delete(`http://54.183.117.48:8000/tournament/pgn/delete/${id}/`, { headers: header })
  }
  deleteRound(token, id) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.delete(`http://54.183.117.48:8000/tournament/rounds/delete/${id}/`, { headers: header })
  }
  deletePlayer(token, id) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.delete(`http://54.183.117.48:8000/tournament/player/delete/${id}/`, { headers: header })
  }
  deleteTournament(token, id) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.delete(`http://54.183.117.48:8000/tournament/delete/${id}/`, { headers: header })
  }
  sendmail(mailid) {
    // let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/api/password_reset/`, mailid)
  }

  changePassword(token, data) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/password/`, data)
  }
  getMyMemberShip(token) {
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.get(`http://54.183.117.48:8000/accounts/current_membership/get`, { headers: header })
  }
  buyMembership(token,data){
    let header = new HttpHeaders().set('Authorization', `Token ${token}`)
    return this.http.post(`http://54.183.117.48:8000/accounts/payment`, data, { headers: header })
  }
}
