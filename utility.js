/**
 * 日本語の日付文字列（例: "YYYY年MM月DD日"）を解析してDateオブジェクトを返します。
 * 解析できない場合はnullを返します。
 * @param {string} dateString - 解析する日付文字列。
 * @returns {Date|null} 解析されたDateオブジェクト、または解析できない場合はnull。
 */
function parseJapaneseDateString(dateString) {
  const match = dateString.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日(?:(\d{1,2})時(\d{1,2})分(\d{1,2})秒)?$/);
  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // Month is 0-indexed in Date
    const day = parseInt(match[3], 10);
    const hour = match[4] ? parseInt(match[4], 10) : 0;
    const minute = match[5] ? parseInt(match[5], 10) : 0;
    const second = match[6] ? parseInt(match[6], 10) : 0;
    return new Date(year, month, day, hour, minute, second);
  }
  return null;
}

/**
 * 2つの日付間の年齢差を計算します。
 * date1とdate2は、Dateオブジェクト、標準のDateコンストラクタが解析できる文字列、
 * または「YYYY年MM月DD日」あるいは「YYYY年MM月DD日HH時MM分SS秒」形式の日本語文字列であることができます。
 * @param {Date|string} date1 - 比較する最初の（通常はより古い）日付。
 * @param {Date|string} date2 - 比較する2番目の（通常はより新しい）日付。
 * @returns {number} 計算された年齢差（date2 - date1）。
 * @throws {Error} date1またはdate2が無効な日付の場合。
 */
function getAge(date1, date2) {
  const d1 = parseJapaneseDateString(date1) || new Date(date1);
  const d2 = parseJapaneseDateString(date2) || new Date(date2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error('Invalid date provided. Please ensure date1 and date2 are valid date strings.');
  }

  let age = d2.getFullYear() - d1.getFullYear();
  const monthDiff = d2.getMonth() - d1.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && d2.getDate() < d1.getDate())) {
    age--;
  }
  return age;
}