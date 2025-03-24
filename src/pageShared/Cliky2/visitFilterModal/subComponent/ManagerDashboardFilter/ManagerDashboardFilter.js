import React, { Component } from 'react'
import { MiddlewareCheck } from '../../../../../services/middleware'
import { ErrorCode } from '../../../../../services/constant'
import { modifyDesignationData, modifyUserList } from './Function'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import SvgComponent from '../../../../../assets/svg'
import styles from './Style'
import { Color } from '../../../../../enums'
import { TextInputBox } from '../../../../../shared'
import { GetUserData } from '../../../../../services/common-view-function'

export default class ManagerDashboardFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userLoader: false,
            designationArr: this.props.mainPageData ? this.props.mainPageData.designationArr : [],
            selectedDesignationObj: this.props.mainPageData ? this.props.mainPageData.selectedDesignationObj : {},
            refUserId: "",
            managerArr: this.props.mainPageData ? this.props.mainPageData.managerArr : "",
            selectedManagerObj: {}
        }
    }
    componentDidMount = async () => {

        // await this.getDesignationList()
    }

    _onChangeRefUser = async (val) => {
        this.setState({ refUserId: val })


        if (val.length == 0) {
            this.setState({ managerArr: [] })
        } else {
            await this.getUserList(val)
        }
    }

    getUserList = async (val) => {
        let userData = await GetUserData.getUserData()
        this.setState({ userLoader: true })
        let reqData = {
            "searchText": val,
            "refUserId": userData.userId,
        }
        let responseData = await MiddlewareCheck("searchAllChildUser", reqData, this.props);
        if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            let userData = modifyUserList(responseData.response)
            this.setState({
                managerArr: userData,
            })
        }
        this.setState({ userLoader: false })
    }

    onSelect = (item, key) => {
        let arr = this.state.designationArr;
        let userArr = this.state.managerArr
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].check = true
            } else {
                arr[i].check = false
            }
        }

        this.state.designationArr = arr;
        this.state.selectedDesignationObj = item


        for (let i = 0; i < userArr.length; i++) {
            userArr[i].check = false
        }
        this.state.managerArr = userArr;
        this.state.selectedManagerObj = {}

        this.setState(this.state)
    }


    onSelectUser = (item, key) => {
        let arr = this.state.managerArr;
        let designationArr = this.state.designationArr
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].check = true
            } else {
                arr[i].check = false
            }
        }

        this.state.managerArr = arr;
        this.state.selectedManagerObj = item

        for (let i = 0; i < designationArr.length; i++) {
            designationArr[i].check = false
        }
        this.state.designationArr = designationArr;
        this.state.selectedDesignationObj = {}
        this.setState(this.state)

    }


    onReset = () => {
        this.setState({
            selectedDesignationObj: {},
        })
        this.props.onFilterReset()
    }

    onApply = () => {
        let data = { selectedDesignationObj: this.state.selectedDesignationObj, selectedManagerObj: this.state.selectedManagerObj }
        this.props.onFilterApply(data)
    }

    searchManagerSec = () => {
        return (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.filterLineText}>Search Manager</Text>
                    </View>
                    {/* <TouchableOpacity style={{ alignItems: 'flex-end' }} activeOpacity={0.8} onPress={() => this.onSelectAll(this.state.selectAllCheck ? "Deselect All" : "SelectAll")}>
                            <Text style={{ textDecorationLine: 'underline', color: '#F13748' }}>{this.state.selectAllCheck ? "Deselect All" : "Select All"}</Text>
                        </TouchableOpacity> */}
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />
                <View style={{ paddingVertical: 10 }}>
                    <TextInputBox
                        placeholder={"Search by Manager"}
                        value={this.state.refUserId}
                        height={45}
                        borderRadius={12}
                        returnKeyType="done"
                        keyboardType={"default"}
                        additionalBoxStyle={{ borderColor: "#747C90", borderWidth: 0.5 }}
                        onChangeText={(value) => this._onChangeRefUser(value)}
                    />
                </View>
                {this.state.userLoader ?
                    <View>
                        <ActivityIndicator size={"small"} color={Color.COLOR.BLUE.LOTUS_BLUE} />
                    </View>
                    :
                    <React.Fragment>
                        {this.state.managerArr.length > 0 ?
                            <View style={{ maxHeight: 180 }}>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} nestedScrollEnabled>
                                    {this.state.managerArr.map((item, key) => (
                                        <View key={key} >
                                            {/* <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: '#DEEEFB' }} key={key}>
                                    <View>
                                        <Text style={styles.visitedText}>{item.name}</Text>
                                    </View>
                                </View> */}
                                            <TouchableOpacity style={styles.greaySec} onPress={() => this.onSelectUser(item, key)} >
                                                <View style={styles.greayBox}>
                                                    <View style={item.check ? styles.hafCircleGreen : styles.hafCircleGreay}>
                                                        {item.check ?
                                                            <SvgComponent svgName={"tick"} strokeColor={"#fff"} height={18} width={18} />
                                                            :
                                                            null
                                                        }
                                                    </View>
                                                    <View style={styles.boxTextSec}>
                                                        <Text style={styles.reasonText}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    ))}

                                    <View style={{ marginBottom: 30 }} />
                                </ScrollView>
                            </View>
                            :
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.reasonText}>No Data Found !</Text>
                            </View>
                        }
                    </React.Fragment>
                }

            </>
        )
    }

    designationSec = () => {
        return (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.filterLineText}>Designation</Text>
                    </View>
                    {/* <TouchableOpacity style={{ alignItems: 'flex-end' }} activeOpacity={0.8} onPress={() => this.onSelectAll(this.state.selectAllCheck ? "Deselect All" : "SelectAll")}>
                            <Text style={{ textDecorationLine: 'underline', color: '#F13748' }}>{this.state.selectAllCheck ? "Deselect All" : "Select All"}</Text>
                        </TouchableOpacity> */}
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />
                <View style={{ maxHeight: 200 }}>
                    {this.state.designationArr.length > 0 ?
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} nestedScrollEnabled>
                            {this.state.designationArr.map((item, key) => (
                                <View key={key} >
                                    {/* <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: '#DEEEFB' }} key={key}>
                                    <View>
                                        <Text style={styles.visitedText}>{item.name}</Text>
                                    </View>
                                </View> */}
                                    <TouchableOpacity style={styles.greaySec} onPress={() => this.onSelect(item, key)} >
                                        <View style={styles.greayBox}>
                                            <View style={item.check ? styles.hafCircleGreen : styles.hafCircleGreay}>
                                                {item.check ?
                                                    <SvgComponent svgName={"tick"} strokeColor={"#fff"} height={18} width={18} />
                                                    :
                                                    null
                                                }
                                            </View>
                                            <View style={styles.boxTextSec}>
                                                <Text style={styles.reasonText}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            ))}

                            <View style={{ marginBottom: 30 }} />
                        </ScrollView>
                        :
                        <View style={{ paddingTop: 20, justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.noDataFound}>No Data Found !</Text>
                        </View>

                    }
                </View>
            </>
        )
    }

    render() {
        return (
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 25 }}>
                    {this.searchManagerSec()}
                    {this.designationSec()}
                    <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.onReset()} style={{ paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", justifyContent: "center", backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 25, borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 1 }}>
                                <Text style={styles.resetBtn}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.onApply()} style={{ paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", justifyContent: "center", backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 25 }}>
                                <Text style={styles.applyBtnTxt}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
