import GeoJSON from 'ol/format/GeoJSON.js';
import {
    Projection
} from 'ol/proj';


export const sourceFormat = new GeoJSON()
export const projection = new Projection({
    code: 'EPSG:2039',
    units: 'm',
    axisOrientation: 'neu',
    global: false
});