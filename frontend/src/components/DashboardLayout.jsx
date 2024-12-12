import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="dashboard-container">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <main className={`dashboard-content ${collapsed ? "collapsed" : "expanded"}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
