document.querySelector("button").addEventListener("click", click);

var listNome = ["Nome"];
var listRacf = ["Chave"];

function click(){
  console.log(document.getElementsByClassName("nomeCompleto")[0].value);
  let nomeNorm = normalizarNome(document.getElementsByClassName("nomeCompleto")[0].value);
  let nomeSimp = simplificarNome(nomeNorm);
  let racfNova = "Chave";
  while (listRacf.includes(racfNova)) {
    racfNova = criarUsuario(nomeSimp);
  }
  listNome.push(nomeSimp);
  listRacf.push(racfNova);
  showCreatedRacf(listRacf, listNome);
  //listNome.push(nomeNorm);
  //listRacf.push(nomeNorm);
}

function simplificarNome(nomeCompleto){
  let nomeSimplificado = nomeCompleto.replace(/\s[d,D]\w{1,2}/,"");
  let nomeEscape = String(nomeSimplificado.match(/[ˆa-zA-Z' ]+/,""));
  let nomeSemTags = nomeEscape.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, "");
  return nomeSemTags;
}

function normalizarNome(nomeSimplificado){
  let nomeNormalizado = String(nomeSimplificado).toUpperCase();
  nomeNormalizado = nomeNormalizado.replace("\n","");
  nomeNormalizado = nomeNormalizado.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return nomeNormalizado;
}

function randomList(numMax){
  let nList = Array.from(Array(numMax).keys());
  let rList = Array(numMax);
  for (i = numMax-1; i >= 0; i--){
    let randIndex = Math.floor(Math.random() * (i + 1));
    let rListInd = numMax - (i+1);
    rList[rListInd] = nList[randIndex];
    nList.splice(randIndex, 1);
  }
  return rList;
}


function criarUsuario(nomeNormalizado){
  const nomeQuebrado = nomeNormalizado.split(" ");
  let racf = "";
  let randListItem = randomList(nomeQuebrado.length);
  for (let i = 0; i < nomeQuebrado.length; i++){
    let j = randListItem[i];
    let randNumber = Math.floor(Math.random() * (nomeQuebrado[j].length + 1));
    if (nomeQuebrado[j].length - randNumber >= 4){
      racf += nomeQuebrado[j].substr(randNumber, 4);
      console.log(racf);
    }else if (randNumber >= 4) {
      racf += nomeQuebrado[j].substr(randNumber-4,4);
      console.log(racf);
    }else{
      racf += nomeQuebrado[j].substr(0,4);
      console.log(racf);
    }
  }
  return racf.substr(0,8);
}

function showCreatedRacf(racf, nome){
  var txt = "";
  for(let i=0; i<racf.length;i++){
    txt += nome[i] + " - " + racf[i] + "<br>";
  }
  document.getElementById("show").innerHTML = txt;
}
