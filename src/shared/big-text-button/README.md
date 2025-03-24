## React Native Big Text Button

## Getting Started
### Prerequisites
#### Install Android and iOS development environments
  add this file in your project as a share component.

##### Props
    1)  text = Provide Data in string format, like {"Click Me!"}
    2)  height = Provide Data in number format, like {45}
    3)  borderRadius =  Provide Data in number format, like {20} 
    3)  backgroundColor = Provide color code in string format, like {"#FFFFFF"}
    4)  fontSize = Provide Data in number format, like {14}
    5)  fontColor = Provide color code in string format, like {"#000000"}
    6)  fontFamily = Provide font family name in string format, {}
    7)  isLeftIcon = Provide boolean type value here, According to if left icon is required or not.
    8)  leftIcon = Provide Icon Source here
    9)  leftIconStyle = Provide only height and width here, like {{height:20,width:20}}
    10) isRightIcon = Provide boolean type value here, According to if right icon is required or not.
    11) rightIcon = Provide Icon Source here,
    12) rightIconStyle = Provide only height and width here, like {{height:20,width:20}}
    13) isLinearGradient = Provide boolean type value here, According to if linear gradient type button is required or not.
    14) gradientColors = Provide color code here in array format, like {["#000000","#FFFFFF"]}
    15) start = Provide linear gradient start value in object format, like {{ x: 0, y: 0 }} 
    16) end = Provide linear gradient end value in object format, like {{ x: 1, y: 0 }}


###### Usage of this
//For Normal Button
<BigTextButton
    text={"Save & Next"}
    onPress={() => this._onSave()}
    isLeftIcon={true}
    leftIcon={ImageName.BLUE_ANIMATED_UP}
    leftIconStyle={{ height: 40, width: 40 }}
    isRightIcon={true}
    rightIcon={ImageName.CALENDER_IMAGE}
    rightIconStyle={{ height: 35, width: 35 }}
    height={45}
    borderRadius={15}
    backgroundColor={"#f5f5f5"}
    fontSize={15}
    fontColor={"#fff"}
/>

//For Linear Gradient Button
<BigTextButton
    text={"Save & Next"}
    onPress={() => this._onSave()}
    isLeftIcon={true}
    leftIcon={ImageName.BLUE_ANIMATED_UP}
    leftIconStyle={{ height: 40, width: 40 }}
    isRightIcon={true}
    rightIcon={ImageName.CALENDER_IMAGE}
    rightIconStyle={{ height: 35, width: 35 }}
    isLinearGradient={true}
    gradientColors={["#000000","#FFFFFF"]}
    start={{ x: 0, y: 0 }} 
    end={{ x: 1, y: 0 }}
/>