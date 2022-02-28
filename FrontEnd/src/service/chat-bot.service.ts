import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConversationReponse } from 'src/interface/api-conversation-reponse';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {
  BASE_URL = 'https://localhost:7262/';
  CHAT_URL = `${this.BASE_URL}Chat`;
  constructor(
    private _http: HttpClient
  ) { }
  Converse(userSays:string){
    return this._http.get<ApiConversationReponse>(`${this.CHAT_URL}?userSays=${userSays}`);
  }
}
