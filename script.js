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
    const letterGrid = document.getElementById('letter-grid')
    let score = 0
    let lives = 5

    alphabet.forEach(ele => {
        letterGrid.innerHTML +=`<button class="letter">${ele}</button>`
    }) 

    const hiddenWord = document.getElementById('hidden-word')
    inputs.forEach(ele => {
        hiddenWord.innerHTML +=`<span class="hidden-letter">${ele}</span>`
    }) 

    
        
    alphabet.forEach((ele, i) => {
        
            
        document.getElementsByClassName("letter")[i].addEventListener("click", (event) => {
            if(inputs.some(input => input === ' _ ' )){
                inputs.forEach(ele => {
                    hiddenWord.innerHTML =``
                }) 
                randomWord.map((letter,i) => letter === ele ? inputs[i] = ele : null)
    
                inputs.forEach(inp => {
                    hiddenWord.innerHTML +=`<span class="hidden-letter">${inp}</span>`
                }) 
                console.log('user inputs : ', inputs) 
    
                //if the clicked letter is also in the random word color yellow else red
                if(randomWord.includes(event.target.innerHTML))
                {
                    document.getElementsByClassName("letter")[i].style.backgroundColor="yellow" 
                    console.log(score++ ) 
                }  
                else {
                    document.getElementsByClassName("letter")[i].style.backgroundColor="red" 
                    console.log(lives--)
                }                    
                inputs.some(input => input === ' _ ' ) ? 0: alert("victory")
            } else console.log("all letters have been found")
        }) 
   

    })
   
    console.log("random word: ", randomWord)

 
})();