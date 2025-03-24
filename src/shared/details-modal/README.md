const detailData = [
    {
        id: 1,
        imageName: ImageName.CUSTOMER,
        boxName: "Customer",
        check: false
    },
    {
        id: 2,
        imageName: ImageName.CUSTOMER,
        boxName: "Customer",
        check: false
    },
    {
        id: 3,
        imageName: ImageName.CUSTOMER,
        boxName: "Inte",
        check: false
    },
    {
        id: 4,
        imageName: ImageName.CUSTOMER,
        boxName: "Inte",
        check: false
    },
    {
        id: 5,
        imageName: ImageName.CUSTOMER,
        boxName: "Inte",
        check: false
    },

]


                <DetailsModal
                    isVisible={this.state.bbb}
                    onCloseModal={() => {
                        this.setState({
                            bbb: false
                        })
                    }}
                    data={this.state.allData}
                    onCheck={(value) => this.onCheckClick(value)}
                    onContinue={() => {
                        console.log("Continue")
                    }}
                />


    onCheckClick = (item) => {
        // console.log(item)
        let data = this.state.allData;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == item.id) {
                data[i].check = !data[i].check;
            } else {
                data[i].check = false;
            }
        }
        this.setState({
            allData: data
        })
    }