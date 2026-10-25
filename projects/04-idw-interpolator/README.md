# IDW Surface｜反距离权重插值

观测点之间的空间变化该怎样估计？

## 实现

按欧氏距离倒数加权预测网格中心，支持幂次、邻居数、搜索半径和重合观测点均值。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/04-idw-interpolator/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

只接受米制投影坐标；是确定性 IDW，不提供克里金方差或可靠性结论，默认数据为合成观测。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://gdal.org/en/stable/programs/gdal_grid.html)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：实现可配置幂次、邻居数和搜索半径的 IDW 网格插值，处理精确命中与无邻居 NoData。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
