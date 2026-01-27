import React, { useState, useRef, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Share2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

interface VideoCallProps {
  recipientName?: string;
  recipientAvatar?: string;
}

export const VideoCallComponent: React.FC<VideoCallProps> = ({ 
  recipientName = 'John Doe', 
  recipientAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
}) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async () => {
    setIsCallActive(true);
    setCallDuration(0);
    
    // WebRTC mock - In a real app, you would:
    // 1. Get user media (camera/mic)
    // 2. Create peer connection
    // 3. Exchange ICE candidates and offers/answers
    try {
      if (videoRef.current && isVideoOn) {
        // Mock: In production, use: navigator.mediaDevices.getUserMedia()
        console.log('Starting video/audio stream...');
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    setIsScreenSharing(false);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleScreenShare = async () => {
    try {
      // WebRTC mock - In production: navigator.mediaDevices.getDisplayMedia()
      setIsScreenSharing(!isScreenSharing);
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Video Call</h1>
        <p className="text-gray-600">Connect with investors and entrepreneurs</p>
      </div>

      {!isCallActive ? (
        // Pre-call view
        <Card>
          <CardBody>
            <div className="flex flex-col items-center py-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-4">
                <img 
                  src={recipientAvatar} 
                  alt={recipientName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipientName}</h2>
              <p className="text-gray-600 mb-8">Ready to connect</p>
              
              <Button
                onClick={handleStartCall}
                className="bg-success-600 hover:bg-success-700 text-white px-8 py-3 rounded-full"
                leftIcon={<Phone size={20} />}
              >
                Start Call
              </Button>
            </div>
          </CardBody>
        </Card>
      ) : (
        // Active call view
        <div className="space-y-4">
          {/* Video containers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Remote video (larger) */}
            <div className="lg:col-span-2">
              <Card>
                <CardBody className="p-0">
                  <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center relative">
                    {isScreenSharing ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="text-center">
                          <Share2 size={48} className="text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">Screen being shared</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
                        <img 
                          src={recipientAvatar} 
                          alt={recipientName}
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Call info overlay */}
                    <div className="absolute top-4 right-4 bg-black/50 px-4 py-2 rounded-full">
                      <span className="text-white font-semibold">{formatDuration(callDuration)}</span>
                    </div>

                    {/* Recipient name */}
                    <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-lg">
                      <p className="text-white font-semibold">{recipientName}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Local video (smaller) */}
            <Card>
              <CardBody className="p-0">
                <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center relative">
                  {isVideoOn ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                      <span className="text-white text-center">
                        <Video size={32} className="mx-auto mb-2" />
                        <p>Your Camera</p>
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <VideoOff size={32} className="text-gray-600" />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Call controls */}
          <Card>
            <CardBody>
              <div className="flex flex-wrap gap-4 justify-center">
                {/* Mic toggle */}
                <Button
                  onClick={toggleMic}
                  className={`rounded-full p-4 ${
                    isMicOn 
                      ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' 
                      : 'bg-danger-600 text-white hover:bg-danger-700'
                  }`}
                  title={isMicOn ? 'Mute' : 'Unmute'}
                >
                  {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
                </Button>

                {/* Video toggle */}
                <Button
                  onClick={toggleVideo}
                  className={`rounded-full p-4 ${
                    isVideoOn 
                      ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' 
                      : 'bg-danger-600 text-white hover:bg-danger-700'
                  }`}
                  title={isVideoOn ? 'Stop Video' : 'Start Video'}
                >
                  {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
                </Button>

                {/* Screen share toggle */}
                <Button
                  onClick={toggleScreenShare}
                  className={`rounded-full p-4 ${
                    isScreenSharing 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                  title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                >
                  <Share2 size={24} />
                </Button>

                {/* End call */}
                <Button
                  onClick={handleEndCall}
                  className="bg-danger-600 hover:bg-danger-700 text-white rounded-full p-4"
                  title="End Call"
                >
                  <PhoneOff size={24} />
                </Button>
              </div>

              {/* Status display */}
              <div className="flex gap-4 justify-center mt-6 flex-wrap">
                <Badge variant={isMicOn ? 'success' : 'danger'}>
                  {isMicOn ? 'Mic ON' : 'Mic OFF'}
                </Badge>
                <Badge variant={isVideoOn ? 'success' : 'danger'}>
                  {isVideoOn ? 'Video ON' : 'Video OFF'}
                </Badge>
                {isScreenSharing && (
                  <Badge variant="primary">Sharing Screen</Badge>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VideoCallComponent;
