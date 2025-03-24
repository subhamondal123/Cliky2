import React, { Component } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import styles from './style'

class DashboardTab extends Component {

  constructor(props) {
    super(props)

    this.state = {
      text: ""
    }
  }

  _onDashBoardTabNav = (item, key) => {
    this.props.onSelectTab(item,key)
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {this.props.data.map((item, key) => (
            <TouchableOpacity style={styles.mainSec} key={key} onPress={() => this._onDashBoardTabNav(item, key)}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 5 }}>
                <View>
                  <Image source={item.icon} style={styles.mainImg} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", marginLeft: 5 }}>
                  <Text style={styles.labelTxt}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    )
  }
}

export default DashboardTab
