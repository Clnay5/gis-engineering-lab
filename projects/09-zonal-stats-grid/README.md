# Zonal Statistics｜分区栅格统计

同一幅栅格在不同分区里能得到哪些可靠统计？

## 实现

按像元中心是否落区选择数值，支持多边形孔洞，并用 Welford 累计总体方差。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/09-zonal-stats-grid/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

北向上的本地米制栅格，使用中心点规则而非像元面积交权重；重叠区独立统计。平面几何不导出标准 GeoJSON。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://gdal.org/en/stable/programs/gdal_raster_zonal_stats.html)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：实现含孔洞分区统计、NoData 传播、有效面积与 Welford 在线总体方差计算。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
