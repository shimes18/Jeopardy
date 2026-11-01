

for (let i=1;i<=5;i++){
    for (let j=1;j<=5;j++){
    document.getElementById(`c${i}q${j}`).innerHTML = j*200;
    }
}

const character_ques= ['hello','hi'],location_ques=['fa','soul society'],stand_ques=['hermit purple', 'tusk'],title_ques=['honored one', 'hope of the universe'];

const quote_ques = ['Naruto','Bleach','One Piece', 'Fullmetal Alchemist','Black Clover','Hunter X Hunter','Monster', 'Death Note','Steins;Gate' , 'Chainsaw Man', 'Evangelion' ]

const categories = [character_ques,location_ques,quote_ques,stand_ques,title_ques]

const qimg = document.getElementById("popupimg");
const question = document.getElementById("popupque");


var anime='';
var selected='';
var already_clicked=[];

document.getElementById("questions").addEventListener("click",async function(e){
    const ques= e.target.closest('.cque');


    selected= ques.id;
    already_clicked.push(selected);

    for (let checkclick=0;checkclick<(already_clicked.length-1);checkclick++){
        if (already_clicked[checkclick]==selected){
            return;
        }
    }

    document.getElementById("popup").style.display="flex"

    document.getElementById("main").style.opacity="0.4";
    const cat_name= ques.parentElement.id[1];
    const cat_difficulty = ques.id[3];
    var i,min,max;

    const chosen = categories[cat_name-1];

    var length= chosen.length;
    
    min= Math.floor(length * (cat_difficulty-1)/5);
    max= Math.floor(length * cat_difficulty/5);
    
    page=Math.floor(Math.random() * 5) + 1 + (cat_difficulty - 1)*3;

    i = Math.floor(Math.random() * (max - min + 1 )) + min;



    if (cat_name==3){
        anime = quote_ques[i];
        quote();
    }
    else if (cat_name==1){    
        question.innerHTML="LOADING.....";
        await image();
        question.innerHTML="";
    }

})

const image_char_id=0,image_char="";

async function quote(q){
        const res= await fetch("https://api.animechan.io/v1/quotes/random?anime=" + encodeURIComponent(anime));
        const json = await res.json();
        const quotes= json.data.content;
        console.log(json);
        document.getElementById("popupque").textContent = quotes;
}

async function image(){
    const res= await fetch("https://api.tenrai.org/v1/characters?page=" + page);
    const json = await res.json();
    const image_char_id= json.data[Math.floor(Math.random()*25)].mal_id;

    const res2 = await fetch(`https://api.tenrai.org/v1/characters/${image_char_id}/pictures`);
    const json2 = await res2.json();
    const image_char = json2.data[0].jpg.image_url;

    const res3= await fetch(`https://api.tenrai.org/v1/characters/${image_char_id}/anime`);
    const json3 = await res3.json();
    const img_mal_id = json3.data[0].anime.mal_id;

    const res4= await fetch(`https://api.tenrai.org/v1/anime/${img_mal_id}`);
    const json4 = await res4.json();
    anime = json4.data.titles[2].title;

    console.log(image_char);
    console.log(anime);
    console.log(image_char_id);
    qimg.src = image_char;
}

