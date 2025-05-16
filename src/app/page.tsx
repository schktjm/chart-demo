"use client";

import dynamic from "next/dynamic";

// クライアントサイドのみで実行されるようにdynamicインポートを使用
const ChartTabs = dynamic(() => import("@/components/ChartTabs"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">グラフライブラリ比較デモ</h1>
        <p className="text-gray-600 mt-2">
          様々なグラフライブラリの機能や使いやすさを比較するデモです
        </p>
      </header>

      <section className="mb-10">
        <div className="bg-gray-50 p-6 rounded-lg">
          <ChartTabs />
        </div>
      </section>

      <footer className="text-center text-gray-500 mt-20">
        <p>グラフライブラリ比較デモ - 2024</p>
      </footer>
    </div>
  );
}
