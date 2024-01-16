import React, { useEffect, useState } from 'react'
import SideBar from '../shared/SideBar'
import NavBar from '../shared/NavBar'
import { useNavigate } from 'react-router-dom';
import './SendReport.css';

function SendReport(props) {

    const navigate = useNavigate();

    const [allowedToRender, setAllowedToRender] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [wasSent, setWasSent] = useState(false);

    const sendReport = (event) => {
        event.preventDefault();

        fetch('http://penguin.linux.test:81/weather_microservice/report_bug.php', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description,
            }),
            headers: {
            'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log('response', response);
            if(!response.ok) {
            if(response.status==400) {
                throw new Error();
            }
            }
            return response.text();
        })
        .then(result => {
            console.log('Report was send succesfully');
            setWasSent(true);
        })
        .catch(error => console.log('error', error));
    };

  useEffect(() => {
    if(localStorage.getItem('userToken')==null) {
      props.setLoginSignUp('Login');
      navigate('/');
    }
    else {
      setAllowedToRender(true);
    }
  }, []);

  return (
    <div>
    {allowedToRender &&
        <SideBar
          sideBarOpen={props.sideBarOpen}
          setSideBarOpen={props.setSideBarOpen}
          toggleSideBar={props.toggleSideBar}
          content={
            <div>
              <header>
                <NavBar toggleSideBar={props.toggleSideBar}/>
                <div>
                    <div className='profile-title-container'>Report</div>
                    {wasSent &&
                        <div className='sent-info'>Your report was sent. Thank you!</div>
                        &&
                        <button onClick={()=>{
                            setTitle('');
                            setDescription('');
                            setWasSent(false);
            
                        }}>I want to send another report</button>
                    }
                    {!wasSent &&
                    <div className='send-report-data-container'>
                        <div className='send-report-specific-data-container'>
                            <h3>If you encountered any bugs, please send report. <br />
                                This will help us develop TravelMate.
                            </h3>
                            <form onSubmit={sendReport}>
                            <div className="input">
                                <input 
                                    type='text' 
                                    required
                                    placeholder="Title"
                                    value={title}
                                    onChange={(value) => setTitle(value.target.value)}
                                    ></input>
                            </div>
                            <div className="input">
                                <textarea 
                                    type='text' 
                                    required
                                    rows={20}
                                    cols={100}
                                    placeholder="Description"
                                    value={description}
                                    onChange={(value) => setDescription(value.target.value)}
                                    ></textarea>
                            </div>
                            <div className='send-report-action-container'>
                                <div>
                                    <button>Send report</button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                    }
                </div>
                </header>
            </div>
          }
        />
      }
      </div>
  )
}

export default SendReport