"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

// ChartJS registration
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

// ✅ Student data
const student = {
  username: "alice123",
  name: "Alice",
  standard: "10th",
  subjects: [
    { name: "Math", marks: 80, teacher: "Mr. Smith", phone: "123-456-7890" },
    { name: "Science", marks: 90, teacher: "Ms. Johnson", phone: "987-654-3210" },
    { name: "English", marks: 70, teacher: "Mr. Brown", phone: "456-789-1230" },
  ],
  previousStandards: [
    {
      standard: "9th",
      subjects: [
        { name: "Math", marks: 75, teacher: "Mr. Smith",  phone: "123-456-7890" },
        { name: "Science", marks: 85, teacher: "Ms. Johnson", phone: "987-654-3210" },
        { name: "English", marks: 65, teacher: "Mr. Brown", phone: "456-789-1230" },
      ],
    },
    {
      standard: "8th",
      subjects: [
        { name: "Math", marks: 70, teacher: "Mr. Smith", phone: "123-456-7890" },
        { name: "Science", marks: 78, teacher: "Ms. Johnson", phone: "987-654-3210" },
        { name: "English", marks: 68, teacher: "Mr. Brown", phone: "456-789-1230" },
      ],
    },
  ],
};

export default function StudentDashboard() {
  const allStandards = [
    {
      standard: student.standard,
      subjects: student.subjects,
    },
    ...student.previousStandards,
  ];

  const [selectedStandard, setSelectedStandard] = useState(student.standard);

  const current = allStandards.find((s) => s.standard === selectedStandard);

  if (!current) return <div className="text-red-500">Standard not found</div>;

  const labels = current.subjects.map((s) => s.name);
  const marks = current.subjects.map((s) => s.marks);

  const pieData = {
    labels,
    datasets: [
      {
        label: "Marks",
        data: marks,
        backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Marks",
        data: marks,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Standard Select */}
      <h2 className="text-3xl font-semibold flex justify-center text-center">{student.name}</h2>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Select Standard</h2>
      </div>
      <div className="max-w-sm">
        <Select
          value={selectedStandard}
          onValueChange={(value) => setSelectedStandard(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Standard" />
          </SelectTrigger>
          <SelectContent>
            {allStandards.map((s) => (
              <SelectItem key={s.standard} value={s.standard}>
                {s.standard}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Charts + Table */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{selectedStandard} - Subject-wise (Pie)</CardTitle>
          </CardHeader>
          <CardContent className="h-64 p-0">
            <Pie data={pieData} />
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{selectedStandard} - Subject-wise (Bar)</CardTitle>
          </CardHeader>
          <CardContent className="h-64 p-0">
            <Bar data={barData} options={barOptions} />
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>{selectedStandard} - Marks Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {current.subjects.map((subject) => (
                  <TableRow key={subject.name}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.marks}</TableCell>
                    <TableCell>{subject.teacher}</TableCell>
                    <TableCell>{subject.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
