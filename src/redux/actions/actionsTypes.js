//actionTypes
const actionTypes = {
  ADD_LAYER: "ADD_LAYER",
  ADD_LAYER_TO_MAP: "ADD_LAYER_TO_MAP",
  ADD_OVERLAYS: "ADD_OVERLAYS",

  INIT_LAYERS: "INIT_LAYERS",
  INIT_TOOLS: "INIT_TOOLS",
  INIT_RASTER: "INIT_RASTER",
  INIT_MAP: "INIT_MAP",

  RESET_TOOLS: "RESET_TOOLS",
  TOOL_RESETED: "TOOL_RESETED",
  LAYER_ADDED: "LAYER_ADDED",

  UPDATE_LAYER: "UPDATE_LAYER",
  UPDATE_FEATURE_ATTRIBUTES: "UPDATE_FEATURE_ATTRIBUTES",

  SET_UPDATED_IDS: "SET_UPDATED_IDS",
  SET_RASTER: "SET_RASTER",
  SET_SELECTED_FEATURES: "SET_SELECTED_FEATURES",
  SET_CURRENT_FEATURE: "SET_CURRENT_FEATURE",
  UPDATE_FEATURE: "UPDATE_FEATURE",
  REMOVE_FEATURE: "REMOVE_FEATURE",
  SET_CURRENT_LAYER: "SET_CURRENT_LAYER",
  SET_LAYER_VISIBLE: "SET_LAYER_VISIBLE",
  SET_LAYER_OPACITY: "SET_LAYER_OPACITY",
  SET_LAYER_SELECTABLE: "SET_LAYER_SELECTABLE",
  SET_TOOL_FOCUSED: "SET_TOOL_FOCUSED",
  SET_TOOL_PROP: "SET_TOOL_PROP",
  SET_MAP_FOCUSED: "SET_MAP_FOCUSED",
  SET_OVERLAY: "SET_OVERLAY",
  SET_INTERACTION: "SET_INTERACTION",
  SET_INTERACTIONS: "SET_INTERACTIONS",
  SET_SPATIAL_LAYER_SELECTION: "SET_SPATIAL_LAYER_SELECTION",
  UNSET_INTERACTION: "UNSET_INTERACTION",
  UNSET_INTERACTIONS: "UNSET_INTERACTIONS",
  UNSET_OVERLAY: "UNSET_OVERLAY",
  UNSET_OVERLAYS: "UNSET_OVERLAYS",
  UNSET_UNFOCUSED: "UNSET_UNFOCUSED",
  SET_OVERLAY_PROPERTY: "SET_OVERLAY_PROPERTY",

  OPEN_DRAW_SESSION: "OPEN_DRAW_SESSION",
  CLOSE_DRAW_SESSION: "CLOSE_DRAW_SESSION",
  PERSIST_DRAW_SESSION: "PERSIST_DRAW_SESSION",
  TOGGLE_TOOLS: "OPEN_TOOLS",
  TOGGLE_GROUP_TOOLS: "OPEN_GROUP_TOOLS",
  TOGGLE_SIDENAV: "OPEN_SIDENAV",
};

export default actionTypes;
