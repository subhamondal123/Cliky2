var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase('cliky.db', '1.0', '', 1);


// for get the data count for ITEM_ATTRIBUTES table data
export function getCountForITEM_ATTRIBUTES(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT COUNT(*) AS dataCount FROM ITEM_ATTRIBUTES', [],
                    (tx, results) => {
                        let count = { dataCount: 0 };
                        for (let i = 0; i < results.rows.length; i++) {
                            count.dataCount = results.rows.item(i).dataCount;
                        }
                        resolved(count);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

// for get the data count for ITEM_LIST table data
export function getCountForITEM_LIST(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT COUNT(*) AS dataCount FROM ITEM_LIST', [],
                    (tx, results) => {
                        let count = { dataCount: 0 };
                        for (let i = 0; i < results.rows.length; i++) {
                            count.dataCount = results.rows.item(i).dataCount;
                        }
                        resolved(count);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


// for get the data count for OUTLET_LIST table data
export function getCountForOUTLET_LIST(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT COUNT(*) AS dataCount FROM OUTLET_LIST', [],
                    (tx, results) => {
                        let count = { dataCount: 0 };
                        for (let i = 0; i < results.rows.length; i++) {
                            count.dataCount = results.rows.item(i).dataCount;
                        }
                        resolved(count);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


// for get the data count for SALES_REPORT_OUTLET table data
export function getCountForSALES_REPORT_OUTLET(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT COUNT(*) AS dataCount FROM SALES_REPORT_OUTLET', [],
                    (tx, results) => {
                        let count = { dataCount: 0 };
                        for (let i = 0; i < results.rows.length; i++) {
                            count.dataCount = results.rows.item(i).dataCount;
                        }
                        resolved(count);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


// for get the data count for ITEM_UNIT table
export function getCountForITEM_UNIT() {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT COUNT(*) AS dataCount FROM ITEM_UNIT', [],
                    (tx, results) => {
                        let count = { dataCount: 0 };
                        for (let i = 0; i < results.rows.length; i++) {
                            count.dataCount = results.rows.item(i).dataCount;
                        }
                        resolved(count);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
}