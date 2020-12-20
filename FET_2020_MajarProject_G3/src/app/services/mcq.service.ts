import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class McqService {
  constructor(private http: HttpClient) {}
  clearstatus(qid: any, uid: any) {
    return this.http.delete(
      'http://localhost:8080/api/status/' + qid + '/' + uid
    );
  }

  getScore(qid: number) {
    return this.http.get('http://localhost:8080/api/sc/' + qid);
  }
  getallquestions(qid: number) {
    return this.http.get('http://localhost:8080/api/status/allque/' + qid);
  }
  getStatusList(uid: number, qid: number) {
    return this.http.get('http://localhost:8080/api/status/' + uid + '/' + qid);
  }
  insertstatus(status: any) {
    return this.http.post('http://localhost:8080/api/status', status);
  }
  saveScore(score: any) {
    return this.http.post('http://localhost:8080/api/sc', score);
  }

  getTimer(qid: number) {
    return this.http.get('http://localhost:8080/api/timer/' + qid);
  }
  updatetimer(counter: any) {
    return this.http.put('http://localhost:8080/api/status', counter);
  }
  sendmail(scoreData: any) {
    console.log(scoreData);

    return this.http.post('http://localhost:8080/api/mailsend', scoreData);
  }
}
