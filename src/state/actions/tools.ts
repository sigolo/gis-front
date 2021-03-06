import types from "./types";
import API from "../../core/api";
import { GisState, MapsToolState } from "../stateTypes";
import { Dispatch } from "redux";
import {
  ToogleToolAction,
  ToogleToolByNameAction,
  ToggleGroupToolAction,
  SetToolFocusedAction,
  UnsetUnfocusedAction,
  ResetToolAction,
  ToolResetedAction,
  InitToolsAction,
  DragToolAction,
  CloseDragToolAction,
} from "./types/tools/actions";
import { Widgets } from "../../configuration/types";

export const toggleTool = (
  ToolId: string,
  forceOpen: boolean,
  forceClose: boolean
) => async (dispatch: Dispatch) => {
  const mapId = API.map.getFocusedMapUUID();
  dispatch<ToogleToolAction>({
    type: types.TOGGLE_STICKY_TOOLS,
    payload: { ToolId, mapId, forceOpen, forceClose },
  });
};

export const closeDragTool = (
  ToolId: string,
  forceOpen: boolean,
  forceClose: boolean
) => async (dispatch: Dispatch) => {
  const mapId = API.map.getFocusedMapUUID();
  dispatch<CloseDragToolAction>({
    type: types.CLOSE_DRAG_TOOLS,
    payload: { ToolId, mapId, forceOpen, forceClose },
  });
};

export const dragTool = (ToolId: string) => async (dispatch: Dispatch) => {
  const mapId = API.map.getFocusedMapUUID();
  dispatch<DragToolAction>({
    type: types.DRAG_TOOL,
    payload: { ToolId, mapId },
  });
};

export const toggleToolByName = (
  ToolName: string,
  forceOpen: boolean,
  forceClose: boolean
) => async (dispatch: Dispatch, getState: () => GisState) => {
  const mapId = API.map.getFocusedMapUUID();
  const ToolState = getState().Tools[mapId].tools;
  const ToolId = Object.keys(ToolState).find(
    (Id) => ToolState[Id].ToolName === ToolName
  );
  if (ToolId) {
    dispatch<ToogleToolByNameAction>({
      type: types.TOGGLE_STICKY_TOOLS,
      payload: { ToolId, mapId, forceOpen, forceClose },
    });
  }
};

export const toggleGroupTool = (GroupToolId: string) => (
  dispatch: Dispatch
) => {
  const mapId = API.map.getFocusedMapUUID();
  dispatch<ToggleGroupToolAction>({
    type: types.TOGGLE_GROUP_TOOLS,
    payload: { GroupToolId, mapId },
  });
};

export const setToolFocused = (ToolId: string) => (dispatch: Dispatch) => {
  const mapId = API.map.getFocusedMapUUID();
  dispatch<SetToolFocusedAction>({
    type: types.SET_TOOL_FOCUSED,
    payload: { ToolId, mapId },
  });
};

export const unsetUnfocused = (ToolId: string) => (dispatch: Dispatch) => {
  const mapId = API.map.getFocusedMapUUID();
  dispatch<UnsetUnfocusedAction>({
    type: types.UNSET_UNFOCUSED_TOOL,
    payload: { ToolId, mapId },
  });
};

export const resetTools = () => (
  dispatch: Dispatch,
  getState: () => GisState
) => {
  const mapId = API.map.getFocusedMapUUID();
  const tools = getState().Tools[mapId].dynamicTools;
  dispatch<ResetToolAction>({
    type: types.RESET_TOOLS,
    payload: { tools, mapId },
  });
};

export const toolsReseted = () => async (dispatch: Dispatch) => {
  const mapId = API.map.getFocusedMapUUID();
  dispatch<ToolResetedAction>({
    type: types.TOOL_RESETED,
    payload: mapId,
  });
};

export const InitTools = (ToolConfig: Widgets) => (dispatch: Dispatch) => {
  const gTools: MapsToolState = {
    tools: {},
    Groups: {},
    dynamicTools: [],
    reset: [],
    focused: "",
    stickyTool: "",
  };
  const blueprint = { tools: {}, Groups: {} };
  const mapId = API.map.getFocusedMapUUID();

  ToolConfig.groups.forEach((group) => {
    gTools.Groups[group.Id] = group;
  });

  ToolConfig.tools.forEach((tool) => {
    const toolcpy = { ...tool };
    const { Id, ToolGroupId } = tool;
    let RandomId = (
      Id + Math.floor(Math.random() * Math.floor(999999))
    ).toString();
    toolcpy.Id = RandomId;
    gTools.tools[RandomId] = toolcpy;

    if (ToolGroupId) {
      let tools = gTools.Groups[ToolGroupId].tools;
      if (tools) {
        tools.push(RandomId);
      } else {
        tools = [RandomId];
      }
    }
  });

  blueprint.tools = JSON.parse(JSON.stringify(gTools.tools));
  blueprint.Groups = JSON.parse(JSON.stringify(gTools.Groups));

  dispatch<InitToolsAction>({
    type: types.INIT_TOOLS,
    payload: { gTools, mapId, blueprint },
  });
};

// const _getLifeCycleFunc = (toolState: ToolMetadata) => {
//   return toolState.IsOpen
//     ? LifeCycleRegistry[toolState.OnDestroy]
//     : LifeCycleRegistry[toolState.OnCreate];
// };
