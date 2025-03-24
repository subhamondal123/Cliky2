import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react'
import styles from './style';
import { Modal, Percentage_Bar, TextButton, ProfileModal } from '../';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import {
    AlertMessage,
    Color,
    Dimension,
    FontFamily,
    FontSize,
    ImageName,
    OtherSize
} from '../../enums';


function ListViewModal({
    modalPadding,
    isVisible,
    fontFamily,
    fontSize,
    color,
    type,
    data,
    isHidden,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    onCloseModal
}) {
    if (isHidden) return null;  //if isHidden is true then it show nothing

    const [profileModal, setProfileModal] = useState(false);
    const [userData, setUserData] = useState({});

    const _onClose = () => {
        onCloseModal(false);
    }

    const onRequestCloseModal = () => {
        onRequestClose();
    }

    const onBackDropPressModal = () => {
        onBackdropPress();
    }

    const onBackButtonPressModal = () => {
        onBackButtonPress();
    }

    const _onProfile = (type) => {
        setProfileModal(!profileModal)
        setUserData({
            imageUrl: ImageName.ADD_ICON,
            name: "sam",
            email: "sam@mail.com",
            phone: "9002000111",
            type: type
        })
    }

    const ViewListData = () => {

        return (
            <View style={{ maxHeight: Dimension.height / 2 }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Task Name</Text>
                        <Text style={styles.subText}>{data.taskName}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Due Date</Text>
                        <Text style={styles.subText}>{data.dueDate}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Assigned To</Text>
                        <Text style={styles.subText}>{data.assignToUser}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Contact Person</Text>
                        <Text style={styles.subText}>{data.contactPerson}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Phone</Text>
                        <Text style={styles.subText}>{data.phone}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Priority Status</Text>
                        <Text style={styles.subText}>{data.priorityName}</Text>
                        <View style={styles.underLine} />
                    </View>
                </ScrollView>
            </View>
        );
    }
    const ViewContactData = () => {
        return (
            <View style={{ maxHeight: Dimension.height / 2 }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Name</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => _onProfile()}><Text style={styles.subText}>{data.name}</Text></TouchableOpacity>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Phone</Text>
                        <Text style={styles.subText}>{data.Phone}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Email</Text>
                        <Text style={styles.subText}>{data.email}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Contact Type</Text>
                        <Text style={styles.subText}>{data.contactType}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Status</Text>
                        <Text style={styles.subText}>{data.status}</Text>
                        <View style={styles.underLine} />
                    </View>
                </ScrollView>
            </View>
        );
    }

    const ViewOrganizationData = () => {
        return (
            <View style={{ maxHeight: Dimension.height / 2 }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Organization Name</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => _onProfile()}><Text style={styles.subText}>{data.organizationName}</Text></TouchableOpacity>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Phone</Text>
                        <Text style={styles.subText}>{data.Phone}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Owner</Text>
                        <Text style={styles.subText}>{data.owner}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Contact Type</Text>
                        <Text style={styles.subText}>{data.contactType}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>state</Text>
                        <Text style={styles.subText}>{data.state}</Text>
                        <View style={styles.underLine} />
                    </View>
                </ScrollView>
            </View>
        );
    }
    const ViewLeadsData = () => {
        return (
            <View style={{ maxHeight: Dimension.height / 2 }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Name</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => _onProfile()}><Text style={styles.subText}>{data.name}</Text></TouchableOpacity>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Phone</Text>
                        <Text style={styles.subText}>{data.Phone}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Organization</Text>
                        <Text style={styles.subText}>{data.organization}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Title</Text>
                        <Text style={styles.subText}>{data.title}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Email</Text>
                        <Text style={styles.subText}>{data.email}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Lead Status</Text>
                        <Text style={styles.subText}>{data.status}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Lead Owner</Text>
                        <Text style={styles.subText}>{data.owner}</Text>
                        <View style={styles.underLine} />
                    </View>
                </ScrollView>
            </View>
        );
    }
    const ViewOpportunityData = () => {
        return (
            <View style={{ maxHeight: Dimension.height / 2 }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Opportunity Name</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => _onProfile()}><Text style={styles.subText}>{data.opportunityName}</Text></TouchableOpacity>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Phone</Text>
                        <Text style={styles.subText}>{data.Phone}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Organization</Text>
                        <Text style={styles.subText}>{data.organization}</Text>
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Opportunity Stage</Text>
                        {/* <Text style={styles.subText}>{data.email}</Text> */}
                        <Percentage_Bar
                            height={20}
                            backgroundColor={'grey'}
                            completedColor={'red'}
                            percentage={data.opportunityStage}
                        />
                        <View style={styles.underLine} />
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Expected Value</Text>
                        <Text style={styles.subText}>{data.expectedValue}</Text>

                        <View style={styles.underLine} />
                    </View>

                    <View style={{ marginTop: 10, marginHorizontal: "10%" }}>
                        <Text style={styles.headerText}>Contact Person</Text>
                        <Text style={styles.subText}>{data.contactPerson}</Text>
                        <View style={styles.underLine} />
                    </View>
                </ScrollView>
            </View>
        );
    }


    return (
        <SafeAreaView>
            {profileModal == false ? null : <ProfileModal
                isVisible={profileModal}
                onCloseModal={() => _onProfile()}
                data={userData}
                type="profile"
                onRequestClose={() => _onProfile()}
                onBackdropPress={() => _onProfile()}
                onBackButtonPress={() => _onProfile()}
            />}

            <Modal
                isVisible={isVisible}
                padding={modalPadding}
                onRequestClose={() => onRequestCloseModal()}
                onBackdropPress={() => onBackDropPressModal()}
                onBackButtonPress={() => onBackButtonPressModal()}
                children={
                    <View style={styles.modalview}>
                        {type == "task" ? <React.Fragment>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Task Info</Text>
                                    <TouchableOpacity style={styles.cancelSec}
                                        activeOpacity={0.8}
                                        onPress={() => _onClose()}  >
                                        <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            </View>
                            {ViewListData()}
                        </React.Fragment> : type == "contact" ? <React.Fragment>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Contact Info</Text>
                                    <TouchableOpacity style={styles.cancelSec}
                                        activeOpacity={0.8}
                                        onPress={() => _onClose()}  >
                                        <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            </View>
                            {ViewContactData()}
                        </React.Fragment> : type == "organization" ? <React.Fragment>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Organization Info</Text>
                                    <TouchableOpacity style={styles.cancelSec}
                                        activeOpacity={0.8}
                                        onPress={() => _onClose()}  >
                                        <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            </View>
                            {ViewOrganizationData()}
                        </React.Fragment> : type == "lead" ? <React.Fragment>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Leads Info</Text>
                                    <TouchableOpacity style={styles.cancelSec}
                                        activeOpacity={0.8}
                                        onPress={() => _onClose()}  >
                                        <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            </View>
                            {ViewLeadsData()}
                        </React.Fragment> : type == "opportunity" ? <React.Fragment>
                            <View style={styles.modalHeaderSec}>
                                <View style={styles.marginView}>
                                    <Text style={styles.profileNameText}>Opportunity Info</Text>
                                    <TouchableOpacity style={styles.cancelSec}
                                        activeOpacity={0.8}
                                        onPress={() => _onClose()}  >
                                        <Image source={ImageName.CROSS_IMG} style={styles.cancelImg} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: "10%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            </View>
                            {ViewOpportunityData()}
                        </React.Fragment> : null}
                    </View>
                }
            />
        </SafeAreaView>
    );
}


ListViewModal.defaultProps = {
    modalPadding: 0,
    isVisible: true,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.MD,
    color: Color.COLOR.WHITE.PURE_WHITE,
    isHidden: false,
    data: {},
    type: "",
    onCloseModal: () => { },
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
};

ListViewModal.propTypes = {
    modalPadding: PropTypes.number,
    isVisible: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    isHidden: PropTypes.bool,
    data: PropTypes.instanceOf(Object),
    type: PropTypes.string,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    onCloseModal: PropTypes.func
};
export default ListViewModal;