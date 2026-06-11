'use client';

import { Download, Calendar, MapPin, User, Tractor, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

interface BookingData {
  bookingNumber: string;
  service: string;
  farmer: { name: string; phone: string };
  provider: { name: string; phone: string };
  cropType: string;
  farmSize: number;
  scheduledDate: string;
  scheduledTime: string;
  farmAddress: string;
  totalAmount: number;
  advancePaid: number;
  paymentMethod: string;
  createdAt: string;
}

const DEMO_INVOICE: BookingData = {
  bookingNumber: 'FWC-ABC123-XY',
  service: 'Land Ploughing',
  farmer: { name: 'Ramesh Kumar', phone: '9876543210' },
  provider: { name: 'Krishna Farms', phone: '9876543211' },
  cropType: 'RICE',
  farmSize: 5,
  scheduledDate: 'March 18, 2024',
  scheduledTime: '9:00 AM',
  farmAddress: '123, Farm Road, Village Thuraipakkam, Thiruvallur, Tamil Nadu - 602001',
  totalAmount: 2500,
  advancePaid: 500,
  paymentMethod: 'UPI',
  createdAt: 'March 15, 2024',
};

export default function InvoiceDownload({ bookingId }: { bookingId: string }) {
  const invoice = DEMO_INVOICE;

  const generatePDF = () => {
    const content = `
FARMWORK CONNECT - SERVICE INVOICE
==================================

Invoice Number: ${invoice.bookingNumber}
Date: ${invoice.createdAt}

SERVICE DETAILS
---------------
Service: ${invoice.service}
Crop Type: ${invoice.cropType}
Farm Size: ${invoice.farmSize} acres
Scheduled Date: ${invoice.scheduledDate}
Scheduled Time: ${invoice.scheduledTime}

FARM DETAILS
------------
Address: ${invoice.farmAddress}

FARMER DETAILS
--------------
Name: ${invoice.farmer.name}
Phone: +91 ${invoice.farmer.phone}

PROVIDER DETAILS
----------------
Name: ${invoice.provider.name}
Phone: +91 ${invoice.provider.phone}

PAYMENT DETAILS
---------------
Service Amount: ₹${invoice.totalAmount}
Advance Paid: ₹${invoice.advancePaid}
Balance Due: ₹${invoice.totalAmount - invoice.advancePaid}
Payment Method: ${invoice.paymentMethod}

Total Amount: ₹${invoice.totalAmount}

==================================
Thank you for using FarmWork Connect!
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${invoice.bookingNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Invoice downloaded!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Invoice</h2>
        <button
          onClick={generatePDF}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition"
        >
          <Download className="w-5 h-5" />
          Download Invoice
        </button>
      </div>

      <div className="p-6" id="invoice-content">
        {/* Invoice Header */}
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-2xl font-bold text-primary-600">FarmWork Connect</h1>
          <p className="text-gray-500">Service Invoice</p>
          <p className="text-sm text-gray-400 mt-2">Booking: {invoice.bookingNumber}</p>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Service Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-medium">{invoice.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Crop Type:</span>
                <span className="font-medium">{invoice.cropType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Farm Size:</span>
                <span className="font-medium">{invoice.farmSize} acres</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">{invoice.scheduledDate}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Parties</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{invoice.farmer.name}</p>
                <p className="text-gray-500">Farmer</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{invoice.provider.name}</p>
                <p className="text-gray-500">Service Provider</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Farm Location</p>
              <p className="text-sm text-gray-600">{invoice.farmAddress}</p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-700 mb-4">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service Cost</span>
              <span>₹{invoice.totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Advance Paid</span>
              <span>- ₹{invoice.advancePaid}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span>{invoice.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
              <span>Total Amount</span>
              <span className="text-primary-600">₹{invoice.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Generated on {new Date().toLocaleDateString('en-IN', { 
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })}</p>
          <p className="mt-2">Thank you for using FarmWork Connect!</p>
        </div>
      </div>
    </div>
  );
}
