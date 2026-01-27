import { MeetingRequest } from '../types';

export const meetingRequests: MeetingRequest[] = [
  {
    id: '1',
    senderId: 'user2', // Investor sending to entrepreneur
    receiverId: 'user1',
    slotId: '1',
    message: 'Interested in discussing investment opportunities.',
    status: 'pending',
    createdAt: '2024-09-30T12:00:00',
  },
  {
    id: '2',
    senderId: 'user1', // Entrepreneur sending to investor
    receiverId: 'user2',
    slotId: '3',
    message: 'Let\'s schedule a call to talk about my startup.',
    status: 'accepted',
    createdAt: '2024-09-29T15:00:00',
  },
  {
    id: '3',
    senderId: 'user2',
    receiverId: 'user1',
    slotId: '2',
    message: 'Follow-up on previous discussion.',
    status: 'declined',
    createdAt: '2024-09-28T10:00:00',
  },
];
