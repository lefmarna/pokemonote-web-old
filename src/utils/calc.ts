/**
 * 全角数値を半角数値に変換する。また、数値以外の文字や記号も取り除く。
 */
export const convertHalfWidthNumber = (str: string): number | null => {
  const convertNumber = Number(
    str.replace(/[０-９]/g, (s: string) => {
      return String.fromCharCode(s.charCodeAt(0) - 65248).replace(
        /[^0-9]/g,
        ""
      );
    })
  );
  if (!convertNumber) return null;
  return convertNumber;
};

/**
 * 小数点を切り捨てる、また、nullや負の数には初期値を返していく
 */
export const numberToInt = (value: number, defaultValue = 0): number => {
  if (String(value) === "" || value < defaultValue) {
    return defaultValue;
  } else {
    return Math.floor(value);
  }
};

/**
 * 代入する値を検証して返す
 */
export const valueVerification = (
  value: number,
  max: number
): number | null => {
  if (value > max) {
    return max;
  } else if (value <= 0) {
    return null;
  } else {
    return Math.floor(value);
  }
};
