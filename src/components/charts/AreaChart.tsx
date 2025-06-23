"use client";

import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { quarterlyData } from "@/data/chartData";
import { DataLabelsContext } from "./chartSetup";

const AreaChart = () => {
  // 面積グラフのデータ
  const data = {
    labels: quarterlyData.categories,
    datasets: [
      {
        fill: true,
        label: quarterlyData.series[0].name,
        data: quarterlyData.series[0].data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",
      },
    ],
  };

  // 面積グラフのオプション
  const options: ChartOptions<"line"> = {
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
        text: "四半期売上推移（面積グラフ）",
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
        anchor: "center" as const,
        align: "top" as const,
        offset: -10,
        color: "#2563eb",
        font: {
          weight: "bold" as const,
          size: 11,
        },
        formatter: (value: number, context: DataLabelsContext) => {
          // X軸のラベル（四半期名）を表示
          return context.chart.data.labels?.[context.dataIndex];
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "売上高（百万円）",
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">面積グラフ</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default AreaChart;
