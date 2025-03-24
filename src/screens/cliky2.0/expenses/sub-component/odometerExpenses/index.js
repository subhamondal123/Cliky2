import React, { Component } from 'react'
import { Text, Image, View, FlatList } from 'react-native'
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums'
import { AllPageList } from '../../../../../pageShared'
import { MiddlewareCheck } from '../../../../../services/middleware'
import { BigTextButton, NoDataFound } from '../../../../../shared'
import { CustomStyle } from '../../../../style'

export class OdometerExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            pageNum: 0,
            fromDate: "",
            toDate: "",
            listDataArr: this.props.mainData.odometerListData,
        }

    }

    componentDidMount = async () => {
        await this._load()
    }

    _load = async () => {

    }

    showHideData = (data, key) => {
        let allItem = this.state.listDataArr;
        for (let i = 0; i < allItem.length; i++) {
            if (allItem[i].odometerId == data.odometerId) {
                allItem[i].check = !allItem[i].check

            } else {
                allItem[i].check = false
            }
        }
        this.state.listDataArr = allItem;
        this.setState({ listDataArr: this.state.listDataArr })
    }

    // render the locationData
    renderPageList = (item) => {
        return (
            <View style={{}}>
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    listSection = (item, key) => {
        return (
            <View key={key}>
                <AllPageList
                    data={item}
                    type={"odometer"}
                    props={this.props}
                    ListShowHide={(data) => this.showHideData(data, key)}
                />
            </View>
        )
    }

    // renderFooter = () => {
    //     return (
    //         <>
    //             {this.state.listDataArr.length > 0 ?
    //                 <View style={{ marginTop: 15, borderTopWidth: 0.5, borderTopColor: "#000", borderBottomColor: "#000", borderBottomWidth: 0.5, backgroundColor: "#fff", paddingVertical: '5%' }}>
    //                     <View style={{ marginHorizontal: '2%', flexDirection: 'row' }}>
    //                         <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.BOLD, flex: 1 }}>Total</Text>
    //                         <Text style={{ color: '#EF5C5C', fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.INTER.MEDIUM }}>{'\u20B9' + "2000"}</Text>
    //                         <Image source={ImageName.DOWN_ARROW} style={{ height: 15, width: 15, resizeMode: 'contain', marginTop: 2, marginLeft: '5%' }} />
    //                     </View>
    //                 </View>
    //                 :
    //                 null
    //             }
    //         </>
    //     )
    // }

    renderFooter = () => {
        return (
            <View style={{ marginBottom: 400}} />
        )
    }

    render() {
        return (
            <>
                <View style={{ height: Dimension.height }}>
                    <View style={{ marginTop: 10 }}>
                        {this.state.listDataArr.length > 0 ? (
                            <React.Fragment>
                                <FlatList
                                    data={this.state.listDataArr}
                                    renderItem={(item, key) => this.renderPageList(item, key)}
                                    keyExtractor={(item, key) => key}
                                    // onEndReached={this.fetchMore}
                                    // onEndReachedThreshold={0.1}
                                    ListFooterComponent={this.renderFooter()}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                // refreshControl={
                                // <RefreshControl
                                // refreshing={this.state.refreshing}
                                // onRefresh={() => this.onRefresh()}
                                // />
                                // }
                                />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <View style={CustomStyle.noDataFoundViewForTabList}>
                                    <NoDataFound />
                                </View>
                            </React.Fragment>
                        )}
                    </View>
                    {/* <View style={{ bottom: 0 }}>
                        <View style={{ marginTop: 15, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }} />
                            <BigTextButton
                                text={"Final Submit"}
                                fontSize={FontSize.SM}
                                fontColor={"#fff"}
                                backgroundColor={"#156A94"}
                                borderRadius={16}
                                height={40}
                                onPress={() => this._onFinalSubmit()}
                            />
                        </View>
                    </View> */}
                </View>

            </>
        )
    }
}

export default OdometerExpenses