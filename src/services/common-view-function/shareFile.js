
// provide filePath,title and message

import Share from 'react-native-share';

export function shareTextFile(filePath, title, message) {
    return new Promise(async function (resolved, reject) {
        try {
            const options = {
                title,
                message,
                url: `file://${filePath}`,
                type: 'text/plain',
            };
            await Share.open(options);
            // Delete the file after sharing
            await RNFS.unlink(filePath);
        } catch (error) {
            resolved(error)
            // console.error('Error sharing text file:', error);
            // reject(false)
        }
    })


};