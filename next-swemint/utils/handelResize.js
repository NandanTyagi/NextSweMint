export const handelResize = () => {
    if (window.innerWidth >= 682) {
        return true
    }
    if (window.innerWidth < 682) {
        return false
    }
}

export default handelResize