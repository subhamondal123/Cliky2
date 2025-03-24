import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import {
    Image,
    ImageBackground,
    TouchableOpacity,
    View,
} from 'react-native';
import { BigTextButton, Modal, TextInputBox } from '../../../shared';
import styles from './Style';
import { Text } from 'react-native';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../enums';
import SvgComponent from '../../../assets/svg';
import { App_uri } from '../../../services/config';
import { DataValidator } from '../../../validators';
import { Toaster } from '../../../services/common-view-function';

function EditDeleteModal({
    modalPadding,
    isVisible,
    isHidden,
    data,
    isLoading,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal,
    props,
    onDeleteItem,
    onDataSave,
    type
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    const [filterLoader, setFilterLoader] = useState(false);
    const [cbText, setCbText] = useState(data.inputStdUnit);
    const [pouText, setPouText] = useState(data.inputUnit);
    const [deleteEditShowHide, setDeleteEditShowHide] = useState(false);






    useEffect(() => {
    }, [])


    const onRequestCloseModal = () => {
        onCloseModal();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }

    const onCalculateProductRate = (data) => {
        let tempRate = 0;
        let validCheck = false;
        if (data.productAttributes.PTR) {
            tempRate = (parseFloat(data.productAttributes.PTR)).toFixed(2);
            validCheck = true;
        }
        // }
        return { rate: tempRate, validCheck: validCheck };
    }


    const onShowHide = () => {
        setDeleteEditShowHide(!deleteEditShowHide)
    }


    const onCbChange = (val) => {
        if (type == "closeingStock") {
            if (val > data.open_quantity_stdUnitWise) {
                Toaster.ShortCenterToaster("Closeing stock can not be more than Opening stock !")
            } else {
                let tempVal = 0;
                let tempUnit = data.inputUnit ? parseFloat(data.inputUnit) : 0;
                let tempItemAmount = 0;
                if (val.indexOf(".") >= 1) {
                    tempVal = val;
                    if (/\.(.+)/.test(val)) {
                        tempVal = parseFloat(tempVal).toFixed(2);
                    }
                } else if (val.indexOf(".") == 0) {
                    tempVal = 0
                }
                else {
                    tempVal = val;
                }
                if (val && val.length > 0) {
                    tempItemAmount = (parseFloat(tempVal) * parseFloat(data.productAttributes.StdUnitConversionFactor));
                } else {
                    tempItemAmount = 0;
                }
                data.quantity = (tempItemAmount + parseFloat(tempUnit));
                tempItemAmount = ((tempItemAmount + parseFloat(tempUnit)) * parseFloat((onCalculateProductRate(data)).rate)).toFixed(2);
                setCbText(DataValidator.inputEntryValidate(tempVal, "number"));
                data.totalAmount = tempItemAmount;
            }
        } else {
            let tempVal = 0;
            let tempUnit = data.inputUnit ? parseFloat(data.inputUnit) : 0;
            let tempItemAmount = 0;
            if (val.indexOf(".") >= 1) {
                tempVal = val;
                if (/\.(.+)/.test(val)) {
                    tempVal = parseFloat(tempVal).toFixed(2);
                }
            } else if (val.indexOf(".") == 0) {
                tempVal = 0
            }
            else {
                tempVal = val;
            }
            if (val && val.length > 0) {
                tempItemAmount = (parseFloat(tempVal) * parseFloat(data.productAttributes.StdUnitConversionFactor));
            } else {
                tempItemAmount = 0;
            }
            data.quantity = (tempItemAmount + parseFloat(tempUnit));
            tempItemAmount = ((tempItemAmount + parseFloat(tempUnit)) * parseFloat((onCalculateProductRate(data)).rate)).toFixed(2);
            setCbText(DataValidator.inputEntryValidate(tempVal, "number"));
            data.totalAmount = tempItemAmount;
        }

    }


    const onBotChange = (value) => {
        if (type == "closeingStock") {
            if (value > data.open_quantity_unitWise) {
                Toaster.ShortCenterToaster("Closeing stock can not be more than Opening stock !")
            } else {
                let tempVal = 0;
                let tempStdUnit = data.inputStdUnit ? parseFloat(data.inputStdUnit) : 0;
                let tempRate = data.inputRate ? parseFloat(data.inputRate) : 0;
                let tempItemAmount = 0;
                if (value.indexOf(".") >= 1) {
                    tempVal = value;
                    if (/\.(.+)/.test(value)) {
                        tempVal = parseFloat(tempVal).toFixed(2);
                    }
                } else if (value.indexOf(".") == 0) {
                    tempVal = 0
                }
                else {
                    tempVal = value;
                }
                if (data.rateCheck) {
                    tempItemAmount = (parseFloat(tempVal) * parseFloat(tempRate));
                    data.quantity = tempItemAmount;
                } else {
                    tempItemAmount = (parseFloat(cbText ? cbText : 0) * parseFloat(data.productAttributes.StdUnitConversionFactor));
                    if (value && value.length > 0) {
                        tempItemAmount = (tempItemAmount + parseFloat(tempVal));
                    } else {
                        tempItemAmount = (tempItemAmount + 0);
                    }
                    data.quantity = tempItemAmount;
                    tempItemAmount = (tempItemAmount * parseFloat((onCalculateProductRate(data)).rate)).toFixed(2);
                }

                // data.inputUnit = DataValidator.inputEntryValidate(tempVal, "number");;
                // setPouText(data.inputUnit);
                setPouText(DataValidator.inputEntryValidate(tempVal, "number"));
                data.totalAmount = tempItemAmount;
            }
        } else {
            let tempVal = 0;
            let tempStdUnit = data.inputStdUnit ? parseFloat(data.inputStdUnit) : 0;
            let tempRate = data.inputRate ? parseFloat(data.inputRate) : 0;
            let tempItemAmount = 0;
            if (value.indexOf(".") >= 1) {
                tempVal = value;
                if (/\.(.+)/.test(value)) {
                    tempVal = parseFloat(tempVal).toFixed(2);
                }
            } else if (value.indexOf(".") == 0) {
                tempVal = 0
            }
            else {
                tempVal = value;
            }
            if (data.rateCheck) {
                tempItemAmount = (parseFloat(tempVal) * parseFloat(tempRate));
                data.quantity = tempItemAmount;
            } else {
                tempItemAmount = (parseFloat(cbText ? cbText : 0) * parseFloat(data.productAttributes.StdUnitConversionFactor));
                if (value && value.length > 0) {
                    tempItemAmount = (tempItemAmount + parseFloat(tempVal));
                } else {
                    tempItemAmount = (tempItemAmount + 0);
                }
                data.quantity = tempItemAmount;
                tempItemAmount = (tempItemAmount * parseFloat((onCalculateProductRate(data)).rate)).toFixed(2);
            }

            // data.inputUnit = DataValidator.inputEntryValidate(tempVal, "number");;
            // setPouText(data.inputUnit);
            setPouText(DataValidator.inputEntryValidate(tempVal, "number"));
            data.totalAmount = tempItemAmount;
        }
    }

    const onDetele = (data) => {
        onDeleteItem(data);
        onCloseModal();
    }

    const _onSave = () => {
        if (data.totalAmount == 0.00) {
            Toaster.ShortCenterToaster("Please enter a non-zero value.")
        } else {
            data["inputStdUnit"] = cbText;
            data["inputUnit"] = pouText;
            data["totalAmount"] = data.totalAmount;
            onDataSave(data);
            onCloseModal();
        }
    }



    return (
        <Modal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => this.onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ marginHorizontal: '5%' }}>
                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.MD, marginRight: 10 }}>{data.productName}</Text>
                            </View>
                            <TouchableOpacity onPress={() => onRequestCloseModal()}>
                                <Image source={ImageName.WHITE_CROSS_IMG} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: '2%' }}>
                            {deleteEditShowHide ?
                                null :
                                <View style={{ marginTop: 8, flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: 110 }} onPress={() => onDetele(data)} activeOpacity={0.8}>
                                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                            <Image source={ImageName.DELETE_ICON_IMG} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                        </View>
                                        <View style={{ width: 10 }} />
                                        <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM, marginTop: 4 }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={{ borderWidth: 1, borderColor: '#000', marginTop: 10, borderStyle: "dotted" }} />
                            <TouchableOpacity style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }} onPress={() => onShowHide()} activeOpacity={0.8}>
                                <View style={{ justifyContent: "center", alignItems: 'center' }}>
                                    <Image source={ImageName.EDIT_ICON_IMG} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                </View>
                                <View style={{ width: 10 }} />
                                <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM, fontSize: FontSize.SM, marginTop: 4 }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        {deleteEditShowHide ?
                            <React.Fragment>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: '2%', marginTop: 10 }}>
                                    <View>
                                        <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>PTR  <Text style={{ color: '#747C90', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{data.productAttributes.PTR}</Text> </Text>
                                        <Text style={{ color: '#1F2B4D', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>MRP  <Text style={{ color: '#747C90', fontSize: 12, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>{data.productAttributes.MRP}</Text></Text>
                                    </View>
                                    <View style={{ width: 8 }} />
                                    <View style={{ flex: 1 }}>
                                        <TextInputBox
                                            placeholder={data.productAttributes.StdUnit}
                                            height={45}
                                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                            value={cbText}
                                            onChangeText={(value) => onCbChange(value)}
                                            keyboardType="number-pad"
                                            maxLength={6}
                                        />
                                    </View>
                                    <View style={{ width: 8 }} />
                                    <View style={{ flex: 1 }}>
                                        <TextInputBox
                                            placeholder={data.productAttributes.Unit}
                                            height={45}
                                            value={pouText}
                                            placeholderTextColor={Color.COLOR.GRAY.GRAY_COLOR}
                                            onChangeText={(value) => onBotChange(value)}
                                            keyboardType="number-pad"
                                            maxLength={6}
                                        />
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: '15%', marginTop: 25, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={{ padding: 8, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 18 }} onPress={() => onShowHide()} activeOpacity={0.8}>
                                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: 10 }} />
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={{ padding: 8, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderRadius: 18 }} onPress={() => _onSave()} activeOpacity={0.8}>
                                            <Text style={{ color: Color.COLOR.WHITE.PURE_WHITE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Save</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </React.Fragment> :
                            null
                        }
                        <View style={{ marginBottom: 30 }} />
                    </View>
                </ View>

            }
        />
    );
}

EditDeleteModal.defaultProps = {
    modalPadding: 0,
    isVisible: false,
    data: {},
    isHidden: false,
    isLoading: false,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    onCloseModal: () => { },
    onDeleteItem: () => { },
    onDataSave: () => { }


};

EditDeleteModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    isHidden: PropTypes.bool,
    isLoading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func,
    data: PropTypes.object,
    onDeleteItem: PropTypes.func,
    onDataSave: PropTypes.func
};


export default EditDeleteModal;