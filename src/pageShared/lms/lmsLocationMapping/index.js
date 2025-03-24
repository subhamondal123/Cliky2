import React from 'react'
import styles from './style';
import {
    View,
    Text
} from 'react-native';
import {
    AlertMessage,
    Color,
    Dimension,
    FontSize,
} from '../../../enums';
import { StorageDataModification, Toaster } from '../../../services/common-view-function';
import { DropdownInputBox, Loader, MultipleDropdownInputBox } from '../../../shared';
import { MiddlewareCheck } from '../../../services/middleware';
import { ErrorCode } from '../../../services/constant';
import { modifyLastField, modifyMapData, modifySubMappedData } from './function';

class LmsLocationMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: [],
            loader: true,
            viewType: this.props.viewType ? this.props.viewType : "add",
            editData: this.props.editData ? this.props.editData : [],
            lastFieldArr: [],
            selectedLastFieldObj: {},
            lastLevelLocationTypeName: "",
            boxtype: false

        }
    }

    componentDidMount() {
        if (this.state.viewType === "edit") {
            this.onModifyFetchEditData(this.state.editData);
        }
        this._load();
    }

    // for modify the edit Data
    onModifyFetchEditData = (data) => {
        const transformedData = [];

        // Grouping the data by typeId
        const groups = data.reduce((acc, obj) => {
            const typeId = obj.typeId;
            if (!acc[typeId]) {
                acc[typeId] = [];
            }
            acc[typeId].push(obj);
            return acc;
        }, {});

        // Transforming and merging the grouped data
        for (const typeId in groups) {
            const group = groups[typeId];
            const transformedGroup = {
                id: group.map(obj => obj.id),
                typeId: group[0].typeId,
                name: group.map(obj => obj.name),
                typeName: group[0].typeName,
                slNo: group[0].slNo
            };
            transformedData.push(transformedGroup);
        }

        this.state.editData = transformedData;
        this.setState(this.state);
    }

    // for initial call
    _load = async () => {
        //........
        if (this.props.type == "lastHierarcyField") {
            let responseData = await MiddlewareCheck("getUserMappedLastLevelLocations", {}, this.props);
            if (responseData) {
                if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                    this.state.lastFieldArr = modifyLastField(responseData.response).lastFieldArr;
                    this.state.lastLevelLocationTypeName = modifyLastField(responseData.response).lastLevelLocationTypeName
                    this.setState(this.state);
                } else {
                    Toaster.ShortCenterToaster(responseData.message);
                }
            }
            // if(this.props.selectedData && this.props.selectedData)
        } else {
            let locationData = await StorageDataModification.locationMappedData({}, "get");
            this.state.mapData = locationData ? locationData : [];
            for (let i = 0; i < this.state.mapData.length; i++) {
                this.state.mapData[i].selectedId = (this.state.viewType === "add" || this.state.viewType === "edit") ? "" : [];
                if (this.state.viewType === "edit") {
                    if (this.state.editData && this.state.editData.length > 0) {
                        await this._onModifyEditLocationData(this.state.mapData[i], i);
                    }
                }
            }
        }

        this.state.loader = false;
        this.setState(this.state);
    }

    // modify data for edit
    _onModifyEditLocationData = async (item, index) => {
        for (let j = 0; j < this.state.editData.length; j++) {
            if (item.hierarchyTypeId == this.state.editData[j].typeId) {
                this.state.mapData[index].selectedId = this.state.editData[j].id ? (this.state.editData[j].id[0]).toString() : "";
                if (this.state.editData[j].id && this.state.editData[j].id.length > 0) {
                    if (index < (this.state.mapData.length - 1)) {
                        await this.getUserImmediateChildData({ "id": this.state.mapData[index].selectedId }, item, index);
                        break;
                    }
                }
            }
        }
        this.setState(this.state);
        return true;
    }

    // for load the data
    listLoader = async (index, type) => {
        this.state.mapData[index].dataLoaderCheck = type;
        this.setState(this.state);
    }

    // for single select data
    onSelectSingleItem = async (value, selectParentData, index) => {
        this.state.mapData[index].selectedId = (value.id).toString();
        this.state.mapData[index].errorCheckData = false;
        this.setState(this.state);
        if (index < (this.state.mapData.length - 1)) {
            await this.listLoader((index + 1), true);
            await this.getUserImmediateChildData(value, selectParentData, index);
            await this.listLoader((index + 1), false);
        } else {
            await this.chieldValueChange(index);
        }
        this.validateData(index);
        this._onApiCallInfoData(index)
    }

    // for selecting the item with value
    onSelectItem = async (value, selectParentData, index) => {
        this.state.mapData[index].selectedId = value.value;
        this.state.mapData[index].errorCheckData = false;
        this.setState(this.state);
        if (index < (this.state.mapData.length - 1) && selectParentData.selectedId.length > 0) {
            await this.listLoader((index + 1), true);
            await this.getUserImmediateChildData(value, selectParentData, index);
            await this.listLoader((index + 1), false);
        } else {
            await this.chieldValueChange(index);
        }
        this._onApiCallInfoData(index)
    }

    onSelectLastField = async (value, arr) => {
        this.state.selectedLastFieldObj = value;
        this.setState(this.state)
        // let filterData = [];
        // for (let i = 0; i < value.value.length; i++) {
        let filterData = {
            "hierarchyDataId": value.id,
            "hierarchyTypeId": value.hierarchyTypeId
        };
        // }
        this.props.onApiCallData({ value: filterData })
        // this.props.onApiCallData({ value: filterData, totalData: modifyMapData(this.state.mapData), allData: this.state.mapData });

    }


    // for get user Immediate Child Data
    getUserImmediateChildData = async (value, selectParentData, index) => {
        let tempHierarchyDataArr = ((this.state.viewType === "add" || this.state.viewType === "edit") ? [value.id] : value.value);
        let responseData = await MiddlewareCheck("getUserImmediateChildData", { "hierarchyTypeId": selectParentData.hierarchyTypeId, "hierarchyDataIdArr": tempHierarchyDataArr, "hierarchyChildTypeId": this.state.mapData[(index + 1)].hierarchyTypeId });
        if (responseData == false) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.NETWORK.ERROR);
        } else {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                await this.chieldValueChange(index);
                this.state.mapData[(index + 1)].fileItem = modifySubMappedData(responseData.response);
                this.setState(this.state);
            } else {
                Toaster.ShortCenterToaster(responseData.message);
            }
        }
    }


    // for change the lower dropdown value data 
    chieldValueChange = async (index) => {
        for (let i = (index + 1); i < this.state.mapData.length; i++) {
            this.state.mapData[i].fileItem = [];
            this.state.mapData[i].selectedId = this.state.viewType === "add" || this.state.viewType === "edit" ? "" : [];
        }
        this.setState(this.state);
    }

    // for validate the data
    validateData = (index) => {
        if (index < (this.state.mapData.length - 1)) {
            if (this.state.mapData[index + 1].selectedId.length == 0) {
                Toaster.ShortCenterToaster("Please select " + this.state.mapData[index + 1].hmTypDesc + " !");
                this.state.mapData[index + 1].errorCheckData = true;
            }
        }
        this.setState(this.state);
    }

    // for api calling with data
    _onApiCallInfoData = (index) => {
        let resData = {
            "hierarchyDataId": "0",
            "hierarchyTypeId": "0"
        };
        if (this.state.viewType == "add" || this.state.viewType == "edit") {
            let tempData = this.state.mapData[this.state.mapData.length - 1];
            if (tempData.selectedId && tempData.selectedId.length > 0) {
                resData["hierarchyDataId"] = tempData.selectedId.toString();
                resData["hierarchyTypeId"] = tempData.hierarchyTypeId.toString();
                this.props.onApiCallData({ value: resData, totalData: modifyMapData(this.state.mapData), allData: this.state.mapData });
                return true;
            }
        } else {
            let tempData = this.state.mapData[index];
            let filterData = [];
            for (let i = 0; i < tempData.selectedId.length; i++) {
                filterData.push({
                    "hierarchyDataId": tempData.selectedId[i],
                    "hierarchyTypeId": tempData.hierarchyTypeId
                });
            }
            this.props.onApiCallData({ value: filterData, totalData: modifyMapData(this.state.mapData), allData: this.state.mapData });
            return true;
        }
    }

    // for item view style
    onItemViewStyle = (index) => {
        const isOdd = (number) => number % 2 === 1;
        let resStyle = {};
        if (this.props.flexDirection === 'row') {
            resStyle = { width: '48%', marginLeft: isOdd(index) ? 0 : '2%', marginRight: !isOdd(index) ? '2%' : 0 }
        }
        return resStyle;
    }


    render() {
        if (this.state.loader) {
            return null;
        } else {
            return (
                <View style={{ flexDirection: this.props.flexDirection === 'row' ? 'row' : 'column', flexWrap: 'wrap' }}>
                    {this.props.type == "lastHierarcyField" ?
                        <React.Fragment>
                            {this.props.isLabelVisible == undefined || this.props.isLabelVisible == null || this.props.isLabelVisible == false ?
                                null
                                :
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>{this.state.lastLevelLocationTypeName}</Text>
                            }

                            <DropdownInputBox
                                selectedValue={this.state.selectedLastFieldObj.id ? this.state.selectedLastFieldObj.id.toString() : ""}
                                data={this.state.lastFieldArr}
                                onSelect={(value) => this.onSelectLastField(value, this.state.lastFieldArr)}
                                headerText={this.state.lastLevelLocationTypeName}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                                isSearchable={true}
                                isLeftIcon={true}
                                leftIcon={"locationWithBGColor"}
                                leftIconColor={Color.COLOR.RED.AMARANTH}
                                additionalBoxStyle={{ height: 28, width: Dimension.width / 1.3, backgroundColor: "#fff", borderColor: "#1F2B4D", borderRadius: 20, borderWidth: 0.5 }}
                                additionalTextStyle={{ fontSize: 12, marginLeft: 10 }}
                                unSelectedTextColor={Color.COLOR.RED.AMARANTH}
                                selectedTextColor={Color.COLOR.RED.AMARANTH}
                            />
                            {/* <MultipleDropdownInputBox
                                additionalMainTouchStyle={{ height: 28, width: Dimension.width / 1.3, backgroundColor: "#fff", borderColor: "#1F2B4D", borderRadius: 20, borderWidth: 0.5 }}
                                selectedValue={this.state.selectedLastFieldArr ? this.state.selectedLastFieldArr : []}
                                data={this.state.lastFieldArr}
                                onSelect={(value) => this.onSelectLastField(value, this.state.lastFieldArr)}
                                headerText={this.state.lastLevelLocationTypeName}
                                isBackButtonPressRequired={true}
                                isBackdropPressRequired={true}
                                isSearchable={true}
                                isLeftIcon={true}
                                leftIcon={"locationWithBGColor"}
                                leftIconColor={"#F13748"}
                                additionalTextStyle={{ fontSize: 12, marginLeft: 10 }}
                            /> */}
                        </React.Fragment>
                        :
                        <React.Fragment>
                            {this.state.mapData.map((item, key) => (
                                <View style={[styles.mainView, this.onItemViewStyle(key)]} key={key}>
                                    <View style={{ flex: 1 }}>
                                        {this.props.isLabelVisible == undefined || this.props.isLabelVisible == null || this.props.isLabelVisible == false ?
                                            null
                                            :
                                            <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}></Text>{item.hmTypDesc ? item.hmTypDesc : ""}</Text>
                                        }
                                        <View style={{ height: 5 }} />
                                        {item.dataLoaderCheck === true ?
                                            <Loader type={"normal"} /> :
                                            <React.Fragment>
                                                {(this.state.viewType == "add" || this.state.viewType == "edit") ?
                                                    <>
                                                        {this.props.screenName == undefined || this.props.screenName == null ?
                                                            <DropdownInputBox
                                                                additionalMainTouchStyle={item.errorCheckData ? { borderColor: Color.COLOR.RED.LIGHT_RED, borderWidth: 1 } : {}}
                                                                selectedValue={item.selectedId ? item.selectedId.toString() : ""}
                                                                data={item.fileItem}
                                                                onSelect={(value) => this.onSelectSingleItem(value, item, key)}
                                                                headerText={item.hmTypDesc ? item.hmTypDesc : ""}
                                                                isBackButtonPressRequired={true}
                                                                isBackdropPressRequired={true}
                                                                isSearchable={true}
                                                                backgroundColor={"#F0F4F7"}
                                                                borderRadius={25}
                                                                selectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}
                                                                unSelectedTextColor={Color.COLOR.BLUE.LOTUS_BLUE}

                                                            /> :
                                                            <DropdownInputBox
                                                                additionalMainTouchStyle={item.errorCheckData ? { borderColor: Color.COLOR.RED.LIGHT_RED, borderWidth: 1 } : {}}
                                                                selectedValue={item.selectedId ? item.selectedId.toString() : ""}
                                                                data={item.fileItem}
                                                                onSelect={(value) => this.onSelectSingleItem(value, item, key)}
                                                                headerText={item.hmTypDesc ? item.hmTypDesc : ""}
                                                                isBackButtonPressRequired={true}
                                                                isBackdropPressRequired={true}
                                                                isSearchable={true}
                                                                borderRadius={10}
                                                                additionalBoxStyle={{ borderColor: '#000', borderWidth: 0.4 }}
                                                            />
                                                        }

                                                    </> :
                                                    <MultipleDropdownInputBox
                                                        additionalMainTouchStyle={item.errorCheckData ? { borderColor: Color.COLOR.RED.LIGHT_RED, borderWidth: 1 } : {}}
                                                        selectedValue={item.selectedId ? item.selectedId : []}
                                                        data={item.fileItem}
                                                        onSelect={(value) => this.onSelectItem(value, item, key)}
                                                        headerText={item.hmTypDesc ? item.hmTypDesc : ""}
                                                        isBackButtonPressRequired={true}
                                                        isBackdropPressRequired={true}
                                                        isSearchable={true}
                                                    />
                                                }
                                                <View style={{ marginBottom: this.props.marginBottom ? this.props.marginBottom : 15 }} />
                                            </React.Fragment>
                                        }
                                    </View>
                                </View>
                            ))}
                        </React.Fragment>
                    }

                </View>
            );
        }
    };
};

export default LmsLocationMapping;