 
 const express = require('express');
const bodyParser = require('body-parser');
const scribble = require('scribbletune');

const app = express();
app.use(express.static('form')); //フォルダのロード（読み込み）

//HTMLリクエストのbodyをjsonと解釈させる
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/sendFeeling', (req, res) => {
  console.log(req.body);
  res.status(200).json({ //レスポンスコード =>特定のHTTP通信が成功したか否か （例）今は200番で、リクエストが成功なら、その本文を返す。
    inputedFeeling: req.body.yourFeeling,
  });

if(req.body.yourFeeling=="good"){
  const clip1 = scribble.clip({
    notes: [
          scribble.chord('Dm', 3),
          scribble.chord('Am', 3),
          scribble.chord('E#', 3),
          scribble.chord('B#', 3),
      ],
      pattern:'[x_][xx][xx][x_]'.repeat(4), // _と-の違い分からん
      accent: '-x-x-x-x', //２拍４拍にアクセント付けてる
      //'x_-x_-x_-x_-'
  });
  scribble.midi(clip1, 'sample1.mid');}
  else{console.log("Once Again")};
});

app.listen(3000, () => console.log('Listening on port 3000...'));
//ポート3000で接続
//localならhttp://localhost:3000/
