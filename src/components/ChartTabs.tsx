"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// クライアントサイドのみで実行されるようにdynamicインポートを使用
const HighchartsDemo = dynamic(() => import("@/components/HighchartsDemo"), {
  ssr: false,
});

const ChartJsDemo = dynamic(() => import("@/components/ChartJsDemo"), {
  ssr: false,
});

type TabType = "highcharts" | "chartjs";

const ChartTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("highcharts");

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("highcharts")}
              className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === "highcharts"
                  ? "border-blue-500 text-blue-600"
                  : ""
              }`}
            >
              Highcharts
            </button>
            <button
              onClick={() => setActiveTab("chartjs")}
              className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === "chartjs" ? "border-blue-500 text-blue-600" : ""
              }`}
            >
              Chart.js
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "highcharts" && <HighchartsDemo />}
        {activeTab === "chartjs" && <ChartJsDemo />}
      </div>
    </div>
  );
};

export default ChartTabs;
