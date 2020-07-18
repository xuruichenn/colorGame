//===============================================================
//Helper funcs
//===============================================================
const pickColor = () => {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random]; 
}


const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const generateRandomColors = (num) => {
    let output = [];
    for (let i=0; i<num; i++) {
        output.push(generateRandomColor());
    }
    return output;
}

const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color;
    })
}

const reset = () => {
    for (let i=0; i<squares.length; i++) {
        if (squares[i].classList.contains("shines")) {
            squares[i].classList.remove("shines");
        } 
    }

    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    resetButton.textContent = "New Colors";
    colorDisplay.textContent = pickedColor;
    resetButton.classList.remove("pulses");

    requestAnimationFrame(() => {
        for (let i=0; i<squares.length; i++) {
            if (colors[i]) {
                squares[i].style.backgroundColor = colors[i];
                squares[i].style.display = "block";
                squares[i].classList.add("shines");
            } else {
                squares[i].style.display = "none";
                
            }
        }
    })

    title.style.backgroundColor = "black";
    title_RGB.style.backgroundColor = "black";
    message.textContent = "";
}


//===============================================================
//Init variables
//===============================================================
let numSquares = 6;
//Choose winning color
let colors = generateRandomColors(numSquares);
let pickedColor = pickColor();

//Selecting
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const title = document.querySelector("h1");
const title_RGB = document.querySelector("h2");
const resetButton = document.getElementById("resetButton");
const modeButtons = document.querySelectorAll(".mode");


//===============================================================
//Main
//===============================================================
function main() {
    colorDisplay.textContent = pickedColor;
    resetButton.addEventListener("click", reset);

    requestAnimationFrame(() => {
        for (let i=0; i<squares.length; i++) {
            if (colors[i]) {
                squares[i].style.backgroundColor = colors[i];
                squares[i].style.display = "block";
                squares[i].classList.add("shines");
            } else {
                squares[i].style.display = "none";
                
            }
        }
    })

    modeButtons.forEach((button) => {
        button.addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else if (this.textContent === "SUPER HARD!!") {
                numSquares = 9;
            } else {
                numSquares = 6;
            }
            reset();
        })
    })

    
    //Set up
    for(let i=0; i<squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function() {
            const clickedColor = this.style.backgroundColor;
           
            if (clickedColor === pickedColor) {
                message.textContent="Correct";
                changeColors(pickedColor);
                //title.style.backgroundColor = pickedColor;
                //title_RGB.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play again"
                resetButton.classList.add("pulses");
                
            } else {
                this.style.backgroundColor = "black";
                message.textContent ="Try again";
            }
        })
    }

}

main();






