import config from "react-global-configuration";
import {
    fetchData
} from './apiManager'

//options for metaDataType paramter
//layers/tools/subjects/layerlist; 

export async function getMetaData(metaDataType) {

    var url;
    var functionName;

    var metaDataApi = config.get("metaDataApi")

    if (metaDataApi != null)
        functionName = metaDataType;

    if (functionName)
        url = metaDataApi["url"];

    return fetchData({
        url: url,
        functionName: functionName,
        method: "Get"
    });
}