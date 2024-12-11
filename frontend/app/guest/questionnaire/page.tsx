"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { questions } from "@/data/questions";

const CATEGORY_COUNT = 4;
const QUESTIONS_PER_CATEGORY = 11;

const QuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [categoryProgress, setCategoryProgress] = useState<number[]>(
        Array(CATEGORY_COUNT).fill(0)
    );
    const [completedCategories, setCompletedCategories] = useState<boolean[]>(
        Array(CATEGORY_COUNT).fill(false)
    );

    const handleAnswer = (answer: string) => {
        const categoryIndex = Math.floor(currentQuestionIndex / QUESTIONS_PER_CATEGORY);
        const updatedAnswers = [...answers, answer];
        setAnswers(updatedAnswers);

        const updatedProgress = [...categoryProgress];
        updatedProgress[categoryIndex] += 1;

        if (updatedProgress[categoryIndex] >= 6) {
            const updatedCompleted = [...completedCategories];
            updatedCompleted[categoryIndex] = true;
            setCompletedCategories(updatedCompleted);

            const nextCategoryIndex = (categoryIndex + 1) * QUESTIONS_PER_CATEGORY;
            setCurrentQuestionIndex(nextCategoryIndex);
            setCategoryProgress(updatedProgress);
            return;
        }

        setCategoryProgress(updatedProgress);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const calculateResult = () => {
        return categoryProgress.map((count, index) => ({
            category: `Category ${index + 1}`,
            selectedA: count,
            selectedB: QUESTIONS_PER_CATEGORY - count,
        }));
    };

    if (completedCategories.every((status) => status)) {
        const result = calculateResult();
        return (
            <Card className="m-8 p-4">
                <CardHeader>
                    <CardTitle>Quiz Result</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {result.map((res, index) => (
                            <li key={index}>
                                {res.category}: {res.selectedA} &quot;A&quot; answers, {res.selectedB} &quot;B&quot; answers
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const categoryIndex = Math.floor(currentQuestionIndex / QUESTIONS_PER_CATEGORY);

    return (
        <Card className="m-8 p-4">
            <CardHeader>
                <CardTitle>Category {categoryIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="my-4 text-black text-2xl">Question {currentQuestionIndex + 1}</p>
                <p className="mb-4 text-gray-500 text-lg">{currentQuestion.text}</p>
                <div className="flex-row w-full">
                    <Button className="p-5 mx-10 mb-5 bg-white hover:bg-gray-100 w-[90%] text-gray-600 transition-colors border border-solid border-[hsl(var(--laai-blue))]"
                        onClick={() => handleAnswer("a")}>{currentQuestion.options.a}</Button>
                    <Button className="p-5 mx-10 bg-white hover:bg-gray-100 w-[90%] text-gray-600 transition-colors border border-solid border-[hsl(var(--laai-blue))]"
                        onClick={() => handleAnswer("b")}>{currentQuestion.options.b}</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default QuizPage;
