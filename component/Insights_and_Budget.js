import React, { useState } from "react"
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Modal, StatusBar, } from "react-native"
import { App_Colors, App_Size } from "../constant/Theme"
import images from "../constant/images"
// Insights_and_Budget functional component
const Insights_and_Budget = ({ }) => {
    // State for the list of transactions
    const [transaction, settransaction] = useState([
        // Sample transactions
        {
            transaction_name: "uber",
            transaction_date: "28/06/2021",
            transaction_cost: "50"
        },
        {
            transaction_name: "uber",
            transaction_date: "28/06/2021",
            transaction_cost: "50"
        },
        {
            transaction_name: "uber",
            transaction_date: "28/06/2021",
            transaction_cost: "50"
        },
        {
            transaction_name: "uber",
            transaction_date: "22/07/2021",
            transaction_cost: "80"
        },
        {
            transaction_name: "uber",
            transaction_date: "30/06/2021",
            transaction_cost: "50"
        },
        {
            transaction_name: "uber",
            transaction_date: "27/06/2021",
            transaction_cost: "30"
        },

    ])
    // State for the All Transactions modal
    const [All_transaction_modalOpen, setAll_transaction_modalOpen] = useState(false)



    // Catogray_Expenses component
    function _Catogray_Expenses() {
        return (
            <View style={style.catogray_container}>
                {/* Category item 1 */}
                <View style={style.catogray_item_view}>
                    <View style={style.catogray_icon}>
                        <Image source={images.apple} style={style.catogry_image} />
                    </View>

                    <View style={style.catogray_name_view}>
                        <Text style={style.catogray_name_text}>Food</Text>
                    </View>

                    <View style={style.catogray_icon}>
                        <Text style={style.catogray_cost}>
                            40%
                        </Text>
                    </View>

                </View>

                {/* ///// */}
                {/* Category item 2 */}
                <View style={style.catogray_item_view}>

                    <View style={style.catogray_icon}>
                        <Image source={images.T_shirt} style={style.catogry_image} />
                    </View>

                    <View style={style.catogray_name_view}>
                        <Text style={style.catogray_name_text}>Clothes</Text>
                    </View>

                    <View style={style.catogray_icon}>
                        <Text style={style.catogray_cost}>
                            30%
                        </Text>
                    </View>

                </View>

                {/* /////// */}
                {/* Category item 3 */}
                <View style={style.catogray_item_view}>

                    <View style={style.catogray_icon}>
                        <Image source={images.car} style={style.catogry_image} />
                    </View>

                    <View style={style.catogray_name_view}>
                        <Text style={style.catogray_name_text}>Transportation</Text>
                    </View>

                    <View style={style.catogray_icon}>
                        <Text style={style.catogray_cost}>
                            30%
                        </Text>
                    </View>

                </View>


            </View>
        )
    }
    // Transactions component
    function _Transactions() {
        return (
            <>
                {/* Displaying the first 3 transactions */}
                {transaction.slice(0, 3).map((item, index) => {

                    return (
                        <View
                            key={index}
                            style={style.transaction_container}>
                            {/* Transaction photo */}
                            <View style={style.transaction_photo_container}>
                                <Image source={images.photo} style={style.transaction_photo} />
                            </View>
                            {/* Transaction text details */}
                            <View style={style.containertransaction_text}>
                                <Text style={style.transaction_text}>{item.transaction_name}</Text>
                                <Text style={style.transaction_date}>{item.transaction_date}</Text>

                            </View>
                            {/* Transaction cost */}
                            <View style={style.transaction_cost}>
                                <Text style={style.transaction_cost_text}>
                                    +{item.transaction_cost}$
                                </Text>
                            </View>



                        </View>
                    )
                })





                }

            </>



        )

    }


    // All_transaction_modal component
    function _All_transaction_modal() {
        return (
            <Modal
                visible={All_transaction_modalOpen}
                onRequestClose={() => {
                    setAll_transaction_modalOpen(false)
                }}
            >
                {/* Modal content */}
                <View style={{ flex: 1, backgroundColor: App_Colors.white }}>

                    <View style={{
                        height: 70,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={style.transaction_title}> All Transactions</Text>

                    </View>
                    {/* FlatList to display all transactions */}
                    <FlatList
                        data={transaction}
                        renderItem={({ item, index }) => (
                            <View style={style.transaction_container}>
                                {/* Transaction photo */}
                                <View style={style.transaction_photo_container}>
                                    <Image source={images.photo} style={style.transaction_photo} />
                                </View>
                                {/* Transaction text details */}
                                <View style={style.containertransaction_text}>
                                    <Text style={style.transaction_text}>{item.transaction_name}</Text>
                                    <Text style={style.transaction_date}>{item.transaction_date}</Text>

                                </View>
                                {/* Transaction cost */}
                                <View style={style.transaction_cost}>
                                    <Text style={style.transaction_cost_text}>
                                        +{item.transaction_cost}$
                                    </Text>
                                </View>



                            </View>
                        )}

                    />
                </View>
            </Modal>
        )
    }

    // Body component
    function _Body() {
        return (
            <View style={style.body_container}>
                <ScrollView>
                    {/* Date view */}
                    <View style={style.date_view}>
                        <Text style={style.date_text}>15 March to 15 April 2021</Text>
                        <Image source={images.calendar} style={style.calendar_image} />
                    </View>

                    {/* Total expenses view */}
                    <View style={style.total_expenses_view}>
                        <Text style={style.total_expenses_text}>Total Expenses</Text>
                        <Text style={style.total_expenses_num}>5,000$</Text>
                    </View>

                    {/* Category Expenses */}
                    {_Catogray_Expenses()}

                    {/* Transactions */}
                    <View style={{
                        height: 50,
                        paddingLeft: 15,
                        justifyContent: "center"
                    }}>
                        <Text style={style.transaction_title}>Transactions</Text>

                    </View>


                    {_Transactions()}
                    <TouchableOpacity
                        onPress={() => {
                            setAll_transaction_modalOpen(true)
                        }}
                        style={style.all_transaction_button}>
                        <Text style={style.all_transaction_text}>View all</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        )
    }


    // Main component structure
    return (
        <View style={style.container}>

            {_Body()}
            {_All_transaction_modal()}

        </View>
    )



}
// Styles for the component
const style = StyleSheet.create({
    container: {
        height: App_Size.height,


        backgroundColor: App_Colors.white
    },

    body_container: {
        flex: 1,

    },
    date_view: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        height: 60,
    },
    date_text: {
        fontSize: 15,
        color: App_Colors.black,
        fontWeight: "bold"
    },
    calendar_image: {
        height: 30,
        width: 50,
        resizeMode: "center"
    },
    total_expenses_view: {
        height: 90,
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20


    },
    total_expenses_text: {
        fontSize: 15,
        fontWeight: "bold",
        color: App_Colors.black

    },
    total_expenses_num: {
        fontSize: 40,
        color: App_Colors.black
    },
    catogray_container: {
        height: 180,
    },
    catogray_item_view: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    catogray_icon: {
        height: "100%",
        width: "25%",
        alignItems: "center",
        justifyContent: "center"
    },
    catogry_image: {
        height: "70%",
        width: "80%",
        resizeMode: 'center',

    },
    catogray_name_view: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
    },
    catogray_name_text: {
        fontSize: 20,
        color: App_Colors.black
    },
    catogray_cost: {
        fontSize: 20,
        color: App_Colors.black
    },
    transaction_title: {
        fontSize: 25,
        color: App_Colors.black
    },
    transaction_container: {
        height: 80,
        padding: 15,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    transaction_photo_container: {
        height: 60,
        width: 60,
        backgroundColor: App_Colors.light_gray,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    transaction_photo: {
        height: 40,
        width: 50,
        resizeMode: "center"
    },
    containertransaction_text: {
        width: "50%",
        height: 70,
        justifyContent: "center",

    },
    transaction_text: {
        fontSize: 15,
        color: App_Colors.black
    },
    transaction_date: {
        fontSize: 17,
        color: App_Colors.gray
    },
    transaction_cost: {
        height: "100%",
        width: "25%",
        alignItems: "center",
        justifyContent: "center"
    },
    transaction_cost_text: {
        fontSize: 18,
        color: App_Colors.black
    },
    all_transaction_button: {
        justifyContent: "center",
        alignItems: "center",
        height: 30,


    },
    all_transaction_text: {
        fontSize: 18,
        fontWeight: "bold",
        color: App_Colors.black
    }

})
// Exporting the Insights_and_Budget component
export default Insights_and_Budget;

