## React Native searchchable multiple select dropdown

## Getting Started
### Prerequisites
#### Install Android and iOS development environments
  add this file in your project as a share component.

##### Props

###### 1. data
    data provive in array format. like ([{"id": 1,"name": "test"}])
###### 2. selectedValueType
    it is two type ("id" and "name")
###### 3. selectedValue
    if selectedValueType is id then send the id and if name then send the value. It will in a array format like ["1","2"].
###### 4. onChangeText
    it is a function where get the value after change the text from the input and this value will passed in a property variable.
###### 5. selectSearchText
    this is the input text which is shown in the text field. if this is blank then there is shown select.
###### 6. onPress
    it is a function where user can get the data after selecting the data and actiual select data array from dopdown.



###### 7. Usage of this
        <MultipleSelectModalDropdown
            selectedValue={[]} // it is the selected id from dropdown item inside array, if no data selected then the value will blank array ([])
            data={data}    //pass the actual data
            selectedValueType={selectedValueType}  //pass the type data ("id" and "name")
            onPress={(...props) => onSelect(...props)}   // get the value which was selected that item inside "selectItem" and value is the actual data of value which is given the selectedValue.
            isVisible={true} // this is the value of the visible of the modal which are "true" and "false"
            isSearchable={true} // this is the search enable or not, Value are ("true" and "false")
            selectSearchText={selectSearchText}  // This is the text which is fill in the text field of the search field.
            onChangeText={(value) => onSelectSearchText(value)} // This is a function which return the text which is type in the search box.
            headerText={"headerText"}  // This is a string which is shown in the dropdown header
            borderRadius={10} // This is provide the border radious of the dropdown modal border
            onClose={() => onOpenAndCloseModal()}  // close the modal by click on the cross icon
            onBackButtonPress={() => onBackButtonPress()} // close by the back button press of device
            onBackdropPress={() => onBackdropPress()}  // close by the back button press of device
            onRequestClose={() => onRequestClose()}  // close the modal by click on the outside of the modal
        />