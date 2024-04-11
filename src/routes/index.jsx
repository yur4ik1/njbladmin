import {createFileRoute} from '@tanstack/react-router'
import {protectedRoute} from "../utils/auth.jsx";
import MainLayout from "../components/layouts/main-layout/main-layout.jsx";
import Header from "../components/header/header.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import {useEffect, useState} from "react";
import Loading from "../components/loading/Loading.jsx";
import {getCompany} from "../utils/fetches/account-settings/getCompany.js";
import {getAllUsers} from "../utils/fetches/account-settings/getAllUsers.js";

export const Route = createFileRoute('/')({
    beforeLoad: ({context, location}) => {
        protectedRoute({location});
    },
    component: Home,
})

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});
    const [users, setUsers] = useState([{}]);
    
    useEffect(() => {
        getCompany().then((data) => {
            setCompany(data.data.company[0]);
            
            setIsLoading(false);
            /*defaultValue={company.company_owner.firstname + ' ' + company.company_owner.lastname}*/
        });
        
        getAllUsers().then((data) => {
            setUsers(data.data.users);
            
            setIsLoading(false);
        });
    }, []);
    
    return (
        <MainLayout>
            <div className="account-settings">
                <Header/>
                
                <section className="another__wrapper">
                    <Sidebar/>
                    
                    <section className="content">
                        <div className="leaves"></div>
                        <h2>ACCOUNT SETTING</h2>
                        
                        <form className="account-setting" id="account-setting" action="#">
                            <div className="account-owner">
                                <label>
                                    * Account Owner
                                    <div className="new__custom-select-wrapper">
                                        <div className="new__custom-select ownerField">
                                            <span className="line"></span>
                                            <div className="arrow"></div>
                                            <div className="new__custom-select__trigger" id="searchInput" contentEditable={true} suppressContentEditableWarning={true}>
                                                Type here to search for Clan...
                                            </div>
                                            <div className="new__custom-options" id="selectOwner">
                                                {users.map((user, index) => (
                                                    <div key={index} className="new__custom-option" data-value={user.id}>
                                                        {user.firstname} {user.lastname}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="custom-scrollbar ownerscroll"></div>
                                        </div>
                                    </div>
                                </label>
                                <button type="submit">Change</button>
                            </div>
                            
                            <div className="company-info">
                                <div className="left">
                                    <h4>Company Information</h4>
                                    <label>* Company Name
                                        <input type="text" placeholder="Company" id="companyName" defaultValue={company.name}/>
                                    </label>
                                    <div className="country">
                                        <label>* Country
                                            <div className="new__custom-select-wrapper">
                                                <div className="new__custom-select">
                                                    <div className="new__custom-select__trigger selected-select-custom" id="country">
                                                        {company.country}
                                                        {/*<div className="arrow"></div>*/}
                                                    </div>
                                                    {/*<div className="new__custom-options">
                                                    </div>
                                                    <div className="custom-scrollbar"></div>*/}
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <label>
                                        State
                                        <input type="text" placeholder="DE" id="state" defaultValue={company.cstate}/>
                                    </label>
                                </div>
                                <div className="right">
                                    <label>
                                        Ninjable URL
                                        <input type="text" placeholder="Company.Ninjable.io" id="ninjableUrl" readOnly defaultValue={company.url}/>
                                    </label>
                                    <label>
                                        City
                                        <input type="text" placeholder="Wilmington" id="city" defaultValue={company.city}/>
                                    </label>
                                    <label>
                                        Zip
                                        <input type="text" placeholder="123456" id="zip" defaultValue={company.zip}/>
                                    </label>
                                </div>
                            </div>
                            <div className="company-info address">
                                <label>
                                    Address 1
                                    <input type="text" placeholder="Gorodetskaya street, 8A" id="address1" defaultValue={company.address1}/>
                                </label>
                                <label>
                                    Address 2
                                    <input type="text" placeholder="Gorodetskaya street, 8A" id="address2" defaultValue={company.address2}/>
                                </label>
                            </div>
                            <div className="save-btn">
                                <button className="btn" type="submit" id="btnSave">Save</button>
                            </div>
                            
                            {isLoading && (
                                <Loading/>
                            )}
                        </form>
                    </section>
                </section>
            </div>
        </MainLayout>
    )
}