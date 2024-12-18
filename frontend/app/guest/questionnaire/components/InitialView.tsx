import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

const InitialView = ({ handleStartQuiz }: { handleStartQuiz: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <CardHeader>
                <CardTitle className="text-3xl font-semibold text-center mt-4 mb-2">
                    Welcome to LAAI! Let&apos;s Personalize Your Learning Journey
                </CardTitle>
            </CardHeader>
            <p className="text-lg text-center text-gray-500 mb-2">
                To provide you with the best possible experience, we&apos;d like to
                learn a bit about your goals, preferences, and background. Please take a
                few moments to answer the following questions. Your responses will help
                us create a customized learning plan just for you!
            </p>
            <div className="relative h-[50vh] w-[100vh]">
                <Image
                    src="/images/initial_questions.svg"
                    alt="Teacher"
                    fill
                    className="w-full h-full object-contain mt-8 mb-6"
                />
            </div>
            <Button
                className="mt-8 p-4 bg-[hsl(var(--laai-blue))] text-white hover:bg-blue-700"
                onClick={handleStartQuiz}
            >
                Start the Quiz
            </Button>
        </div>
    );
};

export default InitialView;
