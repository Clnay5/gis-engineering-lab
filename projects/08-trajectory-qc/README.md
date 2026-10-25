# Trajectory QC｜轨迹异常审计

轨迹中哪些记录值得复核，而不是直接删除？

## 实现

用 Haversine 计算相邻有效采样距离，审计时间重复／倒序、坐标异常和超过阈值的速度。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/08-trajectory-qc/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

不自动删除点，不跨无效样本插值，不做道路匹配；速度标记不等于交通方式或作弊结论。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://github.com/Turfjs/turf/tree/master/packages/turf-distance)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：实现跨日期变更线球面距离与轨迹时间／速度审计，保留原始记录及逐段证据。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
