import React, { Component } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Color, FontSize, ImageName } from '../../../../../enums'
import { modifyCustomerTypeArr, modifySubordinateArr, routeVisitStore, subordinateStore } from './Function'
import { DropdownInputBox, Loader } from '../../../../../shared'
import SvgComponent from '../../../../../assets/svg'
import styles from './Style'
import DatePicker from 'react-native-date-picker'
import { DateConvert } from '../../../../../services/common-view-function'

let recordTypeArr = [
    {
        id: "1",
        name: "Self"
    },
    {
        id: "2",
        name: "Sub-Ordinate"
    }
]

export default class VisitHistoryFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customerTypeArr: [],
            selectedCustomerTypeObj: {},
            pageLoader: true,
            selectAllCheck: false,
            customerIdArr: [],
            fromDatePicker: false,
            toDatePicker: false,
            fromDateObj: { rawDate: new Date(), fromDate: "", rawFromDate: "" },
            toDateObj: { rawDate: new Date(), toDate: "", rawToDate: "" },
            recordType: recordTypeArr,
            selectedRecordType: {},
            subordinateArr: [],
            selectedSubordinateObj: {},


        }
    }

    componentDidMount() {
        this.getCustomerType();
        this.getSubordinateData()
    }

    getCustomerType = async () => {

        this.setState(await routeVisitStore(this.state, this.props));
        this.setState({ pageLoader: false })

        // let responseData = await MiddlewareCheck("getContactTypes_v2", { isProject: "0" }, this.props);
        // if (responseData === false) {
        // } else {
        //     if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //         let custData = modifyCustomerTypeArr(responseData.response);
        //         this.setState({ customerTypeArr: custData })
        //     }
        // }
        // this.setState({ pageLoader: false })
    }

    getSubordinateData = async () => {
        this.setState(await subordinateStore(this.state, this.props));

        // let responseData = await MiddlewareCheck("getChildUserByParent", {}, this.props);
        // if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //     this.state.subordinateArr = modifySubordinateArr(responseData.data);
        //     this.setState({ subordinateArr: this.state.subordinateArr })
        // }
    }

    onReset = () => {
        this.setState({
            customerIdArr: [],
            fromDateObj: {
                rawDate: new Date(),
                fromDate: "",
                rawFromDate: ""
            },
            toDateObj: {
                rawDate: new Date(),
                toDate: "",
                rawToDate: ""
            }
        })
        this.props.onFilterReset()
    }

    onApply = () => {
        let data = { customerIdArr: this.state.customerIdArr, fromDateObj: this.state.fromDateObj, toDateObj: this.state.toDateObj, recodeTypeObj: this.state.selectedRecordType, subordinateObj: this.state.selectedSubordinateObj }
        this.props.onFilterApply(data)
    }

    setCustomerIdArr = (item, key) => {
        let idArr = this.state.customerIdArr;
        if (item.check) {
            idArr.push(item.id)
        } else {
            idArr.splice(key, 1)
        }
        this.state.customerIdArr = idArr;
        this.setState(this.state)

    }

    onSelect = (item, key) => {
        let checkCounter = 0;
        let arr = this.state.customerTypeArr;
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].check = !arr[i].check
            }
            if (arr[i].check) {
                checkCounter++
            }
        }

        if (checkCounter == arr.length) {
            this.state.selectAllCheck = true
        } else {
            this.state.selectAllCheck = false;
        }

        this.state.customerTypeArr = arr;
        this.setCustomerIdArr(item, key);
        this.setState(this.state)
    }

    onSelectAll = (type) => {
        let arr = this.state.customerTypeArr;
        for (let i = 0; i < arr.length; i++) {
            if (type == "SelectAll") {
                arr[i].check = true;
                const idArray = this.state.customerTypeArr.map((item) => item.id);
                this.state.customerIdArr = idArray;
                this.state.selectAllCheck = true
            } else {
                arr[i].check = false;
                this.state.customerIdArr = [];
                this.state.selectAllCheck = false;
            }
        }
        this.state.customerTypeArr = arr;
        this.setState(this.state)
    }

    dateSec = () => {
        const onOpenFromdatePicker = () => {
            this.setState({ fromDatePicker: true });
        }

        const onCloseFromDatePicker = () => {
            this.setState({ fromDatePicker: false });
        }

        const onOpenAndCloseTodatePicker = () => {
            this.setState({ toDatePicker: true });
        }
        const onCloseTodatePicker = () => {
            this.setState({ toDatePicker: false });

        }

        const onSelectFromDate = (date) => {
            this.state.fromDateObj.fromDate = DateConvert.viewDateFormat(date);
            this.state.fromDateObj.rawFromDate = date;
            this.state.fromDateObj.rawDate = date;
            this.setState(this.state)

            onCloseFromDatePicker();
        }

        const onSelectToDate = (date) => {
            this.state.toDateObj.toDate = DateConvert.viewDateFormat(date);
            this.state.toDateObj.rawDate = date;
            this.state.toDateObj.rawToDate = date;
            this.setState(this.state)

            onCloseTodatePicker();
        }
        return (
            <>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.filterLineText}>Select Date</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{ flex: 0.5 }}>
                        <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenFromdatePicker()} activeOpacity={0.9}>
                            <Text style={[styles.inputBoxText, this.state.fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{this.state.fromDateObj.fromDate.length == 0 ? "From Date" : this.state.fromDateObj.fromDate}</Text>
                            <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={this.state.fromDatePicker}
                            date={this.state.fromDateObj.rawDate}
                            mode={"date"}
                            // maximumDate={new Date()}
                            onConfirm={(date) => { onSelectFromDate(date) }}
                            onCancel={() => { onCloseFromDatePicker() }}
                        />
                    </View>

                    <View style={{ width: 10 }} />

                    <View style={{ flex: 0.5 }}>
                        <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndCloseTodatePicker()} activeOpacity={0.9}>
                            <Text style={[styles.inputBoxText, this.state.toDateObj.toDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{this.state.toDateObj.toDate.length == 0 ? "To Date" : this.state.toDateObj.toDate}</Text>
                            <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={this.state.toDatePicker}
                            date={this.state.toDateObj.rawDate}
                            mode={"date"}
                            // minimumDate={new Date(this.state.fromDateObj.rawDate)}
                            onConfirm={(date) => {
                                onSelectToDate(date)
                            }}
                            onCancel={() => {
                                onCloseTodatePicker()
                            }}
                        />
                    </View>

                </View>
            </>

        )
    }

    recordTypeSection = () => {
        const _onRecordTypeChange = (value) => {
            this.setState({ selectedRecordType: value });
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}> Record Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={this.state.selectedRecordType.id ? this.state.selectedRecordType.id.toString() : "1"}
                    data={this.state.recordType}
                    onSelect={(value) => _onRecordTypeChange(value)}
                    headerText={"Record Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    subordinateSection = () => {
        const _onSubordinateChange = (value) => {
            this.setState({ selectedSubordinateObj: value })
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}> Subordinate</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    isSearchable={true}
                    selectedValue={this.state.selectedSubordinateObj.id ? this.state.selectedSubordinateObj.id.toString() : ""}
                    data={this.state.subordinateArr}
                    onSelect={(value) => _onSubordinateChange(value)}
                    headerText={"SubOrdinate"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />

            </View>
        )
    }

    onSubordinateFilter = () => {
        return (
            <View style={{ marginTop: 15 }}>
                {this.recordTypeSection()}
                <View style={{ marginTop: 10 }} >
                    {this.state.selectedRecordType.id == "1" || this.state.selectedRecordType.id == undefined ? null : this.subordinateSection()}
                </View>
            </View>
        )
    }


    render() {
        return (
            <View>
                {this.state.pageLoader ?
                    <Loader type={"normal"} />
                    :
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 25 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.filterLineText}>Customer Type</Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'flex-end' }} activeOpacity={0.8} onPress={() => this.onSelectAll(this.state.selectAllCheck ? "Deselect All" : "SelectAll")}>
                                    <Text style={{ textDecorationLine: 'underline', color: '#F13748' }}>{this.state.selectAllCheck ? "Deselect All" : "Select All"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />
                            <View style={{ flexDirection: 'row', marginTop: 20, height: 280 }}>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                                    {this.state.customerTypeArr.map((item, key) => (
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
                                            <View style={{ width: 20 }} />
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            {this.dateSec()}
                            {/* {this.onSubordinateFilter()} */}
                            {/* <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} /> */}

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
                        <View style={{ marginBottom: 30 }} />
                    </ScrollView>
                }

            </View>
        )
    }
}
