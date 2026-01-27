import { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { AvailabilitySlot, MeetingRequest } from '../../types';
import { availabilitySlots } from '../../data/availabilitySlots';
import { meetingRequests } from '../../data/meetingRequests';

const Calender = () => {
    const containerEl = useRef<null | HTMLDivElement>(null);
    const user = useAuth();
    const [slots, setSlots] = useState<AvailabilitySlot[]>(availabilitySlots);
    const [requests, setRequests] = useState<MeetingRequest[]>(meetingRequests);

    // Convert slots to events for display
    const slotEvents: any[] = slots.map((slot: AvailabilitySlot) => ({
        title: slot.title,
        start: slot.start,
        end: slot.end,
        backgroundColor: slot.available ? '#10b981' : '#ef4444', // green for available, red for unavailable
        borderColor: slot.available ? '#059669' : '#dc2626',
        textColor: '#fff',
        extendedProps: { slotId: slot.id, available: slot.available, userId: slot.userId }
    }));

    const handleSelect = (selectInfo: any) => {
        const title = prompt('Enter slot title:');
        if (title) {
            const available = confirm('Is this slot available?');
            const newSlot: AvailabilitySlot = {
                id: Date.now().toString(),
                userId: user.user?.id || '',
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                title,
                available,
            };
            setSlots([...slots, newSlot]);
            alert('Slot created successfully!');
        }
    };

    const handleEventClick = (clickInfo: any) => {
        const slotId = clickInfo.event.extendedProps.slotId;
        const slot = slots.find((s: AvailabilitySlot) => s.id === slotId);
        if (!slot) return;

        if (slot.userId !== user.user?.id) {
            // Send meeting request for someone else's slot
            const message = prompt('Enter message for meeting request:');
            if (message) {
                const newRequest: MeetingRequest = {
                    id: Date.now().toString(),
                    senderId: user.user?.id || '',
                    receiverId: slot.userId,
                    slotId,
                    message,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                };
                setRequests([...requests, newRequest]);
                alert('Meeting request sent!');
            }
        } else {
            // Modify own slot
            const newTitle = prompt('Edit slot title:', slot.title);
            if (newTitle !== null) {
                setSlots(slots.map((s: AvailabilitySlot) => s.id === slotId ? { ...s, title: newTitle } : s));
                alert('Slot updated!');
            }
        }
    };

    return (
        <div ref={containerEl} className="w-full">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                select={handleSelect}
                eventClick={handleEventClick}
                events={slotEvents}
                height="auto"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                }}
                editable={true}
                dayMaxEvents={true}
            />
        </div>
    )
}

export default Calender;