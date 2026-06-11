export interface ChatMessage {
  id: string;
  bookingId?: string;
  senderId: string;
  receiverId: string;
  message: string;
  type: 'TEXT' | 'IMAGE' | 'LOCATION';
  isRead: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  otherParticipantId: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

const mockConversations: Conversation[] = [];
const mockMessages: Map<string, ChatMessage[]> = new Map();

export async function getOrCreateConversation(userId1: string, userId2: string, bookingId?: string) {
  const existing = mockConversations.find(c => 
    (c.otherParticipantId === userId1 || c.otherParticipantId === userId2)
  );

  if (existing) return existing;

  const newConversation: Conversation = {
    id: `conv_${Date.now()}`,
    otherParticipantId: userId2,
    unreadCount: 0,
  };
  mockConversations.push(newConversation);
  return newConversation;
}

export async function sendMessage(
  senderId: string,
  receiverId: string,
  message: string,
  type: 'TEXT' | 'IMAGE' | 'LOCATION' = 'TEXT',
  bookingId?: string
) {
  const conversation = await getOrCreateConversation(senderId, receiverId, bookingId);

  const chatMessage: ChatMessage = {
    id: `msg_${Date.now()}`,
    bookingId,
    senderId,
    receiverId,
    message,
    type,
    isRead: false,
    createdAt: new Date(),
  };

  const existing = mockMessages.get(conversation.id) || [];
  existing.push(chatMessage);
  mockMessages.set(conversation.id, existing);

  conversation.lastMessage = message;
  conversation.lastMessageTime = chatMessage.createdAt;

  return chatMessage;
}

export async function getConversations(userId: string) {
  return mockConversations;
}

export async function getMessages(conversationId: string, userId: string, limit = 50) {
  return mockMessages.get(conversationId) || [];
}

export async function markAsRead(messageIds: string[], userId: string) {
  console.log('Marked as read:', messageIds, userId);
}
