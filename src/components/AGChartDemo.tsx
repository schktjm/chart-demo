"use client";

import { AgChartOptions } from "ag-charts-community";
import { AgCharts } from "ag-charts-react";
import {
  monthlyData,
  accessData,
  productShareData,
  quarterlyData,
  stackedBarData,
  horizontalBarData,
} from "@/data/chartData";

// 棒グラフの設定
const barChartOptions: AgChartOptions = {
  title: {
    text: "売上データ（棒グラフ）",
  },
  data: monthlyData.categories.map((month, index) => ({
    month,
    revenue: monthlyData.series[0].data[index],
  })),
  series: [
    {
      type: "bar",
      xKey: "month",
      yKey: "revenue",
      yName: monthlyData.series[0].name,
      fill: "rgba(53, 162, 235, 0.5)",
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "売上高",
      },
    },
  ],
};

// 折れ線グラフの設定
const lineChartOptions: AgChartOptions = {
  title: {
    text: "月間アクセス数（折れ線グラフ）",
  },
  data: accessData.categories.map((month, index) => ({
    month,
    access: accessData.series[0].data[index],
  })),
  series: [
    {
      type: "line",
      xKey: "month",
      yKey: "access",
      yName: accessData.series[0].name,
      stroke: "rgb(255, 99, 132)",
      marker: {
        fill: "rgba(255, 99, 132, 0.5)",
        stroke: "rgb(255, 99, 132)",
      },
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "アクセス数",
      },
    },
  ],
};

// 円グラフの設定
const pieChartOptions: AgChartOptions = {
  title: {
    text: "売上割合（円グラフ）",
  },
  data: productShareData.series[0].data,
  series: [
    {
      type: "pie",
      angleKey: "value",
      calloutLabelKey: "name",
      sectorLabelKey: "value",
      sectorLabel: {
        formatter: (params: { value: number }) => `${params.value}%`,
      },
      fills: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
    },
  ],
};

// 面積グラフの設定
const areaChartOptions: AgChartOptions = {
  title: {
    text: "四半期売上推移（面積グラフ）",
  },
  data: quarterlyData.categories.map((quarter, index) => ({
    quarter,
    revenue: quarterlyData.series[0].data[index],
  })),
  series: [
    {
      type: "area",
      xKey: "quarter",
      yKey: "revenue",
      yName: quarterlyData.series[0].name,
      fill: "rgba(53, 162, 235, 0.3)",
      stroke: "rgb(53, 162, 235)",
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "売上高（百万円）",
      },
    },
  ],
};

// 横棒グラフの設定
const horizontalBarChartOptions: AgChartOptions = {
  title: {
    text: "部門別売上（横棒グラフ）",
  },
  data: horizontalBarData.categories.map((department, index) => ({
    department,
    revenue: horizontalBarData.series[0].data[index],
  })),
  series: [
    {
      type: "bar",
      yKey: "revenue",
      xKey: "department",
      yName: horizontalBarData.series[0].name,
      direction: "horizontal",
      fill: "rgba(75, 192, 192, 0.6)",
    },
  ],
  axes: [
    {
      type: "number",
      position: "bottom",
      title: {
        text: "売上高（百万円）",
      },
      keys: ["revenue"],
    },
    {
      type: "category",
      position: "left",
      keys: ["department"],
    },
  ],
};
console.log(horizontalBarChartOptions);

// 積み上げ棒グラフの設定
const stackedBarChartOptions: AgChartOptions = {
  title: {
    text: "商品別売上（積み上げ棒グラフ）",
  },
  data: stackedBarData.categories.map((month, index) => ({
    month,
    productA: stackedBarData.series[0].data[index],
    productB: stackedBarData.series[1].data[index],
    productC: stackedBarData.series[2].data[index],
  })),
  series: [
    {
      type: "bar",
      xKey: "month",
      yKey: "productA",
      yName: stackedBarData.series[0].name,
      stacked: true,
      fill: "rgba(255, 99, 132, 0.6)",
    },
    {
      type: "bar",
      xKey: "month",
      yKey: "productB",
      yName: stackedBarData.series[1].name,
      stacked: true,
      fill: "rgba(54, 162, 235, 0.6)",
    },
    {
      type: "bar",
      xKey: "month",
      yKey: "productC",
      yName: stackedBarData.series[2].name,
      stacked: true,
      fill: "rgba(255, 206, 86, 0.6)",
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "売上高（百万円）",
      },
    },
  ],
};

// 複合グラフの設定
const combinedChartOptions: AgChartOptions = {
  title: {
    text: "売上と目標（複合グラフ）",
  },
  data: stackedBarData.categories.map((month, index) => ({
    month,
    revenue: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0][index],
    target: [60, 80, 110, 130, 150, 180][index],
  })),
  series: [
    {
      type: "bar",
      xKey: "month",
      yKey: "revenue",
      yName: "売上高",
      fill: "rgba(53, 162, 235, 0.5)",
    },
    {
      type: "line",
      xKey: "month",
      yKey: "target",
      yName: "目標",
      stroke: "rgb(255, 99, 132)",
      marker: {
        fill: "rgba(255, 99, 132, 0.5)",
        stroke: "rgb(255, 99, 132)",
      },
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "金額（百万円）",
      },
    },
  ],
};

// 基準線付き折れ線グラフの設定
const lineWithPlotlineChartOptions: AgChartOptions = {
  title: {
    text: "目標ラインあり（基準線付き折れ線グラフ）",
  },
  data: accessData.categories.map((month, index) => ({
    month,
    access: accessData.series[0].data[index],
  })),
  series: [
    {
      type: "line",
      xKey: "month",
      yKey: "access",
      yName: accessData.series[0].name,
      stroke: "rgb(75, 192, 192)",
      marker: {
        fill: "rgba(75, 192, 192, 0.5)",
        stroke: "rgb(75, 192, 192)",
      },
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "アクセス数",
      },
      // 基準線の追加
      gridLine: {
        style: [
          {
            stroke: "rgb(255, 99, 132)",
            lineDash: [5, 5],
          },
        ],
      },
      crossLines: [
        {
          type: "line",
          value: 3000,
          label: {
            text: "目標ライン: 3000",
            position: "right",
          },
          stroke: "rgb(255, 99, 132)",
          lineDash: [5, 5],
        },
      ],
    },
  ],
};

const AGChartDemo = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div style={{ width: "100%", height: "300px" }}>
              <AgCharts options={barChartOptions} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">折れ線グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div style={{ width: "100%", height: "300px" }}>
              <AgCharts options={lineChartOptions} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">円グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div style={{ width: "100%", height: "300px" }}>
              <AgCharts options={pieChartOptions} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">面積グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div style={{ width: "100%", height: "300px" }}>
              <AgCharts options={areaChartOptions} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">横棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div style={{ width: "100%", height: "300px" }}>
              <AgCharts options={horizontalBarChartOptions} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">積み上げ棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div style={{ width: "100%", height: "300px" }}>
              <AgCharts options={stackedBarChartOptions} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">複合グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div style={{ width: "100%", height: "300px" }}>
              <AgCharts options={combinedChartOptions} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">基準線付き折れ線グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div style={{ width: "100%", height: "300px" }}>
              <AgCharts options={lineWithPlotlineChartOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">AG Chartsの特徴</h3>
        <ul className="list-disc list-inside">
          <li>レーダーチャートは無料では使えない</li>
          <li>Reactのライブラリとして完成度は高い(TypeScript対応)</li>
        </ul>
      </div>
    </div>
  );
};

export default AGChartDemo;
