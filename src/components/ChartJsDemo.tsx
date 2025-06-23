"use client";

// 共通設定をインポート
import "./charts/chartSetup";

import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";
import AreaChart from "./charts/AreaChart";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import StackedBarChart from "./charts/StackedBarChart";
import CombinedChart from "./charts/CombinedChart";
import RadarChart from "./charts/RadarChart";
import LineWithPlotlineChart from "./charts/LineWithPlotlineChart";

const ChartJsDemo = () => {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">チェックしたグラフの最小要件</h3>
        <ul className="list-disc list-inside">
          <li>グラフ全体に代替テキストが設定できる</li>
          <li>
            hoverで出る要素にキーボード操作でも到達できる
            <ul className="list-disc list-inside ml-4">
              <li>その順序が見た目の順序と同じである</li>
              <li>フォーカスが可視化されている</li>
            </ul>
          </li>
          <li>色だけでラベルを表現していない</li>
          <li>200%まで拡大可能</li>
          <li>CHART_COLORSを使える</li>
        </ul>
      </div>
      <section>
        <h3 className="font-bold text-lg mb-2">実装したこと/していないこと</h3>
        <ul className="list-disc list-inside">
          <li>
            実装したこと
            <ul className="list-disc list-inside ml-4">
              <li>グラフ全体に代替テキスト(aria-label)が設定できる</li>
              <li>
                キーボード操作にて、グラフの要素にアクセスできる(棒グラフ・積み上げ棒グラフのみ確認)
              </li>
              <li>
                キーボード操作にて、グラフをホバーしたときのツールチップを表示できる(棒グラフ・積み上げ棒グラフのみ確認)
              </li>
              <li>色だけでラベルを表現していない</li>
              <li>200%まで拡大可能</li>
              <li>グラフの色の変更が可能</li>
            </ul>
          </li>
          <li>
            実装していないこと
            <ul className="list-disc list-inside ml-4">
              <li>棒グラフ以外のキーボード操作(挙動が怪しい)</li>
              <li>フォーカス表示後の初期化処理等</li>
              <li>
                チャートの読み上げに関して
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Chart2Musicというライブラリを使用していて、キーボード操作にていいかんじに読み上げている
                  </li>
                  <li>
                    読み上げが日本語対応されていないため、設定は英語になっている{" "}
                    <a
                      className="text-blue-500 underline"
                      href="https://www.chart2music.com/docs/API/Config#lang"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chart2Musicのlangの設定
                    </a>
                  </li>
                  <li>
                    optionで末尾を◯万円にすることで日本語になっているが、VO以外の挙動は未確認
                  </li>
                  <li>
                    重ね合わせグラフなど対応できなさそうなので、読み上げは別途実装する必要がありそう
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BarChart />
        <StackedBarChart />
        <LineChart />
        <PieChart />
        <AreaChart />
        <HorizontalBarChart />
        <CombinedChart />
        <RadarChart />
        <LineWithPlotlineChart />
      </div>
    </div>
  );
};

export default ChartJsDemo;
