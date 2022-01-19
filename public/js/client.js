// Fetch API can only be accessed through the browser!

// Listen for address through user input on the front
// end form. 
const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const errorMessage = document.querySelector('#error')
const successMessage_location = document.querySelector('#success-location')
const successMessage_forecast = document.querySelector('#success-forecast')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = address.value

    // clear messages before fetching again
    errorMessage.textContent = ''
    successMessage_forecast.textContent = ''
    successMessage_location.textContent = 'Loading...'


    fetch(`/weather/?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                errorMessage.textContent = data.error
                // clear out default loading message
                successMessage_location.textContent = ''
            }
            else{
                successMessage_location.textContent = data.location
                successMessage_forecast.textContent = data.forecast
            }
        })
    })

})



