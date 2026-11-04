var cat_name=0;

current_turn= 1;

document.getElementById("turn").innerHTML = "Player " + current_turn + " turn"

wager = JSON.parse(localStorage.getItem("wager"));
point = JSON.parse(localStorage.getItem("previouspoints"));
    cat_name = (Math.floor(Math.random()*5))+1;

console.log(wager);
console.log(point);
const quote_ques = ['Naruto','Bleach','One Piece','Black Clover','Jujutsu Kaisen','Hunter X Hunter', 'Attack on titan' ,'Jojo',  'Chainsaw Man','Vinland Saga' ,'Demon slayer' , 'Fullmetal Alchemist','Fullmetal Alchemist Brotherhood' ,'Death Note','Your Lie in April','Monster','Steins;Gate','Steins Gate' , 'Evangelion' ,'Serial Experiments Lain','Perfect Blue','Berserk','Tokyo Ghoul','One Punch Man','Pokemon', 'Spirited Away','Samurai Champloo','Rascal Does Not Dream of Bunny Girl Senpai', 'FLCL' ]

var img_smth,page=0;
var nicsmth,jojosmth,jojosmth2,d
    i=Math.floor(Math.random()*quote_ques.length);
    img_smth = Math.floor(Math.random()*25);
    page = Math.floor(Math.random()*20)+1;
    nicsmth = Math.floor(Math.random()*25);
    jojosmth= Math.floor(Math.random()*4);
    jojosmth2= Math.floor(Math.random()*20);
    descsmth=Math.floor(Math.random()*10);
    descsmth2 = Math.floor(Math.random()*9);

let desc= document.getElementById("describe")

function okay(){
    document.getElementById("turn").innerHTML = "Player " + current_turn + " turn"
    document.getElementById("onlyone").style.display="none";
    document.getElementById("ok").style.display="none";



    
    console.log(cat_name);
    ifcheck();
    document.getElementById("finalanswer").style.display = "block";
    document.getElementById("finalsubmit").style.display = "block";
    document.getElementById("didntload").style.display = "block";
}


fque= document.getElementById('question');
fimg= document.getElementById("image");


const image_char_id=0,image_char="";
let anothervar = Math.floor(Math.random()*5);
var anime="";
var stoprepeat=1;
let quotes;
async function quote(q){
    if (stoprepeat==1){
    try{
        const res= await fetch("https://api.animechan.io/v1/quotes?anime=" + encodeURIComponent(anime) + "&page=" + page);
        const json = await res.json();
        quotes= json.data[anothervar].content;
        console.log(json);
    }
    catch (error){
        quotes = "Everyone is a slave to something";
        anime = 'Vinland Saga'
    }
    const showquote=quotes;
        stoprepeat++;
        }

        if(quotes==null){
            fque.innerHTML = "Press Didnt load button";
        }

        console.log(anime);
        desc.innerHTML = "The name of the anime is: ";
        fque.innerHTML=quotes;
}
async function image(){
    const res= await fetch("https://api.tenrai.org/v1/characters?page=" + page);
    const json = await res.json();
    const image_char_id= json.data[img_smth].mal_id;

    const res2 = await fetch(`https://api.tenrai.org/v1/characters/${image_char_id}/pictures`);
    const json2 = await res2.json();
    const image_char = json2.data[0].jpg.image_url;

    const res3= await fetch(`https://api.tenrai.org/v1/characters/${image_char_id}/anime`);
    const json3 = await res3.json();
    const img_mal_id = json3.data[0].anime.mal_id;

    const res4= await fetch(`https://api.tenrai.org/v1/anime/${img_mal_id}`);
    const json4 = await res4.json();
    anime = json4.data.titles[2].title;

    if (anime==null){
        await image();
    }
    desc.innerHTML = "The name of the anime is: ";
    fimg.style.display="block";
    fimg.src=image_char;
    console.log(anime);

}
async function nickname(){
    const res= await fetch("https://api.tenrai.org/v1/characters?page=" + page);
    const json = await res.json();
    const image_char_id= json.data[nicsmth].mal_id;

    const res2 = await fetch(`https://api.tenrai.org/v1/characters/${image_char_id}`);
    const json2 = await res2.json();
    const nicknames_char = json2.data.nicknames;

    if (nicknames_char==null){
        fque.innerHTML = "Press didnt load";
    }

    anime= json2.data.name;
    console.log(anime);
    desc.innerHTML = "The name of the character is: ";
    fque.innerHTML= nicknames_char;

}
var whilei=0;
var stand_img='';



async function jojo(){
    
    const res = await fetch("data.json")
    const json = await res.json();

    const parts=['Stardust Crusaders','Diamond is Unbreakable','Vento Aureo','Stone Ocean'];
    const selected_part = parts[jojosmth];

    const stands = json[selected_part];
    const jojolength = stands.length;

    const store_stand = jojosmth2;

    anime = stands[store_stand].stand;

    stand_img = stands[store_stand].stand_images[0];
    user = stands[store_stand].user;
    console.log(anime);
    fimg.style.display="block";
    desc.innerHTML = "The name of the stand is: ";
    fimg.src=stand_img;
}



async function description(){
    const res= await fetch("https://api.tenrai.org/v1/characters?page=" + page);
    const json = await res.json();
    const desc_char_id= json.data[descsmth].mal_id;

    const res2 = await fetch(`https://api.tenrai.org/v1/characters/${desc_char_id}`);
    const json2 = await res2.json();
    const full_desc_char = json2.data.about;
    anime= json2.data.name;

    const descs = full_desc_char.split(".").filter(Boolean);
    const change = anime.split(",").filter(Boolean);
    if (descs[descsmth2]==null){
        fque.innerHTML= "Press Didnt load button"
    }
    var chosen_desc= descs[descsmth2].replaceAll(change[0]," [NAME]");
    chosen_desc= chosen_desc.replaceAll(change[1]," [NAME]");
    console.log(anime);
    desc.innerHTML = "The name of the character is: ";

    fque.innerHTML = chosen_desc;
}



function ifcheck(){
    if (cat_name==3){

        anime = quote_ques[i];
        console.log(anime);
        quote();
        document.getElementById("finalcategory").innerHTML = "Category is " + "Quote";
    }
    else if (cat_name==1){    
        question.innerHTML="LOADING.....";
        image();
        question.innerHTML="";
        document.getElementById("finalcategory").innerHTML = "Category is " + "Image";
    }
    else if (cat_name==5){
        nickname();
        document.getElementById("finalcategory").innerHTML = "Category is " + "Nickname";
    }
    else if (cat_name==4){
        jojo();
        document.getElementById("finalcategory").innerHTML = "Category is " + "JOJO STAND";
    }
    else if(cat_name==2){
        description();
        document.getElementById("finalcategory").innerHTML = "Category is " + "Description";
    }
}

function finalsubmit(){
    var answer=document.getElementById("finalanswer").value
    if (fuzzball.WRatio(answer,anime) > 80){
        point[current_turn] = Number(point[current_turn]) + Number(wager[current_turn]);
    }
    else{
        point[current_turn] = Number(point[current_turn]) - Number(wager[current_turn]);
    }
    if (current_turn==1){
        document.getElementById("temphide").style.display='none';
        document.getElementById("changerequest").style.display='block';
        document.getElementById("finalanswer").value="";
        console.log(point);
        current_turn=3-current_turn;
    }
    else if (current_turn==2){
        document.getElementById("turn").style.display = "none";
        document.getElementById("temphide").style.display='none';
        document.getElementById("changerequest").style.display='none';
        if (point[1]>point[2]){
            document.getElementById("verdict").innerHTML = "Player 1 WINS "
        }
        else{
            document.getElementById("verdict").innerHTML = "Player 2 WINS "
        }
        document.getElementById("vb1").innerHTML= "Player 1: "+ point[1] ;
        document.getElementById("vb2").innerHTML= "Player 2: "+ point[2] ;
        document.getElementById("answerreveal").innerHTML = "Answer was : " + anime;
        localStorage.setItem("previouspoints",JSON.stringify(point));
        document.getElementById("home").style.display = "block";
    }

    okay();
}

