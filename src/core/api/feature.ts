import _ from "lodash";
import Feature from "ol/Feature";
import { IFeatureConfigInterface } from "../types/feature";
import {
  Point,
  MultiPoint,
  Polygon,
  MultiLineString,
  LineString,
  MultiPolygon,
  Circle,
  Geometry,
} from "ol/geom";

import { getFocusedMap, getFocusedMapProxy } from "./map";

export const getFeatureProperties = (
  ol_feature: Feature
): { [key: string]: any } => {
  const props = ol_feature.getProperties() || {};
  return _.omit(props, ["bbox", "geometry", "vector_source"]);
};

export const geoserverFeatureToOLGeom = (
  config: IFeatureConfigInterface
): SupportedGeometry | false => {
  const { type, coordinates } = config;
  switch (type) {
    case "MultiPolygon":
      return new MultiPolygon(coordinates);
    case "Point":
      return new Point(coordinates);
    case "Polygon":
      return new Polygon(coordinates);
    case "MultiLineString":
      return new MultiLineString(coordinates);
    case "LineString":
      return new LineString(coordinates);
    case "MultiPoint":
      return new MultiPoint(coordinates);
    case "Circle":
      return new Circle(coordinates);
    default:
      break;
  }
  return false;
};

export const InstanceOfGeometryClass = (
  geometry: any
): SupportedGeometry | false => {
  if (
    geometry instanceof MultiPolygon ||
    geometry instanceof Point ||
    geometry instanceof Polygon ||
    geometry instanceof MultiLineString ||
    geometry instanceof LineString ||
    geometry instanceof MultiPoint ||
    geometry instanceof Circle
  )
    return geometry;

  return false;
};

export const zoomTo = (
  geometry: Geometry | SupportedGeometry | IFeatureConfigInterface
) => {
  let geom = InstanceOfGeometryClass(geometry);
  if (!geom) {
    geom = geoserverFeatureToOLGeom(geometry as IFeatureConfigInterface);
  }
  if (geom) {
    const view = getFocusedMap().getView();
    highlightFeature(geom);
    view.fit(geom, {
      padding: [850, 850, 850, 850],
      maxZoom: 12,
    });
  } else {
    throw new TypeError(
      "the config object provided to ZoomTo function does not match any geometry type"
    );
  }
};

export const highlightFeature = (geometry: SupportedGeometry) => {
  let Highlight = getFocusedMapProxy().Highlight;
  if (!Highlight) {
    getFocusedMapProxy().setHighLight();
    Highlight = getFocusedMapProxy().Highlight;
  }
  if (Highlight && Highlight.source) {
    const source = getFocusedMapProxy().getVectorSource(Highlight.source);
    source.clear();
    if (InstanceOfGeometryClass(geometry)) {
      source.addFeature(new Feature(geometry));
    }
  }
};

export const unhighlightFeature = () => {
  let Highlight = getFocusedMapProxy().Highlight;
  if (Highlight && Highlight.source) {
    const source = getFocusedMapProxy().getVectorSource(Highlight.source);
    source.clear();
  }
};

type SupportedGeometry =
  | Circle
  | MultiPolygon
  | Polygon
  | Point
  | MultiLineString
  | LineString
  | MultiPoint;