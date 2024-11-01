"use client";
import React, { useState } from "react";
import {
  Card,
  Radio,
  Typography,
  Divider,
  Space,
  Steps,
  Row,
  Col,
  Button,
} from "antd";
import { questions, steps } from "../data/questions";

const { Title, Paragraph } = Typography;

const Questionnaire: React.FC = () => {
  const questionsPerCategory = 11; // Number of questions in each category
  const totalCategories = 4; // Total number of categories
  const passingScore = 6; // Score needed to pass the category

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [categoryACount, setCategoryACount] = useState<number[]>(
    Array(totalCategories).fill(0)
  ); // Track A counts per category
  const [categoryBCount, setCategoryBCount] = useState<number[]>(
    Array(totalCategories).fill(0)
  ); // Track B counts per category
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [skippedCategories, setSkippedCategories] = useState<boolean[]>(
    Array(totalCategories).fill(false)
  ); // Track passed categories

  const currentCategoryIndex = Math.floor(
    currentQuestionIndex / questionsPerCategory
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleAnswerChange = (e: any) => {
    const answer = e.target.value;

    // If category is already passed, skip further questions
    if (skippedCategories[currentCategoryIndex]) {
      nextQuestion();
      return;
    }

    // Update answer counts
    if (answer === "a") {
      updateAnswerCount("a");
    } else if (answer === "b") {
      updateAnswerCount("b");
    }

    // Save the answer for the current question
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));

    nextQuestion();
  };

  const updateAnswerCount = (answer: string) => {
    if (answer === "a") {
      const updatedACount = [...categoryACount];
      updatedACount[currentCategoryIndex]++;
      setCategoryACount(updatedACount);

      // Check if user has passed the category with "a" answers
      if (updatedACount[currentCategoryIndex] >= passingScore) {
        skipRemainingQuestionsInCategory();
      }
    } else if (answer === "b") {
      const updatedBCount = [...categoryBCount];
      updatedBCount[currentCategoryIndex]++;
      setCategoryBCount(updatedBCount);

      // Check if user has passed the category with "b" answers
      if (updatedBCount[currentCategoryIndex] >= passingScore) {
        skipRemainingQuestionsInCategory();
      }
    }
  };

  const skipRemainingQuestionsInCategory = () => {
    const updatedSkippedCategories = [...skippedCategories];
    updatedSkippedCategories[currentCategoryIndex] = true;
    setSkippedCategories(updatedSkippedCategories);

    // Move to the next category directly
    const nextCategoryStartIndex =
      (currentCategoryIndex + 1) * questionsPerCategory;
    setCurrentQuestionIndex(nextCategoryStartIndex);
  };

  const nextQuestion = () => {
    // Move to the next question or finish the questionnaire
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const restartQuestionnaire = () => {
    setAnswers({});
    setCategoryACount(Array(totalCategories).fill(0));
    setCategoryBCount(Array(totalCategories).fill(0));
    setCurrentQuestionIndex(0);
    setSkippedCategories(Array(totalCategories).fill(false));
    setIsCompleted(false);
  };

  return (
    <div className="h-full p-4 justify-center items-center bg-slate-300">
      <div className="text-center">
        <Title level={1} className="text-black mt-4">
          Questionnaire
        </Title>
        <Divider />

        <Steps
          className="p-6 rounded-lg bg-white shadow-lg"
          current={currentCategoryIndex}
          items={steps.map((step, index) => ({
            title: step.title,
            description: skippedCategories[index]
              ? "Category Completed"
              : step.description,
          }))}
        />
        <Divider />
      </div>

      <div className="p-4 rounded-lg bg-white shadow-lg mt-20">
        {!isCompleted ? (
          <Card
            title={`Category ${currentCategoryIndex + 1} - Question ${
              currentQuestionIndex + 1
            }`}
            bordered={false}
            className="shadow-lg bg-white"
          >
            <Row justify="space-between">
              <Paragraph className="text-lg font-semibold text-black">
                {currentQuestion.text}
              </Paragraph>
            </Row>

            <Radio.Group
              onChange={handleAnswerChange}
              value={answers[currentQuestionIndex]}
              className="w-full font-semibold text-black"
            >
              <Space direction="vertical">
                <Radio value="a" className="text-lg font-normal text-black">
                  {currentQuestion.options.a}
                </Radio>
                <Radio value="b" className="text-lg font-normal text-black">
                  {currentQuestion.options.b}
                </Radio>
              </Space>
            </Radio.Group>

            <Divider />
            <Row justify="space-between">
              <Col>
                <Paragraph className="text-lg font-semibold text-black">
                  A Count (Category {currentCategoryIndex + 1}):{" "}
                  {categoryACount[currentCategoryIndex]}
                </Paragraph>
              </Col>
              <Col>
                <Paragraph className="text-lg font-semibold text-black">
                  B Count (Category {currentCategoryIndex + 1}):{" "}
                  {categoryBCount[currentCategoryIndex]}
                </Paragraph>
              </Col>
            </Row>
          </Card>
        ) : (
          <div>
            <Card
              title="Results"
              bordered={false}
              className="shadow-lg bg-white"
            >
              <Paragraph className="text-lg font-semibold text-black">
                You have completed the questionnaire.
              </Paragraph>
              <Paragraph className="text-lg">
                <strong>Total A Count:</strong>{" "}
                {categoryACount.reduce((a, b) => a + b, 0)}
              </Paragraph>
              <Paragraph className="text-lg">
                <strong>Total B Count:</strong>{" "}
                {categoryBCount.reduce((a, b) => a + b, 0)}
              </Paragraph>

              <Divider />

              <Title level={4}>Answers by Category:</Title>

              <div>
                <Title level={5}>A Category Answers:</Title>
                {Object.entries(answers)
                  .filter(([_, answer]) => answer === "a")
                  .map(([key]) => (
                    <Paragraph key={key}>
                      {`Question ${parseInt(key) + 1}: ${
                        questions[parseInt(key)].options.a
                      }`}
                    </Paragraph>
                  ))}
              </div>

              <div>
                <Title level={5}>B Category Answers:</Title>
                {Object.entries(answers)
                  .filter(([_, answer]) => answer === "b")
                  .map(([key]) => (
                    <Paragraph key={key}>
                      {`Question ${parseInt(key) + 1}: ${
                        questions[parseInt(key)].options.b
                      }`}
                    </Paragraph>
                  ))}
              </div>

              <Button
                type="primary"
                onClick={restartQuestionnaire}
                className="mt-4"
              >
                Restart Questionnaire
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
