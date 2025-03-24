export function modifyStatusArr(statusArr) {
    let respArr = [];
    if (statusArr) {
        for (let i = 0; i < statusArr.length; i++) {
            respArr.push({
                "id": statusArr[i].id,
                "name": statusArr[i].name
            });
        }
    }
    return respArr;
}

export function modifyCategoryArr(arr) {
    let respArr = [];
    if (arr) {
        // respArr = arr;
        for (let i = 0; i < arr.length; i++) {
            respArr.push({
                "id": arr[i].id,
                "name": arr[i].feedbackCategory,
                "visitFeedbackSubCategories": arr[i].visitFeedbackSubCategories
            });
        }
    }
    return respArr;
}

export function modifySubCategoryArr(arr) {
    let respArr = [];
    if (arr) {
        // respArr = arr;
        for (let i = 0; i < arr.length; i++) {
            respArr.push({
                "id": arr[i].id,
                "name": arr[i].feedbackSubCategory
            });
        }
    }
    return respArr;
}
