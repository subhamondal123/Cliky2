import { PropTypes } from 'prop-types';
import React from "react";
import {  View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Color, Dimension, FontFamily, FontSize } from "../../../enums";
import styles from "./style";
import { BottomModal, ImagePreview } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { TenDaysVisit, VisitCancel, VisitReschedule, VisitStatus } from './sub-component';
import { App_uri } from '../../../services/config';

const bottomOptions = [
    {
        id:1,
        name:"Add Expenses",
        svg:""
    }
]

function VisitModal({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onCloseModal,
    props,
    onSubmitVisitNote,
    onSubmitCancelVisit,
    onRescheduleVisit

}) {
    if (isHidden) return null;

    const onRequestCloseModal = () => {
        onCloseModal();
    }

    const onBackDropPressModal = () => {
        onCloseModal();
    }

    const onBackButtonPressModal = () => {
        onCloseModal();
    }

    const onSubmitNote = (val) => {
        onSubmitVisitNote(val)
    }

    const onSubmitCancel = (val) => {
        onSubmitCancelVisit(val)
    }

    const footerSec = () => {
        return (
            <View style={{ marginTop: 20,backgroundColor:"red" }}>
                {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                    <View style={{ borderTopColor: Color.COLOR.BLUE.LOTUS_BLUE, borderTopWidth: 0.6, borderBottomColor: Color.COLOR.BLUE.LOTUS_BLUE, borderBottomWidth: 0.6 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"locationAdd"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center' }}>Add Expenses</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"locationAdd"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center', marginLeft: 5 }}>Payment</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"hording"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center', marginLeft: 5 }}>Branding</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"grievance"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center', marginLeft: 5 }}>Grievances</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', width: Dimension.width / 5, borderRightWidth: 1, borderRightColor: Color.COLOR.GRAY.GRAY_COLOR, paddingVertical: 10 }}>
                                <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center' }}>
                                    <SvgComponent svgName={"contactId"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={18} width={18} />
                                    <Text style={{ color: Color.COLOR.GRAY.GRAY_COLOR, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, textAlign: 'center', marginLeft: 5 }}>Meeting</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ height: 5, width: 5, backgroundColor: 'red', borderRadius: 50, bottom: 5 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                {/* </ScrollView> */}
            </View>
        )
    }
    return (
        <BottomModal
            isVisible={isVisible}
            containerStyle={{justifyContent:"center",marginHorizontal:10}}
            // onRequestClose={() => onRequestCloseModal()}
            // onBackdropPress={() => onBackDropPressModal()}
            // onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={styles.userPSec}>
                            <ImagePreview source={{ uri: App_uri.IMAGE_URI + data.profilePic }} style={{ height: 45, width: 45, resizeMode: 'cover', borderRadius: 100 }} />
                        </View>
                        <View style={styles.userTextSec}>
                            <Text style={styles.nameText}>{data.custBusinessName ? data.custBusinessName : data.customerName}</Text>
                            <Text style={styles.dText}>{data.contactTypeName}</Text>
                        </View>
                        <TouchableOpacity style={styles.dropdownSec} onPress={() => onRequestCloseModal()} >
                            <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={15} width={15} />
                        </TouchableOpacity>
                    </View>
                    {type == "visitCancel" ?
                        <VisitCancel props={props} data={data} onSubmitCancelVisitData={(val) => onSubmitCancel(val)} />
                        :
                        null
                    }
                    {type == "visitStatus" ?
                        <VisitStatus props={props} data={data} onSubmitNote={(val) => onSubmitNote(val)} successLoader={isLoading} />
                        :
                        null
                    }
                    {type == "reschedule" ?
                        <VisitReschedule props={props} data={data} onVisitReschedule={(val) => onRescheduleVisit(val)} />
                        :
                        null
                    }
                    {type == "tenDaysVisit" ?
                        <TenDaysVisit props={props} data={data} /> :
                        null
                    }
                    {/* {footerSec()} */}
                    <View style={{ marginBottom: 18 }} />
                </View >
            }
        />

    )
}

VisitModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: {},
    onCloseModal: () => { },
    onSubmitVisitNote: () => { },
    onSubmitCancelVisit: () => { },
    onRescheduleVisit: () => { }
}

VisitModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.instanceOf(Object),
    onCloseModal: PropTypes.func,
    onSubmitVisitNote: PropTypes.func,
    onSubmitCancelVisit: PropTypes.func,
    onRescheduleVisit: PropTypes.func,

}

export default VisitModal;