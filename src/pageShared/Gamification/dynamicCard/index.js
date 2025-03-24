import React from 'react'
import { ImageName } from '../../../enums';
import { Image, TouchableOpacity, View } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './styles';
import { Text } from 'react-native';

function DynamicCard({
    width,
    props,
    data,
    isHidden,
    onSelectTab
}) {

    if (isHidden) return null;

    const onPressTab = (value) => {
        onSelectTab(value)
    }

    return (
        <TouchableOpacity style={[styles.mainCard, { backgroundColor: data.backgroundColor, width: width }]} activeOpacity={0.9} onPress={() => onPressTab(data)}>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
                <View style={{ flex: 1 }}>
                    <Image source={ImageName.CARD_KING_LOGO} style={{ height: 90, width: 160, resizeMode: "stretch" }} />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", marginRight: 10 }}>
                    <Image source={ImageName.SMALL_YELLOW_STAR_ICON} style={{ height: 50, width: 50, resizeMode: "stretch" }} />
                    <View style={{ top: -5, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.positionTxt}>Position</Text>
                        <Text style={styles.positionTxt}>Holder</Text>
                    </View>

                    <View style={{ position: 'absolute', top: 0, left: 0, right: 2, bottom: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.starSecLevelTxt}>{data.position}st</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: 20, top: -10 }}>
                {
                    data.executiveCount == undefined || data.executiveCount == null ? null :
                        <View style={{ flex: 1 }}>
                            <Text style={styles.executiveTxt}>{data.executiveCount} Executive</Text>
                            <Text style={styles.executiveBottomTxt}>Achievement by the quarter</Text>
                        </View>
                }

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                        <Text style={styles.acheivementPercentTxt}>{data.achievementPercentage}%</Text>
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={styles.executiveTxt}>Achieved</Text>
                        <Text style={styles.executiveBottomTxt}>by 30 April</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

DynamicCard.defaultProps = {
    width: "100%",
    isHidden: false,
    data: {},
    onSelectTab:() => { }

};

DynamicCard.propTypes = {
    width: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    isHidden: PropTypes.bool,
    onSelectTab:PropTypes.func

};

export default DynamicCard