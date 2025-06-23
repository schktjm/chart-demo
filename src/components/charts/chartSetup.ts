"use client";

// Chart2Musicプラグインの型定義を拡張
declare module "chart.js" {
  interface PluginOptionsByType {
    chartjs2music?: {
      errorCallback?: (error: Error) => void;
      lang?: string;
      axes?: {
        y?: {
          format?: (value: number) => string;
        };
        x?: {
          format?: (value: number) => string;
        };
        r?: {
          format?: (value: number) => string;
        };
      };
      cc?: HTMLElement;
      audioEngine?: string;
    };
  }
}

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
  Chart,
  ChartEvent,
  Plugin,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import chartjs2music from "chartjs-plugin-chart2music";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  chartjs2music,
  ChartDataLabels
);

// DataLabels context type
export interface DataLabelsContext {
  chart: Chart;
  dataIndex: number;
  datasetIndex: number;
  dataset: {
    label?: string;
    type?: string;
  };
}

// カスタムフォーカスインジケータプラグイン
export const focusIndicatorPlugin: Plugin = {
  id: "focusIndicator",
  afterInit: (chart: Chart) => {
    // Canvas要素をフォーカス可能にする
    if (chart.canvas) {
      chart.canvas.tabIndex = 0;
      // console.log("🚀 ~ chart.canvas:", chart.canvas);

      // キーボードイベントリスナーを追加
      const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;
        const activeElements = chart.getActiveElements();
        // console.log("🚀 ~ handleKeyDown ~ activeElements:", activeElements);

        // 商品a,b,cみたいなデータの数
        const datasets = chart.data.datasets;
        // console.log("🚀 ~ handleKeyDown ~ datasets:", datasets);

        // 棒グラフが何本か
        const dataLength = datasets[0]?.data.length || 0;
        // console.log("🚀 ~ handleKeyDown ~ dataLength:", dataLength);

        let currentDatasetIndex =
          activeElements.length > 0 ? activeElements[0].datasetIndex : 0;
        console.log(
          "🚀 ~ handleKeyDown ~ currentDatasetIndex:",
          currentDatasetIndex
        );
        let currentIndex =
          activeElements.length > 0 ? activeElements[0].index : -1;

        // Right, Leftを押したら同じdataset内のデータを移動
        // Up, Downをおしたらdatasetを移動
        switch (key) {
          case "ArrowDown":
            if (datasets.length > 1) {
              currentDatasetIndex = (currentDatasetIndex + 1) % datasets.length;
            }
            break;
          case "ArrowUp":
            if (datasets.length > 1) {
              currentDatasetIndex =
                currentDatasetIndex <= 0
                  ? datasets.length - 1
                  : currentDatasetIndex - 1;
            }
            break;
          case "ArrowRight":
            currentIndex = (currentIndex + 1) % dataLength;
            break;
          case "ArrowLeft":
            currentIndex =
              currentIndex <= 0 ? dataLength - 1 : currentIndex - 1;
            break;
          case "Enter":
          case " ":
            // スペースキーやEnterキーでアクションを実行
            if (currentIndex >= 0) {
              console.log(
                `選択されたデータ: ${chart.data.labels?.[currentIndex]} - ${datasets[0].data[currentIndex]}`
              );
            }
            break;
          default:
            return;
        }

        if (currentIndex >= 0) {
          // 新しい要素をアクティブに設定
          chart.setActiveElements([
            { datasetIndex: currentDatasetIndex, index: currentIndex },
          ]);
          chart.tooltip?.setActiveElements(
            [{ datasetIndex: currentDatasetIndex, index: currentIndex }],
            {
              x: 0,
              y: 0,
            }
          );
          chart.update("none");
          event.preventDefault();
        }
      };

      // イベントリスナーをcanvasに追加
      chart.canvas.addEventListener("keydown", handleKeyDown);

      // クリーンアップ用にチャートインスタンスにリスナーを保存
      (chart as any)._keydownHandler = handleKeyDown;
    }
  },
  beforeDestroy: (chart: Chart) => {
    // イベントリスナーをクリーンアップ
    if (chart.canvas && (chart as any)._keydownHandler) {
      chart.canvas.removeEventListener(
        "keydown",
        (chart as any)._keydownHandler
      );
      delete (chart as any)._keydownHandler;
    }
  },
  afterDraw: (chart: Chart) => {
    const ctx = chart.ctx;
    const activeElements = chart.getActiveElements();

    if (activeElements.length > 0) {
      const activeElement = activeElements[0];
      const barElement = activeElement.element as BarElement;

      // BarElementの位置情報を取得
      const { x, y } = barElement;

      // Chart.jsのメタデータからサイズを取得
      const meta = chart.getDatasetMeta(activeElement.datasetIndex);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const barWidth = (meta.data[activeElement.index] as any).width;

      // スケール情報を使用してバーの高さを計算
      const yScale = chart.scales.y;
      const zeroPixel = yScale.getPixelForValue(0);
      const barHeight = Math.abs(y - zeroPixel);

      // フォーカスリングを描画
      ctx.save();
      ctx.strokeStyle = "#ff6384";
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        x - barWidth / 2 - 5,
        Math.min(y, zeroPixel) - 5,
        barWidth + 10,
        barHeight + 10
      );
      ctx.restore();
    }
  },
  afterEvent: (chart: Chart, args: { event: ChartEvent }) => {
    if (args.event.type === "keydown") {
      console.log("🚀 ~ chart:", chart);
      const activeElements = chart.getActiveElements();
      console.log("🚀 ~ activeElements.length:", activeElements.length);
      activeElements.forEach(({ element, index, datasetIndex }) => {
        const datasetLabel = chart.data.datasets[datasetIndex].label;
        const dataLabel = chart.data.datasets[datasetIndex].data[index];
        const label = chart.data.labels?.[index];
        console.log("🚀 ~ datasetLabel:", datasetLabel);
        console.log("🚀 ~ dataLabel:", dataLabel);
        console.log("🚀 ~ label:", label);
      });
    }
  },
};

// プラグインをChart.jsに登録
ChartJS.register({
  focusIndicatorPlugin,
});
