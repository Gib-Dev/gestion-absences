"use client";

import FormAbsence from "@/components/FormAbsence";
import TableAbsences from "@/components/TableAbsences";
import DashboardStats from "@/components/DashboardStats";
import { UI_TEXTS } from "@/constants";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {UI_TEXTS.DASHBOARD.TITLE}
      </h1>
      
      <div className="grid gap-8">
        <DashboardStats />
        <FormAbsence />
        <TableAbsences />
      </div>
    </div>
  );
}