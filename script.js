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
    const input = []

    const letterGrid = document.getElementById('letter-grid')
    alphabet.forEach(ele => {
        letterGrid.innerHTML +=`<button class="letter">${ele}</button>`
    }) 

    
    console.log(alphabet)
    console.log(randomWord)

 
})();