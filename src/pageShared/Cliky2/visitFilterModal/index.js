import { PropTypes } from 'prop-types';
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { BottomModal } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { AllOrderHistoryFilter, CreatePjpListFilter, ManagerDashboardFilter, MessagesFilter, MyActivity, PjpListFilter, RouteVisitFilter, SalesHistory, TradeOutletListFilter, VisitHistoryFilter } from './subComponent';
import { PjpVisit } from '../../../screens/cliky2.0';

function VisitFilterModal({
    isHidden,
    isVisible,
    isLoading,
    type,
    data,
    onCloseModal,
    props,
    onFilter,
    onDataReset

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

    const swipeSuccess = () => {
        // this.props.onSuccessSwipe()
        props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'DrawerNav' }] }));
    }

    const onApply = (data) => {
        onCloseModal();
        onFilter(data);
    }

    const onResetModal = () => {
        onCloseModal();
        onDataReset()
    }


    return (
        <BottomModal
            isVisible={isVisible}
            // onRequestClose={() => onRequestCloseModal()}
            // onBackdropPress={() => onBackDropPressModal()}
            // onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.userPSec}>
                                <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#604d8b', borderRadius: 100 }}>
                                    <SvgComponent svgName={"filter"} strokeColor={"#fff"} height={22} width={22} />
                                </View>
                            </View>
                            <View style={styles.userTextSec}>
                                <Text style={styles.nameText}>Add Filter</Text>
                            </View>
                            <TouchableOpacity style={styles.dropdownSec} onPress={() => onCloseModal()} >
                                <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={15} width={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ maxHeight: 600 }}>
                            {props.route.name == "RouteVisit" ?
                                <RouteVisitFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} />
                                :
                                null
                            }
                            {props.route.name == "CreatePjp" ?
                                <CreatePjpListFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} />
                                :
                                null
                            }
                            {props.route.name == "PjpVisit" ?
                                <PjpListFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} />
                                :
                                null
                            }
                            {props.route.name == "VisitHistory" ?
                                <VisitHistoryFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} />
                                :
                                null
                            }
                            {props.route.name == "Messages" ?
                                <MessagesFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} />
                                :
                                null
                            }
                            {props.route.name == "MyActivity" ?
                                <MyActivity {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} /> :
                                null
                            }
                            {props.route.name == "TodaysOrderHistory" ?
                                <SalesHistory {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} /> :
                                null
                            }
                            {props.route.name == "VisitedStore" ?
                                <VisitHistoryFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} /> :
                                null
                            }
                            {props.route.name == "AllOrderHistoryList" ?
                                <AllOrderHistoryFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} /> :
                                null
                            }

                            {props.route.name == "ManagerDashboard" ?
                                <ManagerDashboardFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} /> :
                                null
                            }
                            {props.route.name == "OutletDetail" ?
                                <TradeOutletListFilter {...props} onFilterApply={(data) => onApply(data)} onFilterReset={() => onResetModal()} />
                                :
                                null
                            }

                            <View style={{ marginBottom: 40 }} />
                        </View>
                    </ View>
                </ View >
            }
        />

    )
}

VisitFilterModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: "",
    onCloseModal: () => { },
    onFilter: () => { },
    onDataReset: () => { }
}

VisitFilterModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.string,
    onCloseModal: PropTypes.func,
    onFilter: PropTypes.func,
    onDataReset: PropTypes.func,
}

export default VisitFilterModal;


// <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 25 }}>
//     <View style={{ flexDirection: 'row' }}>
//         <View style={{ flex: 1 }}>
//             <Text style={styles.filterLineText}>Customer Type</Text>
//         </View>
//         <View style={{ flex: 1, alignItems: 'flex-end' }}>
//             <Text style={{ textDecorationLine: 'underline', color: '#F13748' }}>Select All</Text>
//         </View>
//     </View>
//     <View style={{ borderWidth: .5, borderColor: '#AAB6BF', marginTop: 10 }} />
//     <View style={{ flexDirection: 'row', marginTop: 20 }}>
//         <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: '#DEEEFB' }}>
//             <View>
//                 <Text style={styles.visitedText}>Stockist</Text>
//             </View>
//         </View>
//         <View style={{ width: 20 }} />
//         <View style={{ borderRadius: 50, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: '#F0F4F7' }}>
//             <View>
//                 <Text style={styles.visitedText}>Distributor</Text>
//             </View>
//         </View>
//     </View>
//  <View style={{ flexDirection: 'row', marginTop: 60 }}>
//         <View style={{ flex: 1 }}>
//             <Text style={styles.filterLineText}>Secondary Customer</Text>
//         </View>
//         <View style={{ flex: 1, alignItems: 'flex-end' }}>
//             <Text style={{ textDecorationLine: 'underline', color: '#F13748' }}>Select All</Text>
//         </View>
//     </View>
//  <View style={{ borderWidth: .5, borderColor: '#AAB6BF', marginTop: 10 }} />
// <View style={{ flexDirection: 'row', marginTop: 20 }}>
//     <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: '#DEDEDE' }}>
//         <View>
//             <Text style={styles.visitedText}>Masson</Text>
//         </View>
//     </View>
//     <View style={{ width: 20 }} />
//     <View style={{ borderRadius: 50, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: '#DEDEDE' }}>
//         <View>
//             <Text style={styles.visitedText}>Engineer</Text>
//         </View>
//     </View>
//     <View style={{ width: 20 }} />
//     <View style={{ borderRadius: 50, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: '#DEDEDE' }}>
//         <View>
//             <Text style={styles.visitedText}>IHB</Text>
//         </View>
//     </View>
// </View>
//  <View style={{ flexDirection: 'row', marginTop: 60 }}>
//     <View style={{ flex: 1 }}>
//         <Text style={styles.filterLineText}>Visit Status</Text>
//     </View>
//     <View style={{ flex: 1, alignItems: 'flex-end' }}>
//         <Text style={{ textDecorationLine: 'underline', color: '#F13748' }}>Select All</Text>
//     </View>
// </View>
//    <View style={{ borderWidth: .5, borderColor: '#AAB6BF', marginTop: 10 }} />
//     <View style={{ flexDirection: 'row', marginTop: 20 }}>
//         <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, flexDirection: 'row', padding: 10, alignItems: 'center' }}>
//             <View style={{ backgroundColor: Color.COLOR.GREEN.LIGHT_GREEN, justifyContent: 'center', alignItems: 'center', height: 45, width: 45, borderRadius: 100 }}>
//                 <SvgComponent svgName={"tick"} strokeColor={"#fff"} height={20} width={20} />
//             </View>
//             <View>
//                 <Text style={styles.visitedBoxText}>Visited</Text>
//             </View>
//         </View>
//         <View style={{ width: 10 }} />
//         <View style={{ borderRadius: 50, borderColor: '#F13748', borderWidth: 1, flexDirection: 'row', padding: 10, alignItems: 'center' }}>
//             <View style={{ backgroundColor: Color.COLOR.RED.PURE_RED, justifyContent: 'center', alignItems: 'center', height: 45, width: 45, borderRadius: 100 }}>
//                 <SvgComponent svgName={"cross"} strokeColor={"#fff"} height={20} width={20} />
//             </View>
//             <View>
//                 <Text style={styles.visitedBoxText}>Cancelled</Text>
//             </View>
//         </View>
//     </View>
//     <View style={{ flexDirection: 'row', marginTop: 20 }}>
//         <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, flexDirection: 'row', padding: 10, alignItems: 'center' }}>
//             <View style={{ backgroundColor: "#f38119", justifyContent: 'center', alignItems: 'center', height: 45, width: 45, borderRadius: 100 }}>
//                 <SvgComponent svgName={"refresh"} strokeColor={"#fff"} height={20} width={20} />
//             </View>
//             <View>
//                 <Text style={styles.visitedBoxText}>Reschedule</Text>
//             </View>
//         </View>
//         <View style={{ width: 10 }} />
//         <View style={{ borderRadius: 50, borderColor: '#F13748', borderWidth: 1, flexDirection: 'row', padding: 10, alignItems: 'center' }}>
//             <View style={{ backgroundColor: "#4488a9", justifyContent: 'center', alignItems: 'center', height: 45, width: 45, borderRadius: 100 }}>
//                 <SvgComponent svgName={"3dBoxWithTick"} strokeColor={"#fff"} height={20} width={20} />
//             </View>
//             <View>
//                 <Text style={styles.visitedBoxText}>Converted</Text>
//             </View>
//         </View>
//     </View>

//  <View style={{ flexDirection: 'row', marginTop: 20 }}>
//     <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, flexDirection: 'row', padding: 10, alignItems: 'center' }}>
//         <View style={{ backgroundColor: "#aab6bf", justifyContent: 'center', alignItems: 'center', height: 45, width: 45, borderRadius: 100 }}>
//             <SvgComponent svgName={"tick"} strokeColor={"#fff"} height={20} width={20} />
//         </View>
//         <View>
//             <Text style={styles.visitedBoxText}>Pending</Text>
//         </View>
//     </View>
// </View>
// <View style={{ flexDirection: 'row', marginTop: 60 }}>
//     <View style={{ flex: 1 }}>
//         <Text style={styles.filterLineText}>Time Period</Text>
//     </View>
//     <View style={{ flex: 1, alignItems: 'flex-end' }}>
//         <Text style={{ textDecorationLine: 'underline', color: '#F13748' }}>Select All</Text>
//     </View>
// </View>
//  <View style={{ borderWidth: .5, borderColor: '#AAB6BF', marginTop: 10 }} />
// <ScrollView horizontal={true}
//     showsHorizontalScrollIndicator={false}
//     showsVerticalScrollIndicator={false}>
//     <View style={{ flexDirection: 'row', marginTop: 20 }}>
//         <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}>
//             <View>
//                 <Text style={styles.visitedText}>Last Month</Text>
//             </View>
//         </View>
//         <View style={{ width: 20 }} />
//         <View style={{ borderRadius: 50, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', borderColor: '#AAB6BF', borderWidth: 1, }}>
//             <View>
//                 <Text style={styles.visitedText}>Last Quarter</Text>
//             </View>
//         </View>
//         <View style={{ width: 20 }} />
//         <View style={{ borderRadius: 50, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', borderColor: '#AAB6BF', borderWidth: 1, }}>
//             <View>
//                 <Text style={styles.visitedText}>Last Year</Text>
//             </View>
//         </View>
//     </View>
// </ScrollView>
// <View style={{ marginTop: 20, alignItems: 'center' }}>
//     <Text style={styles.filterLineText}>or Select Date Range</Text>
// </View>
// <View style={{ flexDirection: 'row' }}>
//     <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
//         <View>
//             <SvgComponent svgName={"calender"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={20} width={20} />
//         </View>
//         <Text style={styles.canlenderText}>From Date</Text>
//     </View>
//     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
//         <View>
//             <SvgComponent svgName={"calender"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} height={20} width={20} />
//         </View>
//         <Text style={styles.canlenderText}>To Date</Text>
//     </View>
// </View>
// <View style={{ flexDirection: 'row', marginTop: 20 }}>
//     <View style={{ flex: 1 }}>
//         <TouchableOpacity onPress={() => onReset()} style={{ paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", justifyContent: "center", backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 25, borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 1 }}>
//             <Text style={styles.resetBtn}>Reset</Text>
//         </TouchableOpacity>
//     </View>
//     <View style={{ flex: 1 }} />
//     <View style={{ flex: 1 }}>
//         <TouchableOpacity onPress={() => onApply()} style={{ paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", justifyContent: "center", backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 25 }}>
//             <Text style={styles.applyBtnTxt}>Apply</Text>
//         </TouchableOpacity>

//     </View>
// </View>