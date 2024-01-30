import React, { useEffect, useState } from "react";
import {
    View, Text, StyleSheet, Image, TouchableOpacity, Modal,
    TouchableWithoutFeedback, ScrollView, TextInput
} from "react-native"
import { App_Colors } from "../constant/Theme";
import images from "../constant/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Settings functional component
const Settings = ({ }) => {
    // State variables for handling modal, inputs, and user data
    const [editable_modal, seteditable_modal] = useState(false)
    const [name_input, setname_input] = useState("test")
    const [email_input, setemail_input] = useState("test@gmail.com")
    const [phone_input, setphone_input] = useState("01223490505")
    const [name_input_border, setname_input_border] = useState("#999")
    const [email_input_border, setemail_input_border] = useState("#999")
    const [phone_input_border, setphone_input_border] = useState("#999")
    const [name_warning_text, setname_warning_text] = useState("")
    const [email_warning_text, setemail_warning_text] = useState("")
    const [phone_warning_text, setphone_warning_text] = useState("")
    const [validate_email_input, setvalidate_email_input] = useState(true)
    const [user_data_obj, setuser_data_obj] = useState({
        name: "test",
        email: "test@gmail.com",
        phone: "01223490505"
    })

    // Fetch user data from AsyncStorage on component mount
    useEffect(() => {
        storeData()
    }, [])

    // Function to fetch user data from AsyncStorage
    async function storeData() {
        let data = JSON.parse(await AsyncStorage.getItem("user_data"))
        setname_input(data.name)
        setemail_input(data.email)
        setphone_input(data.phone)
        setuser_data_obj(data)
    }

    // Function to check and update the styling of the name input
    function check_name(name_value) {
        if (name_value.length > 0) {
            if (name_value.length < 3) {
                setname_input_border(App_Colors.red)
            } else {
                setname_input_border(App_Colors.green)
            }
        } else {
            setname_input_border(App_Colors.red)
        }
    }

    // Function to validate email input and update styling accordingly
    function validateEmail(text) {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (text.length == 0) {
            setemail_input_border(App_Colors.red)
            setvalidate_email_input(false)
        } else {
            if (reg.test(text) === false && text.length > 0) {
                setemail_input_border(App_Colors.red)
                setvalidate_email_input(false)
            } else {
                setemail_input_border(App_Colors.green)
                setvalidate_email_input(true)
            }
        }
    };

    // Function to check and update the styling of the phone input
    function check_phone(num) {
        if (num.length == 0) {
            setphone_input_border(App_Colors.red)
        } else {
            if (num.length < 3) {
                setphone_input_border(App_Colors.red)
            } else if (
                (num.startsWith("015") ||
                    num.startsWith("012") ||
                    num.startsWith("011") ||
                    num.startsWith("010")) &&
                num * 0 == 0 &&
                num.length == 3
            ) {
                setphone_input_border(App_Colors.green)
            } else if (num.length != 11) {
                setphone_input_border(App_Colors.red)
            } else {
                setphone_input_border(App_Colors.green)
            }
        }
    }

    // Function to handle submission button press
    async function submitionButton() {
        let error = 0;
        if (name_input.length == 0 || name_input.length < 3) {
            setname_warning_text("The name must be consist of at least three letters")
            error++
        } else {
            setname_warning_text("")
        }
        if (validate_email_input == false) {
            setemail_warning_text("You must enter a valid email")
            error++
        } else {
            setemail_warning_text("")
        }
        if (phone_input.length == 0) {
            setphone_warning_text("You must enter a valid phone number")
            error++
        } else if (
            phone_input.length != 11 ||
            (!phone_input.startsWith("015") &&
                !phone_input.startsWith("012") &&
                !phone_input.startsWith("011") &&
                !phone_input.startsWith("010")) ||
            phone_input * 0 != 0
        ) {
            setphone_warning_text("You must enter a valid phone number")
            error++
        } else {
            setphone_warning_text("")
        }
        if (error > 0) {
            seteditable_modal(true)
        } else {
            seteditable_modal(false)
            setname_input_border("#999")
            setemail_input_border("#999")
            setphone_input_border("#999")
            let new_userdata = {
                name: name_input,
                email: email_input,
                phone: phone_input
            }
            await AsyncStorage.setItem("user_data", JSON.stringify(new_userdata))
            setuser_data_obj(new_userdata)
        }
    }

    // Body component to display user data
    function _Body() {
        return (
            <View style={style.container}>
                <TouchableOpacity
                    onPress={() => {
                        seteditable_modal(true)
                    }}
                    style={style.user_container_data}>
                    {/* User data view */}
                    <View style={style.user_view}>
                        <View style={style.data_image_view}>
                            <Image source={images.name} style={style.data_image} />
                        </View>
                        <View style={style.labal_view}>
                            <Text style={style.label_text}>Name</Text>
                            <Text style={style.data_text}>{user_data_obj.name}</Text>
                        </View>
                    </View>

                    <View style={style.user_view}>
                        <View style={style.data_image_view}>
                            <Image source={images.email} style={style.data_image} />
                        </View>
                        <View style={style.labal_view}>
                            <Text style={style.label_text}>Email</Text>
                            <Text style={style.data_text}>{user_data_obj.email}</Text>
                        </View>
                    </View>

                    <View style={style.user_view}>
                        <View style={style.data_image_view}>
                            <Image source={images.phone} style={style.data_image} />
                        </View>
                        <View style={style.labal_view}>
                            <Text style={style.label_text}>Phone number</Text>
                            <Text style={style.data_text}>{user_data_obj.phone}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // Editable_usermodal component for editing user data
    function _Editable_usermodal() {
        return (
            <Modal
                visible={editable_modal}
                onRequestClose={() => {
                    seteditable_modal(false)
                }}
                animationType="slide"
                transparent={true}
            >
                {/* Modal content */}
                <View style={style.modal_black_view}>
                    <TouchableWithoutFeedback
                        style={style.touch_withoutfeedback}
                        onPress={() => {
                            seteditable_modal(false)
                        }}
                    >
                        <View style={style.feed_backview} />
                    </TouchableWithoutFeedback>
                    {/* Editable user data form */}
                    <View style={style.bigContainer}>
                        <ScrollView>
                            <View style={style.container_modal}>
                                {/* Modal title */}
                                <View style={style.modal_title_view}>
                                    <Text style={style.modal_title_text}>Edit Data</Text>
                                </View>
                                {/* Name input */}
                                <View style={style.input_view}>
                                    <Text style={style.lable_modal_text}>Name</Text>
                                    <TextInput
                                        style={[
                                            style.input_style,
                                            { borderWidth: 1, borderColor: name_input_border },
                                        ]}
                                        placeholder="Name"
                                        placeholderTextColor={"#777"}
                                        value={name_input}
                                        onChangeText={(value) => {
                                            setname_input(value)
                                            check_name(value)
                                        }}
                                    />
                                    {name_warning_text == "" ? null : (
                                        <Text style={{
                                            color: App_Colors.red,
                                            textAlign: "center"
                                        }}>{name_warning_text}</Text>
                                    )}
                                </View>
                                {/* Email input */}
                                <View style={style.input_view}>
                                    <Text style={style.lable_modal_text}>Email</Text>
                                    <TextInput
                                        style={[
                                            style.input_style,
                                            { borderWidth: 1, borderColor: email_input_border },
                                        ]}
                                        placeholder="Email"
                                        placeholderTextColor={"#777"}
                                        value={email_input}
                                        onChangeText={(value) => {
                                            setemail_input(value.trim())
                                            validateEmail(value.trim())
                                        }}
                                    />
                                    {email_warning_text == "" ? null : (
                                        <Text style={{
                                            color: App_Colors.red,
                                            textAlign: "center"
                                        }}>{email_warning_text}</Text>
                                    )}
                                </View>
                                {/* Phone number input */}
                                <View style={style.input_view}>
                                    <Text style={style.lable_modal_text}>Phone Number</Text>
                                    <TextInput
                                        style={[
                                            style.input_style,
                                            { borderWidth: 1, borderColor: phone_input_border },
                                        ]}
                                        placeholder="Phone number"
                                        placeholderTextColor={"#777"}
                                        keyboardType="numeric"
                                        value={phone_input}
                                        onChangeText={(value) => {
                                            setphone_input(value.trim())
                                            check_phone(value.trim())
                                        }}
                                    />
                                    {phone_warning_text == "" ? null : (
                                        <Text style={{
                                            color: App_Colors.red,
                                            textAlign: "center"
                                        }}>{phone_warning_text}</Text>
                                    )}
                                </View>
                                {/* Submission button */}
                                <TouchableOpacity
                                    onPress={() => {
                                        seteditable_modal(false)
                                        submitionButton()
                                    }}
                                    style={style.submittedButton}
                                >
                                    <Text style={style.submittedButton_text}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <TouchableWithoutFeedback
                        style={style.touch_withoutfeedback}
                        onPress={() => {
                            seteditable_modal(false)
                        }}
                    >
                        <View style={style.feed_backview2} />
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        )
    }

    // Rendering the components
    return (
        <>
            {_Body()}
            {_Editable_usermodal()}
        </>
    )
}

// Styles for the components
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: App_Colors.white,
    },
    user_container_data: {
        height: 300, width: "90%",
        backgroundColor: App_Colors.white,
        elevation: 4,
        alignSelf: "center",
        marginTop: 50,
        borderRadius: 20,
        padding: 10
    },
    user_view: {
        height: 100,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    data_image_view: {
        width: "30%",
        height: "70%",
        alignItems: "center"
    },
    data_image: {
        resizeMode: "center",
        height: 50,
        width: 50
    },
    labal_view: {
        width: "70%",
        height: "100%",
        justifyContent: "center"
    },
    label_text: {
        fontSize: 18,
        fontWeight: "bold",
        color: App_Colors.black
    },
    data_text: {
        fontSize: 15,
        color: "#999",
    },
    modal_black_view: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        justifyContent: 'center',
    },
    touch_withoutfeedback: {
        flex: 1
    },
    feed_backview: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    feed_backview2: {
        width: '100%',
    },
    bigContainer: {
        justifyContent: 'center',
    },
    container_modal: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        paddingVertical: 20,
    },
    modal_title_view: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_title_text: {
        color: App_Colors.black,
        fontWeight: 'bold',
        fontSize: 18
    },
    input_view: {
        width: "90%",
        alignSelf: "center",
    },
    lable_modal_text: {
        fontSize: 18,
        fontWeight: "bold",
        color: App_Colors.black,
        marginVertical: 10
    },
    input_style: {
        padding: 15,
        backgroundColor: "#ddd",
        color: "#000",
        borderRadius: 10,
    },
    submittedButton: {
        padding: 10,
        width: 140,
        backgroundColor: App_Colors.black,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 15,
        borderRadius: 10
    },
    submittedButton_text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
})

// Exporting the Settings component
export default Settings;
