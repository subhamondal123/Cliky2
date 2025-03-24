import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style'; import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {
    AlertMessage,
    Color,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../../../enums';
import { DropdownInputBox, BigTextButton, CheckBox, Modal, TextButton, TextInputBox, Loader } from '../../../../shared';
import DatePicker from 'react-native-date-picker';
import { DateConvert } from '../../../../services/common-view-function';
import { MiddlewareCheck } from '../../../../services/middleware';
import { ErrorCode } from '../../../../services/constant';
import { modifyEmployeeNameData, modifyEmployeeTypeArr, modifyStateData, validateBeatRouteData } from './function';
import { DataController } from '../../../../services/Validators';

const allStatus = [
    {
        id: 1,
        name: "Hot",
    },
    {
        id: 2,
        name: "Warm",
    },
    {
        id: 3,
        name: "Cold",
    }
]

const allPriority = [
    {
        id: 1,
        name: "High",
    },
    {
        id: 2,
        name: "Medium",
    },
    {
        id: 3,
        name: "Low",
    }
]

const allLeadSource = [
    {
        id: 1,
        name: "Website",
    },
    {
        id: 2,
        name: "Facebook Campaign",
    },
    {
        id: 3,
        name: "Email",
    },
    {
        id: 4,
        name: "Linkedin",
    }
]

const allTaskCategory = [
    {
        id: 1,
        name: "F2F Meeting",
    },
    {
        id: 2,
        name: "Phone Call",
    },
    {
        id: 3,
        name: "E-Meet",
    },
    {
        id: 4,
        name: "Email",
    }
]

const allType = [
    {
        id: 1,
        name: "Lead",
        check: false
    },
    {
        id: 2,
        name: "Enquiry",
        check: false
    },
    {
        id: 3,
        name: "Opportunity",
        check: false
    },
    {
        id: 4,
        name: "Closed",
        check: false
    }
]

const verticalArrData = [
    {
        id: 1,
        name: "Retail"
    }
]



function MapFilterModal({
    modalPadding,
    isVisible,
    type,
    // fontFamily,
    // fontSize,
    // color,
    isHidden,
    isLoading,
    // onLogout,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal,
    applyFilterData,
    props
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    // const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedLeadSource, setSelectedLeadSource] = useState({});
    const [selectedPriority, setSelectedPriority] = useState({});
    const [selectedTaskType, setSelectedTaskType] = useState({});

    const [ascendingCheck, setAscendingCheck] = useState(false);
    const [descendingCheck, setDescendingCheck] = useState(false);



    const [employeeNameArr, setEmployeeNameArr] = useState([]);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState({});
    const [projectArr, setProjectArr] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [realedgeArr, setRealedgeArr] = useState([]);
    const [selectedRealedge, setselectedRealedge] = useState({});
    const [typeArr, setTypeArr] = useState(allType);
    const [selectedType, setSelectedType] = useState({});
    const [statusArr, setStatusArr] = useState(allStatus);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [fromDatePicker, setFromDatePicker] = useState(false);
    const [fromDateObj, setFromDateObj] = useState({ rawDate: new Date(), fromDate: "" });
    const [toDatePicker, setToDatePicker] = useState(false);
    const [toDateObj, setToDateObj] = useState({ rawDate: new Date(), toDate: "" });
    const [selectDatePicker, setSelectDatePicker] = useState(false);
    const [selectDateObj, setSelectDateObj] = useState({ rawDate: new Date(), selectDate: "" });


    // ////////////////////////// new
    const [pageLoader, setPageLoader] = useState(true);
    const [employeeTypeArr, setEmployeeTypeArr] = useState([]);
    const [selectedEmployeeType, setEmployeeType] = useState({});
    const [stateArr, setStateArr] = useState([]);
    const [selectedState, setStateData] = useState({});
    const [distArr, setDistArr] = useState([]);
    const [selectedDist, setDistData] = useState({});
    const [zoneArr, setZoneArr] = useState([]);
    const [selectedZone, setZoneData] = useState({});
    const [verticalArr, setVerticalArr] = useState(verticalArrData);
    const [selectedVertical, setVerticalData] = useState({ id: 1, name: "Retail" });
    const [selectType, setTypeData] = useState("");



    useEffect(() => {
        apiCallingCheck();
    }, [])

    const apiCallingCheck = async () => {
        if (type == "liveLocation") {
            await getEmployeeTypeData();
            await getLocationHierarchy();
            // await getCustomerType();
        } else if (type == "beatRoute") {

        } else if (type == "sales") {

        }
        setPageLoader(false);
    }

    // for employee type data from api
    const getEmployeeTypeData = async () => {
        let responseData = await MiddlewareCheck("getDesignationList", {}, props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setEmployeeTypeArr(modifyEmployeeTypeArr(responseData.data.designationList));
            }
        }
    }


    // for location hierarchy data from api
    const getLocationHierarchy = async () => {
        let responseData = await MiddlewareCheck("getLocationHierarchy", {}, props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setStateArr(modifyStateData(responseData.data.resData.state))
            }
        }
    }


    // for location hierarchy data from api
    const getCustomerType = async () => {
        let responseData = await MiddlewareCheck("getCustomerType", {}, props);
        if (responseData) {
            // if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
            //     setSubordinateArr(modifySubordinateArr(responseData.data))
            // }
        }
    }


    // for location hierarchy data from api
    const getMapUserLocationMapping = async (value) => {
        setPageLoader(true);
        let responseData = await MiddlewareCheck("mapUserLocationMapping", {
            "stateId": "0",
            "districtId": '0',
            "zoneId": '0',
            "designationId": value.designationId,
            "rating": null
        }, props);
        if (responseData) {
            if (responseData.respondcode === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                setEmployeeNameArr(modifyEmployeeNameData(responseData.data.data));
            }
        }
        setPageLoader(false);
    }


    const _onClose = () => {
        onCloseModal();
    }

    // for reset the filter
    const _onReset = () => {
        setEmployeeType({});
        setStateData({});
        setDistArr([]);
        setDistData({});
        setZoneArr([]);
        setZoneData({});
        setSelectDateObj({ rawDate: new Date(), selectDate: "" });
        setToDateObj({ rawDate: new Date(), toDate: "" });
        setFromDateObj({ rawDate: new Date(), fromDate: "" });
        setSelectedEmployeeName({});
        setTypeData("");
    }

    // for apply filter
    const _onApplyFilter = () => {
        let filterData = {};
        if (type == "liveLocation") {
            filterData["employeeType"] = { id: DataController.stringDataReturnValueCheck(selectedEmployeeType.id), name: DataController.stringDataReturnValueCheck(selectedEmployeeType.name) }
            filterData["state"] = { id: DataController.stringDataReturnValueCheck(selectedState.id), name: DataController.stringDataReturnValueCheck(selectedState.name) };
            filterData["dist"] = { id: DataController.stringDataReturnValueCheck(selectedDist.id), name: DataController.stringDataReturnValueCheck(selectedDist.name) };
            filterData["zone"] = { id: DataController.stringDataReturnValueCheck(selectedZone.id), name: DataController.stringDataReturnValueCheck(selectedZone.name) };
            onCloseModal();
            applyFilterData(filterData);
        } else if (type == "beatRoute") {
            filterData["employeeType"] = { id: DataController.stringDataReturnValueCheck(selectedEmployeeType.id), name: DataController.stringDataReturnValueCheck(selectedEmployeeType.name) }
            filterData["employeeId"] = { id: DataController.stringDataReturnValueCheck(selectedEmployeeName.id), name: DataController.stringDataReturnValueCheck(selectedEmployeeName.name) }
            filterData["visitDate"] = { viewDate: DataController.stringDataReturnValueCheck(selectDateObj.selectDate), rawDate: DataController.stringDataReturnValueCheck(selectDateObj.rawDate) }
            if (validateBeatRouteData(filterData)) {
                onCloseModal();
                applyFilterData(filterData);
            }
        } else if (type == "sales") {
            filterData["state"] = { id: DataController.stringDataReturnValueCheck(selectedState.id), name: DataController.stringDataReturnValueCheck(selectedState.name) };
            filterData["dist"] = { id: DataController.stringDataReturnValueCheck(selectedDist.id), name: DataController.stringDataReturnValueCheck(selectedDist.name) };
            filterData["zone"] = { id: DataController.stringDataReturnValueCheck(selectedZone.id), name: DataController.stringDataReturnValueCheck(selectedZone.name) };
            filterData["customerType"] = selectType;
            onCloseModal();
            applyFilterData(filterData);
        }
    }

    const onRequestCloseModal = () => {
        onRequestClose();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }



    const employeeTypeSection = () => {
        const _onSelectEmployeeType = async (value) => {
            setEmployeeType(value);
            if (type == "beatRoute") {
                await getMapUserLocationMapping(value);
            }
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Employee Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedEmployeeType.id ? selectedEmployeeType.id.toString() : ""}
                    data={employeeTypeArr}
                    onSelect={(value) => _onSelectEmployeeType(value)}
                    headerText={"Employee Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }


    const stateSection = () => {
        const _onSelectState = (value) => {
            setStateData(value);
            setDistArr(value.district);
            setDistData({});
            setZoneArr([]);
            setZoneData({});
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>State</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedState.id ? selectedState.id.toString() : ""}
                    data={stateArr}
                    onSelect={(value) => _onSelectState(value)}
                    headerText={"State"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const distSection = () => {
        const _onSelectDist = (value) => {
            setDistData(value);
            setZoneArr(value.zone);
            setZoneData({});
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>District</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedDist.id ? selectedDist.id.toString() : ""}
                    data={distArr}
                    onSelect={(value) => _onSelectDist(value)}
                    headerText={"District"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const zoneSection = () => {
        const _onSelectZone = (value) => {
            setZoneData(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Zone</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedZone.id ? selectedZone.id.toString() : ""}
                    data={zoneArr}
                    onSelect={(value) => _onSelectZone(value)}
                    headerText={"Zone"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }


    const employeeNameSection = () => {
        const _onSelectEmployeeName = (value) => {
            setSelectedEmployeeName(value);
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Employee Name</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedEmployeeName.id ? selectedEmployeeName.id.toString() : ""}
                    data={employeeNameArr}
                    onSelect={(value) => _onSelectEmployeeName(value)}
                    headerText={"Employee Name"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const projectSection = () => {
        const _onSelectProject = (value) => {
            setSelectedProject(value);
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Project</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedProject.id ? selectedProject.id.toString() : ""}
                    data={projectArr}
                    onSelect={(value) => _onSelectProject(value)}
                    headerText={"Project"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }


    const verticalSection = () => {
        const _onSelectVertical = (value) => {
            setVerticalData(value);
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Project</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedVertical.id ? selectedVertical.id.toString() : ""}
                    data={verticalArr}
                    onSelect={(value) => _onSelectVertical(value)}
                    headerText={"Vertical"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const realedgeSection = () => {
        const _onSelectRealedge = (value) => {
            setSelectedProject(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Realedge</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedRealedge.id ? selectedRealedge.id.toString() : ""}
                    data={realedgeArr}
                    onSelect={(value) => _onSelectRealedge(value)}
                    headerText={"Realedge"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const typeSection = () => {
        const _onSelectType = (value) => {
            setSelectedType(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedType.id ? selectedType.id.toString() : ""}
                    data={typeArr}
                    onSelect={(value) => _onSelectType(value)}
                    headerText={"Type"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const statusSection = () => {
        const _onSelectStatus = (value) => {
            setSelectedStatus(value)
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Type</Text>
                <View style={{ height: 5 }} />
                <DropdownInputBox
                    selectedValue={selectedStatus.id ? selectedStatus.id.toString() : ""}
                    data={statusArr}
                    onSelect={(value) => _onSelectStatus(value)}
                    headerText={"Status"}
                    isBackButtonPressRequired={true}
                    isBackdropPressRequired={true}
                />
            </View>
        )
    }

    const fromDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setFromDatePicker(!fromDatePicker);
        }
        const onSelectDate = (date) => {
            setFromDateObj({
                fromDate: DateConvert.formatYYYYMMDD(date),
                rawDate: date
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>From Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={styles.inputBoxText}>{fromDateObj.fromDate.length == 0 ? "Select Date" : fromDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={fromDatePicker}
                    date={fromDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    const selectDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setSelectDatePicker(!selectDatePicker);
        }
        const onSelectDate = (date) => {
            setSelectDateObj({
                selectDate: DateConvert.formatYYYYMMDD(date),
                rawDate: date
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>Visit Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={[selectDateObj.selectDate.length == 0 ? styles.inputNotSelectBoxText : styles.inputBoxText]}>{selectDateObj.selectDate.length == 0 ? "Select Date" : selectDateObj.selectDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={selectDatePicker}
                    date={selectDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    const toDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setToDatePicker(!toDatePicker);
        }
        const onSelectDate = (date) => {
            setToDateObj({
                toDate: DateConvert.formatYYYYMMDD(date),
                rawDate: date
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>To Date</Text>
                <View style={{ height: 5 }} />
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={styles.inputBoxText}>{toDateObj.toDate.length == 0 ? "Select Date" : toDateObj.toDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 15, width: 15, resizeMode: 'contain' }} source={ImageName.CALENDER_IMAGE} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={toDatePicker}
                    date={toDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }


    const liveLocation = () => {
        return (
            <>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    {employeeTypeSection()}
                    <View style={{ width: '5%' }} />
                    {stateSection()}
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    {distSection()}
                    <View style={{ width: '5%' }} />
                    {zoneSection()}
                </View>
            </>
        )
    }

    const beatRoute = () => {
        return (
            <>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    {employeeTypeSection()}
                    <View style={{ width: '5%' }} />
                    {employeeNameSection()}
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    {selectDateSection()}
                    <View style={{ width: '5%' }} />
                    <View style={{ flex: 1 }} />
                </View>
            </>
        )
    }

    const sales = () => {
        const onSelectType = (id) => {
            let arr = typeArr;
            setTypeData(id == 1 ? "lead" : id == 2 ? "enquiry" : id == 3 ? "opportunity" : "closed");
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    if (arr[i].check == true) {
                        arr[i].check = false;
                        setSelectedType({})
                    } else {
                        arr[i].check = true;
                        setSelectedType(arr[i])
                    }
                }
            }

            setTypeArr(arr);
        }
        let selectButtonStyle = { borderWidth: 2, borderColor: '#000' };
        return (
            <>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    {stateSection()}
                    <View style={{ width: '5%' }} />
                    {distSection()}
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    {zoneSection()}
                    <View style={{ width: '5%' }} />
                    {verticalSection()}
                </View>
                {/* <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    {realedgeSection()}
                    <View style={{ width: '5%' }} />
                    {typeSection()}
                    <View style={{ flex: 1 }} />
                </View> */}
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    <TouchableOpacity
                        style={[{
                            height: 45,
                            flex: 1,
                            flexDirection: 'row',
                            borderRadius: 10,
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            backgroundColor: "green",
                        }, selectType == "lead" ? selectButtonStyle : {}]}
                        activeOpacity={0.9}
                        onPress={() => onSelectType(1)}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.markerTypeText}>Lead</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '5%' }} />
                    <TouchableOpacity
                        style={[{
                            height: 45,
                            flex: 1,
                            flexDirection: 'row',
                            borderRadius: 10,
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            backgroundColor: "red"
                        }, selectType == "enquiry" ? selectButtonStyle : {}]}
                        onPress={() => onSelectType(2)}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.markerTypeText}>Enquiry</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    <TouchableOpacity
                        style={[{
                            height: 45,
                            flex: 1,
                            flexDirection: 'row',
                            borderRadius: 10,
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            backgroundColor: "blue"
                        }, selectType == "opportunity" ? selectButtonStyle : {}]}
                        onPress={() => onSelectType(3)}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.markerTypeText}>Opportunity</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '5%' }} />
                    <TouchableOpacity
                        style={[{
                            height: 45,
                            flex: 1,
                            flexDirection: 'row',
                            borderRadius: 10,
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            backgroundColor: Color.COLOR.ORANGE.MANGO_TANGO
                        }, selectType == "closed" ? selectButtonStyle : {}]}

                        onPress={() => onSelectType(4)}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.markerTypeText, {}]}>Closed</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* {selectedType.id == 1 ?
                    selectedLeadSection()
                    :
                    null
                }
                {selectedType.id == 2 ?
                    selectedEnquirySection()
                    :
                    null
                }
                {selectedType.id == 3 ?
                    selectedOpportunitySection()
                    :
                    null
                }
                {selectedType.id == 4 ?
                    selectedClosedSection()
                    :
                    null
                } */}
            </>
        )
    }

    const selectedLeadSection = () => {
        return (
            <>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                    {statusSection()}
                    <View style={{ width: '5%' }} />
                    <View style={{ flex: 1 }} />
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                    <Text style={styles.labelText}>Recently Added</Text>
                    <View style={{ width: 100, marginHorizontal: 5 }}>
                        <TextInputBox
                            placeholder={"Days"}
                        />
                    </View>
                    <Text style={styles.labelText}>Days</Text>
                </View>
            </>
        )
    }

    const selectedEnquirySection = () => {
        return (
            <>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                    <Text style={styles.labelText}>Recently Added</Text>
                    <View style={{ width: 100, marginHorizontal: 5 }}>
                        <TextInputBox
                            placeholder={"Days"}
                        />
                    </View>
                    <Text style={styles.labelText}>Days</Text>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                    <Text style={styles.labelText}>Delay Response</Text>
                    <View style={{ width: 100, marginHorizontal: 5 }}>
                        <TextInputBox
                            placeholder={"Days"}
                        />
                    </View>
                    <Text style={styles.labelText}>Days</Text>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                    <Text style={styles.labelText}>Not Moving</Text>
                    <View style={{ width: 100, marginHorizontal: 5 }}>
                        <TextInputBox
                            placeholder={"Days"}
                        />
                    </View>
                    <Text style={styles.labelText}>Days</Text>
                </View>
            </>
        )
    }

    const selectedOpportunitySection = () => {
        return (
            <>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                    <Text style={styles.labelText}>Delay Response</Text>
                    <View style={{ width: 100, marginHorizontal: 5 }}>
                        <TextInputBox
                            placeholder={"Days"}
                        />
                    </View>
                    <Text style={styles.labelText}>Days</Text>
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                    <Text style={styles.labelText}>Recently Converted</Text>
                    <View style={{ width: 100, marginHorizontal: 5 }}>
                        <TextInputBox
                            placeholder={"Days"}
                        />
                    </View>
                    <Text style={styles.labelText}>Days</Text>
                </View>
            </>
        )
    }

    const selectedClosedSection = () => {
        return (
            <>
                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                    <Text style={styles.labelText}>Not Moving</Text>
                    <View style={{ width: 100, marginHorizontal: 5 }}>
                        <TextInputBox
                            placeholder={"Days"}
                        />
                    </View>
                    <Text style={styles.labelText}>Days</Text>
                </View>
            </>
        )
    }


    return (
        <Modal
            isVisible={isVisible}
            padding={modalPadding}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <React.Fragment>
                        <View style={styles.modalHeaderSec}>
                            <TouchableOpacity
                                style={styles.crossImgSec}
                                activeOpacity={0.9}
                                onPress={() => _onClose()}>
                                <Image source={ImageName.WHITE_CROSS} style={styles.redCrossImg} />
                            </TouchableOpacity>
                        </View>
                        {pageLoader ?
                            <View style={styles.pageLoaderViewStyle}>
                                <Loader />
                            </View>
                            :
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                {type == "liveLocation" ?
                                    liveLocation()
                                    :
                                    null
                                }
                                {type == "beatRoute" ?
                                    beatRoute()
                                    :
                                    null
                                }
                                {type == "sales" ?
                                    sales()
                                    :
                                    null
                                }

                                <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 15 }}>
                                    <BigTextButton
                                        backgroundColor={Color.COLOR.BLUE.EBONY_CLAY}
                                        fontColor={Color.COLOR.WHITE.PURE_WHITE}
                                        text={"RESET"}
                                        onPress={() => _onReset()}
                                    />
                                    <View style={{ width: 10 }} />
                                    <BigTextButton
                                        text={"APPLY FILTER"}
                                        onPress={() => _onApplyFilter()}
                                    />
                                </View>
                            </ScrollView>
                        }
                        <View style={{ height: 20 }} />
                    </React.Fragment>
                </View>
            }
        />
    );
}

MapFilterModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    type: "sales",
    isHidden: false,
    isLoading: false,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },
    applyFilterData: () => { },
};

MapFilterModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    type: PropTypes.string,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    applyFilterData: PropTypes.func,
};


export default MapFilterModal;