import DropDownPicker from "react-native-dropdown-picker";
import React,{ useState } from "react";
import { View } from "react-native";
import stylesApp from "../../style/stylesApp.js";

type ReliefSelectorProps = {
    loading: boolean;
    selectedValue: any;
    setSelectedValue: React.Dispatch<React.SetStateAction<any>>;
    data: any;
    placeholder: string;
};

const DropdownSelector: React.FC<ReliefSelectorProps> = (
    {
        loading,
        selectedValue,
        setSelectedValue,
        data,
        placeholder,
    }) => {

    const [openPicker, setOpenPicker] = useState(false);

    return (
        <View>
            <DropDownPicker
                loading={loading}
                open={openPicker}
                value={selectedValue}
                items={data}
                setOpen={setOpenPicker}
                setValue={setSelectedValue}
                placeholder={placeholder}
                style={stylesApp.dropdown}
                dropDownContainerStyle={stylesApp.dropdownContainer}
            />
        </View>

    )
}

export default DropdownSelector;
