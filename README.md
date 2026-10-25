# GIS Engineering Lab

**10 个可运行、可解释、可复现的地理信息科学工程项目。**

[在线作品集](https://clnay5.github.io/gis-engineering-lab/) · [GitHub 主页](https://github.com/Clnay5) · [自动验证](https://github.com/Clnay5/gis-engineering-lab/actions) · [面试与简历材料](INTERVIEW.md)

本仓库是 Clnay5 的 **AI 辅助 GIS 工程练习作品集**。十个项目在一个仓库维护，各有独立算法模块、输入样例、输出样例、CLI、README 和测试；网页通过统一导航展示。不是十个独立仓库，也不是十个生产系统。

| 项目 | 核心能力 | 测试 | 演示 |
|---|---|---:|---|
| [GeoJSON Doctor](projects/01-geojson-doctor) | 结构审计、异常定位与有效要素导出 | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/01-geojson-doctor/) |
| [CRS Converter](projects/02-crs-converter) | WGS84 ↔ Web Mercator、投影域与往返校验 | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/02-crs-converter/) |
| [Spatial Join Grid](projects/03-spatial-join-grid) | 网格候选索引、孔洞、多重匹配、边界策略 | 6 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/03-spatial-join-grid/) |
| [IDW Surface](projects/04-idw-interpolator) | 幂次、邻居数、半径与 NoData 插值 | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/04-idw-interpolator/) |
| [NDVI Workbench](projects/05-ndvi-workbench) | 对齐反射率矩阵、掩膜与零分母 | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/05-ndvi-workbench/) |
| [Terrain Horn](projects/06-terrain-horn) | 3×3 坡度坡向、非等距像元与 zFactor | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/06-terrain-horn/) |
| [Least Cost Router](projects/07-least-cost-router) | 最小堆 Dijkstra、摩擦成本与障碍约束 | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/07-least-cost-router/) |
| [Trajectory QC](projects/08-trajectory-qc) | Haversine、时间顺序与速度阈值审计 | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/08-trajectory-qc/) |
| [Zonal Statistics](projects/09-zonal-stats-grid) | 像元中心落区、孔洞、NoData 与 Welford 方差 | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/09-zonal-stats-grid/) |
| [Geohash Explorer](projects/10-geohash-explorer) | Base32 编解码、边界与邻格 | 7 | [打开](https://clnay5.github.io/gis-engineering-lab/demos/10-geohash-explorer/) |

## 运行与验证

Node.js 22 或更高版本，无需安装第三方运行时依赖。

```bash
npm test
npm run verify
npm run build
npm start
```

打开终端显示的本地地址。单独运行一个项目：

```bash
cd projects/07-least-cost-router
npm test
npm run demo
node cli.mjs example.json
```

保留仓库的 `shared/` 目录，算法会复用其中的几何与数值校验。网页允许编辑参数、导入 JSON、复算、查看结果表和导出 JSON；部分 WGS84 项目可导出标准 GeoJSON。可视化为数据坐标示意和栅格图，不是真实地理底图。

## 证据

- **69 项算法测试**：使用标准编码向量、解析平面、已知路径成本、已知均值／方差和异常边界；见各项目 `core.test.mjs`。
- **10 个 CLI 样例**：验证 CLI 与模块输出一致、输入不被修改；记录于 [evidence/verification.json](evidence/verification.json)。
- 默认输入与生成输出分别位于各目录的 `example.json` 和 `example-output.json`。生成输出本身不是独立正确性证明。
- GitHub Actions 分别在 Linux、Windows 执行算法测试、CLI 样例和静态构建；最新状态以 [Actions](https://github.com/Clnay5/gis-engineering-lab/actions) 为准。
- 验证记录包含单次本地样例耗时，不能当作基准测试、性能对比或生产吞吐量。

## 数据、参考与适用范围

所有内置样例为本项目生成的 **CC0 合成数据**，不是实际卫星影像、GPS 记录、DEM、气象或业务观测。算法由 AI 辅助编写；没有移植或隐藏上游源码。

方法与接口参考 GeoJSON RFC、PROJ、GDAL、Turf、USGS 和标准 Geohash 资料；它们大多是成熟基础设施，**本作品集不声称十个项目都来源于近期热门榜单**。完整来源与取舍见 [ATTRIBUTION.md](ATTRIBUTION.md)。

每个 README 和演示页均写明输入坐标、单位、NoData、边界策略及未实现能力。当前没有 GeoTIFF／Shapefile 读写、在线地图服务、像元级真实遥感案例或生产级空间数据库。真实数据和独立工具交叉验证是下一阶段工作。

## 建议如何放进简历

把它作为一个有十个模块的 GIS 工程作品集，再选择最熟悉的两三个模块展开。先读懂、复测并记录自己的改进，按实际参与情况注明 AI 辅助；不要将其描述为十段企业经历、生产平台或论文创新。可用表述与演示脚本见 [INTERVIEW.md](INTERVIEW.md)。

代码采用 [MIT](LICENSE) 许可。
