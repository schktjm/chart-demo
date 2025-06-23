"use client";

import { Bar } from "react-chartjs-2";
import { ChartOptions, ChartEvent, ActiveElement, Chart } from "chart.js";
import { monthlyData } from "@/data/chartData";
import { DataLabelsContext } from "./chartSetup";

const BarChart = () => {
  // 棒グラフのデータ
  const data = {
    labels: monthlyData.categories,
    datasets: [
      {
        label: monthlyData.series[0].name,
        data: monthlyData.series[0].data,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  // 棒グラフのオプション
  const options: ChartOptions<"bar"> = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    events: [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove",
      "keydown",
      "keyup",
    ],
    // ホバー設定
    hover: {
      mode: "index" as const,
      intersect: false,
    },
    // 要素レベルでのフォーカス設定 - アウトラインを完全に無効化
    elements: {
      bar: {
        borderWidth: 0, // 通常時はアウトラインなし
        hoverBorderWidth: 0, // ホバー時もアウトラインなし
        borderSkipped: "bottom", // アウトラインスキップ
        borderRadius: 0, // 角丸なし
        hoverBorderRadius: 0, // ホバー時も角丸なし
      },
    },
    plugins: {
      title: {
        display: true,
        text: "売上データ（棒グラフ）※フォーカス時のみアウトライン表示",
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 2,
      },
      chartjs2music: {
        errorCallback: console.error,
        lang: "en", // 日本語対応されていない
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
          // X軸のラベル（月名）を表示
          return context.chart.data.labels?.[context.dataIndex];
        },
      },
    },
    // キーボード操作を有効にする
    onHover: (
      event: ChartEvent,
      activeElements: ActiveElement[],
      chart: Chart
    ) => {
      // マウスカーソルを変更
      if (chart.canvas) {
        chart.canvas.style.cursor =
          activeElements.length > 0 ? "pointer" : "default";
      }
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">棒グラフ</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default BarChart;
