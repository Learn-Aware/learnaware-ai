"use client";

import { Layout } from "antd";
import Sidebar from "./Sidebar";
import ChatContent from "./ChatContent";

const MainLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Sidebar />
      <ChatContent />
    </Layout>
  );
};

export default MainLayout;
