import React from 'react'
import "./SearchBar.css"

function SearchBar(props) {

    return (
        <div>
            <div className='main-container'>
                <div className='input-container'>
                    <input
                        type='text'
                        value={props.searchedFriend}
                        placeholder='Search'
                        onChange={props.whenTextChanges}
                        onKeyDown={props.search}
                        
                    />
                </div>
                <div className='cancel-container'>
                    <button
                        className='cancel-button'
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
      )
}

export default SearchBar