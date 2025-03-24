import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";
import { Dimension } from "../../../../../../enums";
import { Loader, TextInputBox } from "../../../../../../shared";
import BigTextButton from "../../../../../../shared/big-text-button";
import { modifyData, validateData } from "./function";
import styles from "./style";


class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: true,
            allPageData: {},
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        this.setState({ pageloader: false, allPageData: this.props.allPageData })

    }

    _onChangeDescription = (value) => {
        // let newText = '';
        // newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.state.allPageData.description = value

        this.setState({
            allPageData: this.state.allPageData
        })
    }

    _onBack = () => {
        let data = {
            pageNum: 4
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {

        let data = {
            description: this.state.allPageData.description,

        }

        let validatedData = validateData(data);
        if (validatedData.status) {
            let uata = {
                type: "next",
                pageNum: 6,
                data: data
            }
            this.props.onSaveDataToParent(uata);
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
                                    <Text style={styles.listHeaderText}>Description</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <View style={{ marginBottom: 15 }}>
                                <TextInputBox
                                    value={this.state.allPageData.description}
                                    onChangeText={(value) => this._onChangeDescription(value)}
                                    placeholder={"Enter Description"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    alignItems={'flex-start'}
                                    isActive={this.state.allPageData.descriptionActive}
                                    onFocus={() => { this.state.allPageData.descriptionActive = true, this.setState({ allPageData: this.state.allPageData }) }}
                                    onBlur={() => { this.state.allPageData.descriptionActive = false, this.setState({ allPageData: this.state.allPageData }) }}
                                    height={90}
                                    returnKeyType={'default'}
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