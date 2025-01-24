jest.mock("react-native-gesture-handler", () => ({
    GestureHandlerRootView: jest.fn(({ children }) => children),
    PanGestureHandler: jest.fn(({ children }) => children),
    BaseButton: jest.fn(({ children }) => children),
    RectButton: jest.fn(({ children }) => children),
    ScrollView: jest.requireActual("react-native").ScrollView,
    FlatList: jest.requireActual("react-native").FlatList,
    TouchableOpacity: jest.requireActual("react-native").TouchableOpacity,
}));


jest.mock('react-native-gesture-handler', () => {
    const { View } = require('react-native');
    return {
        PanGestureHandler: View,
        State: {},
        GestureHandlerRootView: View,
    };
});

jest.mock('react-native-mmkv', () => ({
    MMKV: {
        set: jest.fn(() => Promise.resolve()),
        getString: jest.fn(() => Promise.resolve(null)),
        remove: jest.fn(() => Promise.resolve()),
        clearAll: jest.fn(() => Promise.resolve()),
        getAllKeys: jest.fn(() => Promise.resolve([])),
        setMulti: jest.fn(() => Promise.resolve()),
        getMulti: jest.fn(() => Promise.resolve([])),
        removeMulti: jest.fn(() => Promise.resolve()),
    },
}));
