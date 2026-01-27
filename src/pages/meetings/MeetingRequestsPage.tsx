import React, { useState } from 'react';
import { Check, X, Calendar, MessageSquare, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { MeetingRequest } from '../../types';
import { meetingRequests as initialMeetingRequests } from '../../data/meetingRequests';
import { availabilitySlots } from '../../data/availabilitySlots';
import { users } from '../../data/users';

export const MeetingRequestsPage: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<MeetingRequest[]>(initialMeetingRequests);

  if (!user) return null;

  // Get requests for current user
  const userRequests = requests.filter(req => req.receiverId === user.id);
  
  const pendingRequests = userRequests.filter(req => req.status === 'pending');
  const acceptedRequests = userRequests.filter(req => req.status === 'accepted');
  const declinedRequests = userRequests.filter(req => req.status === 'declined');

  const handleAccept = (requestId: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    );
  };

  const handleDecline = (requestId: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'declined' } : req
      )
    );
  };

  const getSenderInfo = (senderId: string) => {
    return users.find(u => u.id === senderId);
  };

  const getSlotInfo = (slotId: string) => {
    return availabilitySlots.find(s => s.id === slotId);
  };

  const RequestCard = ({ request }: { request: MeetingRequest }) => {
    const sender = getSenderInfo(request.senderId);
    const slot = getSlotInfo(request.slotId);

    if (!sender || !slot) return null;

    const statusColor = {
      pending: 'warning',
      accepted: 'success',
      declined: 'danger',
    }[request.status];

    return (
      <Card>
        <CardBody>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{sender.name}</h3>
                <p className="text-sm text-gray-500">{sender.email}</p>
              </div>
            </div>
            <Badge variant={statusColor as any}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-primary-600" />
              <span className="font-medium text-sm">Meeting Time</span>
            </div>
            <p className="text-sm text-gray-700">{slot.title}</p>
            <p className="text-xs text-gray-600">
              {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleString()}
            </p>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg mb-4 border-l-4 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={16} className="text-blue-600" />
              <span className="font-medium text-sm">Message</span>
            </div>
            <p className="text-sm text-gray-700">{request.message}</p>
          </div>

          <div className="text-xs text-gray-500 mb-4">
            Requested on {new Date(request.createdAt).toLocaleString()}
          </div>

          {request.status === 'pending' && (
            <div className="flex gap-2">
              <Button
                onClick={() => handleAccept(request.id)}
                className="flex-1 bg-success-600 hover:bg-success-700 text-white"
                leftIcon={<Check size={18} />}
              >
                Accept
              </Button>
              <Button
                onClick={() => handleDecline(request.id)}
                className="flex-1 bg-danger-600 hover:bg-danger-700 text-white"
                leftIcon={<X size={18} />}
              >
                Decline
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meeting Requests</h1>
        <p className="text-gray-600">Manage your incoming meeting requests</p>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pending Requests
            <Badge variant="warning" className="ml-2">{pendingRequests.length}</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      )}

      {/* Accepted Requests */}
      {acceptedRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Accepted Requests
            <Badge variant="success" className="ml-2">{acceptedRequests.length}</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {acceptedRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      )}

      {/* Declined Requests */}
      {declinedRequests.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Declined Requests
            <Badge variant="danger" className="ml-2">{declinedRequests.length}</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {declinedRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </div>
      )}

      {userRequests.length === 0 && (
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No meeting requests</p>
              <p className="text-gray-500 text-sm mt-1">
                You'll see incoming meeting requests here
              </p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MeetingRequestsPage;
