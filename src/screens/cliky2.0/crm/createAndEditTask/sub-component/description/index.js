import React from "react";
import {
    View,
    Text,
    ScrollView,
} from "react-native";
import { Dimension } from "../../../../../../enums";
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
            description: "",
            descriptionActive: false,
        };
    }

    componentDidMount = async () => {
        await this._onLoad();
    }

    _onLoad = async () => {
        if (this.props.allData.description) {
            this.setState({
                description: this.props.allData.description
            })
        }

        this.setState({ pageloader: false })
    }

    _onChangeDescription = (value) => {
        let newText = '';
        newText = DataValidator.inputEntryValidate(value, "nameSpace");
        this.setState({
            description: newText
        })
    }

    _onBack = () => {
        let data = {
            pageNum: 2
        }
        this.props.onSaveDataToParent(data);
    }

    _onSave = () => {
        if (this.state.description == undefined || this.state.description == null || this.state.description.length == 0) {
            Toaster.ShortCenterToaster("Please enter description !");
        } else {
            let data = {
                type: "next",
                pageNum: 4,
                data: { description: this.state.description }
            }
            this.props.onSaveDataToParent(data);
        }
    }

    yellowBoxSection = () => {
        return (
            <View style={styles.blueBox}>
                <View style={styles.blueViewFlex}>
                    <Text style={styles.listHeaderText}>Description</Text>
                </View>
            </View>
        )
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


                        <View style={styles.container}>
                            {this.yellowBoxSection()}

                            <View style={{ marginBottom: 15 }}>
                                <View style={{ height: 10 }} />
                                <TextInputBox
                                    value={this.state.description}
                                    onChangeText={(value) => this._onChangeDescription(value)}
                                    placeholder={"Enter Description"}
                                    keyboardType={"default"}
                                    multiline={true}
                                    alignItems={'flex-start'}
                                    isActive={this.state.descriptionActive}
                                    onFocus={() => { this.setState({ descriptionActive: true }) }}
                                    onBlur={() => { this.setState({ descriptionActive: false }) }}
                                    height={90}
                                    returnKeyType={'default'}
                                    editable={this.props.route.params.type == "edit" ? false : true}

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
