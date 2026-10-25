# Least Cost Router｜栅格最小成本路径

障碍物和摩擦成本如何共同改变路线？

## 实现

用二叉最小堆实现 Dijkstra；按相邻像元平均摩擦成本乘步长计价，禁止斜向穿越障碍角。

## 运行

在本目录中运行（Node.js ≥22；保留仓库 shared/ 目录）：

```bash
npm test
npm run demo
node cli.mjs example.json
```

[交互演示](https://clnay5.github.io/gis-engineering-lab/demos/07-least-cost-router/) · [返回作品集](../../README.md)

核心模块：`core.mjs`；输入样例：`example.json`；默认输出：`example-output.json`；测试：`core.test.mjs`（7 项）。这些测试包含解析已知答案与异常边界，不表示通过完整行业规范认证。

## 范围与数据

静态正成本栅格，null 为障碍；不包含道路网络、交通时间或坡度自动赋权。坐标是行列号。

样例数据由本项目生成，均为合成数据（CC0）；不是外部观测或实际业务结果。算法实现与样例由 AI 辅助完成。未复制参考项目源码、截图或数据。

## 参考

[原始规范或官方实现资料](https://networkx.org/documentation/stable/reference/algorithms/shortest_paths.html)。借鉴通用方法，不是上游官方产品或完整替代。

## 简历使用

理解代码并能复测后，可按实际参与情况描述：实现堆优化的栅格 Dijkstra，支持 4／8 邻域、摩擦加权、障碍约束与路径回溯。 这是 AI 辅助工程练习，不应改写为企业落地、论文创新或未经验证的性能提升。
