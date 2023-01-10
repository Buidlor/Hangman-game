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
    let randomWord = array[Math.floor(Math.random()*array.length)].split('') //random word from the array and splitted into single letters array
    const alphabet = [...Array(26)].map((ele,i) => ele = String.fromCharCode(i+97)) 
    const inputs = [...Array(randomWord.length).fill(' _ ')]
    const allInputs =[]
    const letterGrid = document.getElementById('letter-grid')
    const pictures = [...Array(7)].map((ele,i) => ele = './images/hangman'+ i + '.jpg')

    console.log(pictures)
    let score = 0
    let lives = 0

    
    alphabet.forEach(ele => {
        letterGrid.innerHTML +=`<button class="letter">${ele}</button>`
    }) 

    const hiddenWord = document.getElementById('hidden-word')
    inputs.forEach(ele => {
        hiddenWord.innerHTML +=`<span class="hidden-letter">${ele}</span>`
    }) 

    
    alphabet.forEach((ele, i) => {
                    
        document.getElementsByClassName("letter")[i].addEventListener("click", (event) => {
            console.log("all inputs: ", allInputs)
            if(inputs.some(input => input === ' _ ' ) && lives<7 ){
                inputs.forEach(ele => {
                    hiddenWord.innerHTML =``
                }) 
                randomWord.map((letter,i) => letter === ele ? inputs[i] = ele : null)
    
                inputs.forEach(inp => {
                    hiddenWord.innerHTML +=`<span class="hidden-letter">${inp}</span>`
                }) 
                console.log('user correct inputs : ', inputs) 

                if(!allInputs.includes(event.target.innerHTML)){
                    allInputs.push(event.target.innerHTML)
                    
                    console.log("checked that the letter was not yet there", event.target.innerHTML)

                    //if the clicked letter is also in the random word color yellow else red
                    if(randomWord.includes(event.target.innerHTML))
                    {
                        document.getElementsByClassName("letter")[i].style.backgroundColor="yellow" 
                        score++
                        console.log(`your score is ${score}` ) 
                    }  
                    else {
                        document.getElementsByClassName("letter")[i].style.backgroundColor="red" 
                        document.getElementById('image').innerHTML = `<img src = ${pictures[lives]}> </img>` 
                        lives++
                        console.log(`you used ${lives} live(s)`)
                        lives === 7 ? alert("You lost the game"):0
                    }                   
                }
                (inputs.some(input => input === ' _ ' )) ? 0: alert("victory")
            } else alert("the game is finished")
        }) 
   

    })
   
    console.log("random word: ", randomWord)

 
})();