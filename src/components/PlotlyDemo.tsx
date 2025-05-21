"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  monthlyData,
  accessData,
  productShareData,
  quarterlyData,
  stackedBarData,
  horizontalBarData,
  radarChartData,
} from "@/data/chartData";

// Plotlyをクライアントサイドでのみ読み込むためにdynamic importを使用
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const PlotlyDemo = () => {
  // レンダリング時にwindowオブジェクトが存在するかを確認するためのstate
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // クライアントサイドでのみレンダリングするためのチェック
  if (!isMounted) {
    return null;
  }

  // 棒グラフの設定
  const barChartData = [
    {
      type: "bar",
      x: monthlyData.categories,
      y: monthlyData.series[0].data,
      name: monthlyData.series[0].name,
      marker: {
        color: "rgba(53, 162, 235, 0.5)",
      },
    },
  ];

  const barChartLayout = {
    title: "売上データ（棒グラフ）",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
    yaxis: {
      title: "売上高",
    },
  };

  const chartConfig = {
    responsive: true,
  };

  // 折れ線グラフの設定
  const lineChartData = [
    {
      type: "scatter",
      mode: "lines+markers",
      x: accessData.categories,
      y: accessData.series[0].data,
      name: accessData.series[0].name,
      line: {
        color: "rgb(255, 99, 132)",
      },
      marker: {
        color: "rgba(255, 99, 132, 0.5)",
      },
    },
  ];

  const lineChartLayout = {
    title: "月間アクセス数（折れ線グラフ）",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
    yaxis: {
      title: "アクセス数",
    },
  };

  // 円グラフの設定
  const pieChartData = [
    {
      type: "pie",
      labels: productShareData.series[0].data.map((item) => item.name),
      values: productShareData.series[0].data.map((item) => item.value),
      name: productShareData.series[0].name,
      marker: {
        colors: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    },
  ];

  const pieChartLayout = {
    title: "売上割合（円グラフ）",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
  };

  // 面積グラフの設定
  const areaChartData = [
    {
      type: "scatter",
      mode: "lines",
      x: quarterlyData.categories,
      y: quarterlyData.series[0].data,
      name: quarterlyData.series[0].name,
      fill: "tozeroy",
      line: {
        color: "rgb(53, 162, 235)",
      },
      fillcolor: "rgba(53, 162, 235, 0.3)",
    },
  ];

  const areaChartLayout = {
    title: "四半期売上推移（面積グラフ）",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
    yaxis: {
      title: "売上高（百万円）",
    },
  };

  // 横棒グラフの設定
  const horizontalBarChartData = [
    {
      type: "bar",
      orientation: "h",
      y: horizontalBarData.categories,
      x: horizontalBarData.series[0].data,
      name: horizontalBarData.series[0].name,
      marker: {
        color: "rgba(75, 192, 192, 0.6)",
      },
    },
  ];

  const horizontalBarChartLayout = {
    title: "部門別売上（横棒グラフ）",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
    xaxis: {
      title: "売上高（百万円）",
    },
  };

  // 積み上げ棒グラフの設定
  const stackedBarChartData = stackedBarData.series.map((item, index) => {
    const colors = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
    ];
    return {
      type: "bar",
      x: stackedBarData.categories,
      y: item.data,
      name: item.name,
      marker: {
        color: colors[index % colors.length],
      },
    };
  });

  const stackedBarChartLayout = {
    title: "商品別売上（積み上げ棒グラフ）",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
    barmode: "stack",
    yaxis: {
      title: "売上高（百万円）",
    },
  };

  // 複合グラフの設定
  const combinedChartData = [
    {
      type: "bar",
      x: stackedBarData.categories,
      y: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0],
      name: "売上高",
      marker: {
        color: "rgba(53, 162, 235, 0.5)",
      },
    },
    {
      type: "scatter",
      mode: "lines+markers",
      x: stackedBarData.categories,
      y: [60, 80, 110, 130, 150, 180],
      name: "目標",
      line: {
        color: "rgb(255, 99, 132)",
      },
      marker: {
        color: "rgba(255, 99, 132, 0.5)",
      },
    },
  ];

  const combinedChartLayout = {
    title: "売上と目標（複合グラフ）",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
    yaxis: {
      title: "金額（百万円）",
    },
  };

  // レーダーチャートの設定
  const radarChartDataPoints = radarChartData.series.map((item, index) => {
    const colors = ["rgb(255, 99, 132)", "rgb(53, 162, 235)"];
    return {
      type: "scatterpolar",
      r: item.data,
      theta: radarChartData.categories,
      fill: "toself",
      name: item.name,
      line: {
        color: colors[index % colors.length],
      },
      fillcolor:
        index === 0 ? "rgba(255, 99, 132, 0.4)" : "rgba(53, 162, 235, 0.4)",
    };
  });

  const radarChartLayout = {
    title: "レーダーチャート",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 100],
      },
    },
    showlegend: true,
  };

  // 基準線付き折れ線グラフの設定
  const lineWithPlotlineChartData = [
    {
      type: "scatter",
      mode: "lines+markers",
      x: accessData.categories,
      y: accessData.series[0].data,
      name: accessData.series[0].name,
      line: {
        color: "rgb(75, 192, 192)",
      },
      marker: {
        color: "rgba(75, 192, 192, 0.5)",
      },
    },
  ];

  const lineWithPlotlineChartLayout = {
    title: "目標ラインあり（基準線付き折れ線グラフ）",
    responsive: true,
    width: undefined,
    height: undefined,
    autosize: true,
    yaxis: {
      title: "アクセス数",
    },
    shapes: [
      {
        type: "line",
        xref: "paper",
        x0: 0,
        y0: 3000,
        x1: 1,
        y1: 3000,
        line: {
          color: "rgb(255, 99, 132)",
          width: 2,
          dash: "dash",
        },
      },
    ],
    annotations: [
      {
        xref: "paper",
        x: 0,
        y: 3000,
        xanchor: "left",
        yanchor: "middle",
        text: "目標ライン: 3000",
        showarrow: false,
        font: {
          color: "rgb(255, 99, 132)",
        },
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={barChartData}
              layout={barChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">折れ線グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={lineChartData}
              layout={lineChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">円グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={pieChartData}
              layout={pieChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">面積グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={areaChartData}
              layout={areaChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">横棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={horizontalBarChartData}
              layout={horizontalBarChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">積み上げ棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={stackedBarChartData}
              layout={stackedBarChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">複合グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={combinedChartData}
              layout={combinedChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">レーダーチャート</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={radarChartDataPoints}
              layout={radarChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">基準線付き折れ線グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Plot
              data={lineWithPlotlineChartData}
              layout={lineWithPlotlineChartLayout}
              config={chartConfig}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Plotly.jsの特徴</h3>
        <ul className="list-disc list-inside">
          <li>
            Plotlyで別のデータ可視化の仕組みがあり、それとバッティングしてググらビリティが低い
          </li>
          <li>
            おそらくホバーで表示するツールチップをキーボード操作で表示できるオプションはなさそう
            https://plotly.com/javascript/plotlyjs-events/
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlotlyDemo;
