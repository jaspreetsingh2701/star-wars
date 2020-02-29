import React from 'react';
import { useHistory } from "react-router-dom";
import backIco from './../../assets/back-ico.png';
import { signOut } from '../../utils/service';

const Search = (props: any) => {
    const { searchInput, handleSearchInput } = props;
    const history = useHistory();

    const signOutRequest = () => {
        signOut();
        history.push('/login');
    }
    return (
        <>
            <div className="dashboard__header">
                <input
                    placeholder="search planet"
                    type="text"
                    value={searchInput}
                    onChange={(event) => handleSearchInput(event)}
                    className="sw-input--primary sw-input--md"
                />
                <img onClick={signOutRequest} src={backIco} alt="back" />
            </div>
        </>
    );
};

export default Search;