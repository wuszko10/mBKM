import React,{ useState } from "react";
import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import DateTimePicker,{ DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { colors,dimensions } from "../../style/styleValues.js";
import stylesApp from "../../style/appStyle.js";
import style from "./style.tsx";

type DateSelectorProps = {
    showDate: boolean;
    setShowDate: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};
const DateSelector: React.FC<DateSelectorProps> = (
    {showDate, setShowDate, selectedDate, setSelectedDate}
) => {

    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState();


    const onChange = (event:DateTimePickerEvent, selectedPickerDate?: Date) => {
        let  currentDate = selectedPickerDate || selectedDate;

        currentDate = new Date(currentDate);
        currentDate.setHours(0, 0, 0, 0);

        setSelectedDate(currentDate);
        setShowPicker(false);
        setShowDate(true);
    };

    const showMode = (currentMode: any) => {
        setShowPicker(true);
        setMode(currentMode);
    };

    return (
        <View style={style.inputBox}>


            <Text style={style.labelInputText}>Wybierz datę</Text>

            <TouchableOpacity onPress={() => showMode('date')} style={localStyle.dateButton}>
                { showDate ? (
                    <Text style={stylesApp.blackText}>{selectedDate.toLocaleDateString()}</Text>
                ) : (
                    <Text style={stylesApp.blackText}>Wybierz datę</Text>
                )}

            </TouchableOpacity>

            { showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode={mode}
                    is24Hour={false}
                    minimumDate={new Date()}
                    onChange={onChange}
                />
            )}

        </View>
    )

}

const localStyle = StyleSheet.create({
    dateButton: {
        backgroundColor: colors.appThirdColor,
        height: 50,
        borderRadius: dimensions.radius,
        paddingHorizontal: 15,
        justifyContent: "center",
    },
})

export default DateSelector
