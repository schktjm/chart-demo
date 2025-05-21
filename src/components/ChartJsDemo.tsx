"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Bar, Line, Pie, Radar, Chart } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import chartjs2music from "chartjs-plugin-chart2music";
import {
  monthlyData,
  accessData,
  productShareData,
  quarterlyData,
  stackedBarData,
  horizontalBarData,
  radarChartData,
} from "@/data/chartData";

// Chart.jsコンポーネントの登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin,
  chartjs2music
);

// 棒グラフのデータと設定
const barChartData = {
  labels: monthlyData.categories,
  datasets: [
    {
      label: monthlyData.series[0].name,
      data: monthlyData.series[0].data,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const barChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "売上データ（棒グラフ）",
    },
    chartjs2music: {
      // Chart2Musicのオプション
      errorCallback: console.error,
      lang: "en", // 言語設定
      axes: {
        y: {
          format: (value: number) => `${value}百万円`,
        },
      },
    },
  },
};

// 折れ線グラフのデータと設定
const lineChartData = {
  labels: accessData.categories,
  datasets: [
    {
      label: accessData.series[0].name,
      data: accessData.series[0].data,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "月間アクセス数（折れ線グラフ）",
    },
    chartjs2music: {
      lang: "en",
      axes: {
        y: {
          format: (value: number) => `${value}回`,
        },
      },
    },
  },
};

// 円グラフのデータと設定
const pieChartData = {
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

const pieChartOptions = {
  responsive: true,
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
  },
};

// 面積グラフのデータと設定
const areaChartData = {
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

const areaChartOptions = {
  responsive: true,
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

// 横棒グラフのデータと設定
const horizontalBarChartData = {
  labels: horizontalBarData.categories,
  datasets: [
    {
      label: horizontalBarData.series[0].name,
      data: horizontalBarData.series[0].data,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

const horizontalBarChartOptions = {
  responsive: true,
  indexAxis: "y" as const, // 横棒グラフにするための設定
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

// 積み上げ棒グラフのデータと設定
const stackedBarChartData = {
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

const stackedBarChartOptions = {
  responsive: true,
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

// 複合グラフのデータと設定
const combinedChartDataConfig = {
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

const combinedChartOptions = {
  responsive: true,
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

// レーダーチャートのデータと設定
const radarChartDataConfig = {
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

const radarChartOptions = {
  responsive: true,
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
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      beginAtZero: true,
    },
  },
};

// 基準線付き折れ線グラフのデータと設定
const lineWithPlotlineChartData = {
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

const lineWithPlotlineChartOptions = {
  responsive: true,
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

const ChartJsDemo = () => {
  return (
    <div className="space-y-8">
      <div className="text-lg font-bold">⚠️音がでます</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">折れ線グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Line options={lineChartOptions} data={lineChartData} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">円グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Pie options={pieChartOptions} data={pieChartData} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">面積グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Line options={areaChartOptions} data={areaChartData} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">横棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Bar
              options={horizontalBarChartOptions}
              data={horizontalBarChartData}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">積み上げ棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Bar options={stackedBarChartOptions} data={stackedBarChartData} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">複合グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Chart
              type="bar"
              options={combinedChartOptions}
              data={combinedChartDataConfig}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">レーダーチャート</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Radar options={radarChartOptions} data={radarChartDataConfig} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">基準線付き折れ線グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Line
              options={lineWithPlotlineChartOptions}
              data={lineWithPlotlineChartData}
            />
          </div>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Chart.jsの特徴</h3>
        <ul className="list-disc list-inside">
          <li>オープンソースで無料（MITライセンス）</li>
          <li>軽量で高速</li>
          <li>Chart2Musicプラグインを使用してアクセシビリティを向上</li>
          <li>キーボードでチャートを探索し、サウンドでデータを表現可能</li>
          <li>スクリーンリーダー対応でチャート情報をテキストで提供</li>
        </ul>
      </div>
    </div>
  );
};

export default ChartJsDemo;
