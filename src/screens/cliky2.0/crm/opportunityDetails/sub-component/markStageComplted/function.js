import { AlertMessage } from "../../../../../../enums";
import { Toaster } from "../../../../../../services/common-view-function";

export function validationCheck(value) {
    
    let errorCount = 0;
    let resObj = {
        status: false,

    }

    if (value) {
        if (value.selectedNextStage.id == undefined || value.selectedNextStage.id == null) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.NEXT_STAGE_ERROR)
            errorCount++
        }
        else if (value.amount == undefined || value.amount == null || value.amount.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.AMOUNT_ERROR)
            errorCount++
        }
        else if (value.probablityWining == undefined || value.probablityWining == null || value.probablityWining.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.PROBABLITY_OF_WINING)
            errorCount++
        }
        else if (value.expectedRevenue == undefined || value.expectedRevenue == null || value.expectedRevenue.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.EXPECTED_REVENUE)
            errorCount++
        }
        else if (value.startDate == undefined || value.startDate == null || value.startDate.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.EXPECTED_CLOSING_DATE)
            errorCount++
        }
        else if (value.followUpDate == undefined || value.followUpDate == null || value.followUpDate.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.FOLLOW_UP_DATE)
            errorCount++
        }

        // else if (value.proposalValue == undefined || value.proposalValue == null || value.proposalValue.length == 0) {
        //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.PROPOSAL_VALUE)
        // }
        // else if (value.proposalNumber == undefined || value.proposalNumber == null || value.proposalNumber.length == 0) {
        //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.FOLLOW_UP_DATE)
        // }
        else if (value.showHideCheck) {
            if (value.imgData.imgRaw == undefined || value.imgData.imgRaw == null || value.imgData.imgRaw.length == 0) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.PROPOSAL_IMAGE)
                errorCount++
            }
            else if (value.proposalSentDate == undefined || value.proposalSentDate == null || value.proposalSentDate.length == 0) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.PROPOSAL_SENT_DATE)
                errorCount++
            }
            else if (value.nextFollowUpDate == undefined || value.nextFollowUpDate == null || value.nextFollowUpDate.length == 0) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.NEXT_FOLLOWUP_DATE)
                errorCount++
            }
        }
        else if (value.mutuallyAgreedContactValue == undefined || value.mutuallyAgreedContactValue == null || value.mutuallyAgreedContactValue.length == 0) {
            Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.MUTUALLY_AGREED_CONTACT_VALUE)
            errorCount++
        }
        else if (value.closeWonOrLost) {
            if (value.closingAmount == undefined || value.closingAmount == null || value.closingAmount.length == 0) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.CLOSING_AMOUNT)
                errorCount++
            }
            else if (value.closingDate == undefined || value.closingDate == null || value.closingDate.length == 0) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.CLOSING_DATE)
                errorCount++
            }
            // else if (value.closingDescription == undefined || value.closingDescription == null || value.closingDescription.length == 0) {
            //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.NEXT_FOLLOWUP_DATE)
            // }
        }
        else if (!value.closeWonOrLost) {
            if (value.selectedReason.id == undefined || value.selectedReason.id == null) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.CLOSING_REASON)
                errorCount++
            }
            else if (value.closingDate == undefined || value.closingDate == null || value.closingDate.length == 0) {
                Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.CLOSING_DATE)
                errorCount++
            }
            // else if (value.closingDescription == undefined || value.closingDescription == null || value.closingDescription.length == 0) {
            //     Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.NEXT_FOLLOWUP_DATE)
            // }
        }





        if (errorCount == 0) {
            resObj.status = true
        }
    }
    return resObj;
}

// export function validUpdateMarkStage(value) {
//     let errorCount = 0;
//     let resObj = {
//         status: false,

//     }

//     if (value) {

//         if (value.proposalValue == undefined || value.proposalValue == null || value.proposalValue.length == 0) {
//             Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.PROPOSAL_VALUE)
//         }
//         else if (value.proposalNumber == undefined || value.proposalNumber == null || value.proposalNumber.length == 0) {
//             Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.PROPOSAL_NUMBER)
//         }
//         else if (value.proposalSentDate == undefined || value.proposalSentDate == null || value.proposalSentDate.length == 0) {
//             Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.PROPOSAL_SENT_DATE)
//         }
//         else if (value.nextFollowUpDate == undefined || value.nextFollowUpDate == null || value.nextFollowUpDate.length == 0) {
//             Toaster.ShortCenterToaster(AlertMessage.MESSAGE.MARK_STAGE_COMPLETED.NEXT_FOLLOWUP_DATE)
//         }




//         if (errorCount == 0) {
//             resObj.status = true
//         }
//     }
//     return resObj;
// }

export function modifyReasonList(arr) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["id"] = respArr[i].productId;
            respArr[i]["name"] = respArr[i].productName;
        }
    }
    return respArr;
}

export function modifyNextStageData(arr) {
    let respArr = [];
    if (arr) {
        respArr = arr;
        for (let i = 0; i < respArr.length; i++) {
            respArr[i]["id"] = respArr[i].salesStageId;
            respArr[i]["name"] = respArr[i].salesStageName;
        }
    }
    return respArr;
}
