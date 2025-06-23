"use client";

import { Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { productShareData } from "@/data/chartData";
import { DataLabelsContext } from "./chartSetup";

const PieChart = () => {
  // 円グラフのデータ
  const data = {
    labels: productShareData.series[0].data.map((item) => item.name),
    datasets: [
      {
        label: productShareData.series[0].name,
        data: productShareData.series[0].data.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 円グラフのオプション
  const options: ChartOptions<"pie"> = {
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
        text: "売上割合（円グラフ）",
      },
      chartjs2music: {
        lang: "en",
        axes: {
          r: {
            format: (value: number) => `${value}%`,
          },
        },
      },
      datalabels: {
        color: "black",
        font: {
          weight: "bold" as const,
          size: 12,
        },
        formatter: (value: number, context: DataLabelsContext) => {
          // 各セクションのラベル（商品名）を表示
          return context.chart.data.labels?.[context.dataIndex];
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">円グラフ</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Pie options={options} data={data} />
      </div>
    </div>
  );
};

export default PieChart;
