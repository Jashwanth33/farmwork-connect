import { NextRequest, NextResponse } from 'next/server';
import { getConversations, sendMessage, getMessages } from '@/lib/chat';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const conversationId = searchParams.get('conversationId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    if (conversationId) {
      const messages = await getMessages(conversationId, userId);
      return NextResponse.json({ messages });
    }

    const conversations = await getConversations(userId);
    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Chat fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch chat' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { senderId, receiverId, message, type, bookingId } = await request.json();

    if (!senderId || !receiverId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const chatMessage = await sendMessage(senderId, receiverId, message, type, bookingId);
    return NextResponse.json({ message: chatMessage });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
