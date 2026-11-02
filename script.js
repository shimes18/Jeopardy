

for (let i=1;i<=5;i++){
    for (let j=1;j<=5;j++){
    document.getElementById(`c${i}q${j}`).innerHTML = j*200;
    }
}

var player_no=1;
var current_turn=1;

var point = [0,0,0];

document.getElementById("player1").innerHTML = "Player 1: " + point[1];
document.getElementById("player2").innerHTML = "Player 2: " + point[2];

document.getElementById("playerturn").innerHTML = "Player " + player_no + " turn";

const character_ques= [],location_ques=[],stand_ques=[],title_ques=[];

const quote_ques = ['Naruto','Bleach','One Piece','Black Clover','Jujutsu Kaisen','Hunter X Hunter', 'Attack on titan' ,'Jojo',  'Chainsaw Man','Vinland Saga' ,'Demon slayer' , 'Fullmetal Alchemist','Fullmetal Alchemist Brotherhood' ,'Death Note','Your Lie in April','Monster','Steins;Gate','Steins Gate' , 'Evangelion' ,'Serial Experiments Lain','Perfect Blue','Berserk','Tokyo Ghoul','One Punch Man','Pokemon', 'Spirited Away','Samurai Champloo','Rascal Does Not Dream of Bunny Girl Senpai', 'FLCL' ]

const categories = [character_ques,location_ques,quote_ques,stand_ques,title_ques]

const qimg = document.getElementById("popupimg");
const question = document.getElementById("popupque");

var cat_difficulty=0;
var anime='';
var selected='';
var already_clicked=[];

document.getElementById("questions").addEventListener("click",async function popuprun(e){
    const ques= e.target.closest('.cque');
    document.getElementById("questions").style.pointerEvents = "none";

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
    cat_difficulty = ques.id[3];
    var i,min,max;

    const chosen = categories[cat_name-1];

    var length= chosen.length;
    
    min= Math.floor(length * (cat_difficulty-1)/5);
    max= Math.floor(length * cat_difficulty/5);
    
    page=Math.floor(Math.random() * 5) + 1 + (cat_difficulty - 1)*5;

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
    else if (cat_name==5){
        await nickname();
    }
    else if (cat_name==4){
        await jojo();
    }
})

const image_char_id=0,image_char="";

async function quote(q){
        const res= await fetch("https://api.animechan.io/v1/quotes/random?anime=" + encodeURIComponent(anime));
        const json = await res.json();
        const quotes= json.data.content;
        console.log(json);
        document.getElementById("popupque").textContent = quotes;
        document.getElementById("from").innerHTML = "The character is from";
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
    document.getElementById("from").innerHTML = "The character is from";

}

async function nickname(){
    const res= await fetch("https://api.tenrai.org/v1/characters?page=" + page);
    const json = await res.json();
    const image_char_id= json.data[Math.floor(Math.random()*25)].mal_id;

    const res2 = await fetch(`https://api.tenrai.org/v1/characters/${image_char_id}`);
    const json2 = await res2.json();
    const nicknames_char = json2.data.nicknames ;
    if (nicknames_char.length==0){
        nickname();
    }
    anime= json2.data.name;

    console.log(nicknames_char);
    console.log(anime);
    question.innerHTML = nicknames_char;
    document.getElementById("from").innerHTML = "The character's name is";
    document.getElementById("ans").placeholder = "Character Name"
}

async function jojo(){
    const res = await fetch("data.json")
    const json = await res.json();

    const parts=['Stardust Crusaders','Diamond is Unbreakable','Vento Aureo','Stone Ocean'];
    const selected_part = parts[Math.floor(Math.random()*4)];

    const stands = json[selected_part];
    const jojolength = stands.length;

    const store_stand = Math.floor(Math.random()*jojolength);

    const stand_name = stands[store_stand].stand;
    const stand_img = stands[store_stand].stand_images[0];
    anime = stands[store_stand].user;

    qimg.src= stand_img;
    question.innerHTML = stand_name;
    document.getElementById("from").innerHTML = "The Stand User is";
    document.getElementById("ans").placeholder = "Stand Name"
    console.log(anime + stand_name);
}

function change(){
        document.getElementById("player1").innerHTML = "Player 1: " + point[1];
        document.getElementById("player2").innerHTML = "Player 2: " + point[2];
        document.getElementById("playerturn").innerHTML = "Player " + player_no + " turn";
}

var run=" ";

function submitbtn(){
    answer=document.getElementById("ans").value;
    
    if (fuzzball.WRatio(answer,anime) > 80){
        alert("correct answer");
        point[player_no] = point[player_no] + cat_difficulty*200;
        change();
    }
    else if (answer==""){
        return;
    }
    else{
        point[player_no] = point[player_no] - cat_difficulty*200;
        player_no = 3 - player_no;

        change();

        document.getElementById("retry").style.display= "block";
        document.getElementById("retry").innerHTML= "Player " + player_no + " retry";
        document.getElementById("pass").style.display = "block";
        document.getElementById("submit").style.display = "none";
        if (run!=true){
            run="true";
            popuprun(e);
        }
        pass();
    }
    run="false";


    console.log(answer + " anime is : " + anime);
    qimg.src='';
    question.innerHTML="";
    document.getElementById("popup").style.display="none";
    document.getElementById("main").style.opacity="1";
    document.getElementById(selected).innerHTML = anime ;
    document.getElementById("questions").style.pointerEvents = "all";
    console.log(point);
    console.log(cat_difficulty);
    player_no= 3-player_no;

}

document.getElementById("ans").addEventListener("keypress", function(event){
    if (event.key== "Enter"){
        event.preventDefault();
        submitbtn();
    }
});

function secondplayre(){
        submitbtn();
}

function pass(){
        player_no = current_turn;

        change();

        qimg.src='';
        question.innerHTML="";
        document.getElementById("popup").style.display="none";
        document.getElementById("main").style.opacity="1";
        document.getElementById(selected).innerHTML = anime ;
        document.getElementById("questions").style.pointerEvents = "all";
        console.log(point);
        console.log(cat_difficulty);
        document.getElementById("retry").style.display= "none";
        document.getElementById("pass").style.display = "none";
        document.getElementById("submit").style.display = "block";
}