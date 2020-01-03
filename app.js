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
//TODO: goodの方がただのコピペだから直す

//伴奏
function randomAccompanimentPattern(){
  const patternList = ['[xx][xx][xx][xx]','[xxxx][xxxx][xxxx][xxxx]']; //[]の検証
  //空だと、なんも音ならないだけ
  const number = Math.floor(Math.random()*patternList.length);
  const selectedpattern = patternList[number];
  return selectedpattern;
  }
  const clipForAccompaniment = scribble.clip({
    notes: [
          scribble.chord('D', 3),
          scribble.chord('A', 3),
          scribble.chord('B', 3),
          scribble.chord('G', 3),
      ],
      pattern:randomAccompanimentPattern().repeat(4), // _と-の違い分からん
      accent: '-x-x-x-x', //２拍４拍にアクセント付けてる
      //'x_-x_-x_-x_-'
  });

//ベース
  const ptn = 'xxxx'.repeat(7);
  const A = 'xxx[x[RR]]';
  const B = 'xx[x[RR]][x[RR]]';
  const C = 'x-[x[RR]]';
  const clipForBase = scribble.clip({
      notes: 'c4',
      pattern: ptn + A + ptn + B + ptn + A + ptn + C,
  });

//melody
  function selectedMelo(melody){
    const goodMelody = ['d4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5'];
    const number = Math.floor(Math.random()*goodMelody.length);
    changedMelo = ()=>{
        let melody2 = ['d4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5'];
        const number2 = Math.floor(Math.random()*melody2.length);
        goodMelody[number] = melody2[number2];
        return goodMelody;
    }
    return changedMelo();}

  function randomMeloPattern(){
    const patternList = ['x','[xx]','[xxx]','[xxxx]','_','-','']; //[]の検証
    //空だと、なんも音ならないだけ
    const number = Math.floor(Math.random()*patternList.length);
    const selectedpattern = patternList[number];
    return selectedpattern;
}
function selectedRandamPattern(){
    const pattern1 = randomMeloPattern()
    const pattern2 = randomMeloPattern()
    const pattern3 = randomMeloPattern()
    const pattern4 = randomMeloPattern()
    const selectedRandamPattern = pattern1+pattern2+pattern3+pattern4;
    return selectedRandamPattern;
}
  const clipForMelody = scribble.clip({
    notes: selectedMelo(),  //TODO: ランダムメロに変えると、実装される
    //TODO:アルペジオとかも使ってみる？
    pattern: selectedRandamPattern().repeat(12),
    shuffle: true
});

//midファイル生成群
  scribble.midi(clipForAccompaniment, 'accompaniment.mid');
  scribble.midi(clipForBase, 'base.mid');
  scribble.midi(clipForMelody, 'melody.mid');
}

else if(req.body.yourFeeling=="sad"){
//伴奏
  function randomAccompanimentPattern(){
  const patternList = ['[xxxx]','[xx]-[xx]-','[xx][x_][xx][x_]','[x_][xx][xx][x_]']; //[]の検証
  //空だと、なんも音ならないだけ
  const number = Math.floor(Math.random()*patternList.length);
  const selectedpattern = patternList[number];
  return selectedpattern;
  }
  const clipForAccompaniment = scribble.clip({
    notes: [
          scribble.chord('Dm', 3),
          scribble.chord('Am', 3),
          scribble.chord('E#', 3),
          scribble.chord('B#', 3),
      ],
      pattern:randomAccompanimentPattern().repeat(4), // _と-の違い分からん
      accent: '-x-x-x-x', //２拍４拍にアクセント付けてる
      //'x_-x_-x_-x_-'
  });

//ベース
  const ptn = 'xxxx'.repeat(7);
  const A = 'xxx[x[RR]]';
  const B = 'xx[x[RR]][x[RR]]';
  const C = 'x-[x[RR]]';
  const clipForBase = scribble.clip({
      notes: 'c4',
      pattern: ptn + A + ptn + B + ptn + A + ptn + C,
  });

//melody


  function selectedMelo(melody){
    const sadMelody = ['d4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5'];
    const number = Math.floor(Math.random()*sadMelody.length);
    changedMelo = ()=>{
        let melody2 = ['d4', 'e4', 'f4', 'g4', 'a4', 'b4', 'c5', 'd5'];
        const number2 = Math.floor(Math.random()*melody2.length);
        sadMelody[number] = melody2[number2];
        return sadMelody;
    }
    return changedMelo();}

  function randomMeloPattern(){
    const patternList = ['x','[xx]','[xxx]','[xxxx]','_','-','']; //[]の検証
    //空だと、なんも音ならないだけ
    const number = Math.floor(Math.random()*patternList.length);
    const selectedpattern = patternList[number];
    return selectedpattern;
}
function selectedRandamPattern(){
    const pattern1 = randomMeloPattern()
    const pattern2 = randomMeloPattern()
    const pattern3 = randomMeloPattern()
    const pattern4 = randomMeloPattern()
    const selectedRandamPattern = pattern1+pattern2+pattern3+pattern4;
    return selectedRandamPattern;
}
  const clipForMelody = scribble.clip({
    notes: selectedMelo(),  //TODO: ランダムメロに変えると、実装される
    //TODO:アルペジオとかも使ってみる？
    pattern: selectedRandamPattern().repeat(12),
    shuffle: true
});

//midファイル生成群
  scribble.midi(clipForAccompaniment, 'accompaniment.mid');
  scribble.midi(clipForBase, 'base.mid');
  scribble.midi(clipForMelody, 'melody.mid');
}
  else{console.log("Once Again")};
});

app.listen(3000, () => console.log('Listening on port 3000...'));
//ポート3000で接続
//localならhttp://localhost:3000/
