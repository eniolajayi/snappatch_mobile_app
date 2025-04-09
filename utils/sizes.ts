import { Dimensions, PixelRatio } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const wdp = (percent: number) => {
    return PixelRatio.roundToNearestPixel(screenWidth * percent / 100);
};

const hdp = (percent: number) => {
    return PixelRatio.roundToNearestPixel(screenHeight * percent / 100);
};

const wpx = (value: number): number => {
    return (value / screenWidth) * 100;
};

const hpx = (value: number): number => {
    return (value / screenHeight) * 100;
};

export const wp = (px: number) => {
    return wdp(wpx(px))
}

export const hp = (px: number) => {
    return hdp(hpx(px))
}

export const sp = (px: number) => {
    return hdp(hpx(px))
}

const FONTSIZES = {
    /**
    * 12px
    */
    xs: sp(12),
    /**
    * 14px
    */
    sm: sp(14),
    /**
    * 16px
    */
    base: sp(16),
    /**
    * 18px
    */
    lg: sp(18),
    /**
    * 20px
    */
    xl: sp(20),
    /**
    * 24px
    */
    _2xl: sp(24),
    /**
    * 30px
    */
    _3xl: sp(30),
    /**
    * 36px
    */
    _4xl: sp(36),
};


const base = 4;
const SPACING = {
    /**
     * 2px
     */
    xxxs: wdp(wpx(base * 0.5)),

    /**
     * 4px
     */
    xxs: wdp(wpx(base * 1)),

    /**
     * 6px
     */
    xs: wdp(wpx(base * 1.5)),

    /**
     * 8px
     */
    sm: wdp(wpx(base * 2)),

    /**
     * 10px
     */
    lg: wdp(wpx(base * 2.5)),

    /**
     * 12px
     */
    xl: wdp(wpx(base * 3)),

    /**
     * 14px
     */
    xxl: wdp(wpx(base * 3.5)),

    /**
     * 16px
     */
    xxxl: wdp(wpx(base * 4)),

    /**
   * 20px
   */
    _5xl: wdp(wpx(base * 5)),

    /**
     * 24px
     */
    _6xl: wdp(wpx(base * 6)),

    /**
     * 28px
     */
    _7xl: wdp(wpx(base * 7)),

    /**
     * 32px
     */
    _8xl: wdp(wpx(base * 8)),

    /**
     * 36px
     */
    _9xl: wdp(wpx(base * 9)),

    /**
     * 40px
     */
    _10xl: wdp(wpx(base * 10)),
};

const SIZES = {
    radius: 8,
}

export {
    FONTSIZES as fz,
    SIZES as sizes,
    SPACING as spacing,
};