import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";
import { Color, Dimension, FontSize } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";
import { Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { DataValidator } from "../../../../../../validators";
import styles from "./style";


class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
            description: "",
            descriptionActive: false,
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        this.setState({ allPageData: this.props.allPageData, pageloader: false })
    }

    _onChangeDescription = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.mainDescription = newText;
        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onBack = () => {
        let data = {
            pageNum: 3,
            type: "previous"
        }
        this.props.onSaveDataToParent(data);
    }


    _onSave = () => {
        let reqData = {
            orgDescription: this.state.allPageData.mainDescription
        }

        if (this.state.allPageData.mainDescription == null || this.state.allPageData.mainDescription == undefined || this.state.allPageData.mainDescription == "") {
            Toaster.ShortCenterToaster("Please enter Description !")
        } else {
            let data = {
                type: "next",
                pageNum: 5,
                data: reqData
            }
            this.props.onSaveDataToParent(data);
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.pageloader ?
                    <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                       <Loader/>
                    </View>
                    :
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <View style={{ marginVertical: 15 }}>
                                <Text style={styles.headerText}>Add Description</Text>
                            </View>
                            <View style={styles.blueBox}>
                                <View style={styles.blueViewFlex}>
                                    <Text style={styles.listHeaderText}>Add Description</Text>

                                </View>
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Description</Text>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.mainDescription}
                                    onChangeText={(value) => this._onChangeDescription(value)}
                                    placeholder={"Enter Description*"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={this.state.allPageData.mainDescriptionActive}
                                    onFocus={() => { this.state.allPageData.mainDescriptionActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.mainDescriptionActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={90}
                                    returnKeyType={'default'}
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
                                    text={"Save & Next"}
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