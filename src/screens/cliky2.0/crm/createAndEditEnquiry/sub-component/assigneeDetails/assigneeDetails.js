import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import DatePicker from "react-native-date-picker";

import { Color, Dimension, FontFamily, ImageName } from "../../../../../../enums";
import { DateConvert, StorageDataModification } from "../../../../../../services/common-view-function";
import { viewDateFormat } from "../../../../../../services/common-view-function/dateConvert";
import { ErrorCode } from "../../../../../../services/constant";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import { assignedEmployeeModifyData, modifyAssignedEmployeeArrData, modifyLocationMappedData, validateData } from "./function";
import styles from "./style";
import { DynamicProductMapping } from "../../../../../../pageShared";

class AssigneeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            productLoader: false
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
        await this._getProductHierarchyTypesSlNo();
    }

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false, })
    }


    _onChangeAssignName = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.assignName = newText;
        this.setState({
            // assignName: newText
            allPageData: this.state.allPageData
        })
    }

    _getProductHierarchyTypesSlNo = async () => {
        this.setState({ productLoader: true })
        let mappedData = await StorageDataModification.mappedProductData({}, "get");
        if ((await StorageDataModification.locationMappedDataProduct({}, "get")) === null) {
            let responseData = await MiddlewareCheck("getHierarchyTypesSlNo", { "typeOfItem": "2" });
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    await StorageDataModification.locationMappedDataProduct(modifyLocationMappedData(responseData.response, mappedData), "store");
                } else {
                    // this.setState({ alertMessage: responseData.message });
                }
            }
        }
        this.setState({ productLoader: false })
        return true;
    }

    getAssignedEmployeeData = async (value) => {
        this.setState({ assignedLoader: true })
        let reqData = {
            "countryId": 1,
            "stateId": this.state.allPageData.selectedStateObj.id,
            "designationId": value.id ? value.id : "",
            "zoneId": this.state.allPageData.selectedZoneObj.id
        }

        let responseData = await MiddlewareCheck("getAssignedEmployeeData", reqData, this.props);

        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let assignedEmployeeData = assignedEmployeeModifyData(responseData);
                this.state.allPageData.allAssignedEmployeeArr = modifyAssignedEmployeeArrData(assignedEmployeeData.assignedEmployeeList);
                this.setState({
                    allPageData: this.state.allPageData,
                })
            }
        }
        this.setState({
            assignedLoader: false
        })
    }

    _OnSelectEmployeeType = async (value) => {
        let data = this.state.allPageData.allEmployeeTypeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.allEmployeeTypeArr = data;
        this.state.allPageData.selectedEmployeeTypeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
        await this.getAssignedEmployeeData(value);
    }

    _OnSelectAssignedEmployee = (value) => {
        let data = this.state.allPageData.allAssignedEmployeeArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.allAssignedEmployeeArr = data;
        this.state.allPageData.selectedAssignedEmployeeObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }


    _onAssignedDatePicker = () => {
        if (this.state.allPageData.assignedDatePicker == false) {
            this.state.allPageData.assignedDatePicker = true
        } else {
            this.state.allPageData.assignedDatePicker = false
        }
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectAssignedDate = (date) => {
        this.state.allPageData.assignedDateObj.rawDate = date.date;
        this.state.allPageData.assignedDateObj.assignedDate = DateConvert.formatYYYYMMDD(date.date);
        this.setState({
            allPageData: this.state.allPageData
        });
    }

    modifyProductArrData = (arr) => {
        let arrData = [];
        for (let i = 0; i < arr.length; i++) {
            let modObj = {};
            modObj["hierarchyDataId"] = arr[i].hierarchyDataId
            modObj["hierarchyTypeId"] = arr[i].hierarchyTypeId

            arrData.push(modObj)
        }
        return arrData
    }

    _onSave = () => {
        let reqData = {
            "notes": this.state.allPageData.notes,
            "numberOfEmployee": this.state.allPageData.employeeNum,
            "productArr": this.state.allPageData.productData ? this.modifyProductArrData(this.state.allPageData.productData) : [],
            "masterMdouleTypeId": "20"
        }

        let validatedData = validateData(reqData);
        if (validatedData.status) {
        let data = {
            type: "next",
            pageNum: 3,
            data: reqData,
        }
        this.props.onSaveDataToParent(data);
        }
    }

    _onBack = () => {
        this.state.allPageData.assignedDatePicker = false;
        let data = {
            pageNum: 2,
            type: "previous"
        }
        this.props.onSaveDataToParent(data);
    }

    _onChangeNotes = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.notes = newText;
        this.setState({
            // assignName: newText
            allPageData: this.state.allPageData
        })
    }

    _onChangeEmployeeNum = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "alphanumeric");
        this.state.allPageData.employeeNum = newText;
        this.setState({
            // assignName: newText
            allPageData: this.state.allPageData
        })
    }

    onSelectLocationData = (val, key) => {
        this.state.allPageData.productData[key].hierarchyDataId = val.value.hierarchyDataId
        this.state.allPageData.productData[key].hierarchyTypeId = val.value.hierarchyTypeId
        this.state.allPageData.productData[key].productArr = val.totalData
        this.setState({ allPageData: this.state.allPageData })
    }

    productSection = (item, key) => {
        return (
            <React.Fragment key={key}>
                <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderRadius: 20, borderWidth: 1, borderColor: Color.COLOR.GRAY.DAVY_GRAY, marginBottom: 15 }}>
                    {key == 0 ?
                        null
                        :
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}
                            onPress={() => this._onDeleteArray(key)}>
                            <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CROSS_IMG} />
                        </TouchableOpacity>
                    }
                    <View style={{ marginBottom: 15, }}>
                        <View style={{ height: 10 }} />
                        {this.state.productLoader ?
                            null
                            :
                            <DynamicProductMapping
                                editData={item.productArr}
                                flexDirection={"row"}
                                viewType={"edit"}
                                marginBottom={15}
                                onApiCallData={(value) => this.onSelectLocationData(value, key)}
                            />
                        }
                    </View>
                </View>
            </React.Fragment>
        )
    }

    _addAnother = () => {
        let obj = {
            selectedProductName: {},
            "hierarchyTypeId": "",
            "hierarchyDataId": "",
            "productArr": [],
        }
        let arr = this.state.allPageData.productData;
        arr.push(obj);
        this.state.allPageData.productData = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onDeleteArray = (key) => {
        let arr = this.state.allPageData.productData;
        arr.splice(key, 1);
        this.state.allPageData.productData = arr;
        this.setState({
            allPageData: this.state.allPageData
        })
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

                        <View style={styles.blueBox}>
                            <View style={styles.blueViewFlex}>
                                <Text style={styles.listHeaderText}>Assignee Details</Text>
                            </View>
                        </View>

                        <View style={styles.container}>

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.employeeNum}
                                    onChangeText={(value) => this._onChangeEmployeeNum(value)}
                                    placeholder={"Number of employees"}
                                    keyboardType={"numeric"}
                                    isActive={this.state.allPageData.employeeNumActive}
                                    onFocus={() => { this.state.allPageData.employeeNumActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.employeeNumActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                />
                            </View>
                            {this.state.allPageData.productData.map((item, key) => (
                                this.productSection(item, key)
                            ))}
                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 15 }}>
                                <TouchableOpacity
                                    style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Color.COLOR.YELLOW.GARGOYLE_GAS, borderRadius: 5 }}
                                    onPress={() => this._addAnother()}
                                >
                                    <Text style={{ color: Color.COLOR.BLACK.BLACK_PEARL, fontFamily: FontFamily.FONTS.INTER.BOLD, fontSize: 14 }}>Add Another</Text>
                                </TouchableOpacity>
                            </View>
                            {/* {this.state.productLoader ? null :
                                <DynamicProductMapping
                                    // editData={item.productArr}
                                    flexDirection={"row"}
                                    viewType={"edit"}
                                    marginBottom={15}
                                    onApiCallData={(value) => this.onSelectLocationData(value)}
                                />
                            } */}
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.notes}
                                    onChangeText={(value) => this._onChangeNotes(value)}
                                    placeholder={"Notes"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.notesActive}
                                    onFocus={() => { this.state.allPageData.notesActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.notesActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={90}
                                    multiline={true}
                                    alignItems={"flex-start"}
                                />
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>

                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />

                                <BigTextButton
                                    text={this.props.route.params.type == "edit" ? "Update" : "Submit"}
                                    onPress={() => this._onSave()}
                                />

                            </View>

                        </View>
                    </ScrollView>
                }
            </View>
        )
    }
}

export default AssigneeDetails;