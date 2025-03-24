import { PropTypes } from 'prop-types';
import React, { } from 'react'
import styles from './style';
import { Image, View } from 'react-native';
import { Modal } from '..';
import { WebUriLinking } from '../../services/common-view-function';
import { ImageName } from '../../enums';
import { FileType } from '../../services/constant/commonData';

function ImageViewModal({
    isHidden,
    isDisabled,
    isVisible,
    link,
    onRequestClose,
    onBackdropPress,
    onBackButtonPress,
    props
}) {

    if (isHidden) return null;
    // for validate url
    const isUrlValid = (url) => {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+(:\d+)?)(\/.*)?$/;
        return urlRegex.test(url);
    };


    // for getting the file type
    const getFileType = (link) => {
        if (isUrlValid(link)) {
            let tempUri = link.split(".");
            return FileType[tempUri[(tempUri.length) - 1]];
        } else {
            alert("Please select a valid url");
        }
    }

    const type = getFileType(link)

    return (
        <Modal
            isVisible={isVisible}
            padding={0}
            onRequestClose={() => onRequestClose(false)}
            onBackdropPress={() => onBackdropPress(false)}
            onBackButtonPress={() => onBackButtonPress()}
            children={
                <View style={styles.container}>
                    {type == "image" ?
                        <Image source={{ uri: link }} style={styles.imgView} />
                        :
                        <View style={styles.imgSec}>
                            <Image source={ImageName.DOCUMENT_YELLOW} style={styles.docView} />
                        </View>
                    }
                </View>
            }
        />
    )
}

ImageViewModal.defaultProps = {
    isHidden: false,
    isDisabled: false,
    isVisible: false,
    link: null,
    onRequestClose: () => { },
    onBackdropPress: () => { },
    onBackButtonPress: () => { },
    props: {}
};

ImageViewModal.propTypes = {
    isHidden: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isVisible: PropTypes.bool,
    link: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func,
    onBackdropPress: PropTypes.func,
    onBackButtonPress: PropTypes.func,
    props: PropTypes.instanceOf(Object).isRequired
};


export default ImageViewModal;