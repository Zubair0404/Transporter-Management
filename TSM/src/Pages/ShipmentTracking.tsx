import React, { useState } from "react";
import { Copy, Printer, Share2 } from "lucide-react";
import AllShipmentsSummary from "../components/shipmenttrackingpage/AllShipmentsSummary";

interface ShipmentStatusType {
  date: string;
  status: string;
  location?: string;
  note?: string;
}

interface ShipmentDetails {
  trackingNumber: string;
  type: string;
  packagesCount: number;
  status: string;
  estimatedDelivery: string;
  currentLocation: string;
  lastUpdated: string;
  progressPercent: number;
  origin: {
    city: string;
    shippedDate: string;
  };
  destination: {
    city: string;
    expectedDate: string;
  };
  timeline: ShipmentStatusType[];
}

const sampleShipment: ShipmentDetails = {
  trackingNumber: "ABC-508036",
  type: "LTL Shipment",
  packagesCount: 3,
  status: "In Transit",
  estimatedDelivery: "Fri, May 19",
  currentLocation: "Columbus, OH",
  lastUpdated: "02:22 PM • May 17",
  progressPercent: 60,
  origin: {
    city: "Los Angeles, CA",
    shippedDate: "Monday, May 15, 2023",
  },
  destination: {
    city: "New York, NY",
    expectedDate: "Friday, May 19, 2023",
  },
  timeline: [
    { date: "2023-05-15", status: "Shipped from Los Angeles" },
    { date: "2023-05-16", status: "Arrived at Sorting Center", location: "Columbus, OH" },
    { date: "2023-05-17", status: "In Transit", location: "Ohio" },
  ],
};

const ShipmentTracking: React.FC = () => {
  const [trackingInput, setTrackingInput] = useState("");
  const [shipment, setShipment] = useState<ShipmentDetails | null>(sampleShipment);

  const handleTrackShipment = () => {
    // API call to fetch shipment by trackingInput to be implemented
    alert(`Tracking for ${trackingInput} - API call to be implemented`);
  };

  return (
    <div className="space-y-6 p-6 max-w-5xl mx-auto">

      {/* All Shipments Summary Section */}
      <AllShipmentsSummary
        totalShipments={5}
        shipmentsStatus={{ inTransit: 3, delivered: 1, pending: 1 }}
        totalWeight="15,800 kg"
        avgWeight="3,160 kg"
        totalValue="$139,450"
        avgValue="$27,890"
        totalItems={443}
        avgItems={89}
      />

      {/* Search Shipment */}
      <div className="bg-white rounded-lg p-6 shadow flex flex-col md:flex-row items-center gap-4">
        <input
          value={trackingInput}
          onChange={(e) => setTrackingInput(e.target.value)}
          placeholder="Enter tracking number"
          className="w-full max-w-md border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleTrackShipment}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Track Shipment
        </button>
      </div>

      {/* Shipment Summary and Details */}
      {shipment && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Shipment {shipment.trackingNumber}
              </h2>
              <div className="text-sm text-gray-500 mb-2">
                {shipment.type} · {shipment.packagesCount} packages
              </div>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold">{shipment.status}</span>
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <button className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100">
                <Copy size={16} /> Copy
              </button>
              <button className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100">
                <Printer size={16} /> Print
              </button>
              <button className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700">
            <div>
              <div className="text-xs uppercase font-semibold text-gray-400 mb-1">Estimated Delivery</div>
              <div className="font-semibold">{shipment.estimatedDelivery}</div>
            </div>
            <div>
              <div className="text-xs uppercase font-semibold text-gray-400 mb-1">Current Location</div>
              <div className="font-semibold">{shipment.currentLocation}</div>
            </div>
            <div>
              <div className="text-xs uppercase font-semibold text-gray-400 mb-1">Last Updated</div>
              <div className="font-semibold">{shipment.lastUpdated}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2">
            <div className="text-gray-500 text-sm mb-1">Shipment Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${shipment.progressPercent}%` }}
              />
            </div>
            <div className="text-right text-xs text-gray-400 mt-1">{shipment.progressPercent}% Complete</div>
          </div>

          {/* From - To */}
          <div className="flex justify-between bg-gray-50 p-4 rounded mt-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-1">Origin</h3>
              <div className="font-semibold">{shipment.origin.city}</div>
              <div className="text-gray-500 text-sm">Shipped on {shipment.origin.shippedDate}</div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-1">Destination</h3>
              <div className="font-semibold">{shipment.destination.city}</div>
              <div className="text-gray-500 text-sm">Expected by {shipment.destination.expectedDate}</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-6">
            <h3 className="font-bold mb-3">Timeline</h3>
            <ul className="space-y-4 border-l border-gray-300 pl-4">
              {shipment.timeline.map((event, idx) => (
                <li key={idx} className="relative">
                  <span className="absolute -left-5 top-1.5 w-3 h-3 bg-blue-600 rounded-full"></span>
                  <div className="text-sm font-semibold">{event.status}</div>
                  <div className="text-xs text-gray-500">{event.date}{event.location ? ` - ${event.location}` : ""}</div>
                  {event.note && <div className="text-xs text-gray-400">{event.note}</div>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentTracking;
