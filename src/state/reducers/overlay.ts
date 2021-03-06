import types from "../actions/types";
import produce from "immer";
import { OverlayState } from "../stateTypes";
import { Actions } from "../actions/types";
import { WritableDraft } from "immer/dist/internal";
import { OverlayMetadata } from "../../core/types";

const overlayReducer = (
  state: OverlayState = {},
  action: Actions
): OverlayState => {
  switch (action.type) {
    case types.SET_OVERLAY:
      return produce(state, (draftState) => {
        const { config, focusedmap } = action.payload;
        if (!(config.widgetName in draftState)) {
          draftState[config.widgetName] = {};
        }
        if (!(focusedmap in draftState[config.widgetName])) {
          draftState[config.widgetName][focusedmap] = {};
        }
        const s = draftState[config.widgetName][focusedmap];
        s[config.uuid] = config as WritableDraft<OverlayMetadata>;
        s.focused = config.uuid;
      });

    case types.SET_OVERLAY_PROPERTY:
      return produce(state, (draftState) => {
        const { config, focusedmap } = action.payload;
        if (config.property && config.value) {
          const focusedState =
            draftState[config.widgetName][focusedmap][config.uuid];
          if (config.property in focusedState) {
            focusedState[config.property] = config.value;
          }
        }
      });

    case types.UNSET_OVERLAY:
      return produce(state, (draftState) => {
        const { uuid, widgetName } = action.payload;
        Object.keys(draftState[widgetName]).forEach((mapId) => {
          if (uuid in draftState[widgetName][mapId]) {
            delete draftState[widgetName][mapId][uuid];
          }
          if (Object.keys(draftState[widgetName][mapId]).length === 0) {
            delete draftState[widgetName][mapId];
          }
        });
        if (Object.keys(draftState[widgetName]).length === 0) {
          delete draftState[widgetName];
        }
      });
    case types.UNSET_OVERLAYS:
      return produce(state, (draftState) => {
        const { overlays, widgetName } = action.payload;

        overlays.forEach((overlay) => {
          Object.keys(draftState[widgetName]).forEach((mapId) => {
            if (overlay in draftState[widgetName][mapId]) {
              delete draftState[widgetName][mapId][overlay];
            }
            if (Object.keys(draftState[widgetName][mapId]).length === 0) {
              delete draftState[widgetName][mapId];
            }
          });
        });

        if (
          typeof draftState[widgetName] == "object" &&
          Object.keys(draftState[widgetName]).length === 0
        ) {
          delete draftState[widgetName];
        }
      });

    default:
      return state;
  }
};

export default overlayReducer;
