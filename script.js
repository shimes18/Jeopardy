
for (let i=1;i<=5;i++){
    for (let j=1;j<=5;j++){
    document.getElementById(`c${i}q${j}`).innerHTML = j*200;
    }
}

const character_ques= [],location_ques=[],quote_ques=[],stand_ques=[],title_ques=[];


document.getElementById("questions").addEventListener("click", function(){
    if (!cque) return;

    document.getElementById("cque").innerHTML='hi';
})