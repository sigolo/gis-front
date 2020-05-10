import React from 'react'
import { Tab } from 'semantic-ui-react'
import { connect } from "react-redux";
import { InitMap, setMapFocus } from "../../redux/actions/map"
import { resetTools } from "../../redux/actions/tools"
import NessMapping from "../../nessMapping/mapping";
import './style.css'



export const MapTabs = (props) => {

    const handleTabChange = async (uuid) => {
        await props.resetTools()
        if (uuid == "+") {
            props.InitMap()
        } else {
            const olmap = NessMapping.getInstance().getMapProxy(uuid)._olmap
            olmap.setTarget("map")
            props.setMapFocus(uuid)
        }


    }

    const panes = []

    if (props.maps.uuids) {
        props.maps.uuids.map(
            uuid => panes.push(
                {
                    menuItem: uuid,
                    render: () => null
                }
            )
        )
    }

    if (props.maps.focused) {
        const olmap = NessMapping.getInstance().getMapProxy(props.maps.focused)._olmap
        olmap.setTarget("map")
    }



    panes.push({
        menuItem: '+',
        pane: <div key={'addmap'}></div>,
    })



    return (
        <Tab menu={{ attached: 'top' }} panes={panes} className="mapTab" onTabChange={(e, meta) => handleTabChange(meta.panes[meta.activeIndex].menuItem)} />
    )
}

const mapStateToProps = (state) => ({
    maps: state.map,
})



export default connect(mapStateToProps, {
    InitMap, setMapFocus, resetTools
})(MapTabs);