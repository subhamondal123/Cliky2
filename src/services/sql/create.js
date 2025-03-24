var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase('cliky.db', '1.0', '', 1);

export async function createAllTable() {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('CREATE TABLE IF NOT EXISTS ITEM_LIST(_id INTEGER PRIMARY KEY NOT NULL, itemId INTEGER(4), leafLevel INTEGER(4), name VARCHAR(100), parentHMId VARCHAR(4), parentHMtypId VARCHAR(4), slNo INTEGER(4), typeId INTEGER(4), typeName VARCHAR(60))', []);
                txn.executeSql('CREATE TABLE IF NOT EXISTS ITEM_ATTRIBUTES(_id INTEGER PRIMARY KEY NOT NULL, attributeDataValueId INTEGER(4), attributeTyesDesc VARCHAR(60), attributeValue VARCHAR(10), hierarchyAttributeTypId INTEGER(4), hierarchyDataId INTEGER(4))', []);
                txn.executeSql('CREATE TABLE IF NOT EXISTS ITEM_UNIT(_id INTEGER PRIMARY KEY NOT NULL, unitId INTEGER(4), unitName VARCHAR(60), unitShort VARCHAR(10))', []);
                txn.executeSql('CREATE TABLE IF NOT EXISTS OUTLET_LIST(_id INTEGER PRIMARY KEY NOT NULL, customerId INTEGER(4), organizationId INTEGER(4), isProject INTEGER(4), leadId INTEGER(4), opportunityId INTEGER(4),recordId VARCHAR(40), ERPCode VARCHAR(40), customerName VARCHAR(255), phoneNumber VARCHAR(20), email VARCHAR(255), custBusinessName VARCHAR(255), organizationName VARCHAR(255), ownerName VARCHAR(255), contactTypeId INTEGER(4), contactTypeName VARCHAR(255), partyCode VARCHAR(40), visitDate VARCHAR(40), pincode VARCHAR(10), createdAt VARCHAR(100), createdBy INTEGER(4), createdByUserName VARCHAR(255), approvedStatus VARCHAR(2), statusCheck VARCHAR(2), designationName VARCHAR(255), description TEXT, landmark VARCHAR(255), residentAddress VARCHAR(255), yrOfEstablmnt VARCHAR(255), godownLocation VARCHAR(255), godowncapacity_mt VARCHAR(2), appliedCreditlimit VARCHAR(2), advance VARCHAR(2), profilePic VARCHAR(255), primaryitem INTEGER(4), custTypeTyp INTEGER(4), customerAccessType INTEGER(4), address VARCHAR(255), market VARCHAR(255), isInfulencer INTEGER(4), userType VARCHAR(2))', []);
                txn.executeSql('CREATE TABLE IF NOT EXISTS SALES_REPORT_OUTLET(_id INTEGER PRIMARY KEY NOT NULL, MTD_totalOrderQty INTEGER(4), MTD_totalOrderValue INTEGER(4), lastFiveOrderAvgQty INTEGER(4), lastFiveOrderAvgValue INTEGER(4), lastFiveOrderLPC INTEGER(4), lastVisitDate VARCHAR(30), lastVisitDaysAgo INTEGER(4), lastOrderDate VARCHAR(30), lastOrderDaysAgo INTEGER(4), customerId INTEGER(4))', []);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};
