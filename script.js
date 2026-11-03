

for (let i=1;i<=5;i++){
    for (let j=1;j<=5;j++){
    document.getElementById(`c${i}q${j}`).innerHTML = j*200;
    }
}

var cat_name=0;

var current_turn = Number(localStorage.getItem("player_no")) || 1;
var point = JSON.parse(localStorage.getItem("previouspoints")) || [0,0,0]

var player_no=current_turn;

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

function reset(){
    console.log("check");
    localStorage.clear();
    window.location.href=window.location.href;
    change();
}

document.getElementById("questions").addEventListener("click",async function popuprun(e){
    const ques= e.target.closest('.cque');
    document.getElementById("questions").style.pointerEvents = "none";


    selected = ques.id;

    for (let checkclick=0;checkclick<=(already_clicked.length-1);checkclick++){
        if (already_clicked[checkclick]==selected){
            document.getElementById("questions").style.pointerEvents = "auto";
            return;
        }
    }


    already_clicked.push(selected);

    document.getElementById("popup").style.display="flex"

    document.getElementById("main").style.opacity="0.4";
    cat_name= ques.parentElement.id[1];
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
        await quote();
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
    else if(cat_name==2){
        await description();
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

    if (anime==null){
        await image();
    }

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
var whilei=0;
var stand_img='';
async function jojo(){
    const res = await fetch("data.json")
    const json = await res.json();

    const parts=['Stardust Crusaders','Diamond is Unbreakable','Vento Aureo','Stone Ocean'];
    const selected_part = parts[Math.floor(Math.random()*4)];

    const stands = json[selected_part];
    const jojolength = stands.length;

    const store_stand = Math.floor(Math.random()*jojolength);

    anime = stands[store_stand].stand;

        stand_img = stands[store_stand].stand_images[0];
    user = stands[store_stand].user;

    qimg.src= stand_img;
    qimg.alt = "Stand user is "+user;
    document.getElementById("from").innerHTML = "The Stand  is";
    document.getElementById("ans").placeholder = "Stand Name"
}

async function description(){
    const res= await fetch("https://api.tenrai.org/v1/characters?page=" + page);
    const json = await res.json();
    const desc_char_id= json.data[Math.floor(Math.random()*25)].mal_id;

    const res2 = await fetch(`https://api.tenrai.org/v1/characters/${desc_char_id}`);
    const json2 = await res2.json();
    const full_desc_char = json2.data.about;
    anime= json2.data.name;

    const descs = full_desc_char.split(".").filter(Boolean);
    const change = anime.split(",").filter(Boolean);
    var chosen_desc= descs[Math.floor(Math.random()*descs.length)].replaceAll(change[0]," [NAME]");
    chosen_desc= chosen_desc.replaceAll(change[1]," [NAME]");



    console.log(full_desc_char);
    console.log(anime);
    console.log(chosen_desc);
    question.innerHTML = chosen_desc;
    document.getElementById("from").innerHTML = "The character's name is ";
    document.getElementById("ans").placeholder = "Character Name"
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
        point[player_no] = point[player_no] + cat_difficulty*200;
        player_no=current_turn;
        document.getElementById("submit").style.display = "block";
        document.getElementById("retry").style.display= "none";
        change();
    }
    else{
        point[player_no] = point[player_no] - cat_difficulty*200;
        if (player_no==current_turn){
            player_no= 3-current_turn;
            document.getElementById("retry").style.display= "block";
            document.getElementById("retry").innerHTML= "Player " + player_no + " retry";
            document.getElementById("pass").style.display = "block";
            document.getElementById("submit").style.display = "none";
            change();
            return;
        }
        else{
            player_no=current_turn;
            change();
        }

            player_no= current_turn;

            document.getElementById("retry").style.display= "none";
            document.getElementById("retry").innerHTML= "Player " + player_no + " retry";
            document.getElementById("submit").style.display="block";
    }
    console.log("current turn is " + current_turn);
    if (already_clicked.length==25){
        if (current_turn==1){
            localStorage.setItem("previouspoints",JSON.stringify(point));
            localStorage.setItem("player_no", 2);
            window.location.href=window.location.href;
        }
        else{
            window.location.href = "finalscreen.html";
        }
    }


    console.log(answer + " anime is : " + anime);
    qimg.src='';
    question.innerHTML="";
    document.getElementById("popup").style.display="none";
    document.getElementById("main").style.opacity="1";
    document.getElementById(selected).innerHTML = anime ;
    document.getElementById("questions").style.pointerEvents = "all";
    console.log(point);
    console.log(cat_difficulty);

    player_no = current_turn;
    
    console.log(current_turn);
}

document.getElementById("ans").addEventListener("keypress", function(event){
    if (event.key== "Enter"){
        event.preventDefault();
        submitbtn();
    }
});


function pass(){

        if (player_no==current_turn){
            player_no=3-player_no;
            document.getElementById("retry").style.display="block";
            document.getElementById('retry').innerHTML = "Player "+ player_no + " try";
            document.getElementById("submit").style.display="none";
            change();
            return;
        }

        player_no = current_turn;

        change();

        qimg.src='';
        question.innerHTML="";
        document.getElementById("popup").style.display="none";
        document.getElementById("main").style.opacity="1";
        document.getElementById(selected).innerHTML = anime ;
        document.getElementById("questions").style.pointerEvents = "all";
        document.getElementById("retry").style.display= "none";
        document.getElementById("submit").style.display = "block";

        if (already_clicked.length==25){
        if (current_turn==1){
            localStorage.setItem("previouspoints",JSON.stringify(point));
            localStorage.setItem("player_no", 2);
            window.location.href=window.location.href;
        }
        else{
            window.location.href="finalscreen.html";
        }
    }
}
