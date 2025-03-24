## React Native Bottom Modal

## Getting Started
### Prerequisites
#### Install Android and iOS development environments
  add this file in your project as a share component.

##### Props

###### 1. isVisible
    - value will be true or false. It helps to visible or not the modal.

###### 2. isHidden
    - value will be true or false. It helps to view or not the modal.

###### 3. containerStyle
    - value will be used for style for main container of main modal for additional style.

###### 4. aditionalMainViewStyle
    - value will be used for style for addditional container for additional style.

###### 5. borderRadius
    - value will be used for border radious for view.

###### 6. onBackButtonPress
    - close by the back button press of device.

###### 7. onBackdropPress
    - close by the back button press of device.

###### 8. onRequestClose
    - close the modal by click on the outside of the modal.

###### 9. children
    - for used the render design.

###### 7. Usage of this
        <BottomModal
            isVisible = false, // this is the value of the visible of the modal which are "true" and "false"
            isHidden = false, // this is the value of the hide or not of the modal which are "true" and "false"
            containerStyle = {}, // this is used for main container style
            aditionalMainViewStyle = {}, // this is used for  main container style
            borderRadius={10} // This is provide the border radious of the dropdown modal border
            onBackButtonPress={() => onBackButtonPress()} // close by the back button press of device
            onBackdropPress={() => onBackdropPress()}  // close by the back button press of device
            onRequestClose={() => onRequestClose()}  // close the modal by click on the outside of the modal
            children = null // for used the render design
        />