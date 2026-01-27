import React from 'react'
import Calender from '../../components/fullcalender/calender';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';

const CalenderSlots = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className='text-3xl font-bold text-gray-900'>Availability Calendar</h1>
                <p className='text-gray-600'>Manage your availability slots and view meeting requests</p>
            </div>
            
            <Card>
                <CardHeader>
                    <h2 className='text-lg font-medium text-gray-900'>Calendar</h2>
                </CardHeader>
                <CardBody>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <Calender />
                    </div>
                </CardBody>
            </Card>

            <Card className="bg-blue-50 border border-blue-200">
                <CardBody>
                    <h3 className='font-semibold text-gray-900 mb-2'>How to use</h3>
                    <ul className='text-sm text-gray-700 space-y-1'>
                        <li>• <strong>Create slot:</strong> Click on any date to create a new availability slot</li>
                        <li>• <strong>View details:</strong> Click on an existing slot to see details</li>
                        <li>• <strong>Send request:</strong> Click on someone else's slot to send a meeting request</li>
                        <li>• <strong>Green slots:</strong> Available time slots</li>
                        <li>• <strong>Red slots:</strong> Unavailable time slots</li>
                    </ul>
                </CardBody>
            </Card>
        </div>
    )
}

export default CalenderSlots;