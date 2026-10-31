
for (let i=1;i<=5;i++){
    for (let j=1;j<=5;j++){
    document.getElementById(`c${i}q${j}`).innerHTML = j*200;
    }
}

const character_ques= ['hello','hi'],location_ques=['fa','soul society'],stand_ques=['hermit purple', 'tusk'],title_ques=['honored one', 'hope of the universe'];

const quote_ques = ['Naruto','Bleach','One Piece', 'Fullmetal Alchemist','Black Clover','Hunter X Hunter','Monster', 'Death Note','Steins;Gate' , 'Chainsaw Man', 'Evangelion' ]

const categories = [character_ques,location_ques,quote_ques,stand_ques,title_ques]


var anime="";

document.getElementById("questions").addEventListener("click", function(e){
    const ques= e.target.closest('.cque');
    document.getElementById("popup").style.display="flex"
    const question = document.getElementById("popupque")
    document.getElementById("main").style.opacity="0.4";

    const cat_name= ques.parentElement.id[1];
    const cat_difficulty = ques.id[3];
    var i,min,max;

    const chosen = categories[cat_name-1];

    var length= chosen.length;
    
    min= Math.floor(length * (cat_difficulty-1)/5);
    max= Math.floor(length * cat_difficulty/5);
    

    i = Math.floor(Math.random() * (max - min + 1 )) + min;

     anime = quote_ques[i];

    if (cat_name==3){
        quote();
    }


})

async function quote(q){
        const res= await fetch("https://api.animechan.io/v1/quotes/random?anime=" + encodeURIComponent(anime));
        const json = await res.json();
        const quotes= json.data.content;
        console.log(json);
        document.getElementById("popupque").textContent = quotes;
}