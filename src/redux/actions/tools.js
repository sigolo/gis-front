import types from "./actionsTypes";
import { getRandomInt } from "../../utils/func";
import LifeCycleRegistry from "./LifeCycle";
import { getFocusedMapProxy } from "../../nessMapping/api";
export const toggleTool = (ToolId) => async (dispatch, getState) => {
  const mapId = getFocusedMapProxy().uuid.value;
  const toolConfig = getState().Tools[mapId].tools[ToolId];
  await _getLifeCycleFunc(toolConfig)(
    dispatch,
    getState,
    toolConfig.ToolName,
    toolConfig.IsOpen
  );

  dispatch({
    type: types.TOGGLE_TOOLS,
    payload: { ToolId, mapId }
  });
};

export const toggleGroupTool = (GroupToolId) => (dispatch) => {
  const mapId = getFocusedMapProxy().uuid.value;
  dispatch({
    type: types.TOGGLE_GROUP_TOOLS,
    payload: { GroupToolId, mapId },
  });
}


export const setToolFocused = (ToolId) => (dispatch) => {
  const mapId = getFocusedMapProxy().uuid.value;
  dispatch({
    type: types.SET_TOOL_FOCUSED,
    payload: { ToolId, mapId },
  });
};

export const setToolProp = (config) => (dispatch) => {
  const mapId = getFocusedMapProxy().uuid.value;
  dispatch({
    type: types.SET_TOOL_PROP,
    payload: { config, mapId },
  });
}

export const unsetUnfocused = (toolID) => (dispatch) => {
  const mapId = getFocusedMapProxy().uuid.value;
  dispatch({
    type: types.UNSET_UNFOCUSED,
    payload: { toolID, mapId },
  });
}





export const resetTools = () => async (dispatch, getState) => {
  const mapId = getFocusedMapProxy().uuid.value;
  const tools = getState().Tools[mapId].order
  await _resetTools({ tools, mapId }, dispatch)
  dispatch({
    type: types.TOOL_RESETED,
    payload: mapId
  });
}

export const InitTools = (ToolConfig) => (dispatch, getState) => {
  const gTools = {
    tools: {},
    Groups: {},
    order: [],
    reset: [],
  };
  const blueprint = {}
  const mapId = getFocusedMapProxy().uuid.value;

  ToolConfig.groups.map((group) => {
    gTools.Groups[group.Id] = group;
  });

  ToolConfig.tools.map((tool) => {
    const { Id, ToolGroupId } = tool;
    const RandomId = Id + getRandomInt();
    tool.Id = RandomId;
    gTools.tools[RandomId] = tool;
    if (ToolGroupId) {
      "tools" in gTools.Groups[ToolGroupId]
        ? gTools.Groups[ToolGroupId].tools.push(RandomId)
        : (gTools.Groups[ToolGroupId]["tools"] = [RandomId]);
    }
  });

  blueprint.tools = JSON.parse(JSON.stringify(gTools.tools))
  blueprint.Groups = JSON.parse(JSON.stringify(gTools.Groups))

  dispatch({
    type: types.INIT_TOOLS,
    payload: { gTools, mapId, blueprint }
  });
};

const _getLifeCycleFunc = (toolState) => {
  return toolState.IsOpen
    ? LifeCycleRegistry[toolState.OnDestroy]
    : LifeCycleRegistry[toolState.OnCreate];
};

const _resetTools = ({ tools, mapId }, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: types.RESET_TOOLS,
      payload: { tools, mapId }
    });
    resolve();
  });
}
