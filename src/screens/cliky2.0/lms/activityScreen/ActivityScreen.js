import React, { Component } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './Style'
import { Color, Dimension, FontFamily, ImageName } from '../../../../enums'
import { CatalogueItem } from '../../../../pageShared'
import Header from './../../header/Header'
import SvgComponent from '../../../../assets/svg'

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

    goBack = () => {
        this.props.navigation.goBack()
    }

    headSec = () => {
        return (
            <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center", marginHorizontal: 10 }}>
                <Image source={ImageName.LOYALTY_LOGO} style={{ height: 50, width: 50, resizeMode: "contain" }} />
                <View style={{ flex: 1 }} />
                <TouchableOpacity style={{ marginRight: 20 ,padding:10}} onPress={() => this.goBack()}>
                    <SvgComponent svgName={"cross"} height={20} width={20} strokeColor={"#000"} />
                </TouchableOpacity>
            </View>
        )
    }

    listSec = () => {
        const onSelect = (type) => {
            if (type == "passbook") {
                this.props.navigation.replace("PassbookAndRedemption")
            }
            if (type == "profile") {
                this.props.navigation.replace("ProfilePage")
            }
            if (type == "redemption") {
                this.props.navigation.replace("SchemeCatalogue")
            }
            if (type == "registration") {
                this.props.navigation.replace("AddNewCustomer")
            }
            if (type == "scheme") {
                this.props.navigation.replace("SchemePage")
            }
            if (type == "stock") {
                this.props.navigation.replace("StockUpdateList")
            }
            
        }
        return (
            <View style={{marginLeft:60,marginTop:40}}>
                <TouchableOpacity style={{paddingVertical:10}} onPress={() => onSelect("passbook")}>
                    <Text style={{ color: "#172834", fontSize: 18, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>My Passbook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingVertical:10}} onPress={() => onSelect("stock")}>
                    <Text style={{ color: "#172834", fontSize: 18, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>Stock</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{paddingVertical:10}} onPress={() => onSelect("lifting")}>
                    <Text style={{ color: "#172834", fontSize: 18, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>Lifting</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={{paddingVertical:10}}>
                    <Text style={{ color: "#172834", fontSize: 18, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>Offers</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={{paddingVertical:10}} onPress={() => onSelect("scheme")}>
                    <Text style={{ color: "#172834", fontSize: 18, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>Scheme</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{paddingVertical:10}}>
                    <Text style={{ color: "#172834", fontSize: 18, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>My Favourite Product</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={{paddingVertical:10}} onPress={() => onSelect("redemption")}>
                    <Text style={{ color: "#172834", fontSize: 18, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>Reedem Status</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingVertical:10}} onPress={() => onSelect("profile")}>
                    <Text style={{ color: "#172834", fontSize: 18, fontFamily: FontFamily.FONTS.INTER.REGULAR }}>My Profile</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>

                {this.headSec()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.listSec()}
                    <View style={{ height: 50 }} />
                </ScrollView>

            </SafeAreaView>
        )
    }
}
