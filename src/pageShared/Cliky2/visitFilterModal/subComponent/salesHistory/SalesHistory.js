import React, { Component } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Color, ImageName } from '../../../../../enums'
import { Loader } from '../../../../../shared'
import styles from './Style'
import DatePicker from 'react-native-date-picker'
import { DateConvert } from '../../../../../services/common-view-function'

export default class SalesHistoryFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pageLoader: false,
            fromDatePicker: false,
            toDatePicker: false,
            fromDateObj: { rawDate: new Date(), fromDate: "", rawFromDate: "" },
            toDateObj: { rawDate: new Date(), toDate: "", rawToDate: "" }

        }
    }

    componentDidMount() {
    }


    onReset = () => {
        this.setState({
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
        let data = { fromDateObj: this.state.fromDateObj, toDateObj: this.state.toDateObj }
        this.props.onFilterApply(data)
    }

    dateSec = () => {
        const onOpenAndCloseFromdatePicker = () => {
            this.setState({ fromDatePicker: !this.state.fromDatePicker });
        }
        const onOpenAndCloseTodatePicker = () => {
            this.setState({ toDatePicker: !this.state.toDatePicker });
        }
        const onSelectFromDate = (date) => {
            this.state.fromDateObj.fromDate = DateConvert.viewDateFormat(date);
            this.state.fromDateObj.rawFromDate = date;
            this.state.fromDateObj.rawDate = date;
            this.setState(this.state)

            onOpenAndCloseFromdatePicker();
        }

        const onSelectToDate = (date) => {
            this.state.toDateObj.toDate = DateConvert.viewDateFormat(date);
            this.state.toDateObj.rawDate = date;
            this.state.toDateObj.rawToDate = date;
            this.setState(this.state)

            onOpenAndCloseTodatePicker();
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
                        <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndCloseFromdatePicker()} activeOpacity={0.9}>
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
                            minimumDate={this.state.toDateObj.toDate.length > 0 ? new Date(this.state.toDateObj.rawDate) : ""}
                            onConfirm={(date) => {
                                onSelectFromDate(date)
                            }}
                            onCancel={() => {
                                onOpenAndCloseFromdatePicker()
                            }}
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
                            minimumDate={this.state.fromDateObj.fromDate.length > 0 ? new Date(this.state.fromDateObj.rawDate) : ""}
                            onConfirm={(date) => {
                                onSelectToDate(date)
                            }}
                            onCancel={() => {
                                onOpenAndCloseTodatePicker()
                            }}
                        />
                    </View>

                </View>
            </>

        )
    }

    render() {
        return (
            <View>
                {/* {this.state.pageLoader ?
                    <Loader type={"normal"} />
                    : */}
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ marginLeft: '5%', marginRight: '5%' }}>
                            {this.dateSec()}
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
                {/* } */}

            </View>
        )
    }
}
