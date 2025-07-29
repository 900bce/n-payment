export interface PaymentDetails {
  amount: number;
  description?: string;
  subtotal: number;
  tax: number;
  processingFeeRate: number;
  processingFeeAmount: number;
  total: number;
  selectedDevice?: string;
}

export interface CardDetails {
  name: string;
  number: string;
  expiryDate: string;
  cvc: string;
  country: string;
  zip: string;
}

export interface Organization {
  id: number;
  name: string;
  totalProcessingFeeFixed: number;
  totalProcessingFeePercentage: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Location {
  id: number;
  name: string;
  taxRate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Reader {
  id: number;
  label: string;
  readerId: string;
  status: 'online' | 'offline';
  locationId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
