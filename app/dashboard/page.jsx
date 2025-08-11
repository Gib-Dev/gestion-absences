"use client";

import PageLayout from "@/components/PageLayout";
import FormAbsence from "@/components/FormAbsence";
import TableAbsences from "@/components/TableAbsences";
import { UI_TEXTS } from "@/constants";

export default function DashboardPage() {
  return (
    <PageLayout requireAuth={true}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {UI_TEXTS.DASHBOARD.TITLE}
        </h1>
        
        <div className="grid gap-8">
          <FormAbsence />
          <TableAbsences />
        </div>
      </div>
    </PageLayout>
  );
}