import React, { Component } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './Style'
import { Color, Dimension, FontFamily, ImageName } from '../../../../enums'
import SvgComponent from '../../../../assets/svg'
import { DateConvert } from '../../../../services/common-view-function'
import { GiftClaimModal, ProfileSec } from '../../../../pageShared'
import Header from '../../header/Header'


let data = [
    {
        id: 1,
        level: "1",
        label: "Requested",
        labelColor: "#E3BE5D",
        backgroundColor: "#FFF4BB",
        steps: [
            {
                label: "request Generate",
                date: "2023-07-12T20:17:46.384Z"
            },
            {
                label: "request Approved",
                date: "2023-07-13T20:17:46.384Z",
                approvedBy: "Ronit Roy",
                approverRole: "Admin"
            }
        ],
        showHide: false
    },
    {
        id: 2,
        level: "2",
        label: "CRM",
        labelColor: "#54C0A0",
        backgroundColor: "#BBFFEB",
        steps: [
            {
                label: "Crm Approved",
                date: "2023-07-15T20:17:46.384Z",
                approvedBy: "Ronit Roy",
                approverRole: "Admin"
            },
        ],
        showHide: false
    },
    {
        id: 3,
        level: "3",
        label: "Purchase",
        labelColor: "#7382D1",
        backgroundColor: "#C9D2FF",
        steps: [
            {
                label: "Purchase Initiate",
                date: "2011-07-22T20:17:46.384Z",
                approvedBy: "Ronit Roy",
                approverRole: "Admin"
            },
            {
                label: "Purchase Complete",
                date: "2011-07-23T20:17:46.384Z",
                approvedBy: "Ronit Roy",
                approverRole: "Admin"
            },
        ],
        showHide: false
    },
    {
        id: 4,
        level: "4",
        label: "Couriered",
        labelColor: "#C372CA",
        backgroundColor: "#FBC9FF",
        steps: [
            {
                label: "Courier Send",
                date: "2011-07-25T20:17:46.384Z",
                courierSendBy: "Palash Dey",
                senderRole: "Admin"
            },
            {
                label: "Courier on Transit",
                date: "2011-07-25T20:17:46.384Z",
                transitedBy: "Bluedart",
                transitId: "12345678"
            },
            {
                label: "Courier Delivered",
                date: "2011-07-28T20:17:46.384Z",
                recievedBy: "Samar Das",
                deliveryAddress: "Aenean quis odio eu purus porta rutrum sed et orci. Fusce purus"
            },
        ],
        showHide: false
    },
    {
        id: 5,
        level: "5",
        label: "Audit",
        labelColor: "#57C95A",
        backgroundColor: "#9FF7A2",
        showHide: false
    },

]

export default class RedemptionDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedItem: {},
            isVisibleModal: false
        }
    }

    activePointSec = () => {
        return (
            <View style={{ marginHorizontal: 10, marginTop: 15, flexDirection: "row", alignItems: "center" }}>
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <SvgComponent svgName={"nineDot"} strokeColor={"#F13748"} height={11} width={11} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Active Point : </Text>
                    <Text style={{ color: "#F13748", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>2200</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        )
    }

    lastRedeemSec = () => {
        return (
            <View style={{ borderRadius: 10, backgroundColor: "#EFEFEF", paddingHorizontal: 10, paddingVertical: 15, marginHorizontal: 10, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Image source={ImageName.BIKE} style={{ height: 110, width: 80, resizeMode: "contain", borderRadius: 10 }} />
                    </View>
                    <View style={{ marginLeft: 10, paddingVertical: 5 }}>
                        <Text style={{ color: "#172834", fontSize: 16, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>Last Redeem</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <SvgComponent svgName={"calender"} strokeColor={"#8D9499"} height={16} width={16} />
                            <Text style={{ color: "#535C63", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.MEDIUM, marginLeft: 5 }}>12 Jan 2023</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ marginBottom: 7 }}>
                            <Text style={{ color: "#172834", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>iPhone 6</Text>
                        </View>
                        <View style={{ borderRadius: 15, backgroundColor: "#FBC9FF", flexDirection: "row", padding: 2, alignItems: "center", alignSelf: "flex-start" }}>
                            <View style={{ borderRadius: 100, backgroundColor: "#C372CA", alignItems: "flex-start", justifyContent: "center", height: 21, width: 21 }}>
                                <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 10, fontFamily: FontFamily.FONTS.POPPINS.BOLD, marginLeft: 5, textAlign: "center" }}>L4</Text>
                            </View>
                            <Text style={{ color: "#161616", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 5, marginRight: 5, textAlign: "center" }}>Couriered</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View>
                        <Text style={{ color: "#FF2E00", fontSize: 24, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, textAlign: "right" }}>-200</Text>
                        <Text style={{ color: "#172834", fontSize: 11, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: "right", top: -10 }}>Points</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: "#172834", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id ipsum sed odio faucibus cursus. Sed varius euismod iaculis. Duis malesuada rutrum erat. Integer non aliquet sapien.</Text>
                </View>
            </View>
        )
    }

    statusSec = () => {
        return (
            <View>
                {data.map((item, key) => (
                    <View key={key} style={{ marginHorizontal: 15 }}>
                        {item.label == "Audit" ?
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ width: Dimension.width / 2, borderRadius: 15, backgroundColor: item.backgroundColor, padding: 10, alignItems: "center", flexDirection: "row", marginVertical: 10 }}>
                                    <View style={{ borderRadius: 100, backgroundColor: item.labelColor, padding: 10, alignItems: "center", height: 42, width: 42 }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 15, fontFamily: FontFamily.FONTS.INTER.MEDIUM, textAlign: "center" }}>L{item.level}</Text>
                                    </View>
                                    <Text style={{ color: "#161616", fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{item.label}</Text>
                                </View>
                                <View style={{ borderRadius: 5, backgroundColor: "#FFE176", padding: 10, alignItems: "center", flexDirection: "row", marginVertical: 10, marginLeft: 10 }}>
                                    <Text style={{ color: "#172834", fontSize: 14, fontFamily: FontFamily.FONTS.INTER.MEDIUM, textAlign: "center", paddingHorizontal: 20 }}>Hold</Text>
                                </View>
                            </View>
                            :
                            <View style={{ width: Dimension.width / 2, borderRadius: 15, backgroundColor: item.backgroundColor, padding: 10, alignItems: "center", flexDirection: "row", marginVertical: 10 }}>
                                <View style={{ borderRadius: 100, backgroundColor: item.labelColor, padding: 10, alignItems: "center", height: 42, width: 42 }}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: 15, fontFamily: FontFamily.FONTS.INTER.MEDIUM, textAlign: "center" }}>L{item.level}</Text>
                                </View>
                                <Text style={{ color: "#161616", fontSize: 14, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 10 }}>{item.label}</Text>
                            </View>

                        }

                        {item.steps && item.steps.map((item1, key1) => (
                            <View style={{ flexDirection: "row", marginBottom: 10 }} key={key1} >
                                <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 10 }}>
                                    <View style={styles.shadowView} />
                                    <View style={[styles.processLine, { borderColor: "#9A9A9A" }]} />
                                    <View style={[styles.processLine, { borderColor: "#9A9A9A" }]} />
                                    <View style={[styles.processLine, { borderColor: "#9A9A9A" }]} />
                                    <View style={[styles.processLine, { borderColor: "#9A9A9A" }]} />
                                </View>
                                <View>
                                    <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5, marginRight: 5 }}>{item1.label}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <SvgComponent svgName={"calender"} height={15} width={15} strokeColor={"#5E5E5E"} />
                                        <Text style={{ color: "#000", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: 5, marginRight: 5 }}>{DateConvert.viewDateFormat(item1.date)}</Text>
                                    </View>
                                    {item1.approvedBy ?
                                        <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5, marginRight: 5 }}>Approved by {"\n"}{item1.approvedBy} {"\n"}
                                            <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 5, marginRight: 5 }}>
                                                {item1.approverRole}
                                            </Text>
                                        </Text>
                                        : null}
                                    {item1.courierSendBy ?
                                        <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5, marginRight: 5 }}>by {"\n"}{item1.courierSendBy} {"\n"}
                                            <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 5, marginRight: 5 }}>
                                                {item1.senderRole}
                                            </Text>
                                        </Text>
                                        :
                                        null
                                    }
                                    {item1.transitedBy ?
                                        <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5, marginRight: 5 }}>by {"\n"}{item1.transitedBy} {"\n"}
                                            <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5, marginRight: 5 }}>
                                                Tracking ID #{item1.transitId}
                                            </Text>
                                        </Text>
                                        :
                                        null
                                    }
                                    {item1.recievedBy ?
                                        <>
                                            <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 5, marginRight: 5 }}>Recieved by {"\n"}
                                                <Text style={{ color: "#5E5E5E", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5, marginRight: 5 }}>{item1.recievedBy}
                                                </Text>
                                            </Text>
                                            <View style={{ width: Dimension.width / 1.5, backgroundColor: "#DCDCDC", padding: 10, borderRadius: 15, flexDirection: "row", marginTop: 10 }}>
                                                <SvgComponent svgName="locationWithBGColor" strokeColor={"#000"} height={25} width={25} />
                                                <View>
                                                    <Text style={{ color: "#000", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, marginLeft: 5, marginRight: 5 }}>Delivery Address</Text>
                                                    <Text style={{ color: "#4F4F4F", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginLeft: 5, marginRight: 5 }}>{item1.deliveryAddress}</Text>
                                                </View>
                                            </View>
                                        </>
                                        :
                                        null
                                    }

                                </View>
                            </View>
                        ))}

                    </View>
                ))}
                <View>

                </View>
            </View>
        )
    }

    onModalView = () => {
        this.setState({ isVisibleModal: true })
    }

    grievanceSec = () => {
        return (
            <View style={{ marginHorizontal: 30, justifyContent: "center", alignItems: "center", marginTop: 30, marginBottom: 20 }}>
                <Text style={{ color: "#4F4F4F", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, textAlign: "center" }}>
                    If you Have any Grievance on claimed product,Please click below.
                </Text>
                <Text style={{ color: "#4F4F4F", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, marginTop: 10 }}>
                    It has  <Text style={{ color: "#FF2E00", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>4</Text> Grievance thread
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <SvgComponent svgName="angryFace" strokeColor={"#FF2E00"} height={30} width={30} />
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this.onModalView()}>
                        <View style={{ borderRadius: 25, paddingHorizontal: 20, paddingVertical: 10, marginLeft: 10, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE }}>
                            <Text style={{ color: "#fff", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.BOLD, textAlign: "center" }}>
                                Process Grievance
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    modalSec = () => {
        const onClose = () => {
            this.setState({ isVisibleModal: false })
        }
        return (
            <>
                <GiftClaimModal isVisible={this.state.isVisibleModal} onCloseModal={() => onClose()} />
            </>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.modalSec()}
                <Header {...this.props} onRefresh={() => console.log("")} />
                {/* {this.activePointSec()} */}
                <ProfileSec />
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.lastRedeemSec()}
                    {this.statusSec()}
                    {this.grievanceSec()}
                </ScrollView>

            </SafeAreaView>
        )
    }
}
