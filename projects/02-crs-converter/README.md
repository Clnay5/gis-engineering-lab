# CRS Converter｜坐标转换实验室

经纬度与地图米制坐标究竟怎样对应？

## 实现

独立实现球面 Web Mercator 正反变换，返回往返结果，并拒绝越过投影有效纬度的输入。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/02-crs-converter/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

只支持 EPSG:4326 与球面 EPSG:3857；不做基准转换，不支持 UTM、GCJ-02 或 BD-09。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://proj.org/en/stable/operations/projections/webmerc.html)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：实现 WGS84 与 Web Mercator 的正反变换、投影域校验和跨半球往返误差测试。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
