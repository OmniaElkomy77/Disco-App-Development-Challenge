// Import necessary modules from React and React Native
import React from "react";
import { View, StyleSheet } from "react-native";
import { App_Colors, App_Size } from "../constant/Theme";

// Importing components for LineChart and PieChart from "react-native-chart-kit"
import { LineChart, PieChart } from "react-native-chart-kit";

// Data for the PieChart component
const data = [
    {
        name: "Food",
        population: 40,
        color: App_Colors.black,
        legendFontColor: App_Colors.dark_gray,
        legendFontSize: 15,
    },
    {
        name: "Clothes",
        population: 30,
        color: App_Colors.gray,
        legendFontColor: App_Colors.dark_gray,
        legendFontSize: 15
    },
    {
        name: "Transportation",
        population: 30,
        color: App_Colors.light_gray,
        legendFontColor: App_Colors.dark_gray,
        legendFontSize: 15
    },
];

// Data for the LineChart component
const data2 = {
    labels: ["Food", "Clothes", "Transportation"],
    datasets: [
        {
            data: [40, 30, 30],
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
            strokeWidth: 3 // optional
        }
    ],
    legend: ["Total Expenses"] // optional
};

// Configuration for both charts
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

// Chart component that renders PieChart and LineChart
const Chart = ({ }) => {
    return (
        <View style={style.container}>

            {/* PieChart component */}
            <PieChart
                data={data}
                width={App_Size.width}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                center={[10, 20]}
            />

            {/* LineChart component */}
            <LineChart
                data={data2}
                width={App_Size.width}
                height={256}
                verticalLabelRotation={15}
                chartConfig={chartConfig}
                bezier
            />
        </View>
    )
}

// Styles for the component
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: App_Colors.white,
        justifyContent: "space-around",
        alignItems: "center"
    }
});

// Exporting the Chart component
export default Chart;
