import React, { Component } from 'react';
import { connect } from "react-redux";
import config from "react-global-configuration";
import { Menu } from 'semantic-ui-react';
import { Slider } from "react-semantic-ui-range";
import { parseString } from 'xml2js';
import { setMapLayerOpacity } from "../../../redux/actions/layers";
import { selectLayers } from "../../../redux/selectors/layersSelector";
import { getXMLResponse } from '../../../communication/apiManager';
import { getOlLayer, getFocusedMap } from "../../../nessMapping/api";
import LegendItem from '../../tool/InternalTool/Legend/LegendItem';
import AttributeTable from '../../tool/InternalTool/AttributeTable';
import EditTool from '../../tool/InternalTool/EditTool';
import TableOfFeatures from '../../tool/InternalTool/TableOfFeatures';

class LayerListMenuItem extends Component {
    state = {
        activeItem: null,
        previousItem: null,
        boundingBox: null,
        map: null,
        OlLayer: null,
        showHide: true
    }
    settings = {
        start: 0.7,
        min: 0,
        max: 1,
        step: 0.1,
        onChange: (value) => {
            this.props.setMapLayerOpacity(this.props.layer.uuid, value);
        },
    };

    handleItemClick = (e, { name }) => {
        if (this.state.activeItem === name) {
            this.setState({
                showHide: !this.state.showHide,
                activeItem: name
            });
        }
        else {
            this.setState({
                showHide: true,
                activeItem: name
            });
        }
    }

    zoomToLayer = (lyr) => {
        let map = getFocusedMap();
        let OlLayer = getOlLayer(lyr.uuid);

        if (OlLayer) {
            this.setState({
                map: map,
                OlLayer: OlLayer
            });

            if (this.state.boundingBox)
                this.fitExtent();
            else {
                let url = config.get("geoserverUrl");
                if (url) {
                    getXMLResponse(url + "wms?&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities")
                        .then((response) => {
                            let boundingBox;
                            parseString(response, function (err, result) {
                                let layers;
                                layers = result.WMS_Capabilities.Capability[0].Layer[0];
                                let layer = layers.Layer.find((lyr) => lyr.name === OlLayer.name);
                                boundingBox = layer.BoundingBox[1].$;
                            });
                            this.setState({ boundingBox: boundingBox }, this.fitExtent);
                        });
                }
            }
        }
        else {
            alert("השכבה אינה דלוקה");
        }
    }

    fitExtent = () => {
        let { boundingBox, map, OlLayer } = this.state;
        if (boundingBox) {
            let res = map.getView().getResolution();
            let maxx = boundingBox.maxx;
            let maxy = boundingBox.maxy;
            let minx = boundingBox.minx;
            let miny = boundingBox.miny;

            OlLayer.setExtent([minx, miny, maxx, maxy]);
            map.getView().fit(OlLayer.getExtent(), { constrainResolution: false });

            let newRes = map.getView().getResolution();
            if (newRes <= 0)
                this.map.getView().setResolution(res);
        }
    }

    render() {
        const { activeItem } = this.state
        const { layer } = this.props;

        return (
            <Menu secondary vertical className="content uirtl">
                <Menu.Item
                    name='transparency'
                    active={activeItem === 'transparency'}
                    onClick={this.handleItemClick}>
                    <div>
                        <label>שקיפות</label>
                        <Slider color="blue" settings={this.settings} />
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='fullExtent'
                    active={activeItem === 'fullExtent'}
                    onClick={this.handleItemClick}>
                    <div onClick={() => this.zoomToLayer(layer)}>מבט מלא על השכבה</div>
                </Menu.Item>
                <Menu.Item
                    name='editLayer'
                    active={activeItem === 'editLayer'}
                    onClick={this.handleItemClick}>
                    <div>ערוך שכבה</div>
                    <div>{this.state.activeItem === 'editLayer' && this.state.showHide ?
                        <EditTool uuid={layer.uuid}></EditTool>
                        : null}</div>
                </Menu.Item>
                <Menu.Item
                    name='legend'
                    active={activeItem === 'legend'}
                    onClick={this.handleItemClick}>
                    <div>מקרא</div>
                    <div>{this.state.activeItem === 'legend' && this.state.showHide ?
                        <LegendItem key={layer.uuid} uuid={layer.uuid} global={false}>
                        </LegendItem> : null}
                    </div>
                </Menu.Item>
                <Menu.Item
                    name='attributeTable'
                    active={activeItem === 'attributeTable'}
                    onClick={this.handleItemClick}>
                    <div>מאפיינים</div>
                    <div>{this.state.activeItem === 'attributeTable'
                        && this.state.showHide ? <TableOfFeatures uuid={layer.uuid}>
                        </TableOfFeatures> : null}</div>
                </Menu.Item>
            </Menu>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        layer: selectLayers(state)[ownProps.layerId]
    };
};

export default connect(mapStateToProps, {
    setMapLayerOpacity,
})(LayerListMenuItem);
