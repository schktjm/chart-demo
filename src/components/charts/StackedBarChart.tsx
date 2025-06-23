"use client";

import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { stackedBarData } from "@/data/chartData";
import { DataLabelsContext } from "./chartSetup";

const StackedBarChart = () => {
  // 積み上げ棒グラフのデータ
  const data = {
    labels: stackedBarData.categories,
    datasets: stackedBarData.series.map((item, index) => {
      const colors = [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
      ];
      return {
        label: item.name,
        data: item.data,
        backgroundColor: colors[index % colors.length],
      };
    }),
  };

  // 積み上げ棒グラフのオプション
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
        text: "商品別売上（積み上げ棒グラフ）",
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
        color: "white",
        font: {
          weight: "bold" as const,
          size: 10,
        },
        formatter: (value: number, context: DataLabelsContext) => {
          // データセットのラベル（商品名）を表示
          return context.dataset.label;
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "売上高（百万円）",
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">積み上げ棒グラフ</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default StackedBarChart;
