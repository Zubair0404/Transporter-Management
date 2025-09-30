import React, { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import ShipmentTracking from "./Pages/ShipmentTracking";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={activeTab === "tracking" ? "Shipment Tracking" : "Dashboard"}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activeTab === "tracking" && <ShipmentTracking />}
          {activeTab === "dashboard" && <div>Dashboard Content</div>}
        </main>
      </div>
    </div>
  );
}

export default App;
