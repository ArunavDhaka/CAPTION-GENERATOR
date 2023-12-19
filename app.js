const API_KEY="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"
const submitButton= document.querySelector('#submit')
const outPutElement= document.querySelector('#output')
const inputElement= document.querySelector('input')
const historyElement= document.querySelector('.history')
const buttonElement= document.querySelector('button')


async function getMessage(){
    console.log('clicked')
    if(inputElement.value==''){
        alert("Please Provide an Input")
    }
    const options= {
        method:'POST',
        headers:{
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo",
            messages:[{role:"user",content:inputElement.value}],
            max_tokens: 100
        })
    }
    try{
        const response=await fetch('https://api.openai.com/v1/chat/completions',options)
        const data=await response.json()
        console.log(data)
        outPutElement.textContent=data.choices[0].message.content
        if(data.choices[0].message.content){
            const pElement=document.createElement('p')
            pElement.textContent=inputElement.value
            historyElement.append(pElement)
        }
    }  
    catch(error){
        console.error(error)
    }

}
submitButton.addEventListener('click',getMessage)

function clearInput(){
    inputElement.value=''
    outPutElement.textContent=''
}
buttonElement.addEventListener('click',clearInput)

