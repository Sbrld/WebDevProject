import { Component, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, Conversation, ThreadMessage, UserSummary } from '../message.service';
import { ClaimService, Claim } from '../claim.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messenger.html',
  styleUrl: './messenger.css',
})
export class MessengerComponent implements OnInit {
  @ViewChild('chatMessages') chatMessagesRef!: ElementRef;

  conversations = signal<Conversation[]>([]);
  selectedConv = signal<Conversation | null>(null);
  threadMessages = signal<ThreadMessage[]>([]);
  loading = signal(false);
  threadLoading = signal(false);
  sending = signal(false);
  error = signal('');
  newMessage = '';

  showNewConv = false;
  claims = signal<Claim[]>([]);
  users = signal<UserSummary[]>([]);
  newConvClaimId = '';
  newConvRecipientId = '';
  newConvContent = '';
  newConvLoading = signal(false);
  newConvError = signal('');

  constructor(
    private messageService: MessageService,
    private claimService: ClaimService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    this.loading.set(true);
    this.error.set('');
    this.selectedConv.set(null);
    this.threadMessages.set([]);
    this.messageService.getConversations().subscribe({
      next: (data) => {
        this.conversations.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load conversations.');
        this.loading.set(false);
      },
    });
  }

  selectConv(conv: Conversation): void {
    this.selectedConv.set(conv);
    this.threadMessages.set([]);
    this.newMessage = '';
    this.threadLoading.set(true);
    this.messageService.getThread(conv.claim_id, conv.sender_id, conv.recipient_id).subscribe({
      next: (msgs) => {
        this.threadMessages.set(msgs);
        this.threadLoading.set(false);
        this.scrollToBottom();
      },
      error: () => this.threadLoading.set(false),
    });
  }

  isSelected(conv: Conversation): boolean {
    const s = this.selectedConv();
    return !!s &&
      s.claim_id === conv.claim_id &&
      s.sender_id === conv.sender_id &&
      s.recipient_id === conv.recipient_id;
  }

  sendMessage(): void {
    const conv = this.selectedConv();
    const content = this.newMessage.trim();
    const currentUserId = this.auth.currentUser()?.id;
    if (!conv || !content || !currentUserId || this.sending()) return;
    this.sending.set(true);
    this.messageService.sendMessage({
      claim: conv.claim_id,
      recipient: conv.other_user_id,
      content,
    }).subscribe({
      next: (msg) => {
        this.threadMessages.update((msgs) => [...msgs, msg]);
        this.newMessage = '';
        this.sending.set(false);
        this.scrollToBottom();
        this.refreshLastMessage(conv, msg.content);
      },
      error: () => this.sending.set(false),
    });
  }

  onEnterKey(event: Event): void {
    const ke = event as KeyboardEvent;
    if (!ke.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  openNewConv(): void {
    this.showNewConv = true;
    this.newConvError.set('');
    this.claimService.getClaims().subscribe((c) => this.claims.set(c));
    this.messageService.getUsers().subscribe((u) => {
      const currentUserId = this.auth.currentUser()?.id;
      this.users.set(u.filter((user) => user.id !== currentUserId));
    });
  }

  submitNewConv(): void {
    const uid = this.auth.currentUser()?.id;
    const claimId = parseInt(this.newConvClaimId, 10);
    const recipientId = parseInt(this.newConvRecipientId, 10);
    const content = this.newConvContent.trim();
    if (!uid || !claimId || !recipientId || !content) {
      this.newConvError.set('All fields are required.');
      return;
    }
    this.newConvLoading.set(true);
    this.newConvError.set('');
    this.messageService.sendMessage({ claim: claimId, recipient: recipientId, content }).subscribe({
      next: () => {
        this.showNewConv = false;
        this.newConvClaimId = '';
        this.newConvRecipientId = '';
        this.newConvContent = '';
        this.newConvLoading.set(false);
        this.loadConversations();
      },
      error: () => {
        this.newConvError.set('Failed to send. Please try again.');
        this.newConvLoading.set(false);
      },
    });
  }

  statusLabel(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  isMine(msg: ThreadMessage): boolean {
    return msg.sender === this.auth.currentUser()?.id;
  }

  trackConv(_: number, conv: Conversation): string {
    return `${conv.claim_id}-${conv.sender_id}-${conv.recipient_id}`;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.chatMessagesRef?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }

  private refreshLastMessage(conv: Conversation, content: string): void {
    this.conversations.update((list) =>
      list.map((c) =>
        c.claim_id === conv.claim_id && c.sender_id === conv.sender_id && c.recipient_id === conv.recipient_id
          ? { ...c, last_message: content }
          : c
      )
    );
  }
}
