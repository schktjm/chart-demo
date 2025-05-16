"use client";

import { useEffect, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { factory } from "highcharts/modules/accessibility";
import {
  monthlyData,
  accessData,
  productShareData,
  quarterlyData,
  stackedBarData,
  horizontalBarData,
  radarChartData,
  combinedChartData,
} from "@/data/chartData";

// クライアントサイドでのみ実行する
const HighchartsDemo = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      factory(Highcharts);
    }
  }, []);

  const barOptions = useMemo<Highcharts.Options>(
    () => ({
      title: {
        text: "売上データ（棒グラフ）",
      },
      xAxis: {
        categories: monthlyData.categories,
      },
      series: [
        {
          type: "column",
          name: monthlyData.series[0].name,
          data: monthlyData.series[0].data,
        },
      ],
    }),
    []
  );

  const lineOptions = useMemo<Highcharts.Options>(
    () => ({
      title: {
        text: "月間アクセス数（折れ線グラフ）",
      },
      xAxis: {
        categories: accessData.categories,
      },
      series: [
        {
          type: "line",
          name: accessData.series[0].name,
          data: accessData.series[0].data,
        },
      ],
    }),
    []
  );

  const pieOptions = useMemo<Highcharts.Options>(
    () => ({
      chart: {
        type: "pie",
      },
      title: {
        text: "売上割合（円グラフ）",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          type: "pie",
          name: productShareData.series[0].name,
          data: productShareData.series[0].data.map((item) => ({
            name: item.name,
            y: item.value, // Highchartsは円グラフのデータに'y'プロパティを使用
          })),
        },
      ],
    }),
    []
  );

  const areaOptions = useMemo<Highcharts.Options>(
    () => ({
      chart: {
        type: "area",
      },
      title: {
        text: "四半期売上推移（面積グラフ）",
      },
      xAxis: {
        categories: quarterlyData.categories,
      },
      yAxis: {
        title: {
          text: "売上高（百万円）",
        },
      },
      plotOptions: {
        area: {
          fillOpacity: 0.5,
        },
      },
      series: [
        {
          type: "area",
          name: quarterlyData.series[0].name,
          data: quarterlyData.series[0].data,
        },
      ],
    }),
    []
  );

  // 横棒グラフ
  const horizontalBarOptions = useMemo<Highcharts.Options>(
    () => ({
      chart: {
        type: "bar", // 'bar'は横棒グラフを意味します
      },
      title: {
        text: "部門別売上（横棒グラフ）",
      },
      xAxis: {
        categories: horizontalBarData.categories,
      },
      yAxis: {
        title: {
          text: "売上高（百万円）",
        },
      },
      series: [
        {
          type: "bar",
          name: horizontalBarData.series[0].name,
          data: horizontalBarData.series[0].data,
        },
      ],
    }),
    []
  );

  // 積み上げ棒グラフ
  const stackedBarOptions = useMemo<Highcharts.Options>(
    () => ({
      chart: {
        type: "column",
      },
      title: {
        text: "商品別売上（積み上げ棒グラフ）",
      },
      xAxis: {
        categories: stackedBarData.categories,
      },
      yAxis: {
        title: {
          text: "売上高（百万円）",
        },
      },
      plotOptions: {
        column: {
          stacking: "normal", // 積み上げ表示
        },
      },
      series: stackedBarData.series.map((item) => ({
        type: "column",
        name: item.name,
        data: item.data,
      })),
    }),
    []
  );

  // 複合グラフ（棒グラフと折れ線グラフの組み合わせ）
  const combinedChartOptions = useMemo<Highcharts.Options>(
    () => ({
      title: {
        text: "売上と目標（複合グラフ）",
      },
      xAxis: {
        categories: combinedChartData.categories,
      },
      yAxis: {
        title: {
          text: "金額（百万円）",
        },
      },
      series: combinedChartData.series.map((item) => ({
        type: item.type as "line" | "column",
        name: item.name,
        data: item.data,
      })),
    }),
    []
  );

  // レーダーチャート
  const radarChartOptions = useMemo<Highcharts.Options>(
    () => ({
      chart: {
        // ここがtrueであればレーダーチャートになるはずだけどならない
        polar: true,
      },
      title: {
        text: "レーダーチャート（これはレーダーチャートじゃないです）",
      },
      subtitle: {
        text: "各指標の評価（100点満点）",
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
      },
      xAxis: {
        categories: radarChartData.categories,
        tickmarkPlacement: "on",
        lineWidth: 0,
      },
      yAxis: {
        min: 0,
        max: 100,
        gridLineInterpolation: "polygon",
      },
      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 60,
        },
        column: {
          pointPadding: 0,
          groupPadding: 0,
        },
      },
      tooltip: {
        shared: true,
        pointFormat:
          '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>',
      },
      series: radarChartData.series.map((item) => ({
        type: "line",
        name: item.name,
        data: item.data,
        pointPlacement: "on",
      })),
    }),
    []
  );

  // 基準線付き折れ線グラフ
  const lineWithPlotlinesOptions = useMemo<Highcharts.Options>(
    () => ({
      title: {
        text: "目標ラインあり（基準線付き折れ線グラフ）",
      },
      xAxis: {
        categories: accessData.categories,
      },
      yAxis: {
        title: {
          text: "アクセス数",
        },
        plotLines: [
          {
            value: 3000,
            color: "red",
            dashStyle: "ShortDash",
            width: 2,
            label: {
              text: "目標ライン: 3000",
            },
          },
        ],
      },
      series: [
        {
          type: "line",
          name: accessData.series[0].name,
          data: accessData.series[0].data,
        },
      ],
    }),
    []
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact highcharts={Highcharts} options={barOptions} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">折れ線グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact highcharts={Highcharts} options={lineOptions} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">円グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact highcharts={Highcharts} options={pieOptions} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">面積グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact highcharts={Highcharts} options={areaOptions} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">横棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact
              highcharts={Highcharts}
              options={horizontalBarOptions}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">積み上げ棒グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact
              highcharts={Highcharts}
              options={stackedBarOptions}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">複合グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact
              highcharts={Highcharts}
              options={combinedChartOptions}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">レーダーチャート</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact
              highcharts={Highcharts}
              options={radarChartOptions}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">基準線付き折れ線グラフ</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <HighchartsReact
              highcharts={Highcharts}
              options={lineWithPlotlinesOptions}
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Highchartsの特徴</h3>
        <ul className="list-disc list-inside">
          <li>
            豊富なグラフタイプ（棒グラフ、折れ線グラフ、円グラフ、面積グラフなど）
          </li>
          <li>高度なカスタマイズ性</li>
          <li>インタラクティブな機能（ズーム、ホバー情報など）</li>
          <li>レスポンシブデザイン対応</li>
          <li>アクセシビリティ対応</li>
          <li>商用利用には有料ライセンスが必要</li>
        </ul>
      </div>
    </div>
  );
};

export default HighchartsDemo;
