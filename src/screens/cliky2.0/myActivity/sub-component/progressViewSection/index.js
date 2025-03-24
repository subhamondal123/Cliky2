import { ScrollView, View } from 'react-native'
import React, { Component } from 'react'
import styles from './style';
import ActivityProgress from '../../../../../pageShared/Cliky2/activityProgress';
import { CommonData } from '../../../../../services/constant';
import { NoDataFound, NormalLoader } from '../../../../../shared';
import { Dimension } from '../../../../../enums';

class ProgressViewSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoader: true,
            userLocationArr: this.props.data,
        }
    }

    componentDidMount() {
        this._load();
    }

    _load = async () => {
        this._getAvarageCoOrdinate(this.state.userLocationArr);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    // for set loader change
    onChangeLoader = async (type) => {
        this.state.pageLoader = type;
        this.setState(this.state);
    }

    // get avarage co ordinate
    _getAvarageCoOrdinate = async (data) => {
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                data[i].title = data[i].description;
            }
        }
        this.state.userLocationArr = data;
        this.setState(this.state)
        await this.onChangeLoader(false);
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.pageLoader ?
                    <View style={{ height: Dimension.height - Dimension.height / 5, justifyContent: "center", alignItems: 'center' }}>
                        <NormalLoader />
                    </View> :
                    <React.Fragment>
                        {(this.state.userLocationArr && this.state.userLocationArr.length == 0) ?
                            <View style={{ height: Dimension.height / 1.5, justifyContent: "center", alignItems: "center", marginTop: '20%' }}>
                                <NoDataFound />
                            </View> :
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={{ height: 20 }} />
                                <ActivityProgress
                                    data={this.state.userLocationArr}
                                />
                                <View style={{ height: 40 }} />
                            </ScrollView>
                        }
                    </React.Fragment>
                }
            </View>
        )
    }
}

export default (ProgressViewSection);