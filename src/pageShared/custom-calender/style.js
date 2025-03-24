import {
    StyleSheet
} from 'react-native';
const WHITE_SMOKE = '#AAB6BF';
const PURE_BLACK = '#000000';
const PURE_WHITE = '#FFFFFF';
const BORDER_WIDTH = 0.4;

const styles = StyleSheet.create({
    touchView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingRight:5,
        borderRightWidth: BORDER_WIDTH,
        borderColor: WHITE_SMOKE
    },
    weekView: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateText: {
        fontSize: 14,
    },
    dateNameText: {
        fontSize: 13,
        color: PURE_WHITE
    }
});

export default styles;