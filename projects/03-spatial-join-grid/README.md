# Spatial Join Grid｜网格索引空间连接

怎样减少点落区判断中的无效比较？

## 实现

用均匀网格索引筛选候选多边形，再执行射线法精确判断；保留重叠区域的全部匹配。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/03-spatial-join-grid/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（6 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

局部平面 Polygon，支持孔洞与可选边界策略；不处理自相交、MultiPolygon 或跨日期变更线。输出为本地平面 Feature 结构，不能直接当作 WGS84 GeoJSON。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://github.com/Turfjs/turf/tree/master/packages/turf-boolean-point-in-polygon)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：构建网格候选索引与含孔洞的点落区连接，记录候选比较次数和完整匹配关系。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
