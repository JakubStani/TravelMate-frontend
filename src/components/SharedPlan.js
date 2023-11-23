import React from 'react'
import './SharedPlan.css'

function SharedPlan() {
  return (
        <div className='shared-plan-data-container'>

            <div className='shared-plan-top-container'>
                <div className='shared-plan-title-container'>
                    <p>title</p>
                </div>
                <div className='shared-plan-date-costs-data-container'>
                    <p>cost</p>
                    <p>start date - end date</p>
                </div>
                <div className='shared-plan-user-data-container'>
                    <p>user data</p>
                    <p>name</p>
                </div>
            </div>

            <div className='shared-plan-mid-container'>
                <p>mid</p>
                <div className='shared-plan-details-data-container'>
                    <p>destination</p>
                    <p>test</p>
                    <p>point of start</p>
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