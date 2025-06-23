"use client";

import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { horizontalBarData } from "@/data/chartData";
import { DataLabelsContext } from "./chartSetup";

const HorizontalBarChart = () => {
  // 横棒グラフのデータ
  const data = {
    labels: horizontalBarData.categories,
    datasets: [
      {
        label: horizontalBarData.series[0].name,
        data: horizontalBarData.series[0].data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // 横棒グラフのオプション
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: "y" as const,
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
        text: "部門別売上（横棒グラフ）",
      },
      chartjs2music: {
        lang: "en",
        axes: {
          x: {
            format: (value: number) => `${value}百万円`,
          },
        },
      },
      datalabels: {
        anchor: "end" as const,
        align: "right" as const,
        offset: 5,
        color: "#1f2937",
        font: {
          weight: "bold" as const,
          size: 11,
        },
        formatter: (value: number, context: DataLabelsContext) => {
          // Y軸のラベル（部門名）を表示
          return context.chart.data.labels?.[context.dataIndex];
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "売上高（百万円）",
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">横棒グラフ</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default HorizontalBarChart;
