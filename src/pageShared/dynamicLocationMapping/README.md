## Getting Started
### Prerequisites
#### Install Android and iOS development environments
  add this file in your project as a pageShared component.

##### Props

###### 1. viewType
 The viewType are ("add", "edit", "filter")

###### 2. editData
 The editData data are will be the in the array like ([
        {
             "id": 1907,
            "name": "BANKURA-REALBUILD",
            "typeId": 4,
            "slNo": 4
            "typeName": "Zone",
        },
        {
             "id": 845,
            "name": "Bankura",
            typeId:3,
            "slNo": 3,
            "typeName": "District",
        },
        {
             "id": 37,
            "name": "West Bengal",
            "typeId": 2,
            "slNo":2,
            "typeName": "State",
        },
        {
            "id": 18196,
            "typeId": 17,
            "name": "India",
            "typeName": "Country",
            "slNo": 1
        }
       
    ])

    if the viewType is edit and the editData will be put in the array if not then not needed to set the editData.

###### 2. onApiCallData
    1. This is used for the api call get {"hierarchyDataId": "18279", "hierarchyTypeId": "20"} data for viewType "add" and "edit".
    2. For edit the request data will be like {"hierarchyDataId": [18196], "hierarchyTypeId": 17}.

###### 3. flexDirection
    1. This is used for showing the item row or column wise. value will be "row" or "column". By default the value is column.

###### 4. Usage of this
    <DynamicLocationMapping
    viewType={"edit"}
    onApiCallData={(value) =>console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>",value)}
    editData={[
        {
            "id": 1951,
            "typeId": 20,
            "name": "NORTH 24 PARGANAS - 1-REALEDGE",
            "typeName": "Zone",
            "slNo": 4
        },
        {
            "id": 858,
            "typeId": 19,
            "name": "North 24 Parganas",
            "typeName": "District",
            "slNo": 3
        },
        {
            "id": 37,
            "typeId": 18,
            "name": "West Bengal",
            "typeName": "State",
            "slNo": 2
        },
        {
            "id": 18196,
            "typeId": 17,
            "name": "India",
            "typeName": "Country",
            "slNo": 1
        }
    ]} />

