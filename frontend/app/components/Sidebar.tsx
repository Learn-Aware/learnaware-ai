"use client";

import { Layout, Typography, Card, Upload, Modal, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Questionnaire from "./Questionnaire";
import { useState } from "react";
const { Sider } = Layout;
const { Text, Title } = Typography;
const { Dragger } = Upload;

const Sidebar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Sider width="30%" theme="dark" className="bg-gray-800 p-8">
      <Title level={2} style={{ color: "white" }}>
        Welcome to the Learnaware AI
      </Title>

      <Card
        title="Upload Content"
        style={{
          marginTop: 20,
          backgroundColor: "#2D3748",
          color: "white",
          borderColor: "#4A5568",
        }}
        headStyle={{ color: "white" }}
      >
        <Text style={{ color: "white" }}>
          Upload your documents or content for analysis here.
        </Text>

        <Dragger
          name="file"
          multiple={true}
          style={{
            backgroundColor: "#1F2937",
            marginTop: 16,
            borderColor: "#4A5568",
            color: "white",
          }}
          listType="text"
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess?.("ok");
            }, 1000);
          }}
          showUploadList={{
            showDownloadIcon: true,
            showRemoveIcon: true,
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: "white" }} />
          </p>
          <p style={{ color: "white" }}>
            Click or drag files to this area to upload
          </p>
          <p style={{ color: "gray" }}>Supported formats: PDF, DOCX, TXT</p>
        </Dragger>
      </Card>

      <Card
        title="Questionnaire"
        style={{
          marginTop: 20,
          backgroundColor: "#2D3748",
          color: "white",
          borderColor: "#4A5568",
        }}
        headStyle={{ color: "white" }}
      >
        <Button
          type="primary"
          className="w-full bg-slate-500 hover:!bg-slate-600"
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          Start Questionnaire
        </Button>
        <Modal
          open={isModalVisible}
          footer={null}
          onCancel={handleCloseModal}
          centered
          width={1000}
        >
          <Questionnaire />
        </Modal>
      </Card>
    </Sider>
  );
};

export default Sidebar;
