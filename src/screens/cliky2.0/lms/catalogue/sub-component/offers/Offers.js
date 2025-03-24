import React, { Component } from 'react'
import { Dimension, FontFamily, ImageName } from '../../../../../enums'
import { FlatList, Image, Text, View } from 'react-native'
import SvgComponent from '../../../../../assets/svg'


const offerData = [
    {
        id: 1,
        image: ImageName.OFFER1
    },
    {
        id: 2,
        image: ImageName.OFFER1
    },
    {
        id: 3,
        image: ImageName.OFFER1
    },
    {
        id: 1,
        image: ImageName.OFFER1
    },
    {
        id: 2,
        image: ImageName.OFFER1
    },
    {
        id: 3,
        image: ImageName.OFFER1
    },


]


export default class Offers extends Component {
    activePointSec = () => {
        return (
            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <SvgComponent svgName={"nineDot"} strokeColor={"#00AB1B"} height={11} width={11} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Active Point : </Text>
                    <Text style={{ color: "#00AB1B", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>2200</Text>
                </View>
            </View>
        )
    }

    renderList = (item) => {
        return (
            this.renderItemData(item.item, item.index)
        )
    }
    renderItemData = () => {
        return (
            <View style={{ marginVertical: 10 }}>
                <Image source={ImageName.OFFER1} style={{ height: 200, width: Dimension.width - 20, borderRadius: 15 }} />
            </View>
        )
    }
    renderLoader = () => {
        return (
            <View style={{ marginBottom: 100 }} />
        )
    }
    render() {
        return (
            <View>
                {this.activePointSec()}
                <View style={{ marginHorizontal: 10 }}>
                    <FlatList
                        data={offerData}
                        renderItem={(item, key) => this.renderList(item, key)}
                        keyExtractor={(item, key) => key}
                        // onEndReached={this.fetchMore}
                        // onEndReachedThreshold={0.1}
                        ListFooterComponent={this.renderLoader}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />

                </View>
            </View>
        )
    }
}
