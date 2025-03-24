import React from 'react';
import { RefreshControl } from 'react-native';

function PageRefreshControl({
    refreshing,
    onRefresh,
    color,
    enabled,
    progressBackgroundColor,//background color of the indicator
    progressViewOffset,
    size,
    tintColor,   //color of the indicator
    title,       //title displayed under the refresh indicator(for IOS)
    titleColor,  //color of the title (for IOS)
    isHidden
}) {

    if (isHidden) return null;  //if isHidden is true then it show nothing

    const onRefresh = () => {
        onRefresh();
    }
    const refreshing = () => {
        refreshing();
    }
 

    return (
        <RefreshControl
        onRefresh={() => onRefresh()}
        refreshing={() => refreshing()}
      />
)

}

PageRefreshControl.defaultProps = {
    refreshing:false,
    onRefresh:() => {},
    
}