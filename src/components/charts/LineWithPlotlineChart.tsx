"use client";

import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { accessData } from "@/data/chartData";
import { DataLabelsContext } from "./chartSetup";

const LineWithPlotlineChart = () => {
  // 基準線付き折れ線グラフのデータ
  const data = {
    labels: accessData.categories,
    datasets: [
      {
        label: accessData.series[0].name,
        data: accessData.series[0].data,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // 基準線付き折れ線グラフのオプション
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
        text: "目標ラインあり（基準線付き折れ線グラフ）",
      },
      chartjs2music: {
        lang: "en",
        axes: {
          y: {
            format: (value: number) => `${value}回`,
          },
        },
      },
      datalabels: {
        anchor: "center" as const,
        align: "top" as const,
        offset: -10,
        color: "#059669",
        font: {
          weight: "bold" as const,
          size: 11,
        },
        formatter: (value: number, context: DataLabelsContext) => {
          // X軸のラベル（月名）を表示
          return context.chart.data.labels?.[context.dataIndex];
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line" as const,
            yMin: 3000,
            yMax: 3000,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: "目標ライン: 3000",
              position: "start" as const,
            },
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "アクセス数",
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">基準線付き折れ線グラフ</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineWithPlotlineChart;
