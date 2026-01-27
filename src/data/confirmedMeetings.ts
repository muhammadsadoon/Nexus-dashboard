import { ConfirmedMeeting } from '../types';

export const confirmedMeetings: ConfirmedMeeting[] = [
  {
    id: '1',
    participants: ['user1', 'user2'],
    slotId: '1',
    title: 'Investment Discussion',
    start: '2024-10-15T10:00:00',
    end: '2024-10-15T11:00:00',
    confirmedAt: '2024-10-01T12:00:00',
  },
  {
    id: '2',
    participants: ['user2', 'user3'],
    slotId: '2',
    title: 'Startup Pitch',
    start: '2024-10-16T14:00:00',
    end: '2024-10-16T15:00:00',
    confirmedAt: '2024-10-02T09:30:00',
  },
  {
    id: '3',
    participants: ['user1', 'user4'],
    slotId: '3',
    title: 'Follow-up Meeting',
    start: '2024-10-17T11:00:00',
    end: '2024-10-17T12:00:00',
    confirmedAt: '2024-10-03T15:45:00',
  },
];
