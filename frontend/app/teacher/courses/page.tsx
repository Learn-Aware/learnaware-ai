"use client";
import { useState } from "react";
import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Input,
  Label,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui";

export default function TeacherCourses() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const grades = ["Grade 10", "Grade 11", "Grade 12"];
  const students = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
  const subjects = [
    "Mathematics",
    "Science",
    "History",
    "English",
    "Computer Science",
  ];

  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string | null>(null);

  const handleStudentChange = (student: string) => {
    setSelectedStudents((prev) =>
      prev.includes(student)
        ? prev.filter((s) => s !== student)
        : [...prev, student]
    );
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubjects(value);
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setPdfFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (
      selectedStudents.length === 0 ||
      selectedSubjects === null ||
      pdfFiles.length === 0
    ) {
      alert(
        "Please select at least one student, a subject, and upload at least one PDF."
      );
      return;
    }

    const formData = new FormData();
    formData.append("students", JSON.stringify(selectedStudents));
    formData.append("subject", selectedSubjects);
    pdfFiles.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("PDFs uploaded successfully!");
      } else {
        alert("Failed to upload PDFs.");
      }
    } catch (error) {
      console.error("Error uploading PDFs:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="flex flex-col my-1 mx-0 p-8 bg-white shadow-lg rounded-lg">
      {/* Left Column: Select Students */}
      <CardContent className="flex flex-row pr-4 border-r justify-start gap-8">
        <Card className="px-4">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Select Grade
            </CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {grades.map((grade, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`grade-${index}`}
                  checked={selectedGrade === grade}
                  onCheckedChange={() =>
                    setSelectedGrade((prev) => (prev === grade ? null : grade))
                  }
                />
                <Label htmlFor={`grade-${index}`}>{grade}</Label>
              </div>
            ))}
          </div>
        </Card>
        <Card className="px-4">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Select Students
            </CardTitle>
          </CardHeader>
          <div className="space-y-2">
            {students.map((student, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`student-${index}`}
                  checked={selectedStudents.includes(student)}
                  onCheckedChange={() => handleStudentChange(student)}
                />
                <Label htmlFor={`student-${index}`}>{student}</Label>
              </div>
            ))}
          </div>
        </Card>
      </CardContent>

      {/* Right Column: Select Subject and Upload PDFs */}
      <CardContent className="pl-4">
        <h2 className="text-lg font-bold mb-4">
          Select Subject and Upload PDFs
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="subject" className="block mb-2 font-medium">
              Select a subject:
            </Label>
            <Select onValueChange={handleSubjectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-- Choose a subject --" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject, index) => (
                  <SelectItem key={index} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <Label htmlFor="pdf" className="block mb-2 font-medium">
              Upload PDFs:
            </Label>
            <Input
              type="file"
              id="pdf"
              accept="application/pdf"
              multiple
              onChange={(event) => handleFileChange(event.target.files)}
            />
          </div>

          <CardContent className="mb-4">
            <h3 className="font-medium mb-2">Selected Documents:</h3>
            <ul className="space-y-2">
              {pdfFiles.map((file, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>

          <Button
            className="bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white w-full transition-colors"
            type="submit"
          >
            Upload
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
