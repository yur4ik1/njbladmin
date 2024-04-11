import {useEffect, useState} from "react";
import {getDepartments} from "../../utils/fetches/users/getDepartments.js";
import {getLevels} from "../../utils/fetches/users/getLevels.js";

// eslint-disable-next-line react/prop-types
const AddUsers = ({handler}) => {
    /* Entry information */
    const [departments, setDepartments] = useState([]);
    const [levels, setLevels] = useState([]);
    
    /* Select states */
    const [isDepartmentSelectActive, setIsDepartmentSelectActive] = useState(false);
    const [isLevelSelectActive, setIsLevelSelectActive] = useState(false);
    
    /* Search states */
    const [departmentSearch, setDepartmentSearch] = useState('');
    
    /* Form states */
    const [department, setDepartment] = useState('');
    
    /* Error states */
    
    const handleDepartmentSearch = (e) => {
        setDepartmentSearch(e.target.value);
        console.log(e.target.value)
    }
    
    const handleSetDepartment = (id) => {
        setDepartment(id);
        
        setIsDepartmentSelectActive(false);
    }
    
    useEffect(() => {
        getDepartments().then((data) => {
            setDepartments(data.data.departments);
        });
        
        getLevels().then((data) => {
            setLevels(data.data.levels);
        });
    }, []);
    
    return (
        <div className="ninjable__popup popup__users add-users active" id="add-users_popup">
            <div className="ninjable__popup-inner">
                <div className="ninjable__popup-header">
                    <span onClick={handler} className="ninjable__popup-close">
                        <img src="/img/subscription__popup-close.svg" alt=""/>
                    </span>
                    <div id='anchor'>
                        <h3>ADD USER</h3>
                    </div>
                </div>
                <div className="popup__users-content" id="mainPopup">
                    <div className="popup__users-form" id="popup">
                        <div className="popup__users-col">
                            <label>* Full Name
                                <input type="text" placeholder="Please let us know your full name" className="selected"
                                       id="add-user-firstname"/>
                                <span className="let-know-required" id="add-user-firstname-required">Please let us know your
                                full name</span>
                            </label>
                            {/*<!-- <label>* Last Name
                                <input type="text" placeholder="Please let us know your last name" class="selected"
                                    id="add-user-lastname">
                                <span class="let-know-required" id="add-user-lastname-required">Please let us know your last
                                    name</span>s
                            </label> -->*/}
                            <label>* Email
                                <input type="text" placeholder="Please let us know the email" className="selected"
                                       id="add-user-email"/>
                                <span className="let-know-required" id="add-user-email-required">Please let us know the
                                email</span>
                            </label>
                            <label>
                                * Department (Clan)
                                <div className={`custom-select ${isDepartmentSelectActive && 'active'}`}>
                                    <div onInput={handleDepartmentSearch} onClick={() => setIsDepartmentSelectActive(!isDepartmentSelectActive)} className={`select-selected-new ${isDepartmentSelectActive && 'select-arrow-active'}`} contentEditable={true} suppressContentEditableWarning={true} id="depatmentField">
                                        {isDepartmentSelectActive ? '' : 'Please Select...'}
                                    </div>
                                    {isDepartmentSelectActive && (
                                        <div className="select-items">
                                            <div className="custom-scrollbar-new" id="selectDepatment">
                                                {departments
                                                    .filter(department => department.title.includes(departmentSearch))
                                                    .map((department, index) => (
                                                        <div key={index} onClick={() => handleSetDepartment(department.id)} className="select-option department">
                                                            {department.title}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <span className="let-know">Please let us know the clan</span>
                            </label>
                            <label>
                                * Level
                                <div className={`custom-select ${isLevelSelectActive && 'active'}`}>
                                    <div className={`select-selected-new ${isLevelSelectActive && 'select-arrow-active'}`} id="levelField" onClick={() => setIsLevelSelectActive(!isLevelSelectActive)}>
                                        Please Select...
                                    </div>
                                    {isLevelSelectActive && (
                                        <div className="select-items" id='levelSelectOption'>
                                            {levels.map((level, index) => (
                                                <div key={index} className="select-option level">
                                                    {level.title}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span className="let-know">Please let us know the level</span>
                            </label>
                            <label>* Manager
                                <div className="custom-select">
                                    <div className="select-selected-new" id="managerField" contentEditable={true} suppressContentEditableWarning={true}>Please
                                        Select...
                                    </div>
                                    <div className="select-items select-hide">
                                        <div className="custom-scrollbar-new" id="selectManager"></div>
                                    </div>
                                </div>
                                <span className="let-know">Please let us know the manager</span>
                            </label>
                            <label>* Password
                                <input className="password" type="password" id="password" name="password"
                                       placeholder="*************************"/>
                                <span className="password-icon"></span>
                                <span className="let-know">Please let us know your password</span>
                            </label>
                        </div>
                        
                        <div className="popup__users-col popup__users-col-second">
                            <label>* Job (Rank)
                                <div className="custom-select">
                                    <div className="select-selected-new" contentEditable={true} suppressContentEditableWarning={true} id="jobField">
                                        Select Department First
                                    </div>
                                    <div className="select-items select-hide">
                                        <div className="custom-scrollbar-new" id="selectJob">
                                        </div>
                                    </div>
                                </div>
                                <span className="let-know">Please let us know the rank</span>
                            </label>
                            
                            <label>Title
                                <input type="text" placeholder="Manager Developer"/>
                                <span className="let-know">Please let us know the rank</span>
                            </label>
                            
                            <label>* Permission Role
                                <div className="custom-select">
                                    <div className="select-selected-new" id="permissionRole">Please Select...</div>
                                    <div className="select-items select-hide">
                                        <div className="select-option role">Admin</div>
                                        <div className="select-option role">User</div>
                                    </div>
                                </div>
                                <span className="let-know">Please let us know the role</span>
                            </label>
                            <label>* Status
                                <div className="custom-select">
                                    <div className="select-selected-new" id="statusAdd">Please Select...</div>
                                    <div className="select-items select-hide">
                                        <div className="select-option status">Active</div>
                                        <div className="select-option status">Archived</div>
                                    </div>
                                </div>
                                <span className="let-know" id="roleAdd">Please let us know the status</span>
                            </label>
                        </div>
                    </div>
                    <div className="popup__users-footer">
                        <button className="btn user-add" type="button">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUsers;