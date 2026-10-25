# NDVI Workbench｜植被指数与掩膜实验

云、NoData 和零分母会怎样改变 NDVI？

## 实现

对齐的红光与近红外反射率矩阵按 (NIR−R)/(NIR+R) 计算，显式传播有效掩膜与缺失值。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/05-ndvi-workbench/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

内置为合成反射率，不是实际卫星影像；不读取 GeoTIFF，不执行大气校正，类别阈值只供教学。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://www.usgs.gov/landsat-missions/landsat-normalized-difference-vegetation-index)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：构建反射率矩阵 NDVI 与有效像元掩膜流程，对零分母、NoData 和波段尺寸进行显式处理。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
