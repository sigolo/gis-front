/* eslint-disable no-throw-literal */
import GenerateUUID from '../utils/uuid';
import NessLayer from "./nessLayer";
import { Map } from "ol";




export default class MapProxy {
    constructor(mapConfig) {
        var uuid = { value: GenerateUUID() };
        Object.freeze(uuid);  // freeze uuid, it is too important !
        this.uuid = uuid;

        this._layers = [];

        mapConfig.layers = [];  // ensure we begin with an empty layers array
        this._olmap = new Map(mapConfig);
    }

    // TODO: consider hiding map completely...
    get OLMap() {
        return this._olmap;
    }

    AddLayer(lyrOrId, addToMap = false) {
        var nl = null;

        if (typeof lyrOrId === 'number') {
            // this might be a metadata layer id
            nl = new NessLayer(lyrOrId);
        } else if (lyrOrId instanceof NessLayer) {
            nl = lyrOrId;
        } else {
            throw "AddLayer failed - invalid input";
        }

        this._layers.push(nl);
        if (addToMap) {
            nl.AddSelfToMap(this);
        }

        return nl;
    }
}