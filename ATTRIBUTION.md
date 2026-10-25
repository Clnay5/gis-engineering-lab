# 参考与原创范围

Clnay5 使用 AI 辅助完成代码、合成样例、交互界面和文档。本项目没有复制以下参考项目的源码、截图、图标、模型或数据，也不表示上游认可或合作。

| 参考 | 用途与取舍 |
|---|---|
| [GeoJSON RFC 7946](https://datatracker.ietf.org/doc/html/rfc7946) | 几何结构、坐标顺序和 WGS84 输出约定；只做基础审计，没有实现完整规范验证器 |
| [PROJ Web Mercator](https://proj.org/en/stable/operations/projections/webmerc.html)、[Proj4js](https://github.com/proj4js/proj4js) | 坐标转换的接口与方法参考；只实现两种 CRS 的球面正反变换，没有复制其坐标系统或基准转换库 |
| [Turf point-in-polygon](https://github.com/Turfjs/turf/tree/master/packages/turf-boolean-point-in-polygon) | 孔洞与边界行为参考；自行实现基础射线判断和网格候选索引，未实现 Turf 的全部几何支持 |
| [GDAL Grid](https://gdal.org/en/stable/programs/gdal_grid.html) | IDW 参数与 NoData 思路；采用简化欧氏 IDW，没有复用 GDAL 栅格 I/O |
| [USGS NDVI](https://www.usgs.gov/landsat-missions/landsat-normalized-difference-vegetation-index) | 红光／近红外指数公式；仅处理已对齐的反射率矩阵，不读取或重分发 USGS 数据 |
| [GDAL raster slope](https://gdal.org/en/stable/programs/gdal_raster_slope.html) | Horn 方法与边界、单位的重要性；仅实现 3×3 邻域，不是 GDAL 或 WhiteboxTools 的完整替代 |
| [NetworkX shortest paths](https://networkx.org/documentation/stable/reference/algorithms/shortest_paths.html) | 最短路径任务分解参考；自写栅格 Dijkstra 与二叉堆，不依赖 NetworkX |
| [Turf distance](https://github.com/Turfjs/turf/tree/master/packages/turf-distance) | 球面距离任务参考；自写 Haversine 和轨迹相邻段审计 |
| [GDAL zonal statistics](https://gdal.org/en/stable/programs/gdal_raster_zonal_stats.html) | 分区统计业务概念；采用像元中心规则，不声称精确面积交权重 |
| [latlon-geohash](https://github.com/chrisveness/latlon-geohash) | 标准 Geohash 的编码、包围盒与邻域接口参考；自行实现交替二分与 Base32 编码 |

从先前调研的 [God's Eye View](https://github.com/bilawalsidhu/gods-eye-view) 保留空间数据交互与可视化的启发。本次十项使用通用 GIS 方法，并未将成熟算法冒称为近期原创研究，也没有声称它们全部来自最新 GitHub 热榜。

所有 `example.json` 是本项目生成的合成教学数据，以 CC0 1.0 提供。源码采用 MIT；这些许可不替代参考项目或未来导入的真实数据的原始许可。

原创工程范围：输入约定与校验、独立算法实现、边界处理、CLI、测试、网页控制器、可视化、导出及验证记录。算法思想本身是既有通用知识，不是本作品集发明。
