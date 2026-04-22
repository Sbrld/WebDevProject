import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Conversation {
  claim_id: number;
  claim_title: string;
  claim_status: string;
  sender_id: number;
  recipient_id: number;
  other_user_id: number;
  other_user_name: string;
  last_message: string;
  last_message_at: string;
}

export interface ThreadMessage {
  id: number;
  claim: number;
  sender: number;
  sender_name: string;
  recipient: number;
  recipient_name: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface UserSummary {
  id: number;
  username: string;
  display_name: string;
}

export interface NewMessage {
  claim: number;
  recipient: number;
  content: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = 'http://localhost:8000/api/messages/';
  private usersUrl = 'http://localhost:8000/api/users/';

  constructor(private http: HttpClient) {}

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}conversations/`);
  }

  getThread(claimId: number, senderId: number, recipientId: number): Observable<ThreadMessage[]> {
    return this.http.get<ThreadMessage[]>(
      `${this.apiUrl}thread/?claim=${claimId}&sender=${senderId}&recipient=${recipientId}`
    );
  }

  sendMessage(msg: NewMessage): Observable<ThreadMessage> {
    return this.http.post<ThreadMessage>(this.apiUrl, msg);
  }

  getUsers(): Observable<UserSummary[]> {
    return this.http.get<UserSummary[]>(this.usersUrl);
  }
}
