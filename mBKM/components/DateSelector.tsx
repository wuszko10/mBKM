import React,{ useState } from "react";
import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import DateTimePicker,{ DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { colors,dimensions } from "../style/styleValues.js";

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
        const currentDate = selectedPickerDate || selectedDate;
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        setSelectedDate(currentDate);
        setShowPicker(false);
        setShowDate(true);
    };

    const showMode = (currentMode: any) => {
        setShowPicker(true);
        setMode(currentMode);
    };

    return (
        <View>

            <TouchableOpacity onPress={() => showMode('date')} style={localStyle.dateButton}>
                { showDate ? (
                    <Text>{selectedDate.toLocaleDateString()}</Text>
                ) : (
                    <Text>Wybierz datę</Text>
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
