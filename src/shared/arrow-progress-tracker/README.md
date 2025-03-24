## React Native Arrow Progress Tracker

## Getting Started
### Prerequisites
#### Install Android and iOS development environments
  add this file in your project as a share component.

##### Props
    1)  height = This is for each cell height , Provide Data in number format, like {25}
    2)  arrowWidth = This is for arrow width , Provide Data in number format, like {16}
    3)  eachCellWidth =  This is for each cell width , Provide Data in number format, like {120} 
    4)  activeColor = This is for active cell background color, Provide color code in string format, like {"#74b50a"}
    5)  inActiveColor = This is for inactive cell background color, Provide color code in string format, like {"#ffc63d"}
    6)  fontColor = This is for each cell text color, Provide color code in string format, like {"#ffffff"}
    7)  fontFamily =  This is for each cell text fontfamily, Provide font family name in string format, {'sans-sarif'}
    8)  fontSize =  This is for each cell text fontsize, Provide Data in number format, like {12}
    9)  data = Provide data here in array format, like {[]}
    10)  onPress = it is a function where user can get the data after select each cell , like {()=>{}}
    11)  activeValueType = Provide variable name by which active inactive will control, and the variable must have boolean value , like {"isActive"}
    12) buttonNameType = Provide Cell Text Variable Name Here , {"name"}
    13) marginHorizontal = Provide start and end margin here in number format, like {10}
    
    default values ======>

    height: 25,
    arrowWidth: 16,
    eachCellWidth: 120,
    activeColor: '#74b50a',
    inActiveColor: '#ffc63d',
    fontColor: Color.COLOR.WHITE.PURE_WHITE,
    fontFamily: FontFamily.FONTS.INTER.BOLD,
    fontSize: FontSize.XS,
    data: [
        {
            name: 'Button 0',
            isSelected: true,
        },
        {
            name: 'Button 1',
            isSelected: true
        },
        {
            name: 'Button 2',
            isSelected: false
        },
        {
            name: 'Button 3',
            isSelected: false
        }
    ],
    onPress: () => { },
    activeValueType: "isSelected",
    buttonNameType: "name",
    marginHorizontal: 10

##### Usage of this
    <ArrowProgressTracker
        data={staticData}
        onPress={(value) => this._onPress(value)}
        activeValueType={"isActive"}
        buttonNameType={"nam"}
    />
