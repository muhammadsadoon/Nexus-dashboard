import React, { useState } from 'react';
import { VideoCallComponent } from '../../components/video/VideoCallComponent';
import { Card, CardBody } from '../../components/ui/Card';

const VideoCallPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <VideoCallComponent 
        recipientName="Jane Smith"
        recipientAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
      />
    </div>
  );
};

export default VideoCallPage;
