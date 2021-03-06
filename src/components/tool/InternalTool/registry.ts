import { lazy } from "react";
const REGISTRY = {
  BaseMapGallery: lazy(() => import("./BaseMapGallery")),
  Identify: lazy(() => import("./Identify")),
  MeasureDistance: lazy(() => import("./MeasureDistance")),
  SingleLayerTest: lazy(() => import("./SingleLayerTest")),
  Draw: lazy(() => import("./Draw")),
  Legend: lazy(() => import("./Legend")),
  Coordinates: lazy(() => import("./Coordinates")),
  Screenshooter: lazy(() => import("./Screenshooter")),
  TestTableOfFeature: lazy(() => import("./TableOfFeatures/Container")),
  TestSpatialSelect: lazy(() => import("./SpatialSelect/Container")),
  Tool404: lazy(() => import("./404")),
  Geofiles: lazy(() => import("./Geofiles")),
};
export default REGISTRY;
