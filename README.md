# Pokemonote

『[Pokemonote](https://pokemonote.com/)』は、『ポケットモンスター』シリーズのゲームを遊んでいるユーザーを対象とした Web サービスです。
ポケモンのステータスを計算し、みんなで投稿し合って、シェアできる場にすることを目的としています。

## DEMO

[![Pokemonote](https://i.gyazo.com/ddd714c806ca795e579b2cd2fb45e92a.gif)](https://gyazo.com/ddd714c806ca795e579b2cd2fb45e92a)

## Hope

『Pokemonote』は、ポケモンを育てる際に「努力値をどう振るのが正解なのかわからないよ〜！」という方の悩みを解決したいという想いのもと作られました。

そのため、「より簡単に分かりやすく、**効率的**に計算できる仕組みを提供しよう！」という部分に力を入れています。

投稿機能を設けたのは、他の人が投稿したポケモンを参考にできる環境も提供したいと考えたからです。どのポケモンがどういうステータスに調整されているのかを知ることは学びも多いはずです。

## Features

『Pokemonote』には、面倒なポケモンのステータス計算を簡単に行うための仕組みがたくさん詰まっています！

- ポケモンや性格の入力は、ひらがな・カタカナ・そして、**ローマ字**でも入力が可能となっています。
- **全ての値がリアルタイムに計算される**ため、各種パラメーターを確認しながら調整することが可能です。
- 努力値から実数値、実数値から努力値の双方向での計算に対応しています。
- スマホにも PC にも対応した見やすい画面になっています。
- **耐久調整を 1 ボタンで行える機能**を搭載しています。（最も理想的な耐久値を割り出し、余った努力値を振り分けます）
- 耐久指数も確認できるため、細かいところまでこだわりたい方にもおすすめです。
- 登録したポケモンのステータスを簡単にコピーして貼り付けることもできます。
- ページの遷移がスムーズに行える仕組みを採用しています。

投稿機能以外にも、「素早さ計算機」や「種族値ランキング」といった『ポケットモンスター』シリーズのゲームを遊ぶ上で役立つツールを公開しているので、そちらも是非お試しください。

## Tools

『Pokemonote』では、メインの投稿機能以外にも 2 つのツールを用意しています。

### 素早さ計算機

ポケモンのステータスを考える際、先に素早さの指標だけ決めておくというのはよくある手法かと思います。そこで、素早さに関しては専用の計算機を用意しました。

計算したポケモンは投稿ページにも反映されるようになっているため、計算から投稿までを簡単に行うことができます。

[![Image from Gyazo](https://i.gyazo.com/dc50de2c4256f0b75af71b559bf20bf5.gif)](https://gyazo.com/dc50de2c4256f0b75af71b559bf20bf5)

### 種族値ランキング

『Pokemonote』を利用しているユーザーは、数値にこだわりがある人が多いと思います。そこで、ポケモンの種族値ランキングも用意しました。こちらのツールでは、各ステータス毎のソートを行ったり、伝説のポケモンの表示・非表示を動的に切り替えることが可能です。

ですが、その機能はおまけでして、一番の目玉は**不問箇所抜きでの種族値ランキング**を作れることです。攻撃や特攻抜きでの「実質種族値での種族値ランキング」を見れるのはここだけだと思います！

[![Image from Gyazo](https://i.gyazo.com/805b815350a5665fda53a19fe3f25f4f.gif)](https://gyazo.com/805b815350a5665fda53a19fe3f25f4f)

## Usage

計算を行うだけでしたらログインは不要ですが、投稿機能を利用するためには「アカウント作成」を行い、ログインしてもらう必要があります。

テスト用のアカウントも用意していますので、お気軽にご利用ください。

- メールアドレス: test@test.com
- パスワード: 8Ks6dSgT8FyrB

※現時点では投稿したポケモンは全て公開される仕様となっていますので、予めご了承ください。将来的には公開・非公開のオプションをつけたいと考えています。

## Contribution

『Pokemonote』を気に入った方は、[こちらのページ](https://pokemonote.com/give-tip)（ログインが必要です）からチップを贈っていただけると開発の励みになります。

運営にはサーバー代やドメイン代がかかっているので、応援していただけるととてもありがたいです。

※現在はテストモードで動作しているため、チップを贈ることはできません。

### 動作確認用のカード情報

- 番号：4242424242424242
- 有効期限：登録時より未来
- セキュリティコード：123

## Disclaimer

『Pokemonote』は個人の運営するファンサイトであり、株式会社ポケモンや任天堂、その他各企業様とは一切関係ありません。

ポケットモンスター・ポケモン・Pokémon は任天堂・クリーチャーズ・ゲームフリークの登録商標です。

## References

技術的な内容については、[こちら](https://github.com/lefmarna/pokemonote_backend#readme)に記載しています。
