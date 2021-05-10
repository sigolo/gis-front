import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './style.css';
import UpdateMenu from './feed';
import { selectContextMenus } from '../../state/reducers';
import REGISTRY from './registry';
import { Collapse, Table } from 'react-bootstrap';
import { Feature } from '../../core/types';
import { useTypedSelector } from '../../hooks/useTypedSelectors';
const ContextMenuContainer: React.FC<{
  candidateFeature: Feature;
  fromMap?: boolean;
}> = ({ candidateFeature, fromMap }) => {
  const [isOpened, setisOpened] = useState<boolean>(false);

  const updateMenu = () => {
    const { parentlayerProperties, id, properties } = candidateFeature;
    UpdateMenu(parentlayerProperties.layerId, id, properties);
  };

  const menus = useTypedSelector(selectContextMenus);

  useEffect(() => {
    candidateFeature && updateMenu();
  }, []);

  const renderMenu = (source: string, config: { [key: string]: any }) => {
    const Menu = REGISTRY[source].component;
    return (
      menus &&
      source in menus &&
      candidateFeature.id in menus[source] &&
      menus[source][candidateFeature.id].length > 0 && (
        <tr key={source}>
          {!fromMap && (
            <td>
              <b>{source}</b>
            </td>
          )}
          <td>
            <Menu
              menu_config={config}
              local_config={REGISTRY[source].configuration}
              feature={candidateFeature}
            />
          </td>
        </tr>
      )
    );
  };
  return candidateFeature && menus ? (
    <React.Fragment>
      <div
        className="context-menu"
        onMouseDownCapture={(e) => e.stopPropagation()}
      >
        {!fromMap && (
          <div
            className="context-menu__header"
            onClick={() => setisOpened(!isOpened)}
          >
            Menu
          </div>
        )}

        <Collapse in={true}>
          <div className="context-menu__content">
            <Table className="MenuTable">
              <tbody>
                {Object.keys(menus).map((source) => {
                  return renderMenu(source, menus[source][candidateFeature.id]);
                })}
              </tbody>
            </Table>
          </div>
        </Collapse>
      </div>
    </React.Fragment>
  ) : (
    <div></div>
  );
};

export default ContextMenuContainer;
