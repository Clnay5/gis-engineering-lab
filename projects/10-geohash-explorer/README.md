# Geohash Explorer｜空间编码与邻域

一段字符串如何表达空间范围和附近网格？

## 实现

交替二分经纬度区间，生成标准 Base32 Geohash；返回包围盒、中心与最多八个邻格。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/10-geohash-explorer/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

矩形网格不是等面积网格，也不是距离度量；跨极点邻居被省略，经度邻居按 ±180° 环绕。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://github.com/chrisveness/latlon-geohash)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：实现 Geohash 编解码、网格边界与邻域查询，验证标准编码向量及日期变更线行为。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
