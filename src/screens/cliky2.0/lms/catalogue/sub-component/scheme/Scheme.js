import React, { Component } from 'react'
import { Dimension, FontFamily, ImageName } from '../../../../../enums'
import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import { CatalogueItem } from '../../../../../pageShared'
import SvgComponent from '../../../../../assets/svg'


const offerData = [
    {
        id: 1,
        image: ImageName.OFFER1,
        label: "Car",
        amount: 2000
    },
    {
        id: 2,
        image: ImageName.OFFER1,
        label: "Car",
        amount: 2000
    },
    {
        id: 2,
        image: ImageName.OFFER1,
        label: "Car",
        amount: 2000
    },
    {
        id: 2,
        image: ImageName.OFFER1,
        label: "Car",
        amount: 2000
    },
    {
        id: 2,
        image: ImageName.OFFER1,
        label: "Car",
        amount: 2000
    },
    {
        id: 2,
        image: ImageName.OFFER1,
        label: "Car",
        amount: 2000
    },
    {
        id: 2,
        image: ImageName.OFFER1,
        label: "Car",
        amount: 2000
    },

]


export default class Scheme extends Component {
    activePointSec = () => {
        return (
            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <SvgComponent svgName={"nineDot"} strokeColor={"#00AB1B"} height={11} width={11} />                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Active Point : </Text>
                    <Text style={{ color: "#00AB1B", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>2200</Text>
                </View>
            </View>
        )
    }

    diwaliSchemeSec = (item) => {
        return (
            <View style={{ backgroundColor: "#EFEFEF", paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <View>
                        <Text style={{ color: "#000", fontSize: 16, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>Diwali Scheme</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={ImageName.CALENDER_LOGO} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                        <Text style={{ color: "#000", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>20th Oct to 30th Nov 2023</Text>

                    </View>
                </View>
                <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                    {offerData.map((item, key) => (
                        <View key={key} style={{ marginHorizontal: 5, marginVertical: 2 }}>
                            <CatalogueItem data={item} width={Dimension.width / 3 - 20} />
                        </View>

                    ))}
                </View>
            </View>
        )
    }

    winterScheme = () => {
        return (
            <View style={{ backgroundColor: "#EFEFEF", paddingHorizontal: 10, paddingVertical: 10, marginTop: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <View>
                        <Text style={{ color: "#000", fontSize: 16, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>Winter Scheme</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={ImageName.CALENDER_LOGO} style={{ height: 20, width: 20, resizeMode: "contain" }} />
                        <Text style={{ color: "#000", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>20th Oct to 30th Nov 2023</Text>

                    </View>
                </View>
                <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                    {offerData.map((item, key) => (
                        <View key={key} style={{ marginHorizontal: 5, marginVertical: 2 }}>
                            <CatalogueItem data={item} width={Dimension.width / 3 - 20} />
                        </View>

                    ))}
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.activePointSec()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.diwaliSchemeSec()}
                    {this.winterScheme()}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        )
    }
}
