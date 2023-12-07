import React from 'react'
import './TripDetailsContainer.css'

function TripDetailsContainer(props) {
    console.log("trip data:", props.tripData);
    return (
        <div>
            <div className='profile-title-container'>Trip Details</div>
            <div className='profile-data-container'>
                <div className='profile-specific-data-container'>
                    <h3>Title</h3>
                    <p>{props.tripData['title']}</p>
                </div>
                <div>
                    <h3>Description:</h3><br />
                    <p>{props.tripData['description']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Destination</h3>
                    <p>{props.tripData['destination']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Start date</h3>
                    <p>{props.tripData['startDate']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>End date</h3>
                    <p>{props.tripData['endDate']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Estimated price</h3>
                    <p>{props.tripData['estimatedPrice']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Number of people</h3>
                    <p>{props.tripData['numberOfPeople']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Point of start</h3>
                    <p>{props.tripData['pointOfStart']}</p>
                </div>

                <h2>Hotel info</h2>
                <div className='profile-specific-data-container'>
                    <h3>Hotel name</h3>
                    <p>{props.tripData['hotelInformation']['hotelName']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Country</h3>
                    <p>{props.tripData['hotelInformation']['country']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Street</h3>
                    <p>{props.tripData['hotelInformation']['street']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Postal code</h3>
                    <p>{props.tripData['hotelInformation']['postalCode']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Street number</h3>
                    <p>{props.tripData['hotelInformation']['streetNumber']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Standard</h3>
                    <p>{props.tripData['hotelInformation']['standard']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Hotel description</h3>
                    <p>{props.tripData['hotelInformation']['hotelDescription']}</p>
                </div>
            </div>
            <div className='profile-action-container'>
                <div>
                    <p>Sign up for this trip</p>
                </div>
            </div>
        </div>
    )
}

export default TripDetailsContainer