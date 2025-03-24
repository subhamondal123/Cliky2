
// provide content and filename

import RNFS from 'react-native-fs';

export function createTXTfile(content, fileName) {
    return new Promise(async function (resolved, reject) {
        try {
            const path = RNFS.DocumentDirectoryPath + `/${fileName}.txt`;
            await RNFS.writeFile(path, content, 'utf8');
            resolved(path);
            // return path;
        } catch (error) {
            console.error('Error creating text file:', error);
            reject(false)
            // return null;
        }
    })
}
