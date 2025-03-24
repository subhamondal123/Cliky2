import React, { Component } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './Style'
import { Color, Dimension, FontFamily, ImageName } from '../../../../enums'
import LinearGradient from 'react-native-linear-gradient'
import { CatalogueItem } from '../../../../pageShared'
import Header from './../../header/Header'
import SvgComponent from '../../../../assets/svg'
import { MiddlewareCheck } from '../../../../services/middleware'
import { ErrorCode } from '../../../../services/constant'
import { modifyDetailsData } from './Function'

const diwaliData = [
    {
        id: 1,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },
    {
        id: 2,
        image: ImageName.BIKE,
        label: "Car",
        amount: "2000"
    },
    {
        id: 3,
        image: ImageName.BIKE,
        label: "Bike",
        amount: "2000"
    },


]

export default class CatalogueItemDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            detailsObj: {},
            pageLoader: false
        }
    }

    componentDidMount = () => {
        this.load();
    }

    load = async () => {
        this.setState({ pageLoader: true })
        let reqData = {
            itemId: "1"
        }
        let responseData = await MiddlewareCheck("getItemDetails", reqData, this.props)
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                this.setState({ detailsObj: modifyDetailsData(responseData.response) })
            }
        }

        this.setState({ pageLoader: false })
    }

    activePointSec = () => {
        return (
            <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: "row", alignItems: "center" }}>
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <SvgComponent svgName={"nineDot"} strokeColor={"#F13748"} height={11} width={11} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Active Point : </Text>
                    <Text style={{ color: "#F13748", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>2200</Text>
                </View>

            </View>
        )
    }
    productItemImageSec = () => {
        return (
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <View>
                    <Image source={{uri:this.state.detailsObj.imagePath}} style={{ height: 325, width: Dimension.width - 20, resizeMode: "cover", borderRadius: 20 }} />
                </View>
            </View>
        )
    }
    productItemDescriptionSec = () => {
        return (
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <Text style={{ color: "#172834", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, }}>{this.state.detailsObj.itemName}</Text>
            </View>
        )
    }

    pointClaimSec = () => {
        return (
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <SvgComponent svgName={"nineDot"} strokeColor={"#F13748"} height={16} width={16} />
                        <Text style={{ color: "#172834", fontSize: 30, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, marginLeft: 10 }}>2000</Text>
                        <Image source={ImageName.YELLOW_STAR} style={{ height: 18, width: 18, resizeMode: "contain", marginLeft: 10 }} />
                    </View>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity >
                        <View style={{ borderRadius: 20, borderWidth: 0, alignItems: "center", justifyContent: "center", paddingHorizontal: 15, paddingVertical: 8, backgroundColor: Color.COLOR.RED.AMARANTH }}>
                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 16 }}>Claim Now</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ marginTop: 5, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 15, paddingVertical: 3, alignSelf: "flex-start", borderColor: "#817D7A" }}>
                        <Text style={{ color: "#817D7A", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12 }}>Remain points after claim :
                            <Text style={{ color: "#00AB1B", fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12 }}> 200</Text>
                        </Text>

                    </View>
                </View>
            </View>
        )
    }


    suggestedProductSec = () => {
        const onViewOffers = () => {
            this.props.navigation.navigate("CatalogueSchemes")
        }
        const onSelectItem = () => {
            this.props.navigation.navigate("CatalogueItemDetails")
        }
        return (
            <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", marginBottom: 10, alignItems: "center" }}>
                    <View>
                        <Text style={{ color: "#000", fontSize: 16, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, marginLeft: 5 }}>Suggested for You</Text>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {diwaliData.map((item, key) => (
                        <View style={{ marginHorizontal: 5, borderRadius: 20 }} key={key}>
                            <CatalogueItem data={item} onPress={(value) => onSelectItem(value)} />
                        </View>
                    ))}
                </ScrollView>
            </View>

        )
    }

    earnMoreProductSec = () => {
        const onSelectItem = () => {
            this.props.navigation.navigate("CatalogueItemDetails")
        }
        return (
            <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", marginBottom: 10, alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#000", fontSize: 16, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, marginLeft: 5 }}>Earn more Points {"\n"}and claim better gift</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {diwaliData.map((item, key) => (
                        <View style={{ marginHorizontal: 5, borderRadius: 20 }} key={key}>
                            <CatalogueItem data={item} onPress={(value) => onSelectItem(value)} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        )
    }

    onNotification = () => {
        console.log("----")
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header {...this.props} onRefresh={() => console.log("")} onApplyFilter={() => console.log("")} onResetFilter={() => console.log("")} onPressNotification={() => this.onNotification()} />

                {this.activePointSec()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.productItemImageSec()}
                    {this.productItemDescriptionSec()}
                    {this.pointClaimSec()}
                    {this.suggestedProductSec()}
                    {this.earnMoreProductSec()}
                    {/* {this.loyaltyAdvisorSec()} */}
                    <View style={{ height: 50 }} />
                </ScrollView>

            </SafeAreaView>
        )
    }
}
