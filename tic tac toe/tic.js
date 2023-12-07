const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");

const newGameBtn = document.querySelector(".btn");

// first we fetches the all id 




let currentPlayer ;
let gameGrid;
const  winninposition = [

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];




//function that initialise the game

function initgame(){
    currentPlayer ="X";
    gameGrid = ["","","","","","","","",""];

    //ui pr bhi empty krna pdega
    boxes.forEach(
        (box,index) =>
           {
     box.innerText = "";
     boxes[index].style.pointerEvents = "all";
     
    //initailise box with css properties 
    box.classList = `box box${index+1}`;
        }
    )
     

    //remove green color



    newGameBtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`;//when we use a variable in innertext we use backtics


};


initgame();//function calling







//now for handleclick function
//logic is that
//if box is clicked is empty then
// made it unclickabel , box value XO , player change , swapturn fuction, check if one win,




function swapturn(){
    if(currentPlayer ==="X"){
        currentPlayer ="O";

    } else {
        currentPlayer="X";

    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}




//checkgameover function


function checkgameover(){

  let answer = "";
   winninposition.forEach(
    (position) => {
        //all 3 boxes should be non empty and exactly same in value
        if(  (gameGrid[position[0]]  !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2] !==""] )  &&  (gameGrid[position[0]]=== gameGrid[position[1]]) && ( gameGrid[position[1]] === gameGrid[position[2]] )  && (gameGrid[position[0]] === gameGrid[position[2]])
        ) {
           
            //check if winner is X
            if (gameGrid[position[0]] === "X")
                 answer = "X";
            else 
                answer = "0";  
            
                
                //disable pointer events

                boxes.forEach(
                    (box) => {
                        box.style.pointerEvents ="none";
                    }
                )

                //now we know  x/0 is winner then green it

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                


    
        }
    }
     
   )

   //means we have winner 
      if(answer !== ""){

        gameInfo.innerText =`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return; 
      }


      // lets check wheterh there is a tied

      let fillcount =0;
      gameGrid.forEach(
        (box) => {
            if(box !== ""){
                fillcount++;
            }
        }
      );

    //board is filled game is tied
    if(fillcount ===9){
        gameInfo.innerText= "Game Tied!!";
        newGameBtn.classList.add("active");

    }
    

}




function handleclick(index){
    if(gameGrid[index]===""){

        boxes[index].innerHTML = currentPlayer;//show ui that show in screen

        gameGrid[index]= currentPlayer;//show inner js 
         boxes[index].style.pointerEvents = "none"; //for  pointer that should not point after click
        //swap karo turn ko
        swapturn();
        checkgameover();


    }

}


//we have use event listener for boxes for X and O , click event and give logic
 
boxes.forEach(
    (box,index) => {
      
        box.addEventListener('click' , () => 
       handleclick(index)
        )

}
);


newGameBtn.addEventListener("click" , initgame);

