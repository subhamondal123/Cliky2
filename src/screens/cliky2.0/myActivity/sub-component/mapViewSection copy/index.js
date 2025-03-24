import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './style';
import { DateConvert, GetUserData, Toaster } from '../../../../../services/common-view-function';
import { Color, Dimension, FontFamily, FontSize, ImageName } from '../../../../../enums';
// import Header from '../header1';
import DatePicker from 'react-native-date-picker';
import { FilterModal, NoDataFound, NormalLoader } from '../../../../../shared';
import ActivityProgress from '../../../../../pageShared/Cliky2/activityProgress';
import { MiddlewareCheck, StoreUserOtherInformations } from '../../../../../services/middleware';
import { CommonData, ErrorCode } from '../../../../../services/constant';
import Header from '../../../header/Header';
import SvgComponent from '../../../../../assets/svg';


let userCoOrdinate = [
    {
        latitude: 22.571280,
        longitude: 88.359828,
        title: "title1",
        description: "description1",
        eventTime: "2022-08-20T11:41:19.669Z"
    }, {
        latitude: 22.569933,
        longitude: 88.357328,
        title: "title2",
        description: "description2",
        eventTime: "2022-08-20T12:11:19.669Z"
    }, {
        latitude: 22.568920,
        longitude: 88.351177,
        title: "title3",
        description: "description3",
        eventTime: "2022-08-20T13:09:19.669Z"
    }, {
        latitude: 22.564955,
        longitude: 88.349255,
        title: "title4",
        description: "description4",
        eventTime: "2022-08-20T14:43:19.669Z"
    }, {
        latitude: 22.563894,
        longitude: 88.351323,
        title: "title5",
        description: "description5",
        eventTime: "2022-08-20T15:01:19.669Z"
    }, {
        latitude: 22.563894,
        longitude: 88.354542,
        title: "title6",
        description: "description6",
        eventTime: "2022-08-20T16:00:19.669Z"
    }, {
        latitude: 22.564062,
        longitude: 88.359692,
        title: "title7",
        description: "description7",
        eventTime: "2022-08-20T17:23:19.669Z"
    }
]


class ActivityInMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            filterVisibility: false,
            userLocationArr: this.props.data,
            locationAreaRegion: {
                latitude: 0.000,
                longitude: 0.000
            },
            polylineArr: [],

            startDate: DateConvert.viewDateFormat(new Date()),
            startDateCheck: false,
            startDateRaw: new Date(),

            endDate: "",
            endDateCheck: false,
            endDateRaw: new Date(),

            selectSubordinateId: ""
        }
    }

    // set the initial data
    _onSetInitialStateData = async () => {
        this.setState({
            startDate: DateConvert.viewDateFormat(new Date()),
            startDateCheck: false,
            startDateRaw: new Date(),

            endDate: "",
            endDateCheck: false,
            endDateRaw: new Date(),

            selectSubordinateId: ""
        })
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        this._getAvarageCoOrdinate(userCoOrdinate);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }


    // get avarage co ordinate
    _getAvarageCoOrdinate = (data) => {
        let polylineArr = [],
            sumOfLat = 0.00,
            sumOfLong = 0.00,
            locationAreaRegion = {
                latitude: 0.000,
                longitude: 0.000
            },
            k = 0;
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (k > (Object.keys(CommonData.ACTIVITY_COLOR).length) - 1) {
                    k = 0;
                }
                data[i].latitude = parseFloat(data[i].latitude);
                data[i].longitude = parseFloat(data[i].longitude);
                data[i].title = data[i].description;
                sumOfLat = sumOfLat + data[i].latitude;
                sumOfLong = sumOfLong + data[i].longitude;
                polylineArr.push({ latitude: data[i].latitude, longitude: data[i].longitude });
                data[i]["color"] = CommonData.ACTIVITY_COLOR[k].color;
                k++;
            }
            locationAreaRegion.latitude = data[data.length - 1].latitude;
            locationAreaRegion.longitude = data[data.length - 1].longitude;
        }
        this.setState({
            locationAreaRegion: locationAreaRegion,
            polylineArr: polylineArr,
            userLocationArr: data
        })
    }

    _onBeatRouteMarkers = () => {
        return (
            <React.Fragment>
                {this.state.userLocationArr.map((item, key) => (
                    <Marker
                        title={item.title}
                        description={item.description}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude
                        }}
                        pinColor={item.color}
                        key={key}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingHorizontal: 5, paddingVertical: 5, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
                                <SvgComponent svgName={"locationWithBGColor"} strokeColor={Color.COLOR.RED.AMARANTH} />
                            </View>
                            <View style={{ paddingHorizontal: 5, paddingVertical: 5, backgroundColor: Color.COLOR.WHITE.PURE_WHITE, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{DateConvert.viewTimeFormat(item.eventTime)}</Text>
                            </View>
                        </View>
                    </Marker>
                ))}
                <Polyline
                    coordinates={this.state.polylineArr}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={3}
                />
            </React.Fragment>
        )
    }


    _mapView = () => {
        if (this.state.userLocationArr && this.state.userLocationArr.length == 0) {
            return (
                <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
                    <NoDataFound />
                </View>
            );
        } else {
            return (
                <View style={styles.mapPortionView}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            ...this.state.locationAreaRegion,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,

                        }}
                        zoomControlEnabled
                    >
                        {this._onBeatRouteMarkers()}
                    </MapView>
                </View>
            )

        }
    }


    render() {
        return (
            <View style={styles.container}>
                {this._mapView()}
            </View>
        )
    }
}

export default (ActivityInMap);