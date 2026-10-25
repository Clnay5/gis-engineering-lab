# GeoJSON Doctor｜矢量数据质检台

这个 GeoJSON 能否进入下一步分析？

## 实现

遍历几何结构，定位坐标越界、未闭合环、短线与重复 ID；仅导出通过基础审计的要素。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/01-geojson-doctor/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

不是完整 RFC Schema 或拓扑验证器，不检查自相交与环方向，也不自动修复原始数据。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://datatracker.ietf.org/doc/html/rfc7946)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：实现可定位到要素和坐标路径的 GeoJSON 基础审计，区分无效要素并导出可复查结果。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
