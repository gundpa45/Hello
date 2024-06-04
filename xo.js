const boxes =document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const NewGameBtn =document.querySelector(".btn");


let currentPlayer;
let GameGrid;

const winningPosition =[
    [0,1,2],
    [0,4,8], [0,3,6],[3,4,5],[6,7,8],[1,4,7],[2,5,8],[2,4,6]
];

// lets create the function to intialise the game 
function initGame() {
    currentPlayer= "X";
    GameGrid=["","","","","","","","",""];
    // ui per empty karna padega
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all"; 
        // one more thing 


        // green color ko bhi hatana hai
        box.classList=`box box${index +1}`;

    })

    NewGameBtn.classList.remove("active");

    gameInfo.innerText = `current player -${currentPlayer}`; 
    
}
initGame();

    function swapTurn(){
        if (currentPlayer === "X"){
            currentPlayer = "O";
        }
        else{
            currentPlayer ="X";
        }
        // ui update 
        gameInfo.innerText = `current player - ${currentPlayer}`;

    }
    function checkGameOver(){
        let answer ="";
         
        winningPosition.forEach((position)=> {
            // all three boxes are not empty
            if((GameGrid[position[0]] !=="" || GameGrid[position[1]] !=="" || GameGrid[position[2]]!=="")
            && (GameGrid[position[0]] ==  GameGrid[position[1]] ) && (GameGrid[position[1]]==GameGrid[position[2]]) ){
        
                 
                    // check if winner is x
                    if (GameGrid[position[0]]=="X")
                    answer="X";
                else
                answer="O";

                // disable pointer
                boxes.forEach((box) =>{
                    box.style.pointerEvents="none";
                })

                // now show winner 
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
        });
        
        if(answer!==""){
            gameInfo.innerText=`winner player - ${answer}`;
            NewGameBtn.classList.add("active");
            return;
        }

        // lets check tie

        let fillCount =0;
        GameGrid.forEach((box)=>{
            if(box !== "")
            fillCount++;
        });

        if (fillCount === 9){
            gameInfo.innerText ="game tied !";
            NewGameBtn.classList.add("active");
        }


    }

   
    function handleClick(index){
        if (GameGrid[index] ==""){
            boxes[index].innerText = currentPlayer;
            GameGrid[index] = currentPlayer;
            boxes[index].style.pointerEvents="none"; 
            // swap laro turn ko 
            swapTurn();
            // check koi jeet to nahi gaya
            checkGameOver();
             
        }
    } 

boxes.forEach((box, index)=>{
    box.addEventListener("click", () => {
        handleClick(index);  

    })
});

NewGameBtn.addEventListener("click",initGame);