# utility-js-for-memento

Memento Database の JavaScript スクリプトに組み込んで使う、小さなユーティリティ集です。日本語の日付の変換、年齢計算、複数項目の合計によるレコード選択をまとめています。

## 対応環境・導入

- Memento Database の JavaScript スクリプトでの利用を想定しています。
- 外部パッケージは不要です。`utility.js` の関数を、呼び出し元から参照できるスクリプト内に追加してください。
- npm パッケージや ES Modules としてのエクスポートはありません。

## 関数

| 関数 | 用途・戻り値 |
|---|---|
| `parseJapaneseDateString(value)` | `2025年4月10日` または `2025年4月10日12時30分00秒` を `Date` に変換します。`Date` はそのまま返し、形式が一致しない場合は `null` を返します。 |
| `getAge(from, to)` | 2つの日付の間の満年数を返します。`Date`、上記の日本語形式、`Date` コンストラクタが解析できる文字列を受け取り、無効な日付にはエラーを返します。 |
| `getAgeFromBirthday(birthday)` | 誕生日の **`Date` オブジェクト**から、現在の満年齢を返します。 |
| `getMaxSumRecordString(records, keys)` | 指定した項目の数値合計が最大のレコードを選び、その全プロパティを文字列で返します。空の配列では `null` を返します。 |

## 使用例

以下は `utility.js` の関数を追加した後、同じスクリプト内で呼び出す例です。

```js
const date = parseJapaneseDateString("2025年4月10日");
const years = getAge("2000年4月10日", "2025年4月9日");
// years: 24

const age = getAgeFromBirthday(new Date(2000, 3, 10));
// 月は0始まりなので、3は4月です。ageは実行日時によって変わります。

const records = [
  { name: "A", attack: 10, defense: 3 },
  { name: "B", attack: 8, defense: 9 },
];
const best = getMaxSumRecordString(records, ["attack", "defense"]);
// "name: B, attack: 8, defense: 9, "
```

## 入力・出力の補足

- `records` は通常の JavaScript オブジェクトの配列です。Memento のレコードから使う場合は、必要なフィールド値をオブジェクトに取り出して渡してください。
- 合計には `number` 型だけを使い、文字列の数値・未定義の項目・`NaN` は加算しません。同点の場合は配列内の最初のレコードを選びます。全項目が数値以外の場合も、最初のレコードが選ばれます。
- レコードの出力は末尾に `, ` が付く文字列です。
- 日付計算は実行環境のローカル日付に基づきます。日本語形式の変換には暦上の日付の厳密な検証はなく、存在しない日付が `Date` によって繰り上がる場合があります。
