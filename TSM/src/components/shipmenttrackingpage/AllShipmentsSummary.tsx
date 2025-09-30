import React from "react";
import { DollarSign, Layers, Package } from "lucide-react";

interface AllShipmentsSummaryProps {
  totalShipments: number;
  shipmentsStatus: { inTransit: number; delivered: number; pending: number };
  totalWeight: string;
  avgWeight: string;
  totalValue: string;
  avgValue: string;
  totalItems: number;
  avgItems: number;
}

const AllShipmentsSummary: React.FC<AllShipmentsSummaryProps> = ({
  totalShipments,
  shipmentsStatus,
  totalWeight,
  avgWeight,
  totalValue,
  avgValue,
  totalItems,
  avgItems
}) => (
  <div className="space-y-8">
    <h1 className="text-3xl font-bold mb-2">All Shipments</h1>
    <p className="text-gray-500 mb-6">
      Manage and track all shipments across your logistics network
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Shipments */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-6 h-6 text-blue-500" />
          <span className="text-lg font-semibold">Total Shipments</span>
        </div>
        <span className="text-3xl font-bold mb-4">{totalShipments}</span>
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm">
            <span className="inline-block rounded-full w-2 h-2 bg-blue-600 mr-2" />
            In Transit: {shipmentsStatus.inTransit}
          </div>
          <div className="flex items-center text-sm">
            <span className="inline-block rounded-full w-2 h-2 bg-green-600 mr-2" />
            Delivered: {shipmentsStatus.delivered}
          </div>
          <div className="flex items-center text-sm">
            <span className="inline-block rounded-full w-2 h-2 bg-yellow-500 mr-2" />
            Delayed/Pending: {shipmentsStatus.pending}
          </div>
        </div>
      </div>
      {/* Total Weight */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-6 h-6 text-indigo-400" />
          <span className="text-lg font-semibold">Total Weight</span>
        </div>
        <span className="text-3xl font-bold mb-4">{totalWeight}</span>
        <span className="block text-sm text-gray-500">
          Average weight per shipment: {avgWeight}
        </span>
      </div>
      {/* Total Value */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-6 h-6 text-green-500" />
          <span className="text-lg font-semibold">Total Value</span>
        </div>
        <span className="text-3xl font-bold mb-4">{totalValue}</span>
        <span className="block text-sm text-gray-500">
          Average value per shipment: {avgValue}
        </span>
      </div>
    </div>

    {/* Items Row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      <div className="bg-white rounded-lg shadow p-6">
        <Layers className="w-5 h-5 text-purple-400 mb-2" />
        <div className="text-2xl font-bold">{totalItems}</div>
        <div className="text-sm text-gray-500">Total Items</div>
        <div className="text-xs text-gray-400 mt-1">
          Average items per shipment: {avgItems}
        </div>
      </div>
      {/* Add more summary boxes if needed */}
    </div>
  </div>
);

export default AllShipmentsSummary;
