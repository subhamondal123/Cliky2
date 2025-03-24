var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase('cliky.db', '1.0', '', 1);


// for insert the ITEM_LIST table data
export function insertITEM_LIST(data) {
    return new Promise(async function (resolved, reject) {
        try {
            {/*
                ======================  ITEM_LIST  =====================
            */}
            // console.log(">>>>????>>>ITEM_LIST>>>>>", data)
            db.transaction(function (txn) {
                txn.executeSql('INSERT INTO ITEM_LIST(itemId, leafLevel, name, parentHMId, parentHMtypId, slNo, typeId, typeName) VALUES (:itemId, :leafLevel, :name, :parentHMId, :parentHMtypId, :slNo, :typeId, :typeName)',
                    [data.id, data.leafLevel, data.name, data.parentHMId, data.parentHMtypId, data.slNo, data.typeId, data.typeName]);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


// for insert the ITEM_ATTRIBUTES table data
export function insertITEM_ATTRIBUTES(data) {
    return new Promise(async function (resolved, reject) {
        try {
            {/*
                ======================  ITEM_ATTRIBUTES  =====================
            */}
            // console.log(">>>>????>>>ITEM_ATTRIBUTES>>>>>", data)
            db.transaction(function (txn) {
                txn.executeSql('INSERT INTO ITEM_ATTRIBUTES(attributeDataValueId, attributeTyesDesc, attributeValue, hierarchyAttributeTypId, hierarchyDataId) VALUES (:attributeDataValueId, :attributeTyesDesc, :attributeValue, :hierarchyAttributeTypId, :hierarchyDataId)',
                    [data.attributeDataValueId, data.attributeTyesDesc, data.attributeValue, data.hierarchyAttributeTypId, data.hierarchyDataId]);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

// for insert the ITEM_UNIT table data
export function insertITEM_UNIT(data) {
    return new Promise(async function (resolved, reject) {
        try {
            {/*
    ====================== ITEM_UNIT =====================
    
   
    */}
            // console.log(">>>>????>>>ITEM_UNIT>>>>>", data)
            db.transaction(function (txn) {
                txn.executeSql('INSERT INTO ITEM_UNIT(unitId, unitName, unitShort) VALUES (:unitId, :unitName, :unitShort)',
                    [data.unitId, data.unitName, data.unitShort]);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

// for insert the OUTLET_LIST table data
export function insertOUTLET_LIST(data) {
    // console.log(">>>>>>>>:::::::uffffsfsfsfsf", JSON.stringify(data))
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('INSERT INTO OUTLET_LIST(customerId, organizationId , isProject, leadId , opportunityId,recordId, ERPCode, customerName , phoneNumber, email  , custBusinessName , organizationName , ownerName  , contactTypeId  , contactTypeName, partyCode , visitDate , pincode, createdAt , createdBy , createdByUserName  , approvedStatus , statusCheck , designationName  , description , landmark , residentAddress , yrOfEstablmnt , godownLocation , godowncapacity_mt , appliedCreditlimit , advance , profilePic , primaryitem  , custTypeTyp  , customerAccessType  , address, market , isInfulencer  , userType) VALUES (:customerId, :organizationId , :isProject, :leadId , :opportunityId, :recordId, :ERPCode, :customerName , :phoneNumber, :email  , :custBusinessName , :organizationName , :ownerName  , :contactTypeId  , :contactTypeName, :partyCode , :visitDate , :pincode, :createdAt , :createdBy , :createdByUserName  , :approvedStatus , :statusCheck , :designationName  , :description , :landmark , :residentAddress , :yrOfEstablmnt , :godownLocation , :godowncapacity_mt , :appliedCreditlimit , :advance , :profilePic , :primaryitem  , :custTypeTyp  , :customerAccessType  , :address, :market , :isInfulencer  , :userType)',
                    [data.customerId, data.organizationId, data.isProject, data.leadId, data.opportunityId, data.recordId, data.ERPCode, data.customerName, data.phoneNumber, data.email, data.custBusinessName, data.organizationName, data.ownerName, data.contactTypeId, data.contactTypeName, data.partyCode, data.visitDate, data.pincode, data.createdAt, data.createdBy, data.createdByUserName, data.approvedStatus, data.status, data.designationName, data.description, data.landmark, data.residentAddress, data.yrOfEstablmnt, data.godownLocation, data.godowncapacity_mt, data.appliedCreditlimit, data.advance, data.profilePic, data.primaryitem, data.custTypeTyp, data.customerAccessType, data.address, data.market, data.isInfulencer, data.name]);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


// for insert the SALES_REPORT_OUTLET table data
export function insertSALES_REPORT_OUTLET(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('INSERT INTO SALES_REPORT_OUTLET(MTD_totalOrderQty, MTD_totalOrderValue, lastFiveOrderAvgQty, lastFiveOrderAvgValue, lastFiveOrderLPC, lastVisitDate, lastVisitDaysAgo, lastOrderDate, lastOrderDaysAgo, customerId) VALUES (:MTD_totalOrderQty, :MTD_totalOrderValue, :lastFiveOrderAvgQty, :lastFiveOrderAvgValue, :lastFiveOrderLPC, :lastVisitDate, :lastVisitDaysAgo, :lastOrderDate, :lastOrderDaysAgo, :customerId)',
                    [data.MTD_totalOrderQty, data.MTD_totalOrderValue, data.lastFiveOrderAvgQty, data.lastFiveOrderAvgValue, data.lastFiveOrderLPC, data.lastVisitDate, data.lastVisitDaysAgo, data.lastOrderDate, data.lastOrderDaysAgo, data.customerId]);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};
