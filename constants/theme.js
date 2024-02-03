import { Dimensions } from "react-native"
const { height, width } = Dimensions.get("window")
const COLORS = {
    primary: "#fefae0",
    green: "#606c38",
    dark: "#283618",
    brown: "#dda15e",
    darkBrown: "#bc6c25"
}

const SIZES = {
    height,
    width
}

export {COLORS, SIZES}
