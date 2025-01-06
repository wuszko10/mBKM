import DropDownPicker from "react-native-dropdown-picker";
import React,{ useState } from "react";
import { Text,View } from "react-native";
import stylesApp from "../../style/stylesApp.js";
import style from "./style.tsx";

type ReliefSelectorProps = {
    selectedValue: any;
    setSelectedValue: React.Dispatch<React.SetStateAction<any>>;
    data: any;
    placeholder: string;
};

const DropdownSelector: React.FC<ReliefSelectorProps> = (
    {
        selectedValue,
        setSelectedValue,
        data,
        placeholder,
    }) => {

    const [openPicker, setOpenPicker] = useState(false);

    return (
        <View style={style.inputBoxSelector}>
            <Text style={style.labelInputText}>{placeholder}</Text>
            <DropDownPicker
                open={openPicker}
                value={selectedValue}
                items={data}
                setOpen={setOpenPicker}
                setValue={setSelectedValue}
                placeholder={placeholder}
                style={style.dropdown}
                dropDownContainerStyle={style.dropdownContainer}
            />
        </View>

    )
}

export default DropdownSelector;
