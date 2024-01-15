import React, { useState } from 'react'
import SearchBar from '../shared/SearchBar';
import { List } from 'react-virtualized';
import './SearchAndList.css'

function SearchAndList(props) {
    
  return (
    <div className='users-card-data-container'>
                        <div>
                            <SearchBar 
                                search={(event)=> (event.key ==="Enter"? props.getData(): null)}
                                whenTextChanges={(e)=> {props.setSearchedUser(e.target.value);}}
                                searchedFriend={props.searchedUser}
                                clear={props.clear}
                                />
                            <div>
                                <List
                                    width={window.innerWidth*0.35}
                                    height={window.innerHeight*0.4}
                                    rowCount={props.usersData.length}
                                    rowHeight={70}
                                    rowRenderer={props.renderUser}
                                    />
                            </div>
                        </div>
                    </div>
  )
}

export default SearchAndList