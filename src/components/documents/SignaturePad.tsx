import React, { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Trash2, Download } from 'lucide-react';

interface SignaturePadProps {
  onSign?: (signatureImage: string) => void;
  isDisabled?: boolean;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSign, isDisabled = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDisabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isDisabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1f2937';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL('image/png');
      if (imageData !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==') {
        setIsSigned(true);
      }
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  const handleSign = () => {
    if (!canvasRef.current) return;

    const signatureImage = canvasRef.current.toDataURL('image/png');
    if (onSign) {
      onSign(signatureImage);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className={`w-full border border-gray-200 rounded bg-white cursor-pen ${
            isDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </div>

      <div className="text-xs text-gray-500 text-center">
        {isDisabled ? 'Document already signed' : 'Sign above with your mouse or touchpad'}
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          onClick={clearSignature}
          disabled={!isSigned || isDisabled}
          className="bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50"
          leftIcon={<Trash2 size={16} />}
        >
          Clear
        </Button>
        <Button
          onClick={handleSign}
          disabled={!isSigned || isDisabled}
          className="bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
          leftIcon={<Download size={16} />}
        >
          Sign Document
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
