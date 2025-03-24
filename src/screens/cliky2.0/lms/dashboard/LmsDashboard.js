import React, { Component } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { CustomStyle } from '../../../style'
import { DynamicCategoryTab, LmsActivitySelectionTab } from '../../../../pageShared'
import { Text } from 'react-native'
import Header from '../../header/Header'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import styles from './Style'
import { Dimension, FontFamily, ImageName } from '../../../../enums'
import { Image } from 'react-native'
import SvgComponent from '../../../../assets/svg'


const tabData = [
    {
        id: 1,
        text: "Category 1",
        check: true
    },
    {
        id: 2,
        text: "Category 2",
        check: false
    },
    {
        id: 3,
        text: "Category 3",
        check: false
    },
    {
        id: 4,
        text: "Category 4",
        check: false
    },
    {
        id: 5,
        text: "Category 5",
        check: false
    },
]

export default class LmsDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabData: tabData,
            tabLoader: false
        }
    }

    activitySec = () => {

        const onSelect = (type) => {
            if (type == "salesConfirmation") {
                this.props.navigation.navigate("SalesConfirmation")
            }
            if (type == "salesInvoice") {
                this.props.navigation.navigate("ValidateSales")
            }
            if (type == "redemption") {
                this.props.navigation.navigate("RequestRedemtion")
            }
            if (type == "registration") {
                this.props.navigation.navigate("AddNewCustomer")
            }
            if (type == "newOrder") {
                this.props.navigation.navigate("NewOrder")
            }
            if (type == "stockUpdate") {
                this.props.navigation.navigate("StockUpdateList")
            }
            if (type == "influencerActivity") {
                this.props.navigation.navigate("InfluencerActivity")
            }




        }
        return (
            <View style={{ marginHorizontal: 15, borderRadius: 15, backgroundColor: "#FFF2F3", justifyContent: "center", alignItems: "center", marginTop: 20, paddingBottom: 10 }}>
                <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 16, marginTop: 10 }}>Activity Behalf of Customers</Text>
                <View>
                    <Image source={ImageName.LMS_DASH_INITIAL_LOGO} style={{ height: 120, width: 150, resizeMode: "cover" }} />
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => onSelect("salesConfirmation")}
                        style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <SvgComponent svgName={"threeDBox"} height={26} width={26} strokeColor={"#F13748"} />
                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>Sales{"\n"} Confirmation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onSelect("salesInvoice")}
                        style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <SvgComponent svgName={"invoiceWithTick"} height={26} width={26} strokeColor={"#F13748"} />

                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>Validate {"\n"}Sales INV</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onSelect("influencerActivity")}
                        style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <SvgComponent svgName={"doubleUser"} height={26} width={26} strokeColor={"#F13748"} />

                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>Influencer{"\n"}Activity</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => onSelect("redemption")}
                        style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <SvgComponent svgName={"threeDBoxWithTwoCircleRotate"} height={28} width={28} strokeColor={"#F13748"} />

                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>Request{"\n"}Redemption</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onSelect("registration")}
                        style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <SvgComponent svgName={"userWithPencil"} height={26} width={26} strokeColor={"#F13748"} />

                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>Customer{"\n"}Registration</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onSelect("newOrder")}
                        style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <SvgComponent svgName={"threeDCubeScan"} height={30} width={30} strokeColor={"#F13748"} />

                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>New{"\n"}Order</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <SvgComponent svgName={"lmsUpload"} height={26} width={26} strokeColor={"#F13748"} />

                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>Upload{"\n"}Data</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onSelect("stockUpdate")}
                        style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 5 }}>
                            <SvgComponent svgName={"threeDBoxRotate"} height={32} width={32} strokeColor={"#F13748"} />

                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>Stock{"\n"}Update</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 0.5, borderColor: "#F4C5C9", backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, alignItems: "center", justifyContent: "center", height: 90, width: Dimension.width / 3 - 20, marginHorizontal: 5 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <SvgComponent svgName={"designation"} height={26} width={26} strokeColor={"#F13748"} />

                        </View>
                        <Text style={{ color: "#1F2B4D", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, textAlign: "center" }}>Refer a{"\n"}Customer</Text>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onSelectTab = () => {
        console.log("selected--------")
    }

    // for users activity section
    onUserActivitySelectionSection = () => {
        return (<LmsActivitySelectionTab {...this.props} onClickItem={() => this.onSelectTab()} />);
    }

    tabSec = () => {
        const tabSelect = (item, key) => {
            let tabData = this.state.tabData;
            for (let i = 0; i < tabData.length; i++) {
                if (i == key) {
                    tabData[i].check = true;
                } else {
                    tabData[i].check = false;
                }
            }
            this.setState({ tabData: tabData })
        }

        const skelitonPlaceHolder = () => {
            return (
                <SkeletonPlaceholder>
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />
                        <View style={{ height: 30, width: 80, marginHorizontal: 5, borderRadius: 20 }} />

                    </View>
                </SkeletonPlaceholder>
            )
        }
        return (
            <>
                <View style={{ marginHorizontal: 10, marginTop: 10, }}>
                    {/* {this.state.tabLoader ?
                        skelitonPlaceHolder()
                        : */}
                    <React.Fragment>
                        {/* {this.state.tabData.length > 0 ? */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                            <View style={{ flexDirection: "row" }}>
                                {this.state.tabData.map((item, key) => (
                                    <View style={{ marginHorizontal: 5, marginVertical: 5, flexDirection: "row", }} key={key}>
                                        <DynamicCategoryTab
                                            data={item}
                                            onSelectedTab={() => tabSelect(item, key)}
                                        />
                                    </View>
                                ))}
                            </View>

                        </ScrollView>
                        {/* :
                                null
                            } */}
                    </React.Fragment>
                    {/* } */}
                </View>
            </>
        )
    }

    pointSec = () => {
        return (
            <View style={{ marginTop: 20 }}>
                <Image source={ImageName.LMS_DASH_POINT_IMG} style={{ height: 190, width: Dimension.width, resizeMode: "contain", borderRadius: 15 }} />
            </View>
        )
    }

    graphSec = () => {
        return (
            <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center", }}>
                <Image source={ImageName.LMS_DASH_GRAPH_IMG} style={{ height: 300, width: Dimension.width - 40, resizeMode: "cover", }} />
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header onRefresh={() => console.log("")} {...this.props} />
                <ScrollView showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    {this.activitySec()}
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        horizontal={true}
                    >
                        <View style={{ flexDirection: "row", marginTop: 5, marginHorizontal: 20 }}>
                            {this.onUserActivitySelectionSection()}
                        </View>

                    </ScrollView>
                    {this.pointSec()}
                    {this.graphSec()}
                    {/* {this.tabSec()} */}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}
