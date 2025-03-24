import { PropTypes } from 'prop-types';
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./style";
import { BigTextButton, CheckBox, Modal } from "../../../shared";
import SvgComponent from "../../../assets/svg";
import { Color, FontFamily, FontSize, ImageName } from '../../../enums';
import DatePicker from 'react-native-date-picker';
import { DateConvert } from '../../../services/common-view-function';
import { Image } from 'react-native';

function LmsFilterModal({
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

    const [earnCheck, setEarnCheck] = useState(false);
    const [spendCheck, setSpendCheck] = useState(false);
    const [lockCheck, setLockCheck] = useState(false);
    const [unlockCheck, setUnlockCheck] = useState(false);

    const [thirtyDaysCheck, setThirtyDaysCheck] = useState(false);
    const [ninetyDaysCheck, setNinetyDaysCheck] = useState(false);
    const [sixtyDaysCheck, setSixtyDaysCheck] = useState(false);

    const [normalCheck, setNormalCheck] = useState(false);
    const [promotionalCheck, setPromotionalCheck] = useState(false);
    const [referalCheck, setReferalCheck] = useState(false);
    const [stockUpdateCheck, setstockUpdateCheck] = useState(false);

    const [adjustmentCheck, setAdjustmentCheck] = useState(false);
    const [dealerSpecialCheck, setDealerSpecialCheck] = useState(false);
    const [welcomeCheck, setWelcomeCheckCheck] = useState(false);
    const [firstLiftingCheck, setFirstliftingCheck] = useState(false);
    const [referanceCheck, setReferanceCheck] = useState(false);
    const [targetLiftingCheck, setTargetliftingCheck] = useState(false);
    const [stockPointsCheck, setStockPointsCheck] = useState(false);
    const [referralLiftingCheck, setReferralLiftingCheck] = useState(false);

    const [lastMonthCheck, setLastMonthCheck] = useState(false);
    const [lastNinetyDaysCheck, setLastNinetyDaysCheck] = useState(false);

    const [toDatePicker, setToDatePicker] = useState(false);
    const [toDateObj, setToDateObj] = useState({ rawDate: new Date(), toDate: "" });

    const [fromDatePicker, setFromDatePicker] = useState(false);
    const [fromDateObj, setFromDateObj] = useState({ rawDate: new Date(), fromDate: "" });




    const onRequestCloseModal = () => {
        onCloseModal();
    }

    const onBackDropPressModal = () => {
        onCloseModal();
    }

    const onBackButtonPressModal = () => {
        onCloseModal();
    }


    const onApply = () => {
        let filterData = {};
        filterData["fromDateObj"] = fromDateObj;
        filterData["toDateObj"] = toDateObj;
        filterData["earn"] = earnCheck;
        filterData["spendCheck"] = spendCheck;
        filterData["lockCheck"] = lockCheck;
        filterData["unlockCheck"] = unlockCheck;
        filterData["thirtyDaysCheck"] = thirtyDaysCheck;
        filterData["ninetyDaysCheck"] = ninetyDaysCheck;
        filterData["sixtyDaysCheck"] = sixtyDaysCheck;
        filterData["normalCheck"] = normalCheck;
        filterData["promotionalCheck"] = promotionalCheck;
        filterData["referalCheck"] = referalCheck;
        filterData["stockUpdateCheck"] = stockUpdateCheck;
        filterData["adjustmentCheck"] = adjustmentCheck;
        filterData["dealerSpecialCheck"] = dealerSpecialCheck;
        filterData["welcomeCheck"] = welcomeCheck;
        filterData["firstLiftingCheck"] = firstLiftingCheck;
        filterData["referanceCheck"] = referanceCheck;
        filterData["targetLiftingCheck"] = targetLiftingCheck;
        filterData["stockPointsCheck"] = stockPointsCheck;
        filterData["referralLiftingCheck"] = referralLiftingCheck;
        filterData["lastMonthCheck"] = lastMonthCheck;
        filterData["lastNinetyDaysCheck"] = lastNinetyDaysCheck;

        // onCloseModal();
        onFilter(filterData);
    }

    const onResetModal = () => {
        onCloseModal();
        onDataReset()
    }


    // for earn check box section 
    const earnCheckSec = () => {
        const onEarnCheck = () => {
            setEarnCheck(!earnCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={earnCheck}
                    onClickValue={() => onEarnCheck()}
                />
                <View style={{ width: 10 }} />
                <SvgComponent svgName={"greenDownArrow"} strokeColor={"#61C234"} height={12} width={12} />
                <View style={{ width: 10 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Earn</Text>
            </View>
        )
    }
    // for spend check box section
    const spendCheckSec = () => {
        const onSpendCheck = () => {
            setSpendCheck(!spendCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={spendCheck}
                    onClickValue={() => onSpendCheck()}
                />
                <View style={{ width: 10 }} />
                <SvgComponent svgName={"redUpArrow"} strokeColor={"#FF2E00"} height={12} width={12} />
                <View style={{ width: 10 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Spend</Text>
            </View>
        )
    }

    // for lock check box section
    const lockCheckSec = () => {
        const onLockCheck = () => {
            setLockCheck(!lockCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={lockCheck}
                    onClickValue={() => onLockCheck()}
                />
                <View style={{ width: 9 }} />
                <SvgComponent svgName={"blueLock"} strokeColor={"#172834"} height={14} width={14} />
                <View style={{ width: 10 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Lock</Text>
            </View>
        )
    }

    // for unlock check box section
    const UnlockCheckSec = () => {
        const onUnlockCheck = () => {
            setUnlockCheck(!unlockCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={unlockCheck}
                    onClickValue={() => onUnlockCheck()}
                />
                <View style={{ width: 9 }} />
                <SvgComponent svgName={"unlock"} strokeColor={"#61C234"} height={14} width={14} />
                <View style={{ width: 10 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}> Un Lock</Text>
            </View>
        )
    }
    // for thirty day check box section
    const thirtyDaysSec = () => {
        const onThirtyDaysCheck = () => {
            setThirtyDaysCheck(!thirtyDaysCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={thirtyDaysCheck}
                    onClickValue={() => onThirtyDaysCheck()}
                />
                <View style={{ width: 9 }} />
                <SvgComponent svgName={"stopwatch"} strokeColor={"#E3BF00"} height={15} width={15} />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>in 30 Days</Text>
            </View>
        )
    }
    // for ninety days checkbox section
    const ninetyDaysSec = () => {
        const onNinetyDaysCheck = () => {
            setNinetyDaysCheck(!ninetyDaysCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={ninetyDaysCheck}
                    onClickValue={() => onNinetyDaysCheck()}
                />
                <View style={{ width: 9 }} />
                <SvgComponent svgName={"stopwatch"} strokeColor={"#FF2E00"} height={15} width={15} />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>in 90 Days</Text>
            </View>
        )
    }
    // for sixty days checkbox section
    const sixtyDaysSec = () => {
        const onSixDaysCheck = () => {
            setSixtyDaysCheck(!sixtyDaysCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={sixtyDaysCheck}
                    onClickValue={() => onSixDaysCheck()}
                />
                <View style={{ width: 9 }} />
                <SvgComponent svgName={"stopwatch"} strokeColor={"#F26D22"} height={15} width={15} />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>in 60 Days</Text>
            </View>
        )
    }

    // for narmal check box
    const normalSec = () => {
        const onNormalCheck = () => {
            setNormalCheck(!normalCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={normalCheck}
                    onClickValue={() => onNormalCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Normal</Text>
            </View>
        )
    }

    // for promotional check box
    const promotionalSec = () => {
        const onPromotionalCheck = () => {
            setPromotionalCheck(!promotionalCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={promotionalCheck}
                    onClickValue={() => onPromotionalCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Promotional</Text>
            </View>
        )
    }

    // for Referal check box
    const referalSec = () => {
        const onReferalCheck = () => {
            setReferalCheck(!referalCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={referalCheck}
                    onClickValue={() => onReferalCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Referal</Text>
            </View>
        )
    }

    // for stock update check box
    const stockUpdateSec = () => {
        const onStockUpdateCheck = () => {
            setstockUpdateCheck(!stockUpdateCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={stockUpdateCheck}
                    onClickValue={() => onStockUpdateCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Stock Update</Text>
            </View>
        )
    }

    // for adjustment Enter check box
    const adjustmentEnterSec = () => {
        const onAdjustmentEnterCheck = () => {
            setAdjustmentCheck(!adjustmentCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={adjustmentCheck}
                    onClickValue={() => onAdjustmentEnterCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Adjustment Enter</Text>
            </View>
        )
    }

    // for Dealer Special check box
    const dealerSpecialSec = () => {
        const onDealerSpecialCheck = () => {
            setDealerSpecialCheck(!dealerSpecialCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={dealerSpecialCheck}
                    onClickValue={() => onDealerSpecialCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Dealer Special</Text>
            </View>
        )
    }

    // for welcome check box
    const welcomeSec = () => {
        const onwelcomeCheck = () => {
            setWelcomeCheckCheck(!welcomeCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={welcomeCheck}
                    onClickValue={() => onwelcomeCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Welcome</Text>
            </View>
        )
    }

    // for first lifting check box
    const firstLiftingSec = () => {
        const onfirstLiftCheck = () => {
            setFirstliftingCheck(!firstLiftingCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={firstLiftingCheck}
                    onClickValue={() => onfirstLiftCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>First Lifting</Text>
            </View>
        )
    }

    // for referance check box
    const referanceSec = () => {
        const onreferanceCheck = () => {
            setReferanceCheck(!referanceCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={referanceCheck}
                    onClickValue={() => onreferanceCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Referance</Text>
            </View>
        )
    }
    // for target lifting check box
    const targerLiftingSec = () => {
        const ontargetLiftingCheck = () => {
            setTargetliftingCheck(!targetLiftingCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={targetLiftingCheck}
                    onClickValue={() => ontargetLiftingCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Target Lifting</Text>
            </View>
        )
    }


    // for target lifting check box
    const pointsTypeStockSec = () => {
        const onPointsTypeStockCheck = () => {
            setStockPointsCheck(!stockPointsCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={stockPointsCheck}
                    onClickValue={() => onPointsTypeStockCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Stock Update</Text>
            </View>
        )
    }

    // for new referral check box
    const newReferralSec = () => {
        const onreferralLiftingCheck = () => {
            setReferralLiftingCheck(!referralLiftingCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    height={22}
                    width={22}
                    data={referralLiftingCheck}
                    onClickValue={() => onreferralLiftingCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>New Referral Lifting</Text>
            </View>
        )
    }

    // for last Month check box
    const lastMonthSec = () => {
        const onLastMonthCheck = () => {
            setLastMonthCheck(!lastMonthCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    borderRadius={100}
                    height={22}
                    width={22}
                    data={lastMonthCheck}
                    selectBackgroundColor={"#61C234"}
                    onClickValue={() => onLastMonthCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Last Month</Text>
            </View>
        )
    }


    // for last 90 days check box
    const lastNinetyDaysSec = () => {
        const onLastNinetyDaysCheck = () => {
            setLastNinetyDaysCheck(!lastNinetyDaysCheck)
        }
        return (
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <CheckBox
                    type={"select"}
                    borderRadius={100}
                    height={22}
                    width={22}
                    data={lastNinetyDaysCheck}
                    selectBackgroundColor={"#61C234"}
                    onClickValue={() => onLastNinetyDaysCheck()}
                />
                <View style={{ width: 8 }} />
                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.REGULAR }}>Last 90 Days</Text>
            </View>
        )
    }

    // for to date Section
    const toDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setToDatePicker(!toDatePicker);
        }
        const onSelectDate = (date) => {
            setToDateObj({
                toDate: DateConvert.viewDateFormat(date),
                rawDate: date
            });
            onOpenAndClosedatePicker();
        }
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, toDateObj.toDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{toDateObj.toDate.length == 0 ? "To" : toDateObj.toDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={toDatePicker}
                    date={toDateObj.rawDate}
                    mode={"date"}
                    minimumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}

                />
            </View>
        )
    }

    // for from date section
    const fromDateSection = () => {
        const onOpenAndClosedatePicker = () => {
            setFromDatePicker(!fromDatePicker);
        }
        const onSelectDate = (date) => {
            setFromDateObj({
                fromDate: DateConvert.viewDateFormat(date),
                rawDate: date
            });
            onOpenAndClosedatePicker();
        }

        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.inputBoxStyle} onPress={() => onOpenAndClosedatePicker()} activeOpacity={0.9}>
                    <Text style={[styles.inputBoxText, fromDateObj.fromDate.length == 0 ? { color: Color.COLOR.GRAY.GRAY_COLOR } : { color: Color.COLOR.BLACK.PURE_BLACK }]}>{fromDateObj.fromDate.length == 0 ? "From" : fromDateObj.fromDate}</Text>
                    <View style={{ marginRight: 21, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={ImageName.CALENDER_LOGO} />
                    </View>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={fromDatePicker}
                    date={fromDateObj.rawDate}
                    mode={"date"}
                    // maximumDate={new Date()}
                    onConfirm={(date) => {
                        onSelectDate(date)
                    }}
                    onCancel={() => {
                        onOpenAndClosedatePicker()
                    }}
                />
            </View>
        )
    }

    // for button design implement here
    const footerSec = () => {
        return (
            <View style={{ marginHorizontal: 15, flexDirection: 'row', marginTop: 15 }}>
                <BigTextButton
                    text={"Reset"}
                    fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                    fontSize={FontSize.SM}
                    fontColor={"#000"}
                    borderRadius={30}
                    isLinearGradient={true}
                    gradientColors={["#fff", "#dfdfdf"]}
                    additionalStyles={{ borderColor: "#000", borderWidth: 0.8 }}
                    onPress={() => this._onClassUpdate()}
                />
                <View style={{ width: 55 }} />
                <BigTextButton
                    isLinearGradient={true}
                    gradientColors={["#C5C91E", "#3AB500"]}
                    text={"Search"}
                    fontFamily={FontFamily.FONTS.POPPINS.MEDIUM}
                    fontSize={FontSize.SM}
                    borderRadius={30}
                    start={{ x: 1, y: 0.3 }}
                    end={{ x: 0.5, y: 1 }}
                    onPress={() => onApply()}
                />
            </View>
        )
    }


    return (
        <Modal
            isVisible={isVisible}
            onRequestClose={() => onRequestCloseModal()}
            onBackdropPress={() => onBackDropPressModal()}
            onBackButtonPress={() => onBackButtonPressModal()}
            children={
                <View style={styles.modalview}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                                <Text style={{ flex: 1, color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.SEMI_BOLD }}>Advance Search</Text>
                                <TouchableOpacity onPress={() => onBackButtonPressModal()} >
                                    <SvgComponent svgName={"cross"} strokeColor={"#000"} height={15} width={15} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginHorizontal: 13, marginTop: 10 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Points Type</Text>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {earnCheckSec()}
                                    {spendCheckSec()}
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {lockCheckSec()}
                                    {UnlockCheckSec()}
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 13, marginTop: 15 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Points Expire Time</Text>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {thirtyDaysSec()}
                                    {sixtyDaysSec()}
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {ninetyDaysSec()}
                                    <View style={{ flex: 1 }} />
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 13, marginTop: 15 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Points Category</Text>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {normalSec()}
                                    {promotionalSec()}
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {referalSec()}
                                    {stockUpdateSec()}
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 13, marginTop: 15 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Points Type</Text>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {adjustmentEnterSec()}
                                    {dealerSpecialSec()}
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {welcomeSec()}
                                    {firstLiftingSec()}
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {referanceSec()}
                                    {targerLiftingSec()}
                                </View>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {pointsTypeStockSec()}
                                    {newReferralSec()}
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 13, marginTop: 15 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Search by Duration</Text>
                                <View style={{ marginTop: 10, flexDirection: 'row' }}>
                                    {lastMonthSec()}
                                    {lastNinetyDaysSec()}
                                </View>
                            </View>
                            <View style={{ marginHorizontal: 13, marginTop: 15 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.SM, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>Search by Date Range</Text>
                                <View style={{ marginTop: 10, flexDirection: 'row', marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    {toDateSection()}
                                    <View style={{ width: 10 }} />
                                    {fromDateSection()}
                                </View>
                            </View>
                            {footerSec()}
                            <View style={{ marginBottom: 30 }} />
                        </ View>
                    </ScrollView>
                </ View>
            }
        />

    )
}

LmsFilterModal.defaultProps = {
    isHidden: false,
    isVisible: false,
    isLoading: false,
    type: "accept",
    data: "",
    onCloseModal: () => { },
    onFilter: () => { },
    onDataReset: () => { }
}

LmsFilterModal.propTypes = {
    isHidden: PropTypes.bool,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    data: PropTypes.string,
    onCloseModal: PropTypes.func,
    onFilter: PropTypes.func,
    onDataReset: PropTypes.func,
}

export default LmsFilterModal;

