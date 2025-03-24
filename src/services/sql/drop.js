var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase('cliky.db', '1.0', '', 1);

// for drop all table
export async function dropAllTable(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('DROP TABLE IF EXISTS OUTLET_LIST', []);
                txn.executeSql('DROP TABLE IF EXISTS SALES_REPORT_OUTLET', []);
                txn.executeSql('DROP TABLE IF EXISTS ITEM_LIST', []);
                txn.executeSql('DROP TABLE IF EXISTS ITEM_ATTRIBUTES', []);
                txn.executeSql('DROP TABLE IF EXISTS ITEM_UNIT', []);

                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

// for drop OUTLET_LIST table
export async function dropOUTLET_LIST(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('DROP TABLE IF EXISTS OUTLET_LIST', []);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

// for drop SALES_REPORT_OUTLET table
export async function dropSALES_REPORT_OUTLET(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('DROP TABLE IF EXISTS SALES_REPORT_OUTLET', []);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};



// for drop ITEM_LIST table
export async function dropITEM_LIST(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('DROP TABLE IF EXISTS ITEM_LIST', []);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

// for drop ITEM_ATTRIBUTES table
export async function dropITEM_ATTRIBUTES(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('DROP TABLE IF EXISTS ITEM_ATTRIBUTES', []);
                resolved(true);
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};