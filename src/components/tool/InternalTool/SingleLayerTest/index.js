import React from "react";
import { connect } from "react-redux";
import { Image as ImageLayer } from "ol/layer";
import ImageWMS from "ol/source/ImageWMS";
import NessMapping from "../../../../nessMapping/mapping";



const LayerSample = {
    "id": 1,
    "name": "dimigcompile",
    "alias": "שכבה לדוגמא",
    "url": "http://localhost:8600/geoserver/Jeru/wms",
    "params": {
        "LAYERS": "Jeru:dimigcompile"
    },
    "serverType": "geoserver",
    "visible": 1,
    "selectable": 1
}
class SingleLayerTest extends React.Component {
    componentDidMount() { }
    componentDidUpdate() { }



    handleClick = () => {
        const newLyr = new ImageLayer({
            source: new ImageWMS({
                params: LayerSample.params,
                url: LayerSample.url,
                serverType: LayerSample.serverType,
            }),
        });
        newLyr.selectable = LayerSample.selectable
        const map = NessMapping.getInstance().getMapProxy(this.props.map.focused)._olmap
        map.addLayer(newLyr)




    }

    render() {
        return (
            <React.Fragment>

                <button
                    className="ui icon button"
                    onClick={() => this.handleClick()}
                >
                    Add a layer
                    </button>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return { map: state.map };
};

export default connect(mapStateToProps)(SingleLayerTest);