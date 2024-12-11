"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { questions } from "@/data/questions";

interface IAnswers {
    a: number;
    b: number;
}

const QuizPage = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<IAnswers[][]>(
        Array(4)
            .fill(null)
            .map((_, subcategoryIndex) =>
                questions.slice(subcategoryIndex * 11, (subcategoryIndex + 1) * 11).map(() => ({ a: 0, b: 0 }))
            )
    );

    const [skippedCategories, setSkippedCategories] = useState<boolean[]>([false, false, false, false]);

    const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

    const handleAnswer = (selectedAnswer: "a" | "b") => {
        const updatedAnswers = [...selectedAnswers];
        const answersForCategory = updatedAnswers[currentCategoryIndex];

        if (selectedAnswer === "a") {
            answersForCategory[currentQuestionIndex].a += 1;
        } else {
            answersForCategory[currentQuestionIndex].b += 1;
        }

        const selectedCountA = answersForCategory.reduce((count, answer) => count + answer.a, 0);
        const selectedCountB = answersForCategory.reduce((count, answer) => count + answer.b, 0);

        if (selectedCountA >= 6 || selectedCountB >= 6) {
            const newSkippedCategories = [...skippedCategories];
            newSkippedCategories[currentCategoryIndex] = true;
            setSkippedCategories(newSkippedCategories);

            if (currentCategoryIndex < 3) {
                setCurrentCategoryIndex(currentCategoryIndex + 1);
                setCurrentQuestionIndex(0);
            }
        } else {
            if (currentQuestionIndex < 10 && !skippedCategories[currentCategoryIndex]) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }

        setSelectedAnswers(updatedAnswers);
    };

    const getCurrentQuestion = (categoryIndex: number, currentQuestionIndex: number) => {
        if (skippedCategories[categoryIndex]) return null;
        return questions.slice(categoryIndex * 11, (categoryIndex + 1) * 11)[currentQuestionIndex];
    };

    const getResults = () => {
        return selectedAnswers.map((answersForCategory, categoryIndex) => {
            const totalA = answersForCategory.reduce((sum, answer) => sum + answer.a, 0);
            const totalB = answersForCategory.reduce((sum, answer) => sum + answer.b, 0);
            return {
                category: `Category ${categoryIndex + 1}`,
                totalA,
                totalB,
                passed: skippedCategories[categoryIndex] ? "Passed" : "Not Passed",
            };
        });
    };

    useEffect(() => {
        if (skippedCategories.every((skipped) => skipped)) {
            setIsQuizCompleted(true);
        }
    }, [skippedCategories]);

    const currentQuestion = getCurrentQuestion(currentCategoryIndex, currentQuestionIndex);

    return (
        <Card className="m-8 p-4 bg-white shadow-lg rounded-lg">
            {isQuizCompleted ? (
                <CardContent>
                    <CardTitle className="text-2xl font-semibold text-center mb-6">Quiz Results</CardTitle>
                    <div className="space-y-6">
                        {getResults().map((result, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800">{result.category}</h3>
                                <p className="text-gray-600">Answers A: <span className="font-semibold">{result.totalA}</span></p>
                                <p className="text-gray-600">Answers B: <span className="font-semibold">{result.totalB}</span></p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            ) : (
                <CardContent>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-gray-500">
                            Step {currentCategoryIndex + 1} of 4
                        </CardTitle>
                    </CardHeader>
                    <p className="my-4 text-gray-800 text-2xl font-medium">Question {currentQuestionIndex + 1} of 11</p>
                    <p className="mb-4 text-gray-500 text-lg">{currentQuestion?.text}</p>
                    <div className="flex flex-col space-y-4">
                        <Button
                            className="p-5 bg-white hover:bg-gray-100 text-gray-600 transition-colors border border-solid border-[hsl(var(--laai-blue))]"
                            onClick={() => handleAnswer("a")}
                        >
                            {currentQuestion?.options.a}
                        </Button>
                        <Button
                            className="p-5 bg-white hover:bg-gray-100 text-gray-600 transition-colors border border-solid border-[hsl(var(--laai-blue))]"
                            onClick={() => handleAnswer("b")}
                        >
                            {currentQuestion?.options.b}
                        </Button>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default QuizPage;
