import React, { useState } from "react";
import { Row, Col, Card, List, Button, message, Input } from "antd";
import LearningContentUpload from "./LearningContentUpload";

const Settings: React.FC = () => {
  const [quizzes, setQuizzes] = useState<string[]>([]);
  const [quizInput, setQuizInput] = useState<string>("");

  const handleAddQuiz = () => {
    if (quizInput.trim() === "") {
      message.error("Quiz name cannot be empty");
      return;
    }

    setQuizzes([...quizzes, quizInput]);
    message.success("Quiz added successfully");
    setQuizInput("");
  };

  return (
    <Row gutter={16}>
      {/* Learning Content with Upload */}
      <Col span={12}>
        <Card title="Learning Contents">
          <LearningContentUpload />
        </Card>
      </Col>

      {/*Add New Quiz */}
      <Col span={12}>
        <Card title="Add New Quiz">
          <Input
            placeholder="Enter quiz name"
            value={quizInput}
            onChange={(e) => setQuizInput(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleAddQuiz}
            style={{ marginTop: "10px" }}
          >
            Add Quiz
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Settings;
