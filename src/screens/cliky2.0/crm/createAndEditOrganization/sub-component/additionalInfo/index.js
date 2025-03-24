import React from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native"; import { DropdownInputBox, Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { modifyOrgData, modifySubDomain, validateData } from "./function";
import styles from "./style";
import { MiddlewareCheck } from "../../../../../../services/middleware";
import { ErrorCode } from "../../../../../../services/constant";
import _debounce from 'lodash/debounce';
import { Color } from "../../../../../../enums";


class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            contactList: [],
            contactLoader: false,
            searchableContactLoader: false,
            subDomainLoader: false
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
        await this.getSubDomain(this.state.allPageData.selectedDomainObj.id)
    }

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false })
    }

    _onChangeWebsite = (value) => {
        this.state.allPageData.website = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    getSubDomain = async (value) => {
        let reqData = {
            "limit": "50",
            "offset": "0",
            "domainId": value
        }
        this.setState({ subDomainLoader: true })
        let responseData = await MiddlewareCheck("getAllSubDomain", reqData, this.props);
        if (responseData) {
            if (responseData.status == ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifySubDomain(responseData.response).list
                this.state.allPageData.subDomainArr = modData
                this.setState({ allPageData: this.state.allPageData })
            }
        }
        this.setState({ subDomainLoader: false })


    }

    _onChangeDomain = async (value) => {
        this.state.allPageData.selectedDomainObj = value
        this.setState({ allPageData: this.state.allPageData })
        await this.getSubDomain(value.id)
    }
    _onChangeSubDomain = (value) => {
        this.state.allPageData.selectedSubDomainObj = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }
    _onChangeParentOrg = (value) => {
        this.state.allPageData.parentOrg = value;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onSelectParentOrg = (item, key) => {
        this.state.allPageData.selectedParentOrgObj = item
        this.setState({ allPageData: this.state.allPageData })
    }

    _onSearchContactData = async (value) => {
        await this.debouncedFetchOrgData(value)
    }
    debouncedFetchOrgData = _debounce(async (value) => {
        await this._onSearchContact(value); // Pass the searchText to fetchData
    }, 400);

    _onSearchContact = async () => {
        this.setState({ searchableContactLoader: true })

        let reqData = {
            "limit": 50,
            "offset": "0",
            "searchFrom": "",
            "searchTo": "",
            "searchTextOrgName": "",
            "searchTextOwnerName": "",
            "searchTextContactType": "",
            "searchTextState": "",
            "searchTextPhone": "",
            "status": "",
            "isDownload": "0",
            "view": "list",
            "searchName": this.state.allPageData.parentOrg,
            "masterMdouleTypeId": "20"
        }
        let responseData = await MiddlewareCheck("fetchOrganizationList", reqData, this.props);
        if (responseData) {
            if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
                let modData = modifyOrgData(responseData.response)
                this.state.allPageData.parentOrgArr = modData.list
                this.setState({
                    allPageData: this.state.allPageData
                })
            }
        }
        this.setState({ searchableContactLoader: false })
    }

    _onBack = () => {
        let data = {
            type: "previous",
            pageNum: 3
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        let reqData = {
            "website": this.state.allPageData.website,
            "domain": this.state.allPageData.selectedDomainObj.id,
            "sub_domain": this.state.allPageData.selectedSubDomainObj.id,
            "parent_org_id": this.state.allPageData.selectedParentOrgObj.id ? this.state.allPageData.selectedParentOrgObj.id : "",
        }

        let validData = validateData(reqData)
        if (validData.status) {
            let data = {
                type: "next",
                pageNum: 4,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
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
                                <Text style={styles.headerText}>Add Description</Text>
                            </View> */}


                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Additional Information</Text>

                                </View>
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.website}
                                    onChangeText={(value) => this._onChangeWebsite(value)}
                                    placeholder={"Website"}
                                    keyboardType={"default"}
                                    isActive={this.state.allPageData.websiteActive}
                                    onFocus={() => { this.state.allPageData.websiteActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.websiteActive = false; this.setState({ allPageData: this.state.allPageData }) }}
                                    height={45}
                                    returnKeyType={'default'}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedDomainObj.id ? this.state.allPageData.selectedDomainObj.id.toString() : "0"}
                                    data={this.state.allPageData.domainArr}
                                    onSelect={(value) => this._onChangeDomain(value)}
                                    headerText={"Domain"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                    isSearchable={true}
                                // isApiCall={true}
                                // onSearchData={(value) => this._onSearchContactData(value)}
                                // loaderCheck={this.state.searchableContactLoader}
                                />

                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                {this.state.subDomainLoader ?
                                    <ActivityIndicator color={Color.COLOR.BLUE.LOTUS_BLUE} />
                                    :
                                    <DropdownInputBox
                                        selectedValue={this.state.allPageData.selectedSubDomainObj.id ? this.state.allPageData.selectedSubDomainObj.id.toString() : "0"}
                                        data={this.state.allPageData.subDomainArr}
                                        onSelect={(value) => this._onChangeSubDomain(value)}
                                        headerText={"Sub Domain"}
                                        isBackButtonPressRequired={true}
                                        isBackdropPressRequired={true}
                                        isSearchable={true}
                                    // isApiCall={true}
                                    // onSearchData={(value) => this._onSearchContactData(value)}
                                    // loaderCheck={this.state.searchableContactLoader}
                                    />
                                }
                              
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />

                                <DropdownInputBox
                                    selectedValue={this.state.allPageData.selectedParentOrgObj.id ? this.state.allPageData.selectedParentOrgObj.id.toString() : "0"}
                                    data={this.state.allPageData.parentOrgArr}
                                    onSelect={(value) => this._onSelectParentOrg(value)}
                                    headerText={"Parent Organization"}
                                    isBackButtonPressRequired={true}
                                    isBackdropPressRequired={true}
                                    isSearchable={true}
                                    isApiCall={true}
                                    onSearchData={(value) => this._onSearchContactData(value)}
                                    loaderCheck={this.state.searchableContactLoader}
                                />

                            </View>

                            <View style={{ marginTop: 20, marginBottom: 40, flexDirection: 'row', flex: 1 }}>
                                <BigTextButton
                                    text={"Previous"}
                                    onPress={() => this._onBack()}
                                />
                                <View style={{ width: "5%" }} />
                                <BigTextButton
                                    text={"Submit"}
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

export default Description;