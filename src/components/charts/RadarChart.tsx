"use client";

import { Radar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { radarChartData } from "@/data/chartData";
import { DataLabelsContext } from "./chartSetup";

const RadarChart = () => {
  // レーダーチャートのデータ
  const data = {
    labels: radarChartData.categories,
    datasets: radarChartData.series.map((item, index) => {
      const colors = ["rgba(255, 99, 132, 0.4)", "rgba(53, 162, 235, 0.4)"];
      const borderColors = ["rgb(255, 99, 132)", "rgb(53, 162, 235)"];
      return {
        label: item.name,
        data: item.data,
        backgroundColor: colors[index % colors.length],
        borderColor: borderColors[index % borderColors.length],
        borderWidth: 2,
      };
    }),
  };

  // レーダーチャートのオプション
  const options: ChartOptions<"radar"> = {
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
        text: "レーダーチャート",
      },
      subtitle: {
        display: true,
        text: "各指標の評価（100点満点）",
      },
      chartjs2music: {
        lang: "en",
        axes: {
          r: {
            format: (value: number) => `${value}点`,
          },
        },
      },
      datalabels: {
        color: (context: DataLabelsContext) => {
          const colors = ["#dc2626", "#2563eb"];
          return colors[context.datasetIndex % colors.length];
        },
        font: {
          weight: "bold" as const,
          size: 10,
        },
        formatter: (value: number, context: DataLabelsContext) => {
          // 各軸のラベル（評価項目名）を表示
          return context.chart.data.labels?.[context.dataIndex];
        },
        offset: 8,
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">レーダーチャート</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Radar options={options} data={data} />
      </div>
    </div>
  );
};

export default RadarChart;
