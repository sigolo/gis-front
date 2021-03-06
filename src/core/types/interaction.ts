import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Options as SelectOptions } from "ol/interaction/Select";
import { Options as DragBoxOptions } from "ol/interaction/DragBox";
import { Options as ModifyOptions } from "ol/interaction/Modify";
import { Options as DrawOptions } from "ol/interaction/Draw";

export interface InteractionConfigStore {
  Type: InteractionSupportedTypes;
  interactionConfig?:
    | SelectOptions
    | DragBoxOptions
    | ModifyOptions
    | DrawOptions;
  uuid?: string;
  status?: number;
  sourceLayer?: VectorSource;
  Layer?: VectorLayer;
  widgetName?: string;
}

export type InteractionWidgetItem = {
  [mapUUID: string]: {
    [interactionName: string]: InteractionConfigStore;
  };
} & { focused?: string };

export enum InteractionSupportedTypes {
  DRAW = "Draw",
  SELECT = "Select",
  MODIFY = "Modify",
  DRAGBOX = "DragBox",
}

export interface InteractionOptions {
  Type: InteractionSupportedTypes;
  interactionConfig?:
    | SelectOptions
    | DragBoxOptions
    | ModifyOptions
    | DrawOptions;
  uuid?: string;
  status?: number;
  sourceLayer?: VectorSource;
  Layer?: VectorLayer;
  widgetName?: string;
}
