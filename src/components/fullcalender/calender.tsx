import { useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Event } from '../../types';

const events: Event[] = [
    { // this object will be "parsed" into an Event Object
        title: 'testing', // a property!
        start: '2026-01-01', // a property!
        end: '2018-01-01' // a property! ** see important note below about 'end' **
    },
    {
        title: "Testing 2",
        start: "2026-01-01",
        end: "2026-01-06"
    }
]

const Calender = () => {
    const containerEl = useRef<null | HTMLDivElement>(null);
    const user = useAuth();

    if (user.user?.role == "entrepreneur") {
        return (
            <div ref={containerEl}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    select={(e) => {
                        console.log(e);
                    }}
                    themeSystem='bootstrap'
                    events={events}
                />
            </div>
        )
    }
    return (
        <div ref={containerEl}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                select={(e) => {
                    console.log(e);
                }}
            />
        </div>
    )
}

export default Calender;