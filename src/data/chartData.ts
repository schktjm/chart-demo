// 月次データ（棒グラフと折れ線グラフ用）
export const monthlyData = {
  categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
  series: [
    {
      name: "売上高",
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0],
    },
  ],
};

// 月間アクセス数データ（折れ線グラフ用）
export const accessData = {
  categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
  series: [
    {
      name: "アクセス数",
      data: [1000, 1200, 1800, 2400, 3200, 4500],
    },
  ],
};

// 商品別売上割合データ（円グラフ用）
export const productShareData = {
  series: [
    {
      name: "売上割合",
      data: [
        { name: "商品A", value: 40.0 },
        { name: "商品B", value: 23.8 },
        { name: "商品C", value: 16.0 },
        { name: "商品D", value: 12.2 },
        { name: "その他", value: 8.0 },
      ],
    },
  ],
};

// 四半期売上推移データ（面積グラフ用）
export const quarterlyData = {
  categories: [
    "2022-Q1",
    "2022-Q2",
    "2022-Q3",
    "2022-Q4",
    "2023-Q1",
    "2023-Q2",
    "2023-Q3",
    "2023-Q4",
  ],
  series: [
    {
      name: "売上高",
      data: [120, 132, 101, 134, 142, 150, 165, 178],
    },
  ],
};

// 積み上げ棒グラフ用データ
export const stackedBarData = {
  categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
  series: [
    {
      name: "商品A",
      data: [25.9, 37.5, 46.4, 59.2, 64.0, 76.0],
    },
    {
      name: "商品B",
      data: [14.0, 21.0, 35.0, 40.0, 45.0, 50.0],
    },
    {
      name: "商品C",
      data: [10.0, 13.0, 25.0, 30.0, 35.0, 50.0],
    },
  ],
};

// 横棒グラフ用データ
export const horizontalBarData = {
  categories: ["部門A", "部門B", "部門C", "部門D", "部門E"],
  series: [
    {
      name: "売上高",
      data: [87.5, 112.8, 143.6, 98.5, 165.4],
    },
  ],
};

// レーダーチャート用データ
export const radarChartData = {
  categories: [
    "売上",
    "顧客満足度",
    "市場シェア",
    "従業員満足度",
    "収益性",
    "成長率",
  ],
  series: [
    {
      name: "2022年",
      data: [80, 75, 60, 85, 70, 65],
    },
    {
      name: "2023年",
      data: [90, 80, 75, 80, 85, 90],
    },
  ],
};

// 複合グラフ用データ
export const combinedChartData = {
  categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
  series: [
    {
      name: "売上高",
      type: "column",
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0],
    },
    {
      name: "目標",
      type: "line",
      data: [60, 80, 110, 130, 150, 180],
    },
  ],
};
