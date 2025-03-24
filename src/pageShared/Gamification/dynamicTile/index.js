import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import {
    View,
    Image,
    Text,
    SafeAreaView,
} from 'react-native';


function DynamicTile({
    type,
    data,
    isHidden,
    props,
}) {
    if (isHidden) return null;

    return (
        <SafeAreaView>
            <View style={styles.mainBox}>
                <View style={{ alignItems: "center", flexDirection: "row", flex: 1 }}>
                    <View style={styles.homeCircel}>
                        <Image source={data.profilePic} style={styles.homeLogo} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.nameTxt}>{data.name}</Text>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.zoneTxt}>{data.zone}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: "row",alignSelf:"flex-end" }}>
                        <Text style={styles.posTxt}>{data.number}</Text>
                        <Text style={styles.posLvlTxt}>{data.position}</Text>
                    </View>
                    <View>
                        <Text style={styles.zoneTxt}>Achieved  <Text style={styles.percentageTxt}>{data.achieved}%</Text></Text>

                    </View>

                </View>

            </View>

        </SafeAreaView >
    );

}

DynamicTile.defaultProps = {
    isHidden: false,
    data: {},
    type: "",

};

DynamicTile.propTypes = {
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    type: PropTypes.string,


};


export default DynamicTile;