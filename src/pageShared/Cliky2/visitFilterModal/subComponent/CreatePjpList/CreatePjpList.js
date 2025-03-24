import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Color } from '../../../../../enums'
import { setCustomerType } from './Function'
import { CheckBox, Loader } from '../../../../../shared'
import SvgComponent from '../../../../../assets/svg'
import styles from './Style'

export default class RouteVisitFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customerTypeArr: [],
            selectedCustomerTypeObj: {},
            pageLoader: true,
            selectAllCheck: false,
            customerIdArr: [],
            isProject: false,
            isCustomer: true
        }
    }

    componentDidMount() {
        this.getCustomerType()
    }

    // for 
    getCustomerType = async () => {
        this.setState(await setCustomerType(this.state, this.props));
        this.setState({ pageLoader: false })
    }

    onReset = () => {
        this.setState({ customerIdArr: [], isProject: false, isCustomer: true })
        this.props.onFilterReset()
    }

    onApply = () => {
        let data = { customerIdArr: this.state.customerIdArr, isProject: this.state.isProject, isCustomer: this.state.isCustomer }
        this.props.onFilterApply(data)
    }

    setCustomerIdArr = (item, key) => {
        let idArr = this.state.customerIdArr;
        if (item.check) {
            idArr.push(item.id)
        } else {
            idArr.splice(key, 1)
        }
        this.state.customerIdArr = idArr;
        this.setState(this.state)

    }

    onSelect = (item, key) => {
        let checkCounter = 0;
        let arr = this.state.customerTypeArr;
        for (let i = 0; i < arr.length; i++) {
            if (i == key) {
                arr[i].check = !arr[i].check
            }
            if (arr[i].check) {
                checkCounter++
            }
        }

        if (checkCounter == arr.length) {
            this.state.selectAllCheck = true
        } else {
            this.state.selectAllCheck = false;
        }

        this.state.customerTypeArr = arr;
        this.setCustomerIdArr(item, key);
        this.setState(this.state)
    }

    onSelectAll = (type) => {
        let arr = this.state.customerTypeArr;
        for (let i = 0; i < arr.length; i++) {
            if (type == "SelectAll") {
                arr[i].check = true;
                const idArray = this.state.customerTypeArr.map((item) => item.id);
                this.state.customerIdArr = idArray;
                this.state.selectAllCheck = true
            } else {
                arr[i].check = false;
                this.state.customerIdArr = [];
                this.state.selectAllCheck = false;
            }
        }
        this.state.customerTypeArr = arr;
        this.setState(this.state)
    }

    customerTitleCheckBoxSec = () => {
        const _onCheckCustomer = () => {
            this.setState({
                isCustomer: true
            })
        }
        const _onCheckTarget = () => {
            this.setState({
                isCustomer: false
            })
        }
        return (
            <>
                <View style={{ flexDirection: "row", paddingVertical: 5, marginTop: 10 }}>
                    <CheckBox
                        type={"singleSelectBox"}
                        selectBackgroundColor={Color.COLOR.RED.AMARANTH}
                        borderRadius={40}
                        data={this.state.isCustomer}
                        onClickValue={() => _onCheckCustomer()}
                    />
                    <Text style={styles.filterCheckText}>Customer</Text>
                    <View style={{ flex: 0.5 }} />
                    <CheckBox
                        type={"singleSelectBox"}
                        selectBackgroundColor={Color.COLOR.RED.AMARANTH}
                        borderRadius={40}
                        data={!this.state.isCustomer}
                        onClickValue={() => _onCheckTarget()}
                    />
                    <Text style={styles.filterCheckText}>Target</Text>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />

            </>
        )
    }

    checkBoxSec = () => {
        const _onCheckRetail = () => {
            this.setState({
                isProject: false
            })
        }
        const _onCheckProject = () => {
            this.setState({
                isProject: true
            })
        }
        return (
            <>
                <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                    <CheckBox
                        type={"singleSelectBox"}
                        selectBackgroundColor={Color.COLOR.RED.AMARANTH}
                        borderRadius={40}
                        data={!this.state.isProject}
                        onClickValue={() => _onCheckRetail()}
                    />
                    <Text style={styles.filterCheckText}>Retail</Text>
                    <View style={{ flex: 0.5 }} />
                    <CheckBox
                        type={"singleSelectBox"}
                        selectBackgroundColor={Color.COLOR.RED.AMARANTH}
                        borderRadius={40}
                        data={this.state.isProject}
                        onClickValue={() => _onCheckProject()}
                    />
                    <Text style={styles.filterCheckText}>Project</Text>
                </View>
                <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />

            </>
        )
    }

    render() {
        return (
            <View>

                {/* <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"> */}
                <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: 25 }}>
                    {this.checkBoxSec()}
                    {this.customerTitleCheckBoxSec()}
                    {this.state.pageLoader ?
                        <Loader type={"normal"} />
                        :
                        <>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.filterLineText}>Customer Type</Text>
                                </View>
                                <TouchableOpacity style={{ alignItems: 'flex-end' }} activeOpacity={0.8} onPress={() => this.onSelectAll(this.state.selectAllCheck ? "Deselect All" : "SelectAll")}>
                                    <Text style={{ textDecorationLine: 'underline', color: '#F13748' }}>{this.state.selectAllCheck ? "Deselect All" : "Select All"}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderWidth: 0.5, borderColor: '#AAB6BF', marginTop: 10 }} />
                            <View style={{ maxHeight: 400 }}>
                                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                    {this.state.customerTypeArr.map((item, key) => (
                                        <View key={key} >
                                            {/* <View style={{ borderRadius: 50, borderColor: '#AAB6BF', borderWidth: 1, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: '#DEEEFB' }} key={key}>
                                                <View>
                                                    <Text style={styles.visitedText}>{item.name}</Text>
                                                </View>
                                            </View> */}
                                            <TouchableOpacity style={styles.greaySec} onPress={() => this.onSelect(item, key)} >
                                                <View style={styles.greayBox}>
                                                    <View style={item.check ? styles.hafCircleGreen : styles.hafCircleGreay}>
                                                        {item.check ?
                                                            <SvgComponent svgName={"tick"} strokeColor={"#fff"} height={18} width={18} />
                                                            :
                                                            null
                                                        }
                                                    </View>
                                                    <View style={styles.boxTextSec}>
                                                        <Text style={styles.reasonText}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    ))}
                                    <View style={{ marginBottom: 60 }} />
                                </ScrollView>
                            </View>
                            <View style={{ flexDirection: 'row', bottom: 0, position: "absolute" }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.onReset()} style={{ paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", justifyContent: "center", backgroundColor: Color.COLOR.WHITE.PURE_WHITE, borderRadius: 25, borderColor: Color.COLOR.RED.AMARANTH, borderWidth: 1 }}>
                                        <Text style={styles.resetBtn}>Reset</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }} />
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => this.onApply()} style={{ paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", justifyContent: "center", backgroundColor: Color.COLOR.RED.AMARANTH, borderRadius: 25 }}>
                                        <Text style={styles.applyBtnTxt}>Apply</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    }
                </View>
                {/* </ScrollView> */}

            </View >
        )
    }
}
