import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
// import { CustomCalender } from '../../pageShared/custom-calender/';
import SvgComponent from '../../assets/svg';
import { Color, FontFamily, FontSize } from '../../enums';
import { CustomCalender } from '../../pageShared';
import { Header } from '../cliky2.0';

class MyCalendar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ""
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <View style={{flexDirection:'row', paddingVertical:10}}>
                    <TouchableOpacity style={{width:'10%'}}>
                        <SvgComponent svgName={"back"} strokeColor={Color.COLOR.BLUE.LOTUS_BLUE}/>
                    </TouchableOpacity>
                    <View style={{width:'90%'}}>
                        <Text style={{color:Color.COLOR.BLUE.LOTUS_BLUE,fontSize:FontSize.MD, fontFamily:FontFamily.FONTS.POPPINS.SEMI_BOLD}}>My Calendar</Text>
                    </View>
                </View> */}
                <Header onRefresh={() => console.log("")} {...this.props} />
                <CustomCalender data={[
                    {
                        "date": "2022-12-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 1674,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 AM",
                            "color": "#3F94BE",
                            "requestId": 750,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003145",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2022-12-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2022-12-28",
                        "time": "10:00 AM",
                        "data": {
                            "id": 1694,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 756,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003174",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2022-12-28",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2022-12-30",
                        "time": "6:22 PM",
                        "data": {
                            "id": 1704,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "6:22 PM",
                            "color": "#F8B200",
                            "requestId": 761,
                            "jobTypeId": 13,
                            "duration": "4 Hour",
                            "jobId": "003190",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2022-12-30",
                            "scheduleTime": "6:22 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-03",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1713,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 765,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003199",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-03",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-02",
                        "time": "11:00 AM",
                        "data": {
                            "id": 1721,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "11:00 AM",
                            "color": "#3F94BE",
                            "requestId": 766,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003201",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-01-02",
                            "scheduleTime": "11:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-02",
                        "time": "11:00 PM",
                        "data": {
                            "id": 1729,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:00 PM",
                            "color": "#F8B200",
                            "requestId": 767,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003203",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-02",
                            "scheduleTime": "11:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-03",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1731,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "9:00 AM",
                            "color": "#3F94BE",
                            "requestId": 770,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003210",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-03",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-04",
                        "time": "10:00 AM",
                        "data": {
                            "id": 1746,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 779,
                            "jobTypeId": 13,
                            "duration": "100 Hour",
                            "jobId": "003247",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-04",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-02",
                        "time": "7:48 PM",
                        "data": {
                            "id": 1755,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "7:48 PM",
                            "color": "#F8B200",
                            "requestId": 782,
                            "jobTypeId": 13,
                            "duration": "Minute 10",
                            "jobId": "003252",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-02",
                            "scheduleTime": "7:48 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-01-04",
                        "time": "10:10 AM",
                        "data": {
                            "id": 1761,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:10 AM",
                            "color": "#F8B200",
                            "requestId": 786,
                            "jobTypeId": 13,
                            "duration": "10 Day",
                            "jobId": "003267",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-01-04",
                            "scheduleTime": "10:10 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-07",
                        "time": "8:00 PM",
                        "data": {
                            "id": 1808,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 PM",
                            "color": "#993921",
                            "requestId": 838,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003411",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-07",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-11",
                        "time": "10:00 AM",
                        "data": {
                            "id": 1821,
                            "status": 5,
                            "name": "OFFER REJECTED",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 849,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003440",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-11",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-11",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1822,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 850,
                            "jobTypeId": 14,
                            "duration": "1 Hour",
                            "jobId": "003442",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-11",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-11",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1823,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 853,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003457",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-11",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-12",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1833,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 857,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003468",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-12",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-11",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1842,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 858,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003470",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-11",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-12",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1853,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "9:00 AM",
                            "color": "#3F94BE",
                            "requestId": 873,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003513",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-12",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-14",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1857,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "9:00 AM",
                            "color": "#3F94BE",
                            "requestId": 876,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003529",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-14",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-19",
                        "time": "10:00 AM",
                        "data": {
                            "id": 1877,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 896,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003613",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-19",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-19",
                        "time": "8:00 PM",
                        "data": {
                            "id": 1886,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 PM",
                            "color": "#F8B200",
                            "requestId": 898,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003617",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-19",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-19",
                        "time": "8:00 PM",
                        "data": {
                            "id": 1895,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 PM",
                            "color": "#F8B200",
                            "requestId": 900,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003621",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-19",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-19",
                        "time": "8:00 PM",
                        "data": {
                            "id": 1904,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 PM",
                            "color": "#F8B200",
                            "requestId": 901,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003623",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-19",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-19",
                        "time": "8:00 PM",
                        "data": {
                            "id": 1913,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 PM",
                            "color": "#F8B200",
                            "requestId": 902,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003625",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-19",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-23",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1941,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "9:00 AM",
                            "color": "#3F94BE",
                            "requestId": 919,
                            "jobTypeId": 14,
                            "duration": "1 Hour",
                            "jobId": "003666",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-23",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-24",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1962,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "9:00 AM",
                            "color": "#3F94BE",
                            "requestId": 943,
                            "jobTypeId": 14,
                            "duration": "1 Hour",
                            "jobId": "003733",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-24",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-27",
                        "time": "12:00 AM",
                        "data": {
                            "id": 1976,
                            "status": 5,
                            "name": "OFFER REJECTED",
                            "time": "12:00 AM",
                            "color": "#993921",
                            "requestId": 963,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "003793",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-27",
                            "scheduleTime": "12:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-01-27",
                        "time": "10:00 AM",
                        "data": {
                            "id": 1977,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "10:00 AM",
                            "color": "#3F94BE",
                            "requestId": 965,
                            "jobTypeId": 13,
                            "duration": "2 Hour",
                            "jobId": "003797",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-01-27",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-02-01",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1980,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "9:00 AM",
                            "color": "#3F94BE",
                            "requestId": 974,
                            "jobTypeId": 81,
                            "duration": "1 Hour",
                            "jobId": "003824",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-02-01",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-02-01",
                        "time": "9:00 AM",
                        "data": {
                            "id": 1981,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "9:00 AM",
                            "color": "#3F94BE",
                            "requestId": 975,
                            "jobTypeId": 79,
                            "duration": "1 Hour",
                            "jobId": "003826",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-02-01",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-02-16",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2014,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1025,
                            "jobTypeId": 77,
                            "duration": "1 Hour",
                            "jobId": "003964",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-02-16",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-02-17",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2017,
                            "status": 2,
                            "name": "ASSIGNED",
                            "time": "10:00 AM",
                            "color": "#f69ddb",
                            "requestId": 1028,
                            "jobTypeId": 79,
                            "duration": "1 Hour",
                            "jobId": "003973",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-02-17",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-02-17",
                        "time": "12:50 PM",
                        "data": {
                            "id": 2025,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:50 PM",
                            "color": "#F8B200",
                            "requestId": 1036,
                            "jobTypeId": 13,
                            "duration": "11 Hour",
                            "jobId": "003990",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-02-17",
                            "scheduleTime": "12:50 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-03-03",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2040,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1058,
                            "jobTypeId": 79,
                            "duration": "1 Hour",
                            "jobId": "004044",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-03-03",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-13",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2048,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1062,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004095",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-03-13",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-13",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2052,
                            "status": 3,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#fa8372",
                            "requestId": 1063,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004097",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-03-13",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-13",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2053,
                            "status": 3,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#fa8372",
                            "requestId": 1064,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004099",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-03-13",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-14",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2062,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 1072,
                            "jobTypeId": 77,
                            "duration": "1 Hour",
                            "jobId": "004118",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-03-14",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-15",
                        "time": "5:08 PM",
                        "data": {
                            "id": 2076,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "5:08 PM",
                            "color": "#F8B200",
                            "requestId": 1076,
                            "jobTypeId": 13,
                            "duration": "14 Hour",
                            "jobId": "004134",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-03-15",
                            "scheduleTime": "5:08 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-24",
                        "time": "11:00 AM",
                        "data": {
                            "id": 2096,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 AM",
                            "color": "#993921",
                            "requestId": 1077,
                            "jobTypeId": 13,
                            "duration": "14 Hour",
                            "jobId": "004138",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-03-24",
                            "scheduleTime": "11:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-16",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2102,
                            "status": 5,
                            "name": "OFFER REJECTED",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1078,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004140",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-03-16",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-16",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2106,
                            "status": 5,
                            "name": "OFFER REJECTED",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1081,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004146",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-03-16",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-03-16",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2108,
                            "status": 2,
                            "name": "ASSIGNED",
                            "time": "9:00 AM",
                            "color": "#f69ddb",
                            "requestId": 1083,
                            "jobTypeId": 14,
                            "duration": "1 Hour",
                            "jobId": "004150",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-03-16",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-07",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2126,
                            "status": 2,
                            "name": "ASSIGNED",
                            "time": "9:00 AM",
                            "color": "#f69ddb",
                            "requestId": 1115,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004234",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-07",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-10",
                        "time": "4:39 PM",
                        "data": {
                            "id": 2140,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "4:39 PM",
                            "color": "#993921",
                            "requestId": 1121,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004252",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-04-10",
                            "scheduleTime": "4:39 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-04-11",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2145,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 1126,
                            "jobTypeId": 77,
                            "duration": "1 Hour",
                            "jobId": "004263",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-11",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-20",
                        "time": "4:05 PM",
                        "data": {
                            "id": 2149,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "4:05 PM",
                            "color": "#3F94BE",
                            "requestId": 1130,
                            "jobTypeId": 13,
                            "duration": "2 Hour",
                            "jobId": "004274",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-20",
                            "scheduleTime": "4:05 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-28",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2158,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1128,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "004269",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-28",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-28",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2170,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1128,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "004269",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-28",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-28",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2182,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1128,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "004269",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-28",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-28",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2194,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1128,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "004269",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-28",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-28",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2206,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1128,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "004269",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-28",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-05",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2219,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1133,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "004292",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-05",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-04-28",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2222,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1134,
                            "jobTypeId": 13,
                            "duration": "6 Hour",
                            "jobId": "004296",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-04-28",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-01",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2254,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 PM",
                            "color": "#3F94BE",
                            "requestId": 1146,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "004334",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-01",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-01",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2255,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 PM",
                            "color": "#3F94BE",
                            "requestId": 1147,
                            "jobTypeId": 83,
                            "duration": "2 Hour",
                            "jobId": "004336",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-05-01",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-04",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2256,
                            "status": 2,
                            "name": "ASSIGNED",
                            "time": "8:00 PM",
                            "color": "#f69ddb",
                            "requestId": 1148,
                            "jobTypeId": 85,
                            "duration": "1 Hour",
                            "jobId": "004338",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-04",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-04",
                        "time": "3:52 PM",
                        "data": {
                            "id": 2264,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "3:52 PM",
                            "color": "#993921",
                            "requestId": 1157,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004367",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-04",
                            "scheduleTime": "3:52 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-05-12",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2269,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1159,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004382",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-12",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-08",
                        "time": "1:00 PM",
                        "data": {
                            "id": 2303,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "1:00 PM",
                            "color": "#F8B200",
                            "requestId": 1172,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004427",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-08",
                            "scheduleTime": "1:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-08",
                        "time": "1:15 PM",
                        "data": {
                            "id": 2313,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "1:15 PM",
                            "color": "#993921",
                            "requestId": 1173,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004429",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-08",
                            "scheduleTime": "1:15 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-08",
                        "time": "1:22 PM",
                        "data": {
                            "id": 2323,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "1:22 PM",
                            "color": "#F8B200",
                            "requestId": 1174,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004431",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-08",
                            "scheduleTime": "1:22 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-08",
                        "time": "1:36 PM",
                        "data": {
                            "id": 2337,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "1:36 PM",
                            "color": "#F8B200",
                            "requestId": 1176,
                            "jobTypeId": 13,
                            "duration": "9 Hour",
                            "jobId": "004435",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-08",
                            "scheduleTime": "1:36 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-05-08",
                        "time": "1:39 PM",
                        "data": {
                            "id": 2347,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "1:39 PM",
                            "color": "#F8B200",
                            "requestId": 1177,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004437",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-08",
                            "scheduleTime": "1:39 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-05-08",
                        "time": "2:42 PM",
                        "data": {
                            "id": 2357,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "2:42 PM",
                            "color": "#F8B200",
                            "requestId": 1180,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004443",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-08",
                            "scheduleTime": "2:42 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-05-08",
                        "time": "2:44 PM",
                        "data": {
                            "id": 2367,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "2:44 PM",
                            "color": "#F8B200",
                            "requestId": 1181,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004445",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-08",
                            "scheduleTime": "2:44 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-05-08",
                        "time": "3:06 PM",
                        "data": {
                            "id": 2377,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "3:06 PM",
                            "color": "#F8B200",
                            "requestId": 1182,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004447",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-08",
                            "scheduleTime": "3:06 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-09",
                        "time": "11:09 AM",
                        "data": {
                            "id": 2387,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:09 AM",
                            "color": "#F8B200",
                            "requestId": 1183,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004450",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-09",
                            "scheduleTime": "11:09 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-11",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2390,
                            "status": 3,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#fa8372",
                            "requestId": 1186,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "004462",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-11",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-11",
                        "time": "9:00 PM",
                        "data": {
                            "id": 2391,
                            "status": 3,
                            "name": "OFFER SENT",
                            "time": "9:00 PM",
                            "color": "#fa8372",
                            "requestId": 1188,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "004466",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-05-11",
                            "scheduleTime": "9:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2397,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1194,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004480",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-11",
                        "time": "12:07 PM",
                        "data": {
                            "id": 2414,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:07 PM",
                            "color": "#F8B200",
                            "requestId": 1197,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004488",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-05-11",
                            "scheduleTime": "12:07 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-26",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2426,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1198,
                            "jobTypeId": 81,
                            "duration": "11 Hour",
                            "jobId": "004491",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-26",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-13",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2427,
                            "status": 3,
                            "name": "OFFER SENT",
                            "time": "8:00 PM",
                            "color": "#fa8372",
                            "requestId": 1202,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "004499",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-05-13",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-15",
                        "time": "7:15 PM",
                        "data": {
                            "id": 2440,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "7:15 PM",
                            "color": "#993921",
                            "requestId": 1207,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004517",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-05-15",
                            "scheduleTime": "7:15 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-19",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2464,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1217,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "004549",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-19",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-22",
                        "time": "4:00 PM",
                        "data": {
                            "id": 2485,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "4:00 PM",
                            "color": "#993921",
                            "requestId": 1223,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "004576",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-22",
                            "scheduleTime": "4:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-23",
                        "time": "9:00 PM",
                        "data": {
                            "id": 2513,
                            "status": 3,
                            "name": "OFFER SENT",
                            "time": "9:00 PM",
                            "color": "#fa8372",
                            "requestId": 1234,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "004623",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-05-23",
                            "scheduleTime": "9:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-25",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2517,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 PM",
                            "color": "#3F94BE",
                            "requestId": 1238,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "004632",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-25",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-25",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2518,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 PM",
                            "color": "#3F94BE",
                            "requestId": 1239,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "004634",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-25",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-25",
                        "time": "9:00 PM",
                        "data": {
                            "id": 2525,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "9:00 PM",
                            "color": "#3F94BE",
                            "requestId": 1251,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "004671",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-25",
                            "scheduleTime": "9:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-26",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2538,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 PM",
                            "color": "#3F94BE",
                            "requestId": 1257,
                            "jobTypeId": 83,
                            "duration": "2 Hour",
                            "jobId": "004692",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-26",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-27",
                        "time": "10:00 AM",
                        "data": {
                            "id": 2543,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "10:00 AM",
                            "color": "#3F94BE",
                            "requestId": 1258,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "004702",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-27",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-05-31",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2563,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 PM",
                            "color": "#F8B200",
                            "requestId": 1275,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "004784",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-05-31",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-06-02",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2569,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1279,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "004798",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-06-02",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-06-06",
                        "time": "11:49 AM",
                        "data": {
                            "id": 2601,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "11:49 AM",
                            "color": "#3F94BE",
                            "requestId": 1304,
                            "jobTypeId": 82,
                            "duration": "1 Minute",
                            "jobId": "004874",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-06-06",
                            "scheduleTime": "11:49 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-06-08",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2619,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 PM",
                            "color": "#F8B200",
                            "requestId": 1325,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "004958",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-06-08",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-06-14",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2631,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1333,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "004994",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-06-14",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-06-14",
                        "time": "8:00 PM",
                        "data": {
                            "id": 2671,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 PM",
                            "color": "#3F94BE",
                            "requestId": 1345,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "005042",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-06-14",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-04",
                        "time": "11:30 AM",
                        "data": {
                            "id": 2697,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:30 AM",
                            "color": "#F8B200",
                            "requestId": 1359,
                            "jobTypeId": 13,
                            "duration": "2 Hour",
                            "jobId": "005127",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-07-04",
                            "scheduleTime": "11:30 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-20",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2711,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1397,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005213",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-20",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-22",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2721,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1427,
                            "jobTypeId": 82,
                            "duration": "4 Hour",
                            "jobId": "005280",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-22",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-26",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2728,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 1446,
                            "jobTypeId": 13,
                            "duration": "11 Hour",
                            "jobId": "005314",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-26",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-20",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2742,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1450,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005324",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-20",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2745,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1451,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005326",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2759,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1453,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "005330",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2773,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1453,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "005330",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-02",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2787,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1454,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005332",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-02",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-02",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2801,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1454,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005332",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-02",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2823,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1456,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005336",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-07-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-28",
                        "time": "9:00 AM",
                        "data": {
                            "id": 2832,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 1463,
                            "jobTypeId": 13,
                            "duration": "4 Hour",
                            "jobId": "005350",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-28",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "3:44 PM",
                        "data": {
                            "id": 2851,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "3:44 PM",
                            "color": "#F8B200",
                            "requestId": 1468,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "005364",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "3:44 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2871,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1471,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005372",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-28",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2882,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1478,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005411",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-28",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2896,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1479,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005413",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-28",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2909,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1481,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005417",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-07-28",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2911,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1482,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005419",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2925,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1482,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005419",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2947,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1485,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005425",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-18",
                        "time": "8:00 AM",
                        "data": {
                            "id": 2958,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1486,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005427",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-18",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-26",
                        "time": "4:33 PM",
                        "data": {
                            "id": 2963,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "4:33 PM",
                            "color": "#F8B200",
                            "requestId": 1497,
                            "jobTypeId": 82,
                            "duration": "2 Minute",
                            "jobId": "005455",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-26",
                            "scheduleTime": "4:33 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "4:35 PM",
                        "data": {
                            "id": 2979,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "4:35 PM",
                            "color": "#F8B200",
                            "requestId": 1498,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "005457",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "4:35 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-09",
                        "time": "4:43 PM",
                        "data": {
                            "id": 3002,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "4:43 PM",
                            "color": "#F8B200",
                            "requestId": 1499,
                            "jobTypeId": 82,
                            "duration": "5 Minute",
                            "jobId": "005459",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-09",
                            "scheduleTime": "4:43 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-15",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3011,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1510,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005481",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-15",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-26",
                        "time": "12:00 AM",
                        "data": {
                            "id": 3022,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:00 AM",
                            "color": "#F8B200",
                            "requestId": 1511,
                            "jobTypeId": 82,
                            "duration": "4 Minute",
                            "jobId": "005483",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-26",
                            "scheduleTime": "12:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3036,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1512,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005486",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3056,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1513,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005488",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3065,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1514,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005490",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3085,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1515,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005492",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3096,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1516,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005493",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-15",
                        "time": "10:00 AM",
                        "data": {
                            "id": 3103,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1519,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005502",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-15",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3117,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1521,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005506",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-26",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3124,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1525,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005514",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-26",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-20",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3139,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1527,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005518",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-20",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-26",
                        "time": "1:05 PM",
                        "data": {
                            "id": 3158,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "1:05 PM",
                            "color": "#F8B200",
                            "requestId": 1531,
                            "jobTypeId": 82,
                            "duration": "5 Minute",
                            "jobId": "005526",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-07-26",
                            "scheduleTime": "1:05 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-29",
                        "time": "9:00 AM",
                        "data": {
                            "id": 3167,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 1535,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005537",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-29",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-15",
                        "time": "9:00 AM",
                        "data": {
                            "id": 3171,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 1538,
                            "jobTypeId": 13,
                            "duration": "2 Hour",
                            "jobId": "005543",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-15",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-27",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3186,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1540,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005547",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-27",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-28",
                        "time": "12:00 AM",
                        "data": {
                            "id": 3201,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:00 AM",
                            "color": "#F8B200",
                            "requestId": 1541,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "005550",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-28",
                            "scheduleTime": "12:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-28",
                        "time": "4:33 PM",
                        "data": {
                            "id": 3217,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "4:33 PM",
                            "color": "#F8B200",
                            "requestId": 1545,
                            "jobTypeId": 82,
                            "duration": "4 Hour",
                            "jobId": "005558",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-28",
                            "scheduleTime": "4:33 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-02",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3232,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1544,
                            "jobTypeId": 13,
                            "duration": "11 Hour",
                            "jobId": "005556",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-02",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-02",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3238,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1544,
                            "jobTypeId": 13,
                            "duration": "11 Hour",
                            "jobId": "005556",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-02",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-02",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3246,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1554,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005576",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-02",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-07-31",
                        "time": "3:48 PM",
                        "data": {
                            "id": 3263,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "3:48 PM",
                            "color": "#F8B200",
                            "requestId": 1555,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "005578",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-07-31",
                            "scheduleTime": "3:48 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-07-31",
                        "time": "3:53 PM",
                        "data": {
                            "id": 3268,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "3:53 PM",
                            "color": "#F8B200",
                            "requestId": 1556,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "005580",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-07-31",
                            "scheduleTime": "3:53 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-07-31",
                        "time": "5:44 PM",
                        "data": {
                            "id": 3289,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "5:44 PM",
                            "color": "#F8B200",
                            "requestId": 1558,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "005584",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-07-31",
                            "scheduleTime": "5:44 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "9:00 AM",
                        "data": {
                            "id": 3304,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 1567,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "005605",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-26",
                        "time": "10:00 AM",
                        "data": {
                            "id": 3319,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1575,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "005621",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-26",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3338,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1581,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005636",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3352,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1581,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005636",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3366,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1586,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005650",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-02",
                        "time": "",
                        "data": {
                            "id": 3377,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "",
                            "color": "#F8B200",
                            "requestId": 1590,
                            "jobTypeId": 82,
                            "duration": "5 Minute",
                            "jobId": "005661",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-02",
                            "scheduleTime": "",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "10:00 AM",
                        "data": {
                            "id": 3399,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1598,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005678",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "12:00 AM",
                        "data": {
                            "id": 3407,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "12:00 AM",
                            "color": "#993921",
                            "requestId": 1611,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "005705",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "12:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3424,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1613,
                            "jobTypeId": 14,
                            "duration": "10 Hour",
                            "jobId": "005708",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3436,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1614,
                            "jobTypeId": 83,
                            "duration": "10 Hour",
                            "jobId": "005710",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3451,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1616,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "005714",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3462,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1617,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005734",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-03",
                        "time": "10:40 AM",
                        "data": {
                            "id": 3477,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:40 AM",
                            "color": "#993921",
                            "requestId": 1619,
                            "jobTypeId": 82,
                            "duration": "5 Minute",
                            "jobId": "005739",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-03",
                            "scheduleTime": "10:40 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "10:00 AM",
                        "data": {
                            "id": 3491,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1621,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005747",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-05",
                        "time": "10:00 AM",
                        "data": {
                            "id": 3503,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1622,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "005749",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-05",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "10:00 AM",
                        "data": {
                            "id": 3510,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1623,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005751",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-11",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3533,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1624,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "005753",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-11",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-15",
                        "time": "10:00 AM",
                        "data": {
                            "id": 3549,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1626,
                            "jobTypeId": 77,
                            "duration": "10 Hour",
                            "jobId": "005763",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-15",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "10:00 AM",
                        "data": {
                            "id": 3556,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1627,
                            "jobTypeId": 83,
                            "duration": "10 Hour",
                            "jobId": "005771",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-09",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3573,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1628,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005783",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-09",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-11",
                        "time": "1:00 PM",
                        "data": {
                            "id": 3593,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "1:00 PM",
                            "color": "#F8B200",
                            "requestId": 1599,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005681",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-11",
                            "scheduleTime": "1:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-11",
                        "time": "12:00 PM",
                        "data": {
                            "id": 3608,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:00 PM",
                            "color": "#F8B200",
                            "requestId": 1585,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005646",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-11",
                            "scheduleTime": "12:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "12:00 AM",
                        "data": {
                            "id": 3616,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "12:00 AM",
                            "color": "#993921",
                            "requestId": 1629,
                            "jobTypeId": 82,
                            "duration": "5 Hour",
                            "jobId": "005790",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "12:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3638,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1630,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005792",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "9:00 AM",
                        "data": {
                            "id": 3657,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1640,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005822",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-08",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3670,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1642,
                            "jobTypeId": 88,
                            "duration": "10 Hour",
                            "jobId": "005830",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-08",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "2:42 PM",
                        "data": {
                            "id": 3686,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "2:42 PM",
                            "color": "#F8B200",
                            "requestId": 1644,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "005841",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "2:42 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "2:46 PM",
                        "data": {
                            "id": 3697,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "2:46 PM",
                            "color": "#993921",
                            "requestId": 1645,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "005843",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "2:46 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-15",
                        "time": "9:00 AM",
                        "data": {
                            "id": 3711,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1647,
                            "jobTypeId": 82,
                            "duration": "1 Day",
                            "jobId": "005847",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-15",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3726,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1648,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005859",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-14",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3739,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1649,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "005861",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-14",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3752,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1650,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "005863",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "5:13 PM",
                        "data": {
                            "id": 3765,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "5:13 PM",
                            "color": "#F8B200",
                            "requestId": 1651,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "005866",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "5:13 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-15",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3778,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1652,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005868",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-15",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "9:00 AM",
                        "data": {
                            "id": 3787,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1653,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005870",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-04",
                        "time": "6:28 PM",
                        "data": {
                            "id": 3802,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "6:28 PM",
                            "color": "#F8B200",
                            "requestId": 1666,
                            "jobTypeId": 82,
                            "duration": "9 Hour",
                            "jobId": "005897",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-04",
                            "scheduleTime": "6:28 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-09",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3811,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1669,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "005903",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-09",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-06",
                        "time": "6:07 PM",
                        "data": {
                            "id": 3829,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "6:07 PM",
                            "color": "#F8B200",
                            "requestId": 1673,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "005911",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-09-06",
                            "scheduleTime": "6:07 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3842,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1674,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005913",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-15",
                        "time": "9:00 AM",
                        "data": {
                            "id": 3847,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1675,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005915",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-15",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-14",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3869,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1677,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005927",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-14",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3883,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1678,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "005929",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-07",
                        "time": "10:31 AM",
                        "data": {
                            "id": 3915,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:31 AM",
                            "color": "#F8B200",
                            "requestId": 1683,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "005941",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-07",
                            "scheduleTime": "10:31 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-07",
                        "time": "10:37 AM",
                        "data": {
                            "id": 3929,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:37 AM",
                            "color": "#F8B200",
                            "requestId": 1684,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "005943",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-07",
                            "scheduleTime": "10:37 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-07",
                        "time": "12:00 AM",
                        "data": {
                            "id": 3934,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:00 AM",
                            "color": "#F8B200",
                            "requestId": 1685,
                            "jobTypeId": 82,
                            "duration": "6 Minute",
                            "jobId": "005945",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-07",
                            "scheduleTime": "12:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-07",
                        "time": "10:54 AM",
                        "data": {
                            "id": 3955,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:54 AM",
                            "color": "#993921",
                            "requestId": 1686,
                            "jobTypeId": 82,
                            "duration": "6 Hour",
                            "jobId": "005947",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-07",
                            "scheduleTime": "10:54 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-07",
                        "time": "11:05 AM",
                        "data": {
                            "id": 3966,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:05 AM",
                            "color": "#993921",
                            "requestId": 1687,
                            "jobTypeId": 82,
                            "duration": "6 Minute",
                            "jobId": "005949",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-07",
                            "scheduleTime": "11:05 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-07",
                        "time": "11:09 AM",
                        "data": {
                            "id": 3977,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:09 AM",
                            "color": "#993921",
                            "requestId": 1688,
                            "jobTypeId": 82,
                            "duration": "6 Minute",
                            "jobId": "005952",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-07",
                            "scheduleTime": "11:09 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 3988,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1689,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005955",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4004,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1691,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005960",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-07",
                        "time": "11:47 AM",
                        "data": {
                            "id": 4008,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:47 AM",
                            "color": "#993921",
                            "requestId": 1692,
                            "jobTypeId": 82,
                            "duration": "6 Minute",
                            "jobId": "005962",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-07",
                            "scheduleTime": "11:47 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-07",
                        "time": "11:50 AM",
                        "data": {
                            "id": 4023,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:50 AM",
                            "color": "#993921",
                            "requestId": 1693,
                            "jobTypeId": 82,
                            "duration": "2 Minute",
                            "jobId": "005964",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-07",
                            "scheduleTime": "11:50 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "10:00 AM",
                        "data": {
                            "id": 4049,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1697,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "005979",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4068,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1700,
                            "jobTypeId": 13,
                            "duration": "2 Hour",
                            "jobId": "005986",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4079,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1701,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005988",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4089,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1702,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "005991",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "10:00 AM",
                        "data": {
                            "id": 4095,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1704,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006027",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4106,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1706,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006044",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4129,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1710,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006074",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-09",
                        "time": "10:00 AM",
                        "data": {
                            "id": 4135,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1713,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006080",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-09",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-15",
                        "time": "10:00 AM",
                        "data": {
                            "id": 4141,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1715,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006084",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-15",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "9:00 AM",
                        "data": {
                            "id": 4147,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1716,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006086",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4159,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1719,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006092",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-08",
                        "time": "11:13 AM",
                        "data": {
                            "id": 4181,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:13 AM",
                            "color": "#993921",
                            "requestId": 1720,
                            "jobTypeId": 82,
                            "duration": "4 Minute",
                            "jobId": "006094",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-08",
                            "scheduleTime": "11:13 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-08",
                        "time": "11:48 AM",
                        "data": {
                            "id": 4195,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:48 AM",
                            "color": "#993921",
                            "requestId": 1721,
                            "jobTypeId": 82,
                            "duration": "5 Minute",
                            "jobId": "006096",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-08",
                            "scheduleTime": "11:48 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-08",
                        "time": "11:59 AM",
                        "data": {
                            "id": 4210,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:59 AM",
                            "color": "#993921",
                            "requestId": 1722,
                            "jobTypeId": 82,
                            "duration": "5 Minute",
                            "jobId": "006111",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-08",
                            "scheduleTime": "11:59 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4220,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1725,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006121",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-08",
                        "time": "1:00 PM",
                        "data": {
                            "id": 4236,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "1:00 PM",
                            "color": "#993921",
                            "requestId": 1726,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006124",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-08",
                            "scheduleTime": "1:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4252,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1727,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006147",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-17",
                        "time": "10:00 AM",
                        "data": {
                            "id": 4267,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1729,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006151",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-17",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-09",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4277,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1730,
                            "jobTypeId": 14,
                            "duration": "1 Hour",
                            "jobId": "006162",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-09",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4284,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1733,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006170",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4290,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1734,
                            "jobTypeId": 88,
                            "duration": "10 Hour",
                            "jobId": "006172",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4298,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1735,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006174",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4314,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1736,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006176",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4328,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1737,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006178",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4346,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1738,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006180",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4360,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1739,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006182",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-28",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4376,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1740,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006184",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-28",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-28",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4392,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1741,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006186",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-28",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4409,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1742,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "006188",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4435,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1744,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "006206",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "11:00 AM",
                        "data": {
                            "id": 4453,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 AM",
                            "color": "#993921",
                            "requestId": 1746,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006227",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "11:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4468,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1747,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "006229",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-10",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4486,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1749,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "006244",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-10",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-13",
                        "time": "11:00 PM",
                        "data": {
                            "id": 4502,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 PM",
                            "color": "#993921",
                            "requestId": 1750,
                            "jobTypeId": 77,
                            "duration": "5 Hour",
                            "jobId": "006246",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-13",
                            "scheduleTime": "11:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4517,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1752,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006251",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4525,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1754,
                            "jobTypeId": 14,
                            "duration": "10 Hour",
                            "jobId": "006256",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "12:00 AM",
                        "data": {
                            "id": 4559,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "12:00 AM",
                            "color": "#993921",
                            "requestId": 1756,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006260",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "12:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-02",
                        "time": "10:00 AM",
                        "data": {
                            "id": 4565,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1757,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006262",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-02",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-06",
                        "time": "9:00 AM",
                        "data": {
                            "id": 4572,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "9:00 AM",
                            "color": "#F8B200",
                            "requestId": 1758,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006264",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-06",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-04",
                        "time": "9:00 AM",
                        "data": {
                            "id": 4578,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1759,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006266",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-04",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-07",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4584,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1760,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "006268",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-07",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4597,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1762,
                            "jobTypeId": 13,
                            "duration": "11 Hour",
                            "jobId": "006272",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4607,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1763,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "006274",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4619,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1764,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006276",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-11",
                        "time": "11:13 AM",
                        "data": {
                            "id": 4636,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:13 AM",
                            "color": "#993921",
                            "requestId": 1766,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "006280",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-11",
                            "scheduleTime": "11:13 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-11",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4645,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1768,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006284",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-11",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4650,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1769,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006286",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4663,
                            "status": 2,
                            "name": "ASSIGNED",
                            "time": "8:00 AM",
                            "color": "#f69ddb",
                            "requestId": 1770,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006288",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-15",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4668,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1772,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006292",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-15",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-11",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4671,
                            "status": 5,
                            "name": "OFFER REJECTED",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1774,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006296",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-11",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-11",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4673,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1775,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006299",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-11",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-17",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4681,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1776,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006301",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-17",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4694,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1777,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "006303",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-12",
                        "time": "12:08 AM",
                        "data": {
                            "id": 4706,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:08 AM",
                            "color": "#F8B200",
                            "requestId": 1779,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "006307",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-12",
                            "scheduleTime": "12:08 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-12",
                        "time": "1:18 AM",
                        "data": {
                            "id": 4720,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "1:18 AM",
                            "color": "#993921",
                            "requestId": 1780,
                            "jobTypeId": 82,
                            "duration": "4 Hour",
                            "jobId": "006309",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-12",
                            "scheduleTime": "1:18 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-02",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4734,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1783,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006317",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-02",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4741,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1787,
                            "jobTypeId": 85,
                            "duration": "1 Hour",
                            "jobId": "006327",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "8:00 AM",
                        "data": {
                            "id": 4769,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1788,
                            "jobTypeId": 83,
                            "duration": "10 Hour",
                            "jobId": "006329",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "10:19 AM",
                        "data": {
                            "id": 4797,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:19 AM",
                            "color": "#F8B200",
                            "requestId": 1794,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "006341",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "10:19 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "10:20 AM",
                        "data": {
                            "id": 4809,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:20 AM",
                            "color": "#F8B200",
                            "requestId": 1795,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "006343",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "10:20 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "12:08 AM",
                        "data": {
                            "id": 4836,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:08 AM",
                            "color": "#F8B200",
                            "requestId": 1796,
                            "jobTypeId": 82,
                            "duration": "6 Minute",
                            "jobId": "006345",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "12:08 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-16",
                        "time": "10:50 AM",
                        "data": {
                            "id": 4840,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:50 AM",
                            "color": "#F8B200",
                            "requestId": 1798,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "006350",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-16",
                            "scheduleTime": "10:50 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "10:54 AM",
                        "data": {
                            "id": 4855,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:54 AM",
                            "color": "#F8B200",
                            "requestId": 1799,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006352",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "10:54 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "11:01 AM",
                        "data": {
                            "id": 4873,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:01 AM",
                            "color": "#F8B200",
                            "requestId": 1800,
                            "jobTypeId": 82,
                            "duration": "5 Hour",
                            "jobId": "006354",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "11:01 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "11:06 AM",
                        "data": {
                            "id": 4884,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:06 AM",
                            "color": "#F8B200",
                            "requestId": 1801,
                            "jobTypeId": 82,
                            "duration": "6 Minute",
                            "jobId": "006356",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "11:06 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "11:11 AM",
                        "data": {
                            "id": 4897,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:11 AM",
                            "color": "#F8B200",
                            "requestId": 1802,
                            "jobTypeId": 82,
                            "duration": "3 Hour",
                            "jobId": "006358",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "11:11 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-23",
                        "time": "10:00 AM",
                        "data": {
                            "id": 4909,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1803,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006360",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-23",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "11:30 AM",
                        "data": {
                            "id": 4918,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:30 AM",
                            "color": "#F8B200",
                            "requestId": 1804,
                            "jobTypeId": 82,
                            "duration": "4 Hour",
                            "jobId": "006362",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "11:30 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "12:04 AM",
                        "data": {
                            "id": 4931,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:04 AM",
                            "color": "#F8B200",
                            "requestId": 1806,
                            "jobTypeId": 82,
                            "duration": "5 Day",
                            "jobId": "006366",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "12:04 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-17",
                        "time": "12:08 AM",
                        "data": {
                            "id": 4947,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:08 AM",
                            "color": "#F8B200",
                            "requestId": 1807,
                            "jobTypeId": 82,
                            "duration": "5 Minute",
                            "jobId": "006368",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-17",
                            "scheduleTime": "12:08 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-14",
                        "time": "11:00 AM",
                        "data": {
                            "id": 4959,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:00 AM",
                            "color": "#F8B200",
                            "requestId": 1808,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006370",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-14",
                            "scheduleTime": "11:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-13",
                        "time": "11:00 PM",
                        "data": {
                            "id": 4980,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:00 PM",
                            "color": "#F8B200",
                            "requestId": 1809,
                            "jobTypeId": 77,
                            "duration": "5 Hour",
                            "jobId": "006372",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-13",
                            "scheduleTime": "11:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-19",
                        "time": "11:00 PM",
                        "data": {
                            "id": 4996,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:00 PM",
                            "color": "#F8B200",
                            "requestId": 1810,
                            "jobTypeId": 77,
                            "duration": "5 Hour",
                            "jobId": "006374",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-19",
                            "scheduleTime": "11:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-16",
                        "time": "3:46 PM",
                        "data": {
                            "id": 5003,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "3:46 PM",
                            "color": "#993921",
                            "requestId": 1811,
                            "jobTypeId": 82,
                            "duration": "5 Hour",
                            "jobId": "006378",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-16",
                            "scheduleTime": "3:46 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5016,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1814,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006395",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-17",
                        "time": "11:40 AM",
                        "data": {
                            "id": 5026,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:40 AM",
                            "color": "#993921",
                            "requestId": 1815,
                            "jobTypeId": 82,
                            "duration": "6 Hour",
                            "jobId": "006400",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-17",
                            "scheduleTime": "11:40 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "10:00 AM",
                        "data": {
                            "id": 5040,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1816,
                            "jobTypeId": 14,
                            "duration": "2 Hour",
                            "jobId": "006403",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "11:47 AM",
                        "data": {
                            "id": 5065,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:47 AM",
                            "color": "#993921",
                            "requestId": 1818,
                            "jobTypeId": 88,
                            "duration": "2 Minute",
                            "jobId": "006423",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "11:47 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-09-22",
                        "time": "10:00 AM",
                        "data": {
                            "id": 5078,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1820,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "006427",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-22",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5096,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1821,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006431",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5115,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1823,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006437",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-13",
                        "time": "9:00 AM",
                        "data": {
                            "id": 5130,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1824,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "006439",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-09-13",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "8:00 PM",
                        "data": {
                            "id": 5145,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 PM",
                            "color": "#993921",
                            "requestId": 1825,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006441",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "8:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "2:45 PM",
                        "data": {
                            "id": 5158,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "2:45 PM",
                            "color": "#993921",
                            "requestId": 1826,
                            "jobTypeId": 82,
                            "duration": "5 Minute",
                            "jobId": "006443",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "2:45 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-18",
                        "time": "4:44 PM",
                        "data": {
                            "id": 5190,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "4:44 PM",
                            "color": "#993921",
                            "requestId": 1829,
                            "jobTypeId": 82,
                            "duration": "6 Minute",
                            "jobId": "006449",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-18",
                            "scheduleTime": "4:44 PM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "10:00 AM",
                        "data": {
                            "id": 5196,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1831,
                            "jobTypeId": 13,
                            "duration": "11 Hour",
                            "jobId": "006453",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-08",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5224,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1832,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006455",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-08",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-05",
                        "time": "9:00 AM",
                        "data": {
                            "id": 5239,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1833,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006457",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-05",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "10:00 AM",
                        "data": {
                            "id": 5256,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1834,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006459",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-21",
                        "time": "11:01 AM",
                        "data": {
                            "id": 5273,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:01 AM",
                            "color": "#993921",
                            "requestId": 1836,
                            "jobTypeId": 82,
                            "duration": "4 Hour",
                            "jobId": "006463",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-21",
                            "scheduleTime": "11:01 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "10:00 AM",
                        "data": {
                            "id": 5281,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "10:00 AM",
                            "color": "#F8B200",
                            "requestId": 1837,
                            "jobTypeId": 13,
                            "duration": "10 Hour",
                            "jobId": "006468",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5296,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1838,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006470",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5303,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1839,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006472",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5307,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1840,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006488",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-10-05",
                        "time": "10:00 AM",
                        "data": {
                            "id": 5316,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1841,
                            "jobTypeId": 14,
                            "duration": "10 Hour",
                            "jobId": "006490",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-10-05",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5323,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1842,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006492",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5327,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1843,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006494",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5334,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1844,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006496",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5364,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1856,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006520",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-15",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5377,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1857,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "006522",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-09-15",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5401,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1864,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006558",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "11:28 AM",
                        "data": {
                            "id": 5411,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "11:28 AM",
                            "color": "#3F94BE",
                            "requestId": 1866,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "006562",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "11:28 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-22",
                        "time": "11:52 AM",
                        "data": {
                            "id": 5415,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "11:52 AM",
                            "color": "#3F94BE",
                            "requestId": 1867,
                            "jobTypeId": 82,
                            "duration": "3 Minute",
                            "jobId": "006570",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-22",
                            "scheduleTime": "11:52 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "10:00 AM",
                        "data": {
                            "id": 5420,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1868,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006574",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-02",
                        "time": "11:00 AM",
                        "data": {
                            "id": 5431,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 AM",
                            "color": "#993921",
                            "requestId": 1869,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006576",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-02",
                            "scheduleTime": "11:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-14",
                        "time": "10:00 AM",
                        "data": {
                            "id": 5445,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1871,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "006581",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-09-14",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "9:00 AM",
                        "data": {
                            "id": 5460,
                            "status": 5,
                            "name": "OFFER REJECTED",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1873,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006593",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-15",
                        "time": "11:00 AM",
                        "data": {
                            "id": 5463,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 AM",
                            "color": "#993921",
                            "requestId": 1875,
                            "jobTypeId": 13,
                            "duration": "1 Hour",
                            "jobId": "006606",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-15",
                            "scheduleTime": "11:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-07",
                        "time": "9:00 AM",
                        "data": {
                            "id": 5485,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1876,
                            "jobTypeId": 14,
                            "duration": "1 Hour",
                            "jobId": "006608",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-07",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-14",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5502,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1920,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006726",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-09-14",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-14",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5507,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1921,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006729",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-14",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5522,
                            "status": 2,
                            "name": "ASSIGNED",
                            "time": "8:00 AM",
                            "color": "#f69ddb",
                            "requestId": 1923,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006735",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-14",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5528,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 AM",
                            "color": "#3F94BE",
                            "requestId": 1924,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006737",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-14",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "11:04 AM",
                        "data": {
                            "id": 5555,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:04 AM",
                            "color": "#F8B200",
                            "requestId": 1928,
                            "jobTypeId": 14,
                            "duration": "5 Hour",
                            "jobId": "006746",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "11:04 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5561,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1930,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006781",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5562,
                            "status": 2,
                            "name": "ASSIGNED",
                            "time": "8:00 AM",
                            "color": "#f69ddb",
                            "requestId": 1931,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006784",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "11:51 AM",
                        "data": {
                            "id": 5574,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:51 AM",
                            "color": "#F8B200",
                            "requestId": 1932,
                            "jobTypeId": 83,
                            "duration": "1 Hour",
                            "jobId": "006786",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "11:51 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "11:58 AM",
                        "data": {
                            "id": 5587,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "11:58 AM",
                            "color": "#F8B200",
                            "requestId": 1933,
                            "jobTypeId": 14,
                            "duration": "10 Hour",
                            "jobId": "006788",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "11:58 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "12:00 PM",
                        "data": {
                            "id": 5604,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:00 PM",
                            "color": "#F8B200",
                            "requestId": 1935,
                            "jobTypeId": 82,
                            "duration": "5 Hour",
                            "jobId": "006797",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "12:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "12:15 PM",
                        "data": {
                            "id": 5641,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:15 PM",
                            "color": "#F8B200",
                            "requestId": 1940,
                            "jobTypeId": 88,
                            "duration": "1 Hour",
                            "jobId": "006810",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "12:15 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "12:25 PM",
                        "data": {
                            "id": 5656,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "12:25 PM",
                            "color": "#F8B200",
                            "requestId": 1942,
                            "jobTypeId": 77,
                            "duration": "10 Hour",
                            "jobId": "006821",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "12:25 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "12:30 PM",
                        "data": {
                            "id": 5666,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "12:30 PM",
                            "color": "#993921",
                            "requestId": 1943,
                            "jobTypeId": 77,
                            "duration": "1 Hour",
                            "jobId": "006823",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "12:30 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-14",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5672,
                            "status": 4,
                            "name": "OFFER ACCEPTED",
                            "time": "8:00 AM",
                            "color": "#3F94BE",
                            "requestId": 1944,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006828",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-14",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "11:00 PM",
                        "data": {
                            "id": 5681,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 PM",
                            "color": "#993921",
                            "requestId": 1946,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006866",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "11:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5690,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1947,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006876",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5703,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1948,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006884",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "11:00 PM",
                        "data": {
                            "id": 5712,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 PM",
                            "color": "#993921",
                            "requestId": 1949,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "006886",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "11:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "11:00 PM",
                        "data": {
                            "id": 5717,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 PM",
                            "color": "#993921",
                            "requestId": 1950,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006888",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "11:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "6:21 PM",
                        "data": {
                            "id": 5730,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "6:21 PM",
                            "color": "#993921",
                            "requestId": 1951,
                            "jobTypeId": 82,
                            "duration": "120 Minute",
                            "jobId": "006890",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "6:21 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-23",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5735,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1952,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006940",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-23",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5748,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1953,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006942",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5753,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1954,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006944",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5766,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1955,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006946",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5775,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1956,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "006948",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-25",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5784,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1957,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "007129",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-25",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "11:20 AM",
                        "data": {
                            "id": 5806,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:20 AM",
                            "color": "#993921",
                            "requestId": 1960,
                            "jobTypeId": 82,
                            "duration": "7 Minute",
                            "jobId": "007142",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 67,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "11:20 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5815,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1961,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "007145",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "11:30 AM",
                        "data": {
                            "id": 5828,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:30 AM",
                            "color": "#993921",
                            "requestId": 1962,
                            "jobTypeId": 82,
                            "duration": "6 Minute",
                            "jobId": "007147",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 66,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "11:30 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-24",
                        "time": "11:39 AM",
                        "data": {
                            "id": 5842,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:39 AM",
                            "color": "#993921",
                            "requestId": 1963,
                            "jobTypeId": 82,
                            "duration": "10 Minute",
                            "jobId": "007161",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-24",
                            "scheduleTime": "11:39 AM",
                            "positionCheck": 1
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "11:00 PM",
                        "data": {
                            "id": 5853,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "11:00 PM",
                            "color": "#993921",
                            "requestId": 1964,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "007163",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "11:00 PM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-27",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5866,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1965,
                            "jobTypeId": 82,
                            "duration": "4 Hour",
                            "jobId": "007188",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-27",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5875,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1966,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007213",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5880,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1967,
                            "jobTypeId": 82,
                            "duration": "4 Hour",
                            "jobId": "007226",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5889,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1968,
                            "jobTypeId": 82,
                            "duration": "4 Hour",
                            "jobId": "007233",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-30",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5902,
                            "status": 0,
                            "name": "OFFER SENT",
                            "time": "8:00 AM",
                            "color": "#F8B200",
                            "requestId": 1969,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007290",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-30",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5911,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1970,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007292",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5920,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1971,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "007318",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5929,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1973,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007347",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5948,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1975,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007351",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-21",
                        "time": "9:00 AM",
                        "data": {
                            "id": 5957,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1976,
                            "jobTypeId": 13,
                            "duration": "2 Hour",
                            "jobId": "007353",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-09-21",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5976,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1978,
                            "jobTypeId": 82,
                            "duration": "2 Hour",
                            "jobId": "007358",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5985,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1979,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007360",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 5994,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1980,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007362",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "8:00 AM",
                        "data": {
                            "id": 6007,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1982,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007366",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "9:00 AM",
                        "data": {
                            "id": 6016,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1983,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007368",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "9:00 AM",
                        "data": {
                            "id": 6025,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "9:00 AM",
                            "color": "#993921",
                            "requestId": 1984,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007370",
                            "appointmentTypeName": "F2F",
                            "appointmentType": 63,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "9:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "10:00 AM",
                        "data": {
                            "id": 6034,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1985,
                            "jobTypeId": 82,
                            "duration": "1 Hour",
                            "jobId": "007372",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-31",
                        "time": "10:00 AM",
                        "data": {
                            "id": 6044,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1986,
                            "jobTypeId": 84,
                            "duration": "10 Hour",
                            "jobId": "007376",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-31",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-09-01",
                        "time": "8:00 AM",
                        "data": {
                            "id": 6049,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "8:00 AM",
                            "color": "#993921",
                            "requestId": 1987,
                            "jobTypeId": 83,
                            "duration": "2 Hour",
                            "jobId": "007378",
                            "appointmentTypeName": "OPI",
                            "appointmentType": 65,
                            "scheduleDate": "2023-09-01",
                            "scheduleTime": "8:00 AM",
                            "positionCheck": 0
                        }
                    },
                    {
                        "date": "2023-08-26",
                        "time": "10:00 AM",
                        "data": {
                            "id": 6054,
                            "status": 7,
                            "name": "INACTIVE",
                            "time": "10:00 AM",
                            "color": "#993921",
                            "requestId": 1988,
                            "jobTypeId": 13,
                            "duration": "3 Hour",
                            "jobId": "007380",
                            "appointmentTypeName": "VRI",
                            "appointmentType": 64,
                            "scheduleDate": "2023-08-26",
                            "scheduleTime": "10:00 AM",
                            "positionCheck": 0
                        }
                    }
                ]} />
            </SafeAreaView>
        )
    }
}


export default MyCalendar;