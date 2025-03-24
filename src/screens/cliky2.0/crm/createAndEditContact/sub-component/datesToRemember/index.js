import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Color, Dimension, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { DateConvert } from "../../../../../../services/common-view-function";
import { CheckBox, DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { modifyData, modifyEventArr, validateData } from "./function";
import styles from "./style";


class DatesToRemember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            allOccasion: [],
            allDataArr: [
                {
                    selectedOccasion: {},
                    datePicker: false,
                    dateObj: {
                        rawDate: new Date(),
                        date: ""
                    },
                    isReminder: false,
                    isYearlyRepeat: false
                }
            ]
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        this.setState({
            allPageData: this.props.allPageData,
            allOccasion: this.props.contactLandingData.occassionData,
            pageloader: false
        })

    }

    loadLanding = async () => {
        this.setState({
            allOccasion: this.props.contactLandingData.occassionData
        })
    }

    _onSelectOccasion = (value, key) => {
        this.state.allPageData.allDataArr[key].selectedOccasion = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDatePicker = (key) => {
        if (this.state.allPageData.allDataArr[key].datePicker) {
            this.state.allPageData.allDataArr[key].datePicker = false;
        } else {
            this.state.allPageData.allDataArr[key].datePicker = true;
        }

        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectDate = (date, key) => {
        let obj = {
            rawDate: date,
            date: DateConvert.formatYYYYMMDD(date)
        }
        this.state.allPageData.allDataArr[key].dateObj = obj;
        this.setState({
            allPageData: this.state.allPageData
        })
        this._onDatePicker(key);
    }

    _onClickReminder = (key) => {
        this.state.allPageData.allDataArr[key].isReminder = !this.state.allPageData.allDataArr[key].isReminder;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onClickYearlyRepeat = (key) => {
        this.state.allPageData.allDataArr[key].isYearlyRepeat = !this.state.allPageData.allDataArr[key].isYearlyRepeat;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _addAnother = () => {
        let obj = {
            selectedOccasion: {},
            datePicker: false,
            dateObj: {
                rawDate: new Date(),
                date: ""
            },
            isReminder: false,
            isYearlyRepeat: false
        }

        let arr = this.state.allPageData.allDataArr;
        arr.push(obj);
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onDeleteArray = (key) => {
        let arr = this.state.allPageData.allDataArr;
        arr.splice(key, 1);
        this.state.allPageData.allDataArr = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    renderItem = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderRadius: 20, borderWidth: 1, borderColor: Color.COLOR.GRAY.DAVY_GRAY, marginBottom: 15 }}>
                    {key == 0 ?
                        null
                        :
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}
                            onPress={() => this._onDeleteArray(key)}>
                            <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CROSS_IMG} />
                        </TouchableOpacity>
                    }

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ height: 10 }} />
                        <DropdownInputBox
                            selectedValue={item.selectedOccasion.id ? item.selectedOccasion.id.toString() : "0"}
                            data={this.state.allOccasion}
                            onSelect={(value) => this._onSelectOccasion(value, key)}
                            headerText={"Select Occasion"}
                            selectedText={item.selectedOccasion.name ? item.selectedOccasion.name : "Select Occasion"}
                            selectedTextColor={item.selectedOccasion.name ? Color.COLOR.GRAY.SONIC_SILVER : Color.COLOR.GRAY.SILVER}
                            isBackButtonPressRequired={true}
                            isBackdropPressRequired={true}
                        />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <View style={{ height: 10 }} />
                        <TouchableOpacity style={styles.inputBoxStyle} onPress={() => this._onDatePicker(key)} activeOpacity={0.9}>
                            <Text style={[styles.inputBoxText, item.dateObj.date.length == 0 ? { color: Color.COLOR.GRAY.SILVER } : {}]}>{item.dateObj.date.length == 0 ? "yyyy-mm-dd" : item.dateObj.date}</Text>
                            <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                            </View>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={item.datePicker}
                            date={item.dateObj.rawDate}
                            mode={"date"}
                            // maximumDate={new Date()}
                            onConfirm={(date) => {
                                this._onSelectDate(date, key)
                            }}
                            onCancel={() => {
                                this._onDatePicker(key)
                            }}
                        />
                    </View>

                    {this.checkBoxItem(item, key)}
                </View>
            </React.Fragment>
        )
    }

    checkBoxItem = (item, key) => {
        return (
            <View style={{ flexDirection: 'row', }}>
                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }}>
                    <CheckBox
                        type={"tick"}
                        borderRadius={30}
                        data={item.isReminder}
                        onClickValue={(value) => this._onClickReminder(key)}
                    />
                    <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>Reminder</Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckBox
                        type={"tick"}
                        borderRadius={30}
                        data={item.isYearlyRepeat}
                        onClickValue={(value) => this._onClickYearlyRepeat(key)}
                    />
                    <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>Yearly Repeat</Text>
                </View>
            </View>
        )
    }

    _onBack = () => {
        let data = {
            pageNum: 3
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let validatedStatus = validateData(this.state.allPageData.allDataArr);
        if (validatedStatus) {
            let data = {
                type: "next",
                pageNum: 5,
                data: { datesToRemArr: this.state.allPageData.allDataArr, enevtArr: modifyEventArr(this.state.allPageData.allDataArr) }
            }
            this.props.onSaveDataToParent(data);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                        <Loader />
                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ marginVertical: 15 }}>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Dates To Remember</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container}>
                            {this.state.allPageData.allDataArr.map((item, key) => (
                                this.renderItem(item, key)
                            ))}
                            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                <TouchableOpacity
                                    style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS, borderRadius: 5 }}
                                    onPress={() => this._addAnother()}
                                >
                                    <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />
                                <BigTextButton
                                    text={"Save & Next"}
                                    onPress={() => this._onSave()}
                                />
                            </View>
                            <View style={{ height: 60 }} />
                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

export default DatesToRemember;