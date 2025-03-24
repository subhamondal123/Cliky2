import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { MiddlewareCheck } from '../../../../../services/middleware'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import styles from './Style'
import { ErrorCode } from '../../../../../services/constant'
import { RefreshControl } from 'react-native-gesture-handler'
import { Color } from '../../../../../enums'

export default class LastTenVisits extends Component {
    constructor(props) {
        super(props)

        this.state = {
            limit: 10,
            pageNum: 0,
            pageLoader: true,
            refreshing: true,
            listData: []
        }
    }
    componentDidMount = () => {
        this.onLoad()
    }

    onLoad = async () => {
        this.setState({ refreshing: false })
        let reqData = {
            limit: this.state.limit.toString(),
            "offset": (this.state.pageNum * this.state.limit).toString(),
            customerId: this.props.route.params.item.id
        }
        let responseData = await MiddlewareCheck("getCustomerLastVisits", reqData, this.props)
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let listMainData = responseData.response
                this.setState({ listData: listMainData })
            }
        }
        this.setState({ pageLoader: false })
    }
    // for skelecton place design 
    ViewSkeletonPlaceholder = () => {
        let resData = [];
        for (let i = 0; i < 7; i++) {
            resData.push(
                <View style={[styles.mainBox, { marginVertical: 10, marginHorizontal: 16 }]} key={i}>
                    <View style={styles.blueBox} />
                </View>
            )
        }
        return resData;
    }

    // for render the contact list
    renderContactList = (item,) => {
        return (
            <View >
                {this.listSection(item.item, item.index)}
            </View>
        )
    }

    // this function used for list section
    listSection = (item, key) => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5, borderWidth: 0.5, borderColor: Color.COLOR.GRAY.GRAY_TINTS, borderRadius: 10, marginVertical: 5, paddingVertical: 10 }} key={key}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.visitedByTxt}>{"Visited By"}</Text>
                    <Text style={styles.visitTimeDateTxt}>{item.visitedBy}</Text>
                </View>
                <View>
                    <Text style={styles.visitedByTxt}>{"Visit Date Time"}</Text>
                    <Text style={styles.visitTimeDateTxt}>{item.visitDate + " " + item.VisistTime}</Text>
                </View>

            </View>
        )
    }
    // change the state for refresh
    _onStatusChange = async () => {
        this.setState({
            pageNum: 0,
            limit: 10,
            listData: [],
            refreshing: true,
            // listLoader: true,
            pageLoader: true
        })
    }
    //refresh list data
    onRefresh = async () => {
        await this._onStatusChange();
        await this.onLoad(this.state.selectedCategoryId);
    }
    render() {
        return (
            <View style={{ marginTop: 10 }}>
                {this.state.pageLoader ?
                    <SkeletonPlaceholder>
                        {this.ViewSkeletonPlaceholder()}
                    </SkeletonPlaceholder> :
                    <React.Fragment>
                        {this.state.listData.length > 0 ?
                            <FlatList
                                data={this.state.listData}
                                renderItem={(item, key) => this.renderContactList(item, key)}
                                keyExtractor={(item, key) => key}
                                // onEndReached={this.fetchMore}
                                onEndReachedThreshold={0.1}
                                // ListFooterComponent={this.renderLoader}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.onRefresh()}
                                    />
                                }
                            />
                            :
                            <React.Fragment>
                                <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={styles.noDataFound}>No Data Found !</Text>
                                </View>
                            </React.Fragment>
                        }
                    </React.Fragment>}
            </View>
        )
    }
}
