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
