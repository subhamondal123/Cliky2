## React Native searchchable single select dropdown

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
    if selectedValueType is id then send the id and if name then send the value. It will in a string format.
###### 4. onChangeText
    it is a function where get the value after change the text from the input and this value will passed in a property variable.
###### 5. selectSearchText
    this is the input text which is shown in the text field. if this is blank then there is shown select.
###### 6. onPress
    it is a function where user can get the data after selecting the data from dopdown.



###### 7. Usage of this
        <SingleSelectSearchDropdown
            data={data}    //pass the actual data
            selectedValueType={selectedValueType}  //pass the type data ("id" and "name")
            selectedValue={selectId} // it is the selected id if not selected from dropdown then pou 0 and if selected then set the selected id
            onChangeText={(value) => this.onSearch(value)}  //get the input text value by text change by function
            selectSearchText={selectSearchText} //set the value of input text 
            onPress={(value) => this.setState({ selectId:selectedValueType == "id" ? value.id.toString() : value.name, selectSearchText: value.name })}  // set the value in state
        />