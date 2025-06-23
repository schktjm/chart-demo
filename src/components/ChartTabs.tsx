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

const PlotlyDemo = dynamic(() => import("@/components/PlotlyDemo"), {
  ssr: false,
});

const AGChartDemo = dynamic(() => import("@/components/AGChartDemo"), {
  ssr: false,
});

type TabType = "highcharts" | "chartjs" | "plotly" | "agchart";

const ChartTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>("chartjs");

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("chartjs")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === "chartjs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Chart.js + Chart2Music
            </button>
            <button
              onClick={() => setActiveTab("highcharts")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === "highcharts"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Highcharts
            </button>
            <button
              onClick={() => setActiveTab("plotly")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === "plotly"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Plotly.js
            </button>
            <button
              onClick={() => setActiveTab("agchart")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === "agchart"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              AG Charts
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "highcharts" && <HighchartsDemo />}
        {activeTab === "chartjs" && <ChartJsDemo />}
        {activeTab === "plotly" && <PlotlyDemo />}
        {activeTab === "agchart" && <AGChartDemo />}
      </div>
    </div>
  );
};

export default ChartTabs;
