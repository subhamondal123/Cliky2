import React, { Component } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../header/Header'
import SvgComponent from '../../../../assets/svg'
import { Color, FontFamily } from '../../../../enums'
import { Filter, ProfileSec } from '../../../../pageShared'
import styles from './Style'
import { Passbook, Redemption } from './sub-component'

export default class PassbookAmdRedemption extends Component {
    constructor(props) {
        super(props)

        this.state = {
            passbookCheck: true,
            redemptionCheck: false,
            isVisibleFilter: false
        }
    }

    filterModal = () => {
        this.setState({ isVisibleFilter: true })
    }

    showHide = () => {
        this.setState({ isVisibleFilter: false })
    }

    modalSec = () => {
        return (
            <>
                <Filter isVisible={this.state.isVisibleFilter} onCloseModal={() => this.showHide()} props={this.props} />
            </>
        )
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
                {/* <TouchableOpacity onPress={() => this.filterModal()}>
                    <SvgComponent svgName={"filter"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={24} width={24} />
                </TouchableOpacity> */}
            </View>
        )
    }
    tabSec = () => {
        const onSelectTab = (type) => {
            this.setState({
                passbookCheck: type == "passbook" ? true : false,
                redemptionCheck: type == "passbook" ? false : true
            })
        }
        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ marginHorizontal: 10, borderRadius: 25, flexDirection: "row", alignItems: "center", borderColor: "#747C90", borderWidth: 0.5 }}>
                    <TouchableOpacity style={{ flex: 0.5, alignItems: "center", backgroundColor: this.state.passbookCheck ? "red" : "#fff", borderTopLeftRadius: 25, borderBottomLeftRadius: 25, paddingVertical: 10 }} onPress={() => onSelectTab("passbook")}>
                        <Text style={{ color: this.state.passbookCheck ? "#fff" : "#1F2B4D", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Pass Book</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.5, alignItems: "center", backgroundColor: !this.state.passbookCheck ? "red" : "#fff", borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingVertical: 10 }} onPress={() => onSelectTab("redemption")}>
                        <Text style={{ color: this.state.passbookCheck ? "#1F2B4D" : "#fff", fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Redemption History</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.modalSec()}
                <Header {...this.props} onRefresh={() => console.log("")} />
                <ProfileSec />
                {/* {this.activePointSec()} */}
                {this.tabSec()}
                {this.state.passbookCheck ?
                    <Passbook {...this.props} />
                    :
                    null
                }
                {this.state.redemptionCheck ?
                    <Redemption {...this.props} />
                    :
                    null
                }


            </SafeAreaView>
        )
    }
}
