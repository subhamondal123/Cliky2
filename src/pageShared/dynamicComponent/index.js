import { PropTypes } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Color, FontFamily, FontSize } from '../../enums';
import { BigTextButton, CheckBox, TextInputBox, DropdownInputBox } from '../../shared';
import { DataConvert, DateConvert } from '../../services/common-view-function';
import styles from './style';

let dpData = [{
    id: 1,
    type: 'inputText',
    question: "Which of the following companies do you consider to be the biggest compitetor to your business in the steel industry?",
    label: "test"
},
// {
//     id: 2,
//     type: 'dropdown',
//     question: "Which of the following companies do you consider to be the biggest compitetor to your business in the steel industry?",
//     label: "test",
//     options: [{
//         id: "1",
//         name: "test_label1"
//     }, {
//         id: "2",
//         name: "test_label2"
//     }]
// },
{
    id: 3,
    type: 'optionSelect',
    label: "",
    question: "Which of the following companies do you consider to be the biggest compitetor to your business in the steel industry?",
    options: [{
        id: "1",
        name: "Which of the following companies do ",
    }, {
        id: "2",
        name: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",

    }, {
        id: "3",
        name: "Which of the following companies do",

    }]
}, {
    id: 4,
    type: 'trueFalse',
    question: "Which of the following companies do you consider to be the biggest compitetor to your business in the steel industry?",
    label: "Dynamic"
}, {
    id: 5,
    type: 'singleCheck',
    question: "Which of the following companies to your business in the steel industry?",
    label: "singleCheck",
    options: [{
        id: "1",
        name: "true",
    }, {
        id: "2",
        name: "false",

    }]
},
]

const DynamicComponent = ({
    isVisible,
    data,
    selectIndex,
    onSubmitAnswer,
    onCheckAnswer,
    onTextInputAnswer
}) => {
    const [formFields, setFormFields] = useState([]);
    const [loader, setLoader] = useState(true);


    if (isVisible) return null;


    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].selectedValue == undefined || data[i].selectedValue == null) {
                data[i]["selectedValue"] = "";
            }
        }
        setFormFields(data);
        loaderChange(false);
    }, []);


    // for change the loader
    const loaderChange = async (type) => {
        setLoader(type);
    }

    // for change the input text
    const handleInputChange = (value, fieldData, key) => {
        fieldData.selectedValue = value;
        formFields[key] = fieldData;
        formFields[key].createdAt = DateConvert.fullDateFormat(new Date());
        setFormFields(formFields);
        onTextInputAnswer(selectIndex, formFields);
    };

    // for chnage the dropdown data change
    const handleDropdownChange = (value, fieldId, key) => {
        formFields[key].selectedValue = value.name;
        formFields[key].createdAt = DateConvert.fullDateFormat(new Date());
        onCheckAnswer(selectIndex, formFields);
    };

    // for select option
    const handleOptionSelect = async (option, subKey, key) => {
        await loaderChange(true);
        formFields[key].selectedValue = option.name;
        formFields[key].createdAt = DateConvert.fullDateFormat(new Date());
        formFields[key].options = DataConvert.singleSetectDataModification(formFields[key].options, subKey);
        setFormFields(formFields);
        await loaderChange(false);
        onCheckAnswer(selectIndex, formFields);
    }

    // for single check change
    const handleSingleCheckSelect = async (option, subKey, key) => {
        await loaderChange(true);
        formFields[key].selectedValue = option.name;
        formFields[key].createdAt = DateConvert.fullDateFormat(new Date());
        formFields[key].options = DataConvert.singleSetectDataModification(formFields[key].options, subKey);
        setFormFields(formFields);
        await loaderChange(false);
        onCheckAnswer(selectIndex, formFields);
    }

    // for true and false check
    const handleTrueFalseSelect = async (value, key) => {
        await loaderChange(true);
        formFields[key].selectedValue = value;
        formFields[key].createdAt = DateConvert.fullDateFormat(new Date());
        setFormFields(formFields);
        await loaderChange(false);
        onCheckAnswer(selectIndex, formFields);
    }

    // for next the data
    const OnNext = () => {
        onCheckAnswer(selectIndex, formFields);
    }

    const renderFormField = (field, key) => {
        if (field.type === 'inputText') {
            return (
                <React.Fragment key={key}>
                    {questionSec(field, key)}
                    <View style={styles.inputView}>
                        <TextInput
                            key={field.id}
                            style={styles.inputFieldStyle}
                            placeholder={"Give your input here"}
                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                            defaultValue={field.selectedValue}
                            onChangeText={(text) => handleInputChange(text, field, key)}
                            editable={field.isEditable}
                        />
                    </View>
                    {NextButton(field, key)}
                </React.Fragment>
            );
        } else if (field.type === 'dropdown') {
            return (
                <React.Fragment key={key}>
                    {questionSec(field, key)}
                    <View style={{ marginTop: 30 }}>
                        <DropdownInputBox
                            data={field.options}
                            height={55}
                            selectedValueType={"name"}
                            selectedValue={field.selectedValue ? field.selectedValue : "0"}
                            headerText={"select"}
                            onSelect={(value) => handleDropdownChange(value, field.id, key)}
                            isDisabled={!field.isEditable}
                        />
                    </View>
                    {/* {NextButton(field, key)} */}
                </React.Fragment>

            );
        } else if (field.type === 'optionSelect') {
            return (
                <React.Fragment key={key}>
                    {questionSec(field, key)}
                    <View style={{ marginTop: 30, marginHorizontal: 10 }}>
                        {field.options.map((option, key1) => (
                            <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'center' }}>
                                <View style={{ flex: 0.1 }}>
                                    <CheckBox
                                        borderWidth={1.5}
                                        width={22}
                                        height={22}
                                        borderRadius={100}
                                        borderColor={"#0D9478"}
                                        type={"singleSelectBox"}
                                        onClickValue={() => handleOptionSelect(option, key1, key)}
                                        selectBackgroundColor={"#0D9478"}
                                        data={field.selectedValue == option.name ? true : option.check ? option.check : false}
                                        isDisabled={!field.isEditable}
                                    />
                                </View>
                                <Text style={{ color: "#5F5F5F", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: 10, flex: 0.9 }}>{option.name}</Text>
                            </View>
                        ))}
                    </View>
                    {/* {NextButton(field, key)} */}
                </React.Fragment>
            );
        } else if (field.type === 'trueFalse') {
            return (
                <React.Fragment key={key}>
                    {questionSec(field, key)}
                    <View style={{ marginTop: 30, marginHorizontal: 10, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <BigTextButton
                                text={"False"}
                                borderRadius={22}
                                backgroundColor={field.selectedValue == "No" ? "#0D9478" : "#fff"}
                                fontColor={"#000"}
                                fontSize={12}
                                height={42}
                                additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                                onPress={() => handleTrueFalseSelect("No", key)}
                                isDisabled={!field.isEditable}
                            />
                        </View>
                        <View style={{ width: 65 }} />
                        <View style={{ flex: 1 }}>
                            <BigTextButton
                                text={"True"}
                                borderRadius={22}
                                backgroundColor={field.selectedValue == "Yes" ? "#0D9478" : "#fff"}
                                fontColor={"#000"}
                                fontSize={12}
                                height={42}
                                additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                                onPress={() => handleTrueFalseSelect("Yes", key)}
                                isDisabled={!field.isEditable}
                            />
                        </View>
                    </View>
                    {/* {NextButton(field, key)} */}
                </React.Fragment>
            );
        } else if (field.type === 'singleCheck') {
            return (
                <React.Fragment key={key}>
                    {questionSec(field, key)}
                    <View style={{ marginTop: 30, marginHorizontal: 10 }}>
                        {field.options.map((option, key1) => (
                            <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'center' }}>
                                <View style={{ flex: 0.1 }}>
                                    <CheckBox
                                        borderWidth={1.5}
                                        width={22}
                                        height={22}
                                        borderColor={"#0D9478"}
                                        onClickValue={() => handleSingleCheckSelect(option, key1, key)}
                                        selectBackgroundColor={"#0D9478"}
                                        data={field.selectedValue == option.name ? true : option.check ? option.check : false}
                                        isDisabled={!field.isEditable}
                                    />
                                </View>
                                <Text style={{ color: "#5F5F5F", fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, marginLeft: 10, flex: 0.9 }}>{option.name}</Text>
                            </View>
                        ))}
                    </View>
                    {/* {NextButton(field, key)} */}
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    // for question view section
    const questionSec = (field, key) => {
        return (
            <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                <Text style={{ color: Color.COLOR.GRAY.DAVY_GRAY, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center' }}>{field.question}</Text>
            </View>
        )
    }

    // for next button
    const NextButton = (field, key) => {
        if (field.isEditable) {
            return (
                <View style={{ marginTop: 30, marginHorizontal: 20, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ flex: 1, marginLeft: 20 }}>
                        <BigTextButton
                            text={"Next"}
                            borderRadius={22}
                            backgroundColor={"#1F2B4D"}
                            fontSize={12}
                            height={42}
                            additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                            onPress={() => OnNext()}
                        />
                    </View>
                </View>
            )
        } else {
            return null;
        }
    }

    return (
        <React.Fragment>
            {loader ?
                <ActivityIndicator /> :
                <React.Fragment>
                    {formFields.map((field, key) => renderFormField(field, key))}
                </React.Fragment>
            }
        </React.Fragment>
    );
};


DynamicComponent.defaultProps = {
    isVisible: false,
    data: [],
    selectIndex: 0,
    onSubmitAnswer: () => { },
    onCheckAnswer: () => { },
    onTextInputAnswer: () => { }
};

DynamicComponent.propTypes = {
    isVisible: PropTypes.bool,
    data: PropTypes.array,
    selectIndex: PropTypes.number,
    onSubmitAnswer: PropTypes.func,
    onCheckAnswer: PropTypes.func,
    onTextInputAnswer: PropTypes.func
};


export default DynamicComponent;