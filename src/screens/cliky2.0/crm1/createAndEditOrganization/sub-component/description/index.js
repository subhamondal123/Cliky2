import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity
} from "react-native";import { Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { validateData } from "./function";
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
        // let newText = '';
        // newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.mainDescription = value;
        this.setState({
            allPageData: this.state.allPageData
        })
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
            orgDescription: this.state.allPageData.mainDescription
        }

        let validData = validateData(reqData)
        if (validData.status) {
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
                    <>
                        <Loader/>
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
                                    <Text style={styles.listHeaderText}>Description</Text>

                                </View>
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={styles.labelText}><Text style={{ color: Color.COLOR.RED.RED_ORANGE, fontSize: FontSize.LG }}>{ }</Text>Description</Text> */}
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.allPageData.mainDescription}
                                    onChangeText={(value) => this._onChangeDescription(value)}
                                    placeholder={"Enter Description"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    isActive={this.state.allPageData.mainDescriptionActive}
                                    onFocus={() => { this.state.allPageData.mainDescriptionActive = true; this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.mainDescriptionActive = false; this.setState({ allPageData: this.state.allPageData }) }}
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