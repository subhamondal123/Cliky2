import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import styles from './style'

class ClikyDashboardTab extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: ""
        }
    }

    _onDashBoardTabNav = (item, key) => {
        this.props.onSelectTab(item, key)
    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {this.props.data.map((item, key) => (
                        <TouchableOpacity style={styles.mainSec} key={key} onPress={() => this._onDashBoardTabNav(item, key)}>
                            <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
                                <View style={{paddingLeft:5,paddingRight:5}}>
                                    <Image source={item.icon} style={styles.mainImg} />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginLeft: 5 }}>
                                    <Text style={styles.labelTxt}>{item.name}</Text>
                                </View>
                                
                                {item.count == null || item.count == undefined || item.count.length == 0 ?
                                    null :
                                    <>
                                    <View style={{flex:1}}/>
                                          <View style={{marginLeft:5,height:22,width:22,borderRadius:11,backgroundColor:"#F13748",justifyContent:"center",alignItems:"center"}}>
                                       <Text style={styles.rightLabelTxt}>{item.count}</Text>
                                    </View>
                                    </>
                                  
                                }

                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
        )
    }
}

export default ClikyDashboardTab
