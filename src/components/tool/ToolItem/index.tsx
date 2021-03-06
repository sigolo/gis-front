import React from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelectors";
import { selectFocusedMapTools } from "../../../state/reducers";
import { useDrag } from "react-dnd";
import { ListGroup } from "react-bootstrap";

enum ItemTypes {
  TOOL = "TOOL",
}

export interface BoxProps {
  name: string;
}

interface Props {
  ToolID: string;
  sideEffectOnToolOpen?: () => void;
}

const ToolItem: React.FC<Props> = (props) => {
  const currentTools = useTypedSelector(selectFocusedMapTools);
  const { toggleTool, dragTool } = useActions();
  const drag = useDrag(() => ({
    type: ItemTypes.TOOL,
    item: { name: props.ToolID },
    end: (item) => {
      if (item) {
        dragTool(item.name);
        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))[1];

  if (currentTools) {
    const { ToolIcon, ToolTip } = currentTools.tools[props.ToolID];

    return (
      <ListGroup.Item className="tool-item" role="TOOL">
        <div
          className="tool-item__main"
          onClick={() => {
            toggleTool(props.ToolID, false, false);
            props.sideEffectOnToolOpen && props.sideEffectOnToolOpen();
          }}
        >
          <div className="tool-item__icon mx-1">
            {ToolIcon ? (
              <i className={"gis-icon gis-icon--" + ToolIcon}></i>
            ) : (
              <i>i</i>
            )}
          </div>
          <div className="tool-item__title flex-grow-1 mx-2">{ToolTip}</div>
        </div>

        <div
          className="tool-item__drag"
          ref={drag}
          data-testid={`box-${props.ToolID}`}
        >
          <i className="gis-icon gis-icon--drag-thin"></i>
        </div>
      </ListGroup.Item>
    );
  }
  return null;
};

export default ToolItem;
