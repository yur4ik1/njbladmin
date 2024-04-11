import {createFileRoute} from '@tanstack/react-router'
import {protectedRoute} from "../utils/auth.jsx";
import Header from "../components/header/header.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import MainLayout from "../components/layouts/main-layout/main-layout.jsx";
import {useEffect, useState} from "react";
import Loading from "../components/loading/Loading.jsx";
import AddUsers from "../components/popups/add-users.jsx";
import {getUsers} from "../utils/fetches/users/getUsers.js";
import {Helmet} from "react-helmet";
import {performSearch} from "../utils/fetches/users/search.js";

export const Route = createFileRoute('/users')({
    beforeLoad: ({context, location}) => {
        protectedRoute({location});
    },
    component: () => <Users/>
})

const Users = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUsersPopupActive, setIsUsersPopupActive] = useState(false);
    const [isFilterStatusActive, setIsFilterStatusActive] = useState(false);
    
    const [order, setOrder] = useState('asc');
    const [limit, setLimit] = useState();
    const [offset, setOffset] = useState(0);
    
    const [search, setSearch] = useState('');
    const [globalSearch, setGlobalSearch] = useState('');
    
    const [statusActive, setStatusActive] = useState('');
    
    const [searchResults, setSearchResults] = useState([{}]);
    
    const [users, setUsers] = useState([{}]);
    const [usersCount, setUsersCount] = useState(0);
    
    const handleIsUsersPopupActive = () => {
        setIsUsersPopupActive(!isUsersPopupActive);
    }
    
    const handleIsFilterStatusActive = () => {
        setIsFilterStatusActive(!isFilterStatusActive);
    }
    
    const handleStatus = (statusState) => {
        setIsLoading(true);
        setStatusActive(statusState);
    }
    
    const onSearch = (search) => {
        if (search === '') {
            setSearchResults([]);
        }
        
        setSearch(search);
        performSearch(search, statusActive).then((data) => {
            setSearchResults(data.data.users);
        });
    }
    
    const handleGlobalSearch = (search) => {
        setGlobalSearch(search);
        setIsLoading(true);
        setSearchResults([]);
        document.querySelector('#search-input').value = search;
    }
    
    const handleCancelSearch = () => {
        setGlobalSearch('');
        setSearch('');
        setSearchResults([]);
        document.querySelector('#search-input').value = '';
    }
    
    const handleOrderChanged = () => {
        setOrder(order === 'asc' ? 'desc' : 'asc');
        
        setIsLoading(true);
    }
    
    useEffect(() => {
        getUsers(limit, offset, order, globalSearch, statusActive).then(async (data) => {
            setUsers(data.data.users);
            setUsersCount(data.data.users_aggregate.aggregate.count);
            await setIsLoading(false);
        });
    }, [isLoading, limit, offset, order, globalSearch, statusActive]);
    
    return (
        <MainLayout>
            {
                <Helmet>
                    <link rel="stylesheet" href="/css/users.css"/>
                </Helmet>
            }
            
            <div className="users-page">
                <Header/>
                
                <section className="another__wrapper">
                    <Sidebar/>
                    
                    <section className="content users">
                        <div id="anchor">
                            <h2>Users</h2>
                        </div>
                        <div className="content__section">
                            {isLoading && <Loading/>}
                            
                            <div onClick={handleIsUsersPopupActive} className="add-user">
                                <a className="add-user-btn btn">Add User</a>
                            </div>
                            
                            <div className="search__wrapper">
                                <span className="search-icon">
                                    <div className="search-input-block">
                                        <input onChange={(e) => onSearch(e.target.value)} className="search-input" id="search-input"
                                               type="text" placeholder="Type here to search for Users..."
                                               name={'search'}
                                        />
                                        {globalSearch !== '' && (
                                            <button onClick={handleCancelSearch} className="closeFilter">
                                                <img src="/img/subscription__popup-close.svg" alt=""/>
                                            </button>
                                        )}
                                        {searchResults.length > 0 && (
                                            <div className="search-input-selector">
                                                {searchResults.map((result, index) => (
                                                    <label onClick={() => handleGlobalSearch(result.lastname)} className="found_acievements" key={index}>
                                                        {result.firstname} {result.lastname}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </span>
                                
                                <div className={`filter-select ${isFilterStatusActive && 'active'}`}>
                                    <div onClick={handleIsFilterStatusActive} className="select-selected"
                                         id="filterSelect" style={{
                                        borderBottomLeftRadius: isFilterStatusActive ? '0px' : '',
                                        borderBottomRightRadius: isFilterStatusActive ? '0px' : ''
                                    }}>
                                        {
                                            statusActive === '' ? 'All' : statusActive === true ? 'Active' : 'Archived'
                                        }
                                    </div>
                                    <span className="line"></span>
                                    {isFilterStatusActive && (
                                        <div className="select-items" id="selectItemsFilter"
                                             style={{position: 'absolute'}}>
                                            <div className="select-option">
                                                <input type="checkbox" id="all"
                                                       defaultChecked={true}
                                                       checked={statusActive === '' && true}
                                                       onChange={() => handleStatus('')}
                                                />
                                                <label htmlFor="all" className="filterLabel">All</label>
                                            </div>
                                            <div className="select-option">
                                                <input type="checkbox" id="active"
                                                       checked={statusActive === true && true}
                                                       onChange={() => handleStatus(true)}
                                                />
                                                <label htmlFor="active" className="filterLabel">Active</label>
                                            </div>
                                            <div className="select-option">
                                                <input type="checkbox" id="Archived"
                                                       checked={statusActive === false && true}
                                                       onChange={() => handleStatus(false)}
                                                />
                                                <label htmlFor="Archived" className="filterLabel">Archived</label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="table" id="users-table">
                                <div className="row row-header">
                                    <div onClick={handleOrderChanged} className="cell id" id="cellId">ID</div>
                                    <div className="cell">Full Name</div>
                                    <div className="cell">Email</div>
                                    <div className="cell">Permissions<br/>Role</div>
                                    <div className="cell">Status</div>
                                    <div className="cell">Actions</div>
                                </div>
                                
                                {users && users.map((user, index) => (
                                    <div key={index} className="row row-item">
                                        <div className="cell id">{user.id}</div>
                                        <div className="cell name">{user.firstname} {user.lastname}</div>
                                        <div className="cell email">{user.email}</div>
                                        <div className="cell admin">{user.role}</div>
                                        <div className="cell active">{user.status === 1 ? 'Active' : 'Archived '} </div>
                                        <div className="cell actions">
                                            <span type="button"
                                                  className="edit edit-user-btn"
                                                  style={{border: "none", background: "none"}}
                                                /*data-id="${item.id}"*/>
                                            </span>
                                            <span
                                                className={`archive ${user.status === 1 ? "" : "deactivate"}`}
                                                /*data-id="${item.id}" data-active="${item.active === true ? 1 : 0}"*/>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/*<div className="navigation" id="navigation">
                            <span className="prev" id="btnPrev"></span>
                            <span className="page active" id="firstCircle">1</span>
                            <span className="page" id="secondCircle">2</span>
                            <span className="next" id="btnNext"></span>
                        </div>*/}
                    </section>
                </section>
                
                {isUsersPopupActive && <AddUsers handler={handleIsUsersPopupActive}/>}
            </div>
        </MainLayout>
    );
};

export default Users;