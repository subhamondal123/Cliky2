var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase('cliky.db', '1.0', '', 1);


// for select all data from ITEM_LIST table data
export function selectAllITEM_LIST(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM ITEM_LIST WHERE leafLevel = 0', [],
                    (tx, results) => {
                        resolved(results);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};



// for select all data from ITEM_ATTRIBUTES table data
export function selectAllITEM_ATTRIBUTES(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM ITEM_ATTRIBUTES', [],
                    (tx, results) => {
                        resolved(results);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


// Outlet Section

// for select all data from OUTLET_LIST table data
export function selectAllOUTLET_LIST(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM OUTLET_LIST', [],
                    (tx, results) => {
                        resolved(results);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};





// for select all data from OUTLET_LIST by filter table data
export function selectOUTLET_LISTByFilter(data) {
    return new Promise(async function (resolved, reject) {
        try {
            var respArrData = [];
            let sql = "SELECT * FROM OUTLET_LIST ";
            if ((data.search !== undefined && data.search.length > 0) || (data.customer !== undefined && data.customer.length > 0)) {
                sql += " WHERE ";
            }
            if (data.search !== undefined && data.search.length > 0) {
                sql += " custBusinessName LIKE '%" + data.search + "%' OR contactTypeName LIKE '%" + data.search + "%' ";
            }
            if (data.customer !== undefined && data.customer.length > 0) {
                if (data.search !== undefined && data.search.length > 0) {
                    sql += " AND ";
                }
                sql += " contactTypeId IN (" + data.customer + ") ";
            }
            db.transaction(function (txn) {
                txn.executeSql(sql, [],
                    (tx, results) => {
                        for (let i = 0; i < results.rows.length; i++) {
                            let itemObj = results.rows.item(i);
                            respArrData.push(itemObj);
                        }
                        resolved(respArrData);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


// for select all data from SALES_REPORT_OUTLET table data
export function selectAllSALES_REPORT_OUTLET(data) {
    return new Promise(async function (resolved, reject) {
        try {
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM SALES_REPORT_OUTLET', [],
                    (tx, results) => {
                        resolved(results);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


// for select details show from SALES_REPORT_OUTLET table data
export function selectedSALES_REPORT_OUTLET(data) {
    return new Promise(async function (resolved, reject) {
        try {
            var respArrData = [];
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM SALES_REPORT_OUTLET WHERE customerId = "' + data.customerId + '"', [],
                    (tx, results) => {
                        for (let i = 0; i < results.rows.length; i++) {
                            let itemObj = results.rows.item(i);
                            respArrData.push(itemObj);
                        }
                        resolved(respArrData);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

// for get the item unit data for list
export function getAllITEM_UNIT(data) {
    return new Promise(async function (resolved, reject) {
        try {
            var respArrData = [];
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM ITEM_UNIT', [],
                    (tx, results) => {
                        for (let i = 0; i < results.rows.length; i++) {
                            let itemObj = results.rows.item(i);
                            respArrData.push(itemObj);
                        }
                        resolved(respArrData);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};

// for get the item data for list
export function getItemHierarchyData(data) {
    return new Promise(async function (resolved, reject) {
        try {
            let parentHMId = -1;
            let parentHMtypId = -1;
            if (data && data.hierarchyDataId) {
                parentHMId = data.hierarchyDataId;
            }
            if (data && data.hierarchyTypeId) {
                parentHMtypId = data.hierarchyTypeId;
            }
            var respArrData = [];
            db.transaction(function (txn) {
                txn.executeSql('SELECT * FROM ITEM_LIST WHERE parentHMId = "' + parentHMId + '" AND parentHMtypId = "' + parentHMtypId + '" AND leafLevel = 1', [],
                    (tx, results) => {
                        for (let i = 0; i < results.rows.length; i++) {
                            let itemObj = results.rows.item(i);
                            respArrData.push(itemObj);
                        }
                        resolved(respArrData);
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};



// for get the item data for list
export function getItemListData(data) {
    return new Promise(async function (resolved, reject) {
        try {
            let sql = "SELECT slNo, parentHMId, typeName, typeId, name, leafLevel, parentHMtypId, itemId FROM ITEM_LIST WHERE leafLevel = 0 ";
            if (data && data.hierarchyTypeId !== undefined && data.hierarchyTypeId !== null && data.hierarchyTypeId.length !== 0) {
                sql += ' AND parentHMtypId = "' + data.hierarchyTypeId + '" ';
            }
            if (data && data.hierarchyDataId !== undefined && data.hierarchyDataId !== null && data.hierarchyDataId.length !== 0) {
                sql += ' AND parentHMId = "' + data.hierarchyDataId + '" ';
            }
            if (data && data.search !== undefined && data.search !== null && data.search.length !== 0) {
                sql += ' AND name LIKE "%' + data.search + '%" ';
            }
            var respArrData = [];
            var countCheck = 0;
            db.transaction(function (txn) {
                txn.executeSql(sql, [],
                    async (tx, results1) => {
                        if (results1.rows.length == 0) {
                            results1 = await selectAllITEM_LIST();
                        }
                        for (let i = 0; i < results1.rows.length; i++) {
                            let itemObj = results1.rows.item(i);
                            db.transaction(function (txn) {
                                txn.executeSql('SELECT * FROM ITEM_ATTRIBUTES WHERE hierarchyDataId= "' + itemObj.itemId + '"', [],
                                    (tx, results2) => {
                                        let attributeObj = {};
                                        for (let j = 0; j < results2.rows.length; j++) {
                                            attributeObj[results2.rows.item(j).attributeTyesDesc] = results2.rows.item(j).attributeValue;
                                        }
                                        itemObj["productAttributes"] = attributeObj;
                                        countCheck++;
                                        respArrData.push(itemObj);
                                        if (results1.rows.length == countCheck) {
                                            resolved(respArrData);
                                        }
                                    })
                            });
                        }
                    })
            });
        } catch (err) {
            // resolved(err)
            console.log(err)
            reject(err)
        }
    });
};


