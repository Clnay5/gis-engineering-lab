# Terrain Horn｜DEM 坡度与坡向

高程表面会朝哪个方向、以多陡的坡度下降？

## 实现

使用 Horn 3×3 加权差分，支持非正方形像元与 zFactor；输出角度坡度和顺时针北起坡向。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/06-terrain-horn/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

米制、北向上的 DEM；边缘与含 NoData 的 3×3 窗口不估计，平地坡向为 null。未读取真实 DEM。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://gdal.org/en/stable/programs/gdal_raster_slope.html)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：实现 Horn 地形导数，支持非等距像元和竖向比例，并用解析平面验证坡度与坡向约定。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
