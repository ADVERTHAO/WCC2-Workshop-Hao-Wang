let button;               // button
let pokemonData = null;   // Pokeman Date
let pokemonImg = null;    // Pokeman Pic
let myFont;               

// preload() ttf
function preload() {
  
  myFont = loadFont('tianwangxingxiangsu.ttf');
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textFont(myFont);

 
  button = createButton('POKEMAN GO !');
  button.position(10, 10);
  button.mousePressed(fetchPokemon);
}


async function fetchPokemon() {
  // Random Pokeman id（1~898）
  let id = floor(random(1, 899)); 
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("网络响应错误：" + response.status);
    }
    //  JSON date
    pokemonData = await response.json();
    console.log(pokemonData);

    
    loadImage(
      pokemonData.sprites.front_default,
      (img) => {
        pokemonImg = img;
      },
      (err) => {
        console.error("图片加载失败", err);
        pokemonImg = null;
      }
    );
  } catch (error) {
    console.error("获取宝可梦数据失败：", error);
  }
}

function draw() {
  strokeWeight(5);
  
  fill('red');
  rect(0, 0, width, height / 2);
  
  fill('white');
  rect(0, height / 2, width, height / 2);
  
  fill('white');
  circle(300, 300, 150);

  
  if (pokemonData) {
    textSize(50);
    fill(255);
    text(`#${pokemonData.id} ${capitalize(pokemonData.name)}`, width / 2, 100);

    
    let scaleFactor = 2;

    
    if (pokemonImg) {
      image(
        pokemonImg,
        width / 2 - (pokemonImg.width * scaleFactor) / 2,
        200,
        pokemonImg.width * scaleFactor,
        pokemonImg.height * scaleFactor
      );
    } else {
      textSize(16);
      text("NO PICTURE", width / 2, 250);
    }

    
    textSize(30);
    fill(0);
    let types = pokemonData.types.map(item => capitalize(item.type.name)).join(', ');
    let typeY = 80 + (pokemonImg ? pokemonImg.height * scaleFactor + 30 : 200);
    text(`TYPE: ${types}`, width / 2, 450);
  }
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
