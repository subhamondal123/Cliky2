## React Native Add Activity modal

## Getting Started
### Prerequisites
#### Install Android and iOS development environments
  add this file in your project as a share component.

##### Props
    1)  isVisible = Provide Data in boolian data (true/false)
    2)  onCloseModal = It is a function where close the modal
    3)  submitData = It is a function where get the data "{
                activityType: selectActivityType,
                assignTo: selectAssignTo,
                date: selectDate,
                rawDate: selectRawDate,
                description: description,
                dueDate: selectDueDate,
                rawDueDate: selectRawDueDate,
                user: selectUser
            }"
    4)  modalType = It provide a string data. ("contact","organization","lead","opportunity")
    5)  data = It will provide an object data "{
                        activityType: "1",
                        assignTo: "1",
                        date: "2022-01-03",
                        description: "description",
                        dueDate: "2022-09-05",
                        user: '1'
                    }"


###### Usage of this
                <AddActivity
                    isVisible={visible}
                    onCloseModal={() => OnAddActivityVisible(!visible)}
                    submitData={(value) => console.log(value)}
                    modalType={"organization"}
                    data:{{
                        activityType: "1",
                        assignTo: "1",
                        date: "2022-01-03",
                        description: "description",
                        dueDate: "2022-09-05",
                        user: '1'
                    }}
                />
