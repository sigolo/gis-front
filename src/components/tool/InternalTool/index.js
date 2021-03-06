import toolRegistry from "./registry";

const RenderInternalToolLazy = (props) => {
  if (props && props.toolName && props.toolID) {
    const InternalTool = toolRegistry[props.toolName];
    return <InternalTool toolID={props.toolID} />;
  }
  return null;
};

export default RenderInternalToolLazy;
