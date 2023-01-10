(async () => {

    const randomWords = async () => {
        try {
            const response = await fetch("https://random-word-api.herokuapp.com/all")
            const data = await response.json()
            return data
        }
        catch(error){
            return error
        }
    }
    const array = await randomWords() //storing the fetched words from the API in an array
    const randomWord = array[Math.floor(Math.random()*array.length)].split('') //random word from the array and splitted into single letters array
    const alphabet = [...Array(26)].map((ele,i) => ele = String.fromCharCode(i+97)) 
    const inputs = [...Array(randomWord.length).fill(' _ ')]
    const allInputs =[]
    const pictures = [...Array(7)].map((ele,i) => ele = './images/hangman'+ i + '.jpg')

    let lives = 0
    
    alphabet.forEach(ele => {
        document.getElementById('letter-grid').innerHTML +=`<button class="letter" style="font-size: 25px; margin: 5px; width: 50px">${ele}</button>`
    }) 

    const hiddenWord = document.getElementById('hidden-word')
    inputs.forEach(ele => {
        hiddenWord.innerHTML +=`<span class="hidden-letter"> ${ele + ' '}</span>`
    }) 

    alphabet.forEach((ele, i) => {
                    
        document.getElementsByClassName("letter")[i].addEventListener("click", (event) => {
            
            if(inputs.some(input => input === ' _ ' ) && lives<7 ){
                //emptying the array before pushing new elements to it
                inputs.forEach(ele => {
                    hiddenWord.innerHTML =``
                }) 
                randomWord.map((letter,i) => letter === ele ? inputs[i] = ele : null)
    
                inputs.forEach(inp => {
                    hiddenWord.innerHTML +=`<span class="hidden-letter" >${inp + ' '}</span>`
                }) 
                
                if(!allInputs.includes(event.target.innerHTML)){ 
                    //checked that the letter was not yet chosen before 
                    allInputs.push(event.target.innerHTML)
                    console.log("inputs: ", allInputs)
                    //if the clicked letter is also in the random word color the button yellow else red
                    if(randomWord.includes(event.target.innerHTML))
                    {
                        document.getElementsByClassName("letter")[i].style.backgroundColor="yellow" 
                    }  
                    else {
                        document.getElementsByClassName("letter")[i].style.backgroundColor="red" 
                        document.getElementById('image').innerHTML = `<img src = ${pictures[lives]}> </img>` 
                        lives++
                    }                   
                }
                (inputs.some(input => input === ' _ ' )) ? 0: document.getElementById('hidden-word').innerHTML += `<p>Victory</p>`
                lives >= 7 ? document.getElementById('image').innerHTML += `<p>Game over, You Lost</p>`:0

            } else alert("the game is finished, press 'F5' to restart")
        }) 
    })
   console.log("random word: ", randomWord)

})();