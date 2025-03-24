import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native'
import React, { Component } from 'react';

function VirtualizedView(props) {
    return (
        <FlatList
            data={[]}
            ListEmptyComponent={null}
            keyExtractor={() => "dummy"}
            renderItem={null}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <React.Fragment>{props.children}</React.Fragment>
            )}
        />
    );
}


export default VirtualizedView;