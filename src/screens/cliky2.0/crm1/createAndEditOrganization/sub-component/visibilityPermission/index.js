import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
} from "react-native";
import { AlertMessage, Color, FontFamily, FontSize, ImageName } from "../../../../../../enums";
import { CheckBox, DropdownInputBox, Loader } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { modifyData, validateData } from "./function";
import styles from "./style";


class VisibilityPermission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
        };
    }

    componentDidMount() {
        this._onLoad();
    }

    _onLoad = async () => {
        this.setState({
            allPageData: this.props.allPageData,
            pageloader: false
        })
    }

    _onCheckEveryone = (value) => {
        if (value == true) {
            this.state.allPageData.isEveryOneCheck = value;
            this.state.allPageData.isRecordCheck = false;
            this.state.allPageData.isIndividualCheck = false;
        }

        this.setState({ allPageData: this.state.allPageData })

    }
    _onCheckRecord = (value) => {
        if (value == true) {
            this.state.allPageData.isRecordCheck = value;
            this.state.allPageData.isEveryOneCheck = false;
            this.state.allPageData.isIndividualCheck = false;
        }
        this.setState({ allPageData: this.state.allPageData })
    }
    _onCheckIndividual = (value) => {
        if (value == true) {
            this.state.allPageData.isIndividualCheck = value;
            this.state.allPageData.isRecordCheck = false;
            this.state.allPageData.isEveryOneCheck = false;
        }
        this.setState({ allPageData: this.state.allPageData })
    }

    _onSelectAssignedUser = (value) => {
        let data = this.state.allPageData.assignedUserArr;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == value.id) {
                data[i].check = true;
            }
        }
        this.state.allPageData.selectedPermissionUser = value
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    checkBoxItem = (item, key) => {
        return (
            <View>
                <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                    <CheckBox
                        type={"round"}
                        borderRadius={30}
                        data={this.state.allPageData.isEveryOneCheck}
                        onClickValue={(value) => this._onCheckEveryone(value)}
                    />
                    <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>Everyone</Text>
                </View>
                <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                    <CheckBox
                        type={"round"}
                        borderRadius={30}
                        data={this.state.allPageData.isRecordCheck}
                        onClickValue={(value) => this._onCheckRecord(value)}
                    />
                    <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>Only the record owner</Text>
                </View>
                <View style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row' }} key={key}>
                    <CheckBox
                        type={"round"}
                        borderRadius={30}
                        data={this.state.allPageData.isIndividualCheck}
                        onClickValue={(value) => this._onCheckIndividual(value)}
                    />
                    <Text style={{ marginLeft: '5%', fontFamily: FontFamily.FONTS.INTER.REGULAR, fontSize: FontSize.SM, color: Color.COLOR.BLACK.PURE_BLACK }}>Select Individual People</Text>
                </View>
            </View>

        )
    }

    _onBack = () => {

        let data = {
            type: "previous",
            pageNum: 5,
            // data: reqData
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let reqData = {
            permissionType: this.state.allPageData.isEveryOneCheck ? "1" : this.state.allPageData.isRecordCheck ? "2" : this.state.allPageData.isIndividualCheck ? "4" : "3",
            permissionTo: this.state.allPageData.selectedPermissionUser.id ? this.state.allPageData.selectedPermissionUser.id : "0"
        }
   

        let validatedData = validateData(reqData)
        if (validatedData.status) {
        // else {
                let data = {
                    type: "next",
                    pageNum: 6,
                    data: reqData
                }
                this.props.onSaveDataToParent(data);
            // }
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <>
                        <Loader />
                    </>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>


                        <View style={styles.container}>
                            {/* <View style={{ marginVertical: 15 }}>
                                <Text style={styles.headerText}>Visibility Permissions</Text>
                            </View> */}

                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Visibility Permissions</Text>

                                </View>
                            </View>


                            {this.checkBoxItem()}

                            {this.state.allPageData.isIndividualCheck ? <>
                                <View style={{ marginBottom: 20 }}>
                                    <View style={{ height: 10 }} />

                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedPermissionUser.id ? this.state.allPageData.selectedPermissionUser.id.toString() : "0"}
                                        data={this.state.allPageData.assignedUserArr}
                                        onSelect={(value) => this._onSelectAssignedUser(value)}
                                        headerText={"Select User*"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                    />
                                </View>
                            </> : null}

                            <View style={{ marginTop: 80, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
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

export default VisibilityPermission;