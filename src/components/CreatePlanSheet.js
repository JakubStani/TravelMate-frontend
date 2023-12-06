import React, {useState} from 'react'
import './CreatePlanSheet.css'
import { useNavigate } from 'react-router-dom';


function CreatePlanSheet() {
  
    const navigate = useNavigate();

    // const dmyToYmdDateFormat = (inputDate) => {
    //   const splittedInputDate=inputDate.split("-");
    //   console.log(inputDate, splittedInputDate);
    //   return `${splittedInputDate[2]}-${splittedInputDate[1]}-${splittedInputDate[0]}`
    // };

    const currentDate= new Date()
    const year=currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day= String(currentDate.getDate()).padStart(2, '0');

    const curDateYMDFormat = `${year}-${month}-${day}`;

    // const updateDate = (isStartDate, newDate) => {
    //   if(newDate>=curDateYMDFormat)
    //   {
    //     if(isStartDate) {
    //       if(endDate!='' && newDate>endDate){
    //         setEndDate(newDate);
    //         console.log("new end data: ",endDate, newDate);
    //       }
    //       setStartDate(newDate);
    //       console.log("new start data: ",startDate, newDate);
          
    //     }
    //     else { 
    //       if(startDate!='' && newDate<startDate) {
    //         setStartDate(newDate);
    //         console.log("new start data: ",startDate, newDate);
    //       }
    //       setEndDate(newDate);
    //       console.log("new end data: ",endDate, newDate);
          
    //     }
    //   } 
    // }

    // const updateStartDate = (newDate) => {
    //   setStartDate(newDate);
    // }
    

    //newTrip data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [destination, setDestination] = useState('')
    const [startDate, setStartDate] = useState(curDateYMDFormat)
    const [endDate, setEndDate] = useState('')
    const [estimatedPrice, setEstimatedPrice] = useState('')
    const [numberOfPeople, setNumberOfPeople] = useState(0)
    const [pointOfStart, setPointOfStart] = useState('')

    //hotelInfo
    const [hotelName, setHotelName] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [standard, setStandard] = useState('')
    const [hotelDescription, setHotelDescription] = useState('')

    const createNewTrip = (event) => {
      event.preventDefault();

        const tripData = {
            "newTrip": {
                "title": title,
                "description": description,
                "destination": destination,
                "startDate": startDate,
                "endDate": endDate,
                "estimatedPrice": estimatedPrice,
                "numberOfPeople": numberOfPeople,
                "pointOfStart": pointOfStart
              },
              "hotelInfo": {
                "hotelName": hotelName,
                "country": country,
                "city": city,
                "street": street,
                "postalCode": postalCode,
                "streetNumber": streetNumber,
                "standard": standard,
                "hotelDescription": hotelDescription
              }
        };  

        fetch('https://travelmatebackend.azurewebsites.net/api/v1/trips/create', {
          method: 'POST',
          body: JSON.stringify(tripData),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
          }
        }).then(response => response.text())
        .then(result => {
          console.log('server answer for trip creation: ', result);
          navigate('/home');
        })
        .catch(error => console.log('error', error));

    }
  return (
    <div className='shared-plan-data-container'>

    <h1>Trip data:</h1>

    <form onSubmit={createNewTrip}>
        <div name="title" className="input">
          <input 
            type='text' 
            required
            placeholder="Title"
            value={title}
            onChange={(value) => setTitle(value.target.value)}
            ></input>
        </div>

        <div name="description" className="input">
          <input 
            type="text" 
            required
            placeholder="Description"
            value={description}
        onChange={(value) => setDescription(value.target.value)}
            ></input>
        </div>

        <div name="destination" className="input">
          <input 
            type='text' 
            required
            placeholder="Destination"
            value={destination}
            onChange={(value) => setDestination(value.target.value)}
            ></input>
        </div>

        <div name="startDate" className="input">
          <input 
            type="date" 
            required
            //placeholder="Start date"
            min={curDateYMDFormat}
            {...(endDate !== '' ? { max: endDate } : {})}
            value={startDate}
            onChange={(value) => setStartDate(value.target.value)}
            ></input>
        </div>

        <div name="endDate" className="input">
          <input 
            type="date" 
            required
            //placeholder="End date"
            min={startDate}
            onChange={(value) => setEndDate(value.target.value)}
            ></input>
        </div>

        <div name="estimatedPrice" className="input">
          <input 
            type="text" 
            required
            placeholder="Estimated price"
            value={estimatedPrice}
            onChange={(value) => setEstimatedPrice(value.target.value)}
            ></input>
        </div>

        <div name="numberOfPeople" className="input">
          <input 
            type="text"
            pattern="[0-9]*" 
            required
            placeholder="Number of people"
            value={numberOfPeople}
            onChange={(value) => setNumberOfPeople(value.target.value)}
            ></input>
        </div>

        <div name="pointOfStart" className="input">
          <input 
            type="text" 
            required
            placeholder="Point of start"
            value={pointOfStart}
            onChange={(value) => setPointOfStart(value.target.value)}
            ></input>
        </div>

        <h1>Hotel info</h1>

        <div name="hotelName" className="input">
          <input 
            type="text" 
            required
            placeholder="Hotel name"
            value={hotelName}
            onChange={(value) => setHotelName(value.target.value)}
            ></input>
        </div>

        <div name="country" className="input">
          <input 
            type="text" 
            required
            placeholder="Country"
            value={country}
            onChange={(value) => setCountry(value.target.value)}
            ></input>
        </div>

        <div name="city" className="input">
          <input 
            type="text" 
            required
            placeholder="City"
            value={city}
            onChange={(value) => setCity(value.target.value)}
            ></input>
        </div>

        <div name="street" className="input">
          <input 
            type="text" 
            required
            placeholder="Street"
            value={street}
            onChange={(value) => setStreet(value.target.value)}
            ></input>
        </div>

        <div name="postalCode" className="input">
          <input 
            type="text"
            required
            placeholder="Postal code"
            value={postalCode}
            onChange={(value) => setPostalCode(value.target.value)}
            ></input>
        </div>

        <div name="streetNumber" className="input">
          <input 
            type="text" 
            required
            placeholder="Street number"
            value={streetNumber}
            onChange={(value) => setStreetNumber(value.target.value)}
            ></input>
        </div>

        <div name="standard" className="input">
          <input 
            type="text" 
            required
            placeholder="Standard"
            value={standard}
            onChange={(value) => setStandard(value.target.value)}
            ></input>
        </div>

        <div name="hotelDescription" className="input">
          <input 
            type="text" 
            required
            placeholder="Hotel description"
            value={hotelDescription}
            onChange={(value) => setHotelDescription(value.target.value)}
            ></input>
        </div>

        <div className="submit-container">
          <button className="submit-button">Submit</button>
        </div>
      </form>

      <div className="submit-container">
          <button className="submit-button">Submit</button>
        </div>



    </div>
  )
}

export default CreatePlanSheet