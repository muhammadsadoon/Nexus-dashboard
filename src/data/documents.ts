export interface Document {
  id: string;
  title: string;
  description: string;
  type: 'contract' | 'agreement' | 'proposal' | 'invoice' | 'other';
  fileName: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'draft' | 'in_review' | 'signed';
  fileSize: string;
  fileUrl: string;
  signatures: Array<{
    userId: string;
    userName: string;
    signedAt?: string;
    signatureUrl?: string;
  }>;
  requiredSignatures: string[];
}

export const documents: Document[] = [
  {
    id: '1',
    title: 'Investment Agreement',
    description: 'Initial investment agreement for Series A funding',
    type: 'agreement',
    fileName: 'Investment_Agreement_2024.pdf',
    uploadedBy: 'user1',
    uploadedAt: '2024-09-15T10:00:00',
    status: 'signed',
    fileSize: '2.5 MB',
    fileUrl: '#',
    signatures: [
      {
        userId: 'user1',
        userName: 'John Entrepreneur',
        signedAt: '2024-09-20T14:30:00',
        signatureUrl: '#'
      },
      {
        userId: 'user2',
        userName: 'Jane Investor',
        signedAt: '2024-09-22T09:15:00',
        signatureUrl: '#'
      }
    ],
    requiredSignatures: ['user1', 'user2']
  },
  {
    id: '2',
    title: 'Term Sheet',
    description: 'Term sheet for investment discussions',
    type: 'proposal',
    fileName: 'Term_Sheet_Draft.pdf',
    uploadedBy: 'user2',
    uploadedAt: '2024-09-10T14:20:00',
    status: 'in_review',
    fileSize: '1.8 MB',
    fileUrl: '#',
    signatures: [
      {
        userId: 'user2',
        userName: 'Jane Investor',
        signedAt: '2024-09-10T14:20:00'
      }
    ],
    requiredSignatures: ['user1', 'user2']
  },
  {
    id: '3',
    title: 'Service Agreement',
    description: 'Service agreement between parties',
    type: 'contract',
    fileName: 'Service_Agreement.pdf',
    uploadedBy: 'user3',
    uploadedAt: '2024-09-05T11:45:00',
    status: 'draft',
    fileSize: '1.2 MB',
    fileUrl: '#',
    signatures: [],
    requiredSignatures: ['user1', 'user2', 'user3']
  },
  {
    id: '4',
    title: 'Invoice #2024-001',
    description: 'Monthly invoice for services',
    type: 'invoice',
    fileName: 'Invoice_2024_001.pdf',
    uploadedBy: 'user1',
    uploadedAt: '2024-09-01T09:00:00',
    status: 'signed',
    fileSize: '0.8 MB',
    fileUrl: '#',
    signatures: [
      {
        userId: 'user1',
        userName: 'John Entrepreneur',
        signedAt: '2024-09-01T09:00:00'
      }
    ],
    requiredSignatures: ['user1']
  }
];
