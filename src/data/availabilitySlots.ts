import { AvailabilitySlot } from '../types';

export const availabilitySlots: AvailabilitySlot[] = [
  {
    id: '1',
    userId: 'user1',
    start: '2024-10-15T09:00:00',
    end: '2024-10-15T10:00:00',
    title: 'Morning Meeting',
    available: true,
  },
  {
    id: '2',
    userId: 'user1',
    start: '2024-10-15T14:00:00',
    end: '2024-10-15T15:00:00',
    title: 'Afternoon Slot',
    available: true,
  },
  {
    id: '3',
    userId: 'user2',
    start: '2024-10-16T10:00:00',
    end: '2024-10-16T11:00:00',
    title: 'Investor Call',
    available: false,
  },
  {
    id: '4',
    userId: 'user2',
    start: '2024-10-16T15:00:00',
    end: '2024-10-16T16:00:00',
    title: 'Available for meetings',
    available: true,
  },
];
