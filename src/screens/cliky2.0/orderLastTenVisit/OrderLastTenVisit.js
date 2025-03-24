
import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./Style";
import { Color, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton } from "../../../shared";

class OrderLastTenVisit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,

        };
    }

    componentDidMount = async () => {
        await this._load();
    }


    onBack = () => {
        this.props.navigation.goBack();
    };

    _load = async () => {
        // await this.orderHistoryApi(this.state.selectedCategoryId)
    };


    //header section
    headerSec = () => {
        return (
            <View style={{ marginVertical: 10, flexDirection: 'row', marginHorizontal: 15 }}>
                <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.9} onPress={() => this.onBack()}>
                    <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flex: 0.6, flexDirection: "row", alignItems: "center" }} activeOpacity={0.9} onPress={() => onProfileTab(this.state.profileData)}>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }} numberOfLines={1}>Last 10 Visits</Text>
                        <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }} numberOfLines={1}>{this.props.route.params.prevProps.custBusinessName}</Text>
                    </View>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center", alignItems: 'flex-end' }}>
                    <TouchableOpacity activeOpacity={0.9} >
                        <Image source={ImageName.SEARCH_LOGO_WITH_BLUE_BORDER} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center", alignItems: 'flex-end' }}>
                    <TouchableOpacity activeOpacity={0.9} >
                        <Image source={ImageName.FILTER_WITH_BLUE_BORDER} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center", alignItems: 'flex-end' }}>
                    <TouchableOpacity activeOpacity={0.9} >
                        <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 30, width: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.headerSec()}
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                        <View style={styles.dateSec}>
                            <Image source={ImageName.CALENDAR_VISIT} style={styles.calenderImg} />
                            <Text style={{ marginLeft: 5 }}><Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>29th</Text> June 23 <Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>Firday</Text></Text>
                        </View>

                        <View style={styles.secInfo}>
                            <View style={styles.secImg}>
                                <Image source={ImageName.VISIT_CROSS} style={styles.img} />
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.noOrderText}>No Order</Text>
                                <Text style={styles.noOrderText}>Key person not available</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 5 }} />
                        <View style={styles.dateSec}>
                            <Image source={ImageName.CALENDAR_VISIT} style={styles.calenderImg} />
                            <Text style={{ marginLeft: 5 }}><Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>28th</Text> June 23 <Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>Thursday</Text></Text>
                        </View>

                        <View style={styles.secInfo}>
                            <View style={styles.secGreenImg}>
                                <Image source={ImageName.WHITE_TICK_ICON} style={styles.img} />
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.noOrderText}>Order Placed</Text>
                                <Text style={styles.noOrderText}>Value - ₹2583</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 5 }} />
                        <View style={styles.dateSec}>
                            <Image source={ImageName.CALENDAR_VISIT} style={styles.calenderImg} />
                            <Text style={{ marginLeft: 5 }}><Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>27th</Text> June 23 <Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>Wednessday</Text></Text>
                        </View>

                        <View style={styles.secInfo}>
                            <View style={styles.secGreenImg}>
                                <Image source={ImageName.WHITE_TICK_ICON} style={styles.img} />
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.noOrderText}>Order Placed</Text>
                                <Text style={styles.noOrderText}>Value - ₹4733</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 5 }} />
                        <View style={styles.dateSec}>
                            <Image source={ImageName.CALENDAR_VISIT} style={styles.calenderImg} />
                            <Text style={{ marginLeft: 5 }}><Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>26th</Text> June 23 <Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>Tuesday</Text></Text>
                        </View>

                        <View style={styles.secInfo}>
                            <View style={styles.secGreenImg}>
                                <Image source={ImageName.WHITE_TICK_ICON} style={styles.img} />
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.noOrderText}>Order Placed</Text>
                                <Text style={styles.noOrderText}>Value - ₹4638</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 5 }} />
                        <View style={styles.dateSec}>
                            <Image source={ImageName.CALENDAR_VISIT} style={styles.calenderImg} />
                            <Text style={{ marginLeft: 5 }}><Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>25th</Text> June 23 <Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>Monday</Text></Text>
                        </View>

                        <View style={styles.secInfo}>
                            <View style={styles.secGreenImg}>
                                <Image source={ImageName.WHITE_TICK_ICON} style={styles.img} />
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.noOrderText}>Order Placed</Text>
                                <Text style={styles.noOrderText}>Value - ₹5543</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 5 }} />
                        <View style={styles.dateSec}>
                            <Image source={ImageName.CALENDAR_VISIT} style={styles.calenderImg} />
                            <Text style={{ marginLeft: 5 }}><Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>24th</Text> June 23 <Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>Sunday</Text></Text>
                        </View>

                        <View style={styles.secInfo}>
                            <View style={styles.secImg}>
                                <Image source={ImageName.VISIT_CROSS} style={styles.img} />
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.noOrderText}>No Order</Text>
                                <Text style={styles.noOrderText}>Key person not available</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 5 }} />
                        <View style={styles.dateSec}>
                            <Image source={ImageName.CALENDAR_VISIT} style={styles.calenderImg} />
                            <Text style={{ marginLeft: 5 }}><Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>23th</Text> June 23 <Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>Saturday</Text></Text>
                        </View>

                        <View style={styles.secInfo}>
                            <View style={styles.secGreenImg}>
                                <Image source={ImageName.WHITE_TICK_ICON} style={styles.img} />
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.noOrderText}>Order Placed</Text>
                                <Text style={styles.noOrderText}>Value - ₹6744</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 5 }} />
                        <View style={styles.dateSec}>
                            <Image source={ImageName.CALENDAR_VISIT} style={styles.calenderImg} />
                            <Text style={{ marginLeft: 5 }}><Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>22th</Text> June 23 <Text style={{ color: '#1F2B4D', fontWeight: 'bold' }}>Friday</Text></Text>
                        </View>

                        <View style={styles.secInfo}>
                            <View style={styles.secGreenImg}>
                                <Image source={ImageName.WHITE_TICK_ICON} style={styles.img} />
                            </View>
                            <View style={styles.textSec}>
                                <Text style={styles.noOrderText}>Order Placed</Text>
                                <Text style={styles.noOrderText}>Value - ₹8292</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }} />
                        <View style={{ marginHorizontal: 110 }}>
                            <BigTextButton
                                text={"Load More Order"}
                                borderRadius={22}
                                // backgroundColor={field.selectedValue == "No" ? "#0D9478" : "#fff"}
                                // fontColor={"#000"}
                                fontSize={12}
                                height={42}
                            // additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                            // onPress={() => handleTrueFalseSelect("No", key)}
                            // isDisabled={!field.isEditable}
                            />
                        </View>
                        <View style={{ marginBottom: 20 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    const { Sales360Redux } = state;
    return { Sales360Redux };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            stateCheckForNetwork,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderLastTenVisit);
