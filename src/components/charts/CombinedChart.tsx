"use client";

import { Chart as ReactChart } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { stackedBarData } from "@/data/chartData";
import { DataLabelsContext } from "./chartSetup";

const CombinedChart = () => {
  // 複合グラフのデータ
  const data = {
    labels: stackedBarData.categories,
    datasets: [
      {
        type: "bar" as const,
        label: "売上高",
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        order: 1,
      },
      {
        type: "line" as const,
        label: "目標",
        data: [60, 80, 110, 130, 150, 180],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        order: 0,
      },
    ],
  };

  // 複合グラフのオプション
  const options: ChartOptions<"bar"> = {
    responsive: true,
    events: [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove",
      "keydown",
      "keyup",
    ],
    plugins: {
      title: {
        display: true,
        text: "売上と目標（複合グラフ）",
      },
      chartjs2music: {
        lang: "en",
        axes: {
          y: {
            format: (value: number) => `${value}百万円`,
          },
        },
      },
      datalabels: {
        formatter: (value: number, context: DataLabelsContext) => {
          // X軸のラベル（月名など）を表示
          return context.chart.data.labels?.[context.dataIndex];
        },
        color: (context: DataLabelsContext) => {
          return context.dataset.type === "bar" ? "#2563eb" : "#dc2626";
        },
        anchor: "end" as const,
        align: "top" as const,
        offset: 5,
        font: {
          weight: "bold" as const,
          size: 10,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "金額（百万円）",
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">複合グラフ</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <ReactChart type="bar" options={options} data={data} />
      </div>
    </div>
  );
};

export default CombinedChart;
