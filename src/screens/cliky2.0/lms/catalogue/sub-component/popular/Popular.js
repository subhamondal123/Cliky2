import React, { Component } from 'react'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums'
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CatalogueFilter, CatalogueItem } from '../../../../../pageShared'
import { CheckBox, Modal } from '../../../../../shared'
import styles from './Style'
import LinearGradient from 'react-native-linear-gradient'
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


export default class Popular extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisibleFilter: false
        }
    }

    filterModal = () => {
        this.setState({ isVisibleFilter: true })
    }

    activePointSec = () => {
        return (
            <View style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: "row", alignItems: "center" }}>
                <View style={{ borderWidth: 1, borderRadius: 30, borderColor: "#839CAE", alignSelf: "flex-start", alignItems: "center", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                    <SvgComponent svgName={"nineDot"} strokeColor={"#00AB1B"} height={11} width={11} />
                    <Text style={{ color: "#817D7A", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.REGULAR, marginLeft: 5 }}>Active Point : </Text>
                    <Text style={{ color: "#00AB1B", fontSize: 12, fontFamily: FontFamily.FONTS.INTER.BOLD, marginLeft: 5 }}>2200</Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={() => this.filterModal()}>
                <SvgComponent svgName={"filter"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={24} width={24} />
                </TouchableOpacity>
            </View>
        )
    }

    diwaliSchemeSec = (item) => {
        return (
            <View style={{ backgroundColor: "#EFEFEF", paddingHorizontal: 10, paddingVertical: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                    <View>
                        <Text style={{ color: "#000", fontSize: 16, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD }}>Popular</Text>
                    </View>
                    <View style={{ flex: 1 }} />
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

    onchangePoints = (val) => {
    }


    modalSec = () => {
        const onClose = () => {
            this.setState({ isVisibleFilter: false })
        }
        return (
            <View>
                {/* <CatalogueFilter
                    isVisible={this.state.isVisibleFilter}
                // onCloseModal={() => onClose()}
                /> */}
                <Modal
                    isVisible={this.state.isVisibleFilter}
                    // padding={modalPadding}
                    onRequestClose={() => onClose()}
                    onBackdropPress={() => onClose()}
                    onBackButtonPress={() => onClose()}
                    children={
                        <View style={styles.modalview}>
                            <React.Fragment>
                                <View style={styles.modalHeaderSec}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 16 }}>Advance Search</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.crossImgSec}
                                        activeOpacity={0.9}
                                        onPress={() => onClose()}>
                                        <Image source={ImageName.CROSS_IMG} style={styles.redCrossImg} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12 }}>Select Category</Text>
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <CheckBox
                                            type="tick"
                                            borderRadius={5}
                                            data={false}
                                            // onClickValue={() => this.onClickCheckbox(item)}
                                            image={ImageName.GREEN_TICK_ICON}
                                            additionalImgStyle={{ height: 20, width: 20 }}

                                        />
                                        <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12, marginLeft: 10 }}>Electronic</Text>

                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                                    <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12 }}>Give Points Range</Text>
                                    <View style={{ flexWrap: "wrap", marginTop: 10, flexDirection: "row", marginVertical: 5, marginHorizontal: 10 }}>
                                        <View style={{ borderRadius: 20, borderWidth: 1, borderColor: "#C0CAD1", alignItems: "center", justifyContent: "center", paddingHorizontal: 10, paddingVertical: 5 }}>
                                            <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12 }}>500</Text>
                                        </View>
                                        <View style={{ borderRadius: 20, borderWidth: 1, borderColor: "#C0CAD1", alignItems: "center", justifyContent: "center", paddingHorizontal: 10, paddingVertical: 5 }}>
                                            <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12 }}>500</Text>
                                        </View>
                                        <View style={{ borderRadius: 20, borderWidth: 1, borderColor: "#C0CAD1", alignItems: "center", justifyContent: "center", paddingHorizontal: 10, paddingVertical: 5 }}>
                                            <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 12 }}>500</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <TextInput
                                        value={this.state.points}
                                        style={{
                                            height: 40,
                                            width: Dimension.width - 70,
                                            paddingLeft: 10,
                                            borderRadius: 10,
                                            paddingRight: 30,
                                            fontSize: FontSize.SM,
                                            backgroundColor: Color.COLOR.WHITE.PURE_WHITE,
                                            color: Color.COLOR.BLACK.PURE_BLACK,
                                            fontFamily: FontFamily.FONTS.INTER.LIGHT,
                                            borderBottomWidth: 1, borderBottomColor: "red"
                                        }}
                                        placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                        placeholder="Put your desired points"
                                        keyboardType="name-phone-pad"
                                        onChangeText={(value) => this.onchangePoints(value)}
                                    />
                                    {/* <View style={{borderWidth:1,borderBottomColor:"red"}}/> */}
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 30, marginHorizontal: 20 }}>
                                    <LinearGradient colors={["#C0CAD1", "#000", "#EFEFEF"]} style={{ borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 10, paddingVertical: 5 }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 16 }}>Reset</Text>
                                    </LinearGradient>
                                    <View style={{ flex: 1 }} />
                                    <LinearGradient colors={["#C5C91E", "#3AB500"]} style={{ borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 10, paddingVertical: 5 }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.INTER.SEMI_BOLD, fontSize: 16 }}>Search</Text>
                                    </LinearGradient>
                                </View>

                                <View style={{ height: 20 }} />
                            </React.Fragment>
                        </View>
                    }
                />
            </View>

        )
    }

    render() {
        return (
            <View>
                {this.modalSec()}
                {this.activePointSec()}
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.diwaliSchemeSec()}

                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        )
    }
}
