## React Native Shared Component for Image View In Modal

## Getting Started
### Prerequisites
#### Install Android and iOS development environments
  add this file in your project as a share component.

##### Props
    1)  isHidden = if user want to visible or not.
    2)  isDisabled = If there are any clickable or not.
    3)  text = The button text value.
    4)  containerAdditionalStyle = If user want to change the main container view design.
    5)  onClick = get the event by clicking the button
    6)  props = this is the property of that page where it is used (mandetory)


###### Usage of this
<CaptureProjectImgButton
    props={this.props}
    onClick={this.onClick}
/>
