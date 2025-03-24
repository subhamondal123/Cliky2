import React from "react";
import {
    Image,
    SafeAreaView, Text, View
} from "react-native";
import { stateCheckForNetwork } from "../../../redux/Sales360Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./style";
import { DynamicOrderListPage, DynamicProfileCard } from "../../../pageShared";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../enums";
import { BigTextButton, DropdownInputBox } from "../../../shared";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";

let StaticData = [
    {
        id: 1,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
        check: false
    },
    {
        id: 2,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
        check: false

    },
    {
        id: 3,
        name: "TMT 500",
        discount: "20%",
        amount: "2748",
        check: false

    },
]

const profileData = {
    title: "Rakesh Paul",
    profileImg: ImageName.ORDER_DUMMY_LOGO,
    cartCount: 24
}

class OrderOtherSelectProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: []
        };
    }

    componentDidMount = async () => {
        await this._load();
    }

    _load = async () => {
        this.setState({
            price: StaticData
        })
    };
    _onBack = () => {
        this.props.navigation.goBack();
    };

    // for network error
    _onNetworkError = () => {
        this.props.navigation.navigate("NetworkError");
    }

    renderContactList = (item, key) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <DynamicOrderListPage
                    data={item}
                    props={this.props}
                />


            </View>
        )
    }

    TwelvePointBurst = () => {
        return (
            <View style={styles.twelvePointBurst}>
                <View style={styles.twelvePointBurstMain} />
                <View style={styles.twelvePointBurst30}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, top: -2 }}>%</Text>
                    </View>
                </View>
            </View>
        );
    };

    _onSelectProduct = (item) => {
        for (let i = 0; i < this.state.price.length; i++) {
            if (this.state.price[i] == item) {
                this.state.price[i].check = true;
            } else {
                this.state.price[i].check = false;
            }
        }
        this.setState({
            price: this.state.price
        })

    }

    _bodySec = () => {
        return (
            <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
                <View style={{ backgroundColor: '#F0F4F7', borderRadius: 12, padding: 8, marginTop: 15 }}>
                    <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.BOLD }}>TMT 500</Text>
                    </View>
                    {this.state.price.map((item, key) => (
                        <TouchableOpacity style={item.check ? styles.activeBox : styles.inActiveBox} activeOpacity={0.9} onPress={() => this._onSelectProduct(item)} key={key}>
                            <Image source={ImageName.RED_PERCENTAGE_LOGO} style={{ height: 18, width: 18, resizeMode: 'contain' }} />
                            <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, flex: 0.3 }}>15mm</Text>
                            <View style={{ flex: 0.2 }}>
                                <View style={{ paddingHorizontal: 4, paddingVertical: 4, backgroundColor: '#00B65E', borderRadius: 8 }}>
                                    <View style={{ marginHorizontal: '2%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Price</Text>
                                        <Image source={ImageName.WHITE_DOWN_ARROW} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 0.18, alignItems: 'center' }}>
                                <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, color: "#747C90" }}>{'\u20B9' + "" + 2473}</Text>
                            </View>
                            <View style={{ flex: 0.26, alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD, color: Color.COLOR.RED.AMARANTH }}>{'\u20B9' + "" + 2473}<Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>/MT.</Text></Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={{ marginHorizontal: '2%', marginTop: 10 }}>
                        <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, textAlign: 'center' }}>It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </Text>
                    </View>
                    <View style={{ marginTop: 15 }} />
                    <View style={{ backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 10, borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 0.9, borderStyle: "dashed", width: Dimension.width / 1.2, marginHorizontal: 5 }} >
                        <View style={{ marginHorizontal: '2%', flexDirection: 'row', paddingVertical: '2%' }}>
                            <View style={{ flex: 1 }}>
                                {this.TwelvePointBurst()}
                                {/* <View style={{ height: 18, width: 18, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.RED.AMARANTH }}>
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>%</Text>
                                </View> */}
                                <Text style={{ color: Color.COLOR.RED.AMARANTH, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.MD, marginTop: 10 }}>20%</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                                <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Additional <Text style={{ color: Color.COLOR.RED.AMARANTH, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Discount</Text> on the project</Text>
                                <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textDecorationLine: 'underline' }}>Terms & condition Applied</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ width: 5 }} />
                        <View style={{ flex: 0.7, }}>
                            <View style={{ flexDirection: 'row', padding: 5, borderWidth: 0.8, borderColor: "#000", borderRadius: 20, alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center', height: 45 }}>
                                <Image source={ImageName.CIRCEL_MINUS} style={{ height: 21, width: 21, resizeMode: 'contain' }} />
                                <View style={{ width: 5 }} />
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>15.5</Text>
                                </View>
                                <View style={{ width: 5 }} />
                                <Image source={ImageName.CIRCEL_PLUS} style={{ height: 21, width: 21, resizeMode: 'contain' }} />
                            </View>
                        </View>
                        <View style={{ width: 5 }} />
                        <View style={{ flex: 0.3 }}>
                            <DropdownInputBox
                                // selectedValue={selectedExpenseCategoryObj.id ? selectedExpenseCategoryObj.id.toString() : "0"}
                                // data={expenseCategoryArr}
                                // onSelect={(value) => _onSelectExpenceType(value)}   
                                backgroundColor={"#fff"}
                                headerText={"M.T"}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.RED.AMARANTH, marginTop: 10 }}>{'\u20B9' + "" + 2473}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: '30%' }}>
                        <BigTextButton
                            text={"Add to Cart"}
                            fontSize={FontSize.XS}
                            backgroundColor={"#F13748"}
                            borderRadius={24}
                        />
                    </View>
                    <View style={{ marginBottom: 20 }} />
                </View>
                {/* <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: "#1F2B4D", flex: 1 }}>Other Similar Products</Text>
                    <Text style={{ fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.XS, color: Color.COLOR.RED.AMARANTH, textDecorationLine: 'underline' }}>See All</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                    <View style={{ backgroundColor: '#F0F4F7', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 }}>
                        <View style={{ marginHorizontal: '2%' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <ImageBackground source={ImageName.STER_CIRCEL_LOGO} style={{ height: 18, width: 18, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center', top: -2 }}>
                                    <Text style={{ color: '#fff', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>%</Text>
                                </ImageBackground>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>TMT 500</Text>
                                <Text style={{ color: '#747C90', fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>15mm / MT.</Text>
                                <Text style={{ fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, color: Color.COLOR.RED.AMARANTH, marginTop: 10 }}>{'\u20B9' + "" + 2473}</Text>
                                <BigTextButton
                                    text={"Add"}
                                    backgroundColor={"#1F2B4D"}
                                    height={30}
                                    fontSize={12}
                                    borderRadius={22}
                                    additionalStyles={{ width: 60 }}

                                />

                            </View>
                        </View>
                    </View>
                </View> */}
            </View>
        )
    }

    _onPlaceOreder = () => {

    }

    onUpdateCart = () => {
    }

    profileSec = () => {

        const onRecentOrder = () => {
            this.props.navigation.navigate("recentOrderList")
        }

        const onPressCartDetails = () => {
            this.props.navigation.navigate("OrderCartDetails",{onUpdateCart:this.onUpdateCart})
        }
        return (
            <>
                <DynamicProfileCard data={profileData} props={this.props} onPressCart={() => onPressCartDetails()} onPressTab={() => onRecentOrder()}/>
            </>
           
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 15 }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => this._onBack()}>
                        <Image source={ImageName.BACK_IMG} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.LG, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Select Product</Text>

                    </View>
                    <Image source={ImageName.THREE_DOT_BLACK} style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 3 }} />
                </View>
                <View style={{ marginTop: 10 }} />
                {this.profileSec()}
                <ScrollView>
                    {this._bodySec()}
                    <View style={{ height: 80 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderOtherSelectProduct);
