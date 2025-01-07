import stylesApp from "../../../style/appStyle.js";
import {ActivityIndicator, View} from "react-native";
import {colors} from "../../../style/styleValues.js";
import React from "react";

export const Loading = () => {
    return(
        <View style={stylesApp.container}>
            <ActivityIndicator size="large" color={colors.appFirstColor} />
        </View>
    )
}
