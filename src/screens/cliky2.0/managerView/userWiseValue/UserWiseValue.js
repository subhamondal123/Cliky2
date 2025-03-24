import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import * as Progress from 'react-native-progress';
import Header from '../../header/Header';
import { Color, Dimension } from '../../../../enums';
import { Loader } from '../../../../shared';
import styles from './Style';
import { getAmountWithUnit } from '../../../../services/common-view-function/commonFunctions';


const valColor = {
    tc: Color.COLOR.PURPLE.DAVY_PURPLE,
    pc: Color.COLOR.SKY.FLORA,
    netVal: Color.COLOR.BLUE.CYAN_BLUE_AZURE
}

class UserWiseValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            maxAmount: 0,
            tcMaxValue: 0,
            pcMaxValue: 0,
            valColor: valColor,
            userValArr: []
        }
    }

    componentDidMount = () => {
        this.setState({
            userValArr: this.props.route.params.propData,
            maxAmount: this.props.route.params.maxValue.maxAmount,
            tcMaxValue: this.props.route.params.maxValue.tcMaxValue,
            pcMaxValue: this.props.route.params.maxValue.pcMaxValue,
            pageLoader: false
        })
    }

    render() {
        return (
            <SafeAreaView >
                <Header {...this.props} onRefresh={() => console.log("")} />
                <View style={styles.borderLine} />
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.mainScreenSec}>
                        <View style={styles.headerSec}>
                            <View style={styles.labelSec}>
                                <View style={[styles.labelIconSec, { backgroundColor: this.state.valColor.tc, }]} />
                                <Text style={styles.labelTxt}>TC</Text>
                            </View>
                            <View style={styles.labelSec}>
                                <View style={[styles.labelIconSec, { backgroundColor: this.state.valColor.pc, }]} />
                                <Text style={styles.labelTxt}>PC</Text>
                            </View>
                            <View style={styles.labelSec}>
                                <View style={[styles.labelIconSec, { backgroundColor: this.state.valColor.netVal, }]} />
                                <Text style={styles.labelTxt}>net Value</Text>
                            </View>
                        </View>
                        {this.state.pageLoader ? <Loader type={"normal"} /> : <React.Fragment>
                            {this.state.userValArr.length > 0 ?
                                <React.Fragment>
                                    {this.state.userValArr.map((item, key) => (
                                        <View key={key} style={styles.listSec}>
                                            <View style={styles.titleSec}>
                                                <Text style={styles.titleTxt}>{item.firstname + " " + item.lastname}</Text>
                                            </View>
                                            <View style={styles.bodySec}>
                                                <View style={{ marginVertical: 5, flexDirection: "row" }}>
                                                    <Progress.Bar
                                                        progress={parseFloat(item.totalSalesAmnt) / parseInt(this.state.maxAmount)}
                                                        width={Dimension.width - 200}
                                                        height={20}
                                                        color={this.state.valColor.tc}
                                                        borderWidth={0}
                                                        unfilledColor={'#C7D2DB'}
                                                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
                                                    <View style={{ flex: 1 }} />
                                                    <Text style={styles.countTxt}>{item.totalVisits}</Text>
                                                </View>
                                                <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                                                    <Progress.Bar
                                                        progress={parseFloat(item.totalProductiveVisits) / parseInt(this.state.pcMaxValue)}
                                                        width={Dimension.width - 200}
                                                        height={20} color={this.state.valColor.pc}
                                                        borderWidth={0}
                                                        unfilledColor={'#C7D2DB'}
                                                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
                                                    <View style={{ flex: 1 }} />
                                                    <Text style={styles.countTxt}>{item.totalProductiveVisits}</Text>
                                                </View>
                                                <View style={{ paddingVertical: 5, flexDirection: "row" }}>
                                                    <Progress.Bar
                                                        progress={parseFloat(item.totalVisits) / parseInt(this.state.tcMaxValue)}
                                                        width={Dimension.width - 200}
                                                        height={20}
                                                        color={this.state.valColor.netVal}
                                                        borderWidth={0}
                                                        unfilledColor={'#C7D2DB'}
                                                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
                                                    <View style={{ flex: 1 }} />
                                                    <Text style={styles.countTxt}>{getAmountWithUnit(item.totalSalesAmnt)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </React.Fragment>
                                :
                                <View style={styles.noDataFoundSec}>
                                    <Text style={styles.noDataFound}>No Data Found !</Text>
                                </View>
                            }
                        </React.Fragment>}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default UserWiseValue;