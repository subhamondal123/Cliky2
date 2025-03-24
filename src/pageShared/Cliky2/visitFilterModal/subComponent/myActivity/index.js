import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Color, FontSize } from '../../../../../enums'
import { MiddlewareCheck } from '../../../../../services/middleware'
import { modifyCustomerTypeArr, modifySubordinateArr, subordinateStore, validateData } from './function'
import { ErrorCode } from '../../../../../services/constant'
import { DropdownInputBox, Loader } from '../../../../../shared'
import SvgComponent from '../../../../../assets/svg'
import styles from './style'
import DatePicker from 'react-native-date-picker';
import { DateConvert } from '../../../../../services/common-view-function'

export default class MyActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSubordinateObj: {},
            data: [],
            pageLoader: true,
            customerIdArr: [],
            dateObj: { rawDate: new Date(), date: "" },
            visibleDatePicker: false
        }
    }

    componentDidMount() {
        this.getCustomerType()
    }

    getCustomerType = async () => {
        this.setState(await subordinateStore(this.state, this.props));
        this.setState({ pageLoader: false })

        // let responseData = await MiddlewareCheck("getChildUserByParent", {}, this.props);
        // console.log("respppp----", JSON.stringify(responseData))
        // if (responseData) {
        //     if (responseData.error === ErrorCode.ERROR.ERROR.WITHOUT_ERROR && responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
        //         this.state.data = modifySubordinateArr(responseData.data);
        //         this.setState(this.state);
        //     }
        // }
        // this.setState({ pageLoader: false })
    }

    onReset = () => {
        this.setState({ selectedSubordinateObj: {} })
        this.props.onFilterReset()
    }

    onApply = () => {
        let data = { selectedSubordinateId: "", date: this.state.dateObj.rawDate };
        if (validateData(this.state)) {
            if (this.state.selectedSubordinateObj.name && this.state.selectedSubordinateObj.name.length > 0) {
                data["selectedSubordinateId"] = this.state.selectedSubordinateObj.id;
            }
            if (this.state.dateObj.date && this.state.dateObj.date.length > 0) {
                data["date"] = this.state.dateObj.rawDate;
            }
            this.props.onFilterApply(data)
        }
    }

    // for selecting the subordinate selecting section
    subordinateSection = () => {
        // for selecting the dropdown data
        const _onSubordinateChange = (value) => {
            this.state.selectedSubordinateObj = value;
            this.setState(this.state);
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Subordinate</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    isSearchable={true}
                    selectedValue={this.state.selectedSubordinateObj.id ? this.state.selectedSubordinateObj.id.toString() : ""}
                    data={this.state.data}
                    onSelect={(value) => _onSubordinateChange(value)}
                    headerText={"Sub Ordinate"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }


    // for open and close the date picker
    onOpenAndClosedatePicker = (type) => {
        this.state.visibleDatePicker = type;
        this.setState(this.state);
    }

    dateSection = () => {
        const onSelectDate = (date) => {
            this.state.dateObj.date = DateConvert.formatYYYYMMDD(date);
            this.state.dateObj.rawDate = date;
            this.setState(this.state);
            this.onOpenAndClosedatePicker(false)
        }

        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this.onOpenAndClosedatePicker(true)} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, this.state.dateObj.date.length == 0 ? {} : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{this.state.dateObj.date.length == 0 ? "Select Date" : this.state.dateObj.date}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <SvgComponent svgName={"calender"} strokeColor={Color.COLOR.BLACK.PURE_BLACK} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={this.state.visibleDatePicker}
                    date={this.state.dateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => onSelectDate(date)}
                    onCancel={() => this.onOpenAndClosedatePicker(false)}
                />
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
                        <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 25, marginBottom: 5 }}>
                            {this.dateSection()}
                            {this.subordinateSection()}
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
                    </ScrollView>
                }

            </View>
        )
    }
}
