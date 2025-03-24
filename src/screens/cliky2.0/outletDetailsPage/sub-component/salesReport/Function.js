import { SelectSql } from "../../../../../services/sql";

export async function getSalesReportDataFromOffline(stateData, props) {
    let salesReportObj = await SelectSql.selectedSALES_REPORT_OUTLET({ customerId: props.route.params.item.id });
    if (salesReportObj) {
        if (salesReportObj.length > 0) {
            stateData.salesReportData = salesReportObj[0];
        } else {
            stateData.salesReportData = {}
        }
    }
    return stateData;
}