import { Text, View } from 'react-native'
import React, { Component } from 'react'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './style';
import { DateConvert, LocationData } from '../../../../../services/common-view-function';
import { Color, Dimension, FontFamily, FontSize } from '../../../../../enums';
import { NoDataFound, NormalLoader } from '../../../../../shared';
import { CommonData } from '../../../../../services/constant';
import SvgComponent from '../../../../../assets/svg';
import { ActivityDetailsModal } from '../../../../../pageShared';



class ActivityInMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            userLocationArr: this.props.data,
            locationAreaRegion: {
                latitude: 0.000,
                longitude: 0.000
            },
            polylineArr: [],
            selectSubordinateId: "",
            selectItemFromMap: {},
            isVisibleActivityModal: false
        }
    }


    componentDidMount() {
        this._load();
    }

    _load = async () => {
        let userLocation = await LocationData.fetchCurrentLocation();
        await this._getAvarageCoOrdinate(this.state.userLocationArr, userLocation);
        this.state.pageLoader = false;
        this.setState(this.state);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }


    // get avarage co ordinate
    _getAvarageCoOrdinate = async (data, userLocation) => {
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
        } else {
            if (userLocation.latitude && userLocation.longitude) {
                locationAreaRegion.latitude = userLocation.latitude;
                locationAreaRegion.longitude = userLocation.longitude;
            }
        }
        this.setState({
            locationAreaRegion: locationAreaRegion,
            polylineArr: polylineArr,
            userLocationArr: data
        })
    }

    // for check the marker 
    onClickMarkerItem = (item) => {
        this.state.selectItemFromMap = item;
        this.onVisibleModal(true);
        this.setState(this.state);
    }


    // for visble modal 
    onVisibleModal = (type) => {
        this.state.isVisibleActivityModal = type;
        this.setState(this.state);
    }

    _onBeatRouteMarkers = () => {
        return (
            <React.Fragment>
                {this.state.userLocationArr.map((item, key) => (
                    <Marker
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude
                        }}
                        onPress={() => (this.onClickMarkerItem(item))}
                        pinColor={item.color}
                        key={key}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingHorizontal: 5, paddingVertical: 5, backgroundColor: Color.COLOR.BLUE.LOTUS_BLUE, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
                                <SvgComponent svgName={"locationWithBGColor"} strokeColor={Color.COLOR.RED.AMARANTH} />
                            </View>
                            <View style={{ paddingHorizontal: 5, paddingVertical: 5, backgroundColor: Color.COLOR.WHITE.PURE_WHITE, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
                                <Text style={{ color: Color.COLOR.BLUE.LOTUS_BLUE, fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.MEDIUM }}>{item.eventTime}</Text>
                            </View>
                        </View>
                    </Marker>
                ))}
                <Polyline
                    coordinates={this.state.polylineArr}
                    strokeColor={Color.COLOR.BLUE.LOTUS_BLUE} // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={2}
                />
            </React.Fragment>
        )
    }


    _mapView = () => {
        if (this.state.pageLoader) {
            return (
                <View style={{ height: Dimension.height - Dimension.height / 5, justifyContent: "center", alignItems: 'center' }}>
                    <NormalLoader />
                </View>
            )
        } else {
            // if (this.state.userLocationArr && this.state.userLocationArr.length == 0) {
            //     return (
            //         <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center" }}>
            //             <NoDataFound />
            //         </View>
            //     );
            // } else {
            return (
                <View style={styles.mapPortionView}>
                    {this.state.isVisibleActivityModal ?
                        <ActivityDetailsModal isVisible={this.state.isVisibleActivityModal} data={this.state.selectItemFromMap} onCloseModal={() => this.onVisibleModal(false)} /> :
                        null
                    }
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
            // }
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