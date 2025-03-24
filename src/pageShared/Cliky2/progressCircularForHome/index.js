// this is used for dashboard
import React, { Component } from "react";
import { Color, FontFamily, FontSize } from "../../../enums";
import {
    View,
    Text
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { stoteProgressData } from "./function";

const bar = {
    activeStrokeWidth: 20,
    inActiveStrokeWidth: 20,
    inActiveStrokeOpacity: 0.4
};

class ProgressCircularForHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressData: {
                percentageName:"",
                percentage:"0",
                percentageType:"",
                activeStrokeColor:"",
                inActiveStrokeColor:""
            },
            loader: true
        };
    }

    componentDidMount = async () => {
        await this.onLoad();
    }

    onRefresh = async () => {
        this.setState({ loader: true })
        await this.onLoad();
    }

    // for load the page with api calling
    onLoad = async () => {
        this.setState(await stoteProgressData(this.state, this.props));
        await this.setLoader(false);
    }

    // // for api call 
    // onApiCalling = async () => {
    //     let responseData = await MiddlewareCheck("TargetVsAchievement", {}, this.props);
    //     if (responseData) {
    //         if (responseData.status === ErrorCode.ERROR.ERROR_CODE.SUCCESS) {
    //             this.state.progressData = responseData.response;
    //             await StorageDataModification.progressCircularForHomeData(responseData.response, "store");
    //             this.setState(this.state);
    //         }
    //     }
    // }

    // for change the loader
    setLoader = async (type) => {
        this.state.loader = type;
        this.setState(this.state);
    }

    // for render the view design
    onViewDesign = () => {
        let respDesign = (
            <CircularProgressBase
                {...bar}
                value={this.state.progressData.percentage}
                radius={100}
                activeStrokeColor={this.state.progressData.activeStrokeColor}
                inActiveStrokeColor={this.state.progressData.inActiveStrokeColor}
                clockwise={false}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "#747C90", fontSize: FontSize.MD, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, top: 10 }}>{this.state.progressData.percentageName}</Text>
                    <Text style={{ color: Color.COLOR.BLACK.PURE_BLACK, fontSize:this.state.progressData.percentage.length > 6 ?FontSize.MD :  FontSize.XXL, fontFamily: FontFamily.FONTS.POPPINS.BOLD }}>{this.state.progressData.percentage}%</Text>
                    <Text style={{ color: "#747C90", fontSize: FontSize.XS, fontFamily: FontFamily.FONTS.POPPINS.REGULAR, bottom: 10 }}>{this.state.progressData.percentageType}</Text>
                </View>
            </CircularProgressBase>
        );
        return respDesign;
    }

    // for shimmer view
    shimmerView = () => {
        let itemWidth = 200;
        return (
            <SkeletonPlaceholder borderRadius={10}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: 200, width: itemWidth, marginRight: 7 }} />
                </View>
            </SkeletonPlaceholder>
        )
    }

    render() {
        if (this.state.loader) {
            return (this.shimmerView());
        } else {
            return (this.onViewDesign());
        }
    }
}


export default ProgressCircularForHome;