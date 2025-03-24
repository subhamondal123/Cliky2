//1. tick is used for check and uncheck with tick icon, 


import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import {
    Image,
} from 'react-native';
import {
    ImageName
} from '../../enums';
import { DeviceInfo } from '../../services/config';
import { useNetInfo } from "@react-native-community/netinfo";
import { ActivityIndicator } from 'react-native';

function ImagePreview({
    width,
    height,
    source,
    isHidden,
    style,
    resizeMode,
}) {
    if (isHidden) return null;
    const [connectionCheck, setConnectionCheck] = useState(true);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        netConnectionCheck();
    }, []);
    
    // for check the network 
    const netConnectionCheck = async () => {
        let netCheck = await DeviceInfo.CheckConnection();
        setConnectionCheck(netCheck);
        setLoader(false);
    }

    if (source === undefined || source === null || connectionCheck == false) {
        source = ImageName.CHALO_BACHO_LOGO;
    }
    // for image view style
    let imageStyle = { height: height, width: width, resizeMode: resizeMode, ...style };
    let respPreview = null;
    if (loader) {
        respPreview = <ActivityIndicator />
    } else {
        respPreview = <Image source={source} style={imageStyle} />;
    }
    return respPreview;
}

ImagePreview.defaultProps = {
    width: 50,
    height: 50,
    isHidden: false,
    style: {},
    resizeMode: "contain"
};

ImagePreview.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    isHidden: PropTypes.bool,
    style: PropTypes.instanceOf(Object),
    resizeMode: PropTypes.string
};


export default ImagePreview;