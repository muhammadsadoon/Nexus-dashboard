import React, { useState } from 'react';
import { Upload, File, FileText, Download, Eye, User, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import SignaturePad from './SignaturePad';
import { documents as initialDocuments, Document } from '../../data/documents';
import { useAuth } from '../../context/AuthContext';

export const DocumentChamber: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!user) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    // Create new document
    const newDoc: Document = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      description: 'Newly uploaded document',
      type: 'other',
      fileName: file.name,
      uploadedBy: user.id,
      uploadedAt: new Date().toISOString(),
      status: 'draft',
      fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      fileUrl: URL.createObjectURL(file),
      signatures: [],
      requiredSignatures: [user.id],
    };

    setDocuments([newDoc, ...documents]);
    setUploadedFile(null);
  };

  const handleSign = (docId: string, signatureImage: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id !== docId) return doc;

      const updatedSignatures = [
        ...doc.signatures,
        {
          userId: user.id,
          userName: user.name,
          signedAt: new Date().toISOString(),
          signatureUrl: signatureImage
        }
      ];

      // Check if all required signatures are complete
      const allSigned = doc.requiredSignatures.every(sig =>
        updatedSignatures.some(s => s.userId === sig && s.signedAt)
      );

      return {
        ...doc,
        signatures: updatedSignatures,
        status: allSigned ? 'signed' : 'in_review'
      };
    }));

    setShowSignatureModal(false);
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'draft':
        return 'warning';
      case 'in_review':
        return 'info';
      case 'signed':
        return 'success';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'draft':
        return <AlertCircle size={16} />;
      case 'in_review':
        return <Eye size={16} />;
      case 'signed':
        return <CheckCircle size={16} />;
    }
  };

  const canSignDocument = (doc: Document) => {
    return (
      doc.status !== 'draft' &&
      !doc.signatures.some(s => s.userId === user.id && s.signedAt)
    );
  };

  const hasUserSigned = (doc: Document) => {
    return doc.signatures.some(s => s.userId === user.id && s.signedAt);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Chamber</h1>
        <p className="text-gray-600">Upload, manage, and sign documents and contracts</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Upload Document</h2>
        </CardHeader>
        <CardBody>
          <div className="border-2 border-dashed border-primary-300 rounded-lg p-8 text-center hover:border-primary-500 transition">
            <Upload size={32} className="text-primary-600 mx-auto mb-2" />
            <p className="text-gray-900 font-medium mb-1">Upload PDF or Document</p>
            <p className="text-sm text-gray-500 mb-4">Drag and drop or click to browse</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xlsx,.pptx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button className="bg-primary-600 text-white hover:bg-primary-700">
                Choose File
              </Button>
            </label>
          </div>
        </CardBody>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map(doc => (
          <Card
            key={doc.id}
            className={`cursor-pointer transition hover:shadow-lg ${
              selectedDoc?.id === doc.id ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setSelectedDoc(doc)}
          >
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{doc.title}</h3>
                    <p className="text-xs text-gray-500">{doc.fileName}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(doc.status) as any}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(doc.status)}
                    {doc.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mb-4">{doc.description}</p>

              {/* Signatures Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">Signatures</span>
                  <span className="text-xs text-gray-500">
                    {doc.signatures.filter(s => s.signedAt).length}/{doc.requiredSignatures.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-success-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${
                        (doc.signatures.filter(s => s.signedAt).length /
                          doc.requiredSignatures.length) *
                        100
                      }%`
                    }}
                  />
                </div>
              </div>

              {/* Signers */}
              <div className="space-y-2 mb-4">
                {doc.signatures.map((sig, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <User size={14} className="text-gray-400" />
                    <span className="text-gray-700">{sig.userName}</span>
                    {sig.signedAt && (
                      <>
                        <CheckCircle size={14} className="text-success-600 ml-auto" />
                        <span className="text-gray-500">
                          {new Date(sig.signedAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                <span>{doc.fileSize}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <Card className="fixed inset-0 z-50 m-4 overflow-auto max-h-screen md:max-h-none md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl">
          <CardHeader className="flex justify-between items-center sticky top-0 bg-white border-b">
            <h2 className="text-xl font-bold text-gray-900">{selectedDoc.title}</h2>
            <Button
              onClick={() => setSelectedDoc(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </CardHeader>

          <CardBody className="space-y-6">
            {/* Document Info */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Document Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="font-medium text-gray-900 capitalize">{selectedDoc.type}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <Badge variant={getStatusColor(selectedDoc.status) as any}>
                    {selectedDoc.status.replace(/_/g, ' ').toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-gray-600">File Size</p>
                  <p className="font-medium text-gray-900">{selectedDoc.fileSize}</p>
                </div>
                <div>
                  <p className="text-gray-600">Uploaded</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedDoc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Status */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Signature Status</h3>
              <div className="space-y-3">
                {selectedDoc.requiredSignatures.map(sigId => {
                  const signature = selectedDoc.signatures.find(s => s.userId === sigId);
                  return (
                    <div key={sigId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">
                        {signature?.userName || 'Pending Signer'}
                      </span>
                      {signature?.signedAt ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle size={18} className="text-success-600" />
                          <span className="text-xs text-gray-600">
                            {new Date(signature.signedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signature Pad */}
            {canSignDocument(selectedDoc) && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Add Your Signature</h3>
                <SignaturePad
                  onSign={(sig) => handleSign(selectedDoc.id, sig)}
                  isDisabled={hasUserSigned(selectedDoc)}
                />
              </div>
            )}

            {hasUserSigned(selectedDoc) && (
              <div className="flex items-center gap-2 p-4 bg-success-50 border border-success-200 rounded-lg">
                <CheckCircle size={20} className="text-success-600" />
                <span className="text-sm font-medium text-success-900">
                  You have signed this document
                </span>
              </div>
            )}

            {/* Download Button */}
            <Button
              className="w-full bg-primary-600 text-white hover:bg-primary-700"
              leftIcon={<Download size={18} />}
            >
              Download Document
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Overlay */}
      {selectedDoc && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
};

export default DocumentChamber;
