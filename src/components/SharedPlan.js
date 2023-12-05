import React from 'react'
import './SharedPlan.css'

function SharedPlan(props) {
  return (
        <div className='shared-plan-data-container'>

            <div className='shared-plan-top-container'>
                <div className='shared-plan-user-data-container'>
                    <p>{props.userData}</p>
                    <p>TravelMate logo?</p>
                </div>
        
                <div className='shared-plan-title-container'>
                    <p>{props.title}</p>
                </div>

                <div className='shared-plan-date-costs-data-container'>
                    <p>{props.estimatedPrice}</p>
                    <p>{props.startDate} - {props.endDate}</p>
                </div>
            </div>

            <div className='shared-plan-mid-container'>
                <p>mid</p>
                <div className='shared-plan-details-data-container'>
                    <p>{props.destination}</p>
                    <p>test</p>
                    <p>number of people</p>
                    <p>test</p>
                </div>
            </div>

            <div className='shared-plan-bot-container'>
                <p>bot</p>
                <div className='shared-plan-data-actions-container'>
                    <p>action1</p>
                    <p>action2</p>
                </div>
            </div>
        </div>
  );
};

export default SharedPlan;