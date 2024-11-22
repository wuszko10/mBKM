import DropDownPicker from "react-native-dropdown-picker";
import React,{ useState } from "react";
import { View } from "react-native";
import stylesApp from "../style/stylesApp.js";

type ReliefSelectorProps = {
    selectedValue: any;
    setSelectedValue: React.Dispatch<React.SetStateAction<any>>;
    data: any;
    onChangeValueFunction?: (value: any) => void;
    placeholder: string;
};

const DropdownSelector: React.FC<ReliefSelectorProps> = (
    {
        selectedValue,
        setSelectedValue,
        data,
        onChangeValueFunction,
        placeholder,
    }) => {

    const [openPicker, setOpenPicker] = useState(false);

    return (
        <View>
            <DropDownPicker
                open={openPicker}
                value={selectedValue}
                items={data}
                setOpen={setOpenPicker}
                setValue={setSelectedValue}
                placeholder={placeholder}
                style={stylesApp.dropdown}
                dropDownContainerStyle={stylesApp.dropdownContainer}
                onChangeValue={onChangeValueFunction}
            />
        </View>

    )
}

export default DropdownSelector;
