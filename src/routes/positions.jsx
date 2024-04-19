import {createFileRoute} from "@tanstack/react-router";
import {protectedRoute} from "../utils/auth.jsx";
import Header from "../components/header/header.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import MainLayout from "../components/layouts/main-layout/main-layout.jsx";
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react";
import Loading from "../components/loading/Loading.jsx";
import {getPositions} from "../utils/fetches/positions/getPositions.js";
import {editPositionTitle} from "../utils/fetches/positions/editPositionTitle.js";

export const Route = createFileRoute('/positions')({
    beforeLoad: ({context, location}) => {
        protectedRoute({location});
    },
    component: () => <Positions/>
})

const Positions = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    const [limit, setLimit] = useState();
    const [offset, setOffset] = useState(0);
    
    const [positions, setPositions] = useState([]);
    
    const handleOnChange = () => {
        setIsLoading(true);
        getPositions(limit, offset).then((data) => {
            setIsLoading(false);
            setPositions(data.data.departments);
        });
    }
    
    useEffect(() => {
        getPositions(limit, offset).then((data) => {
            setIsLoading(false);
            setPositions(data.data.departments);
        });
    }, [limit, offset]);
    
    return (
        <MainLayout>
            {
                <Helmet>
                    <link rel="stylesheet" href="/css/positions.css"/>
                </Helmet>
            }
            
            <div className="positions-page">
                <Header/>
                
                <section className="another__wrapper">
                    <Sidebar/>
                    
                    <section className="content positions" id="positionsSection">
                        <div id='anchor'>
                            <h2>POSITIONS</h2>
                        </div>
                        <div className="add-department">
                            <a className="add-department-btn btn" href="#">Add Department</a>
                            
                            <div className="new__custom-select-wrapper">
                                <div className="new__custom-select filter-select-scroll">
                                    <div className="inputFilter">
                                        <input className="new__custom-select__trigge_new" type="text"
                                               placeholder="Type here to search for Clan..."
                                               id="newCustomSelect"></input>
                                        <button className="closeFilter hidden">
                                            <img src="/img/subscription__popup-close.svg" alt=""/>
                                        </button>
                                    </div>
                                    <div className="new__custom-options" id="new__custom-options"></div>
                                    <div className="custom-scrollbar"></div>
                                </div>
                            </div>
                        </div>
                        
                        {isLoading && <Loading/>}
                        
                        <div id="departments-view">
                            {positions.map((position) => (
                                <Position key={position.id} position={position} handleOnChange={handleOnChange}/>
                            ))}
                        </div>
                        
                        {/*<div className="navigation" id="navigation">
                            <span className="prev" id="btnPrev"></span>
                            <span className="page active" id="firstCircle">1</span>
                            <span className="page" id="secondCircle">2</span>
                            <span className="next" id="btnNext"></span>
                        </div>*/}
                    </section>
                </section>
            </div>
        </MainLayout>
    )
}

/* eslint-disable */
const Position = ({position, handleOnChange}) => {
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [title, setTitle] = useState(position.title);
    
    const handleSaveTitle = () => {
        editPositionTitle(position.id, title).then((data) => {
            console.log(data);
        })
    }
    
    const handleEditTitle = (e) => {
        e.preventDefault();
        
        if(isEditTitle) {
            handleSaveTitle();
            handleOnChange();
            setIsEditTitle(false);
        } else {
            setIsEditTitle(true);
        }
    }
    
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && isEditTitle) {
                e.preventDefault();
                handleSaveTitle();
                handleOnChange();
                setIsEditTitle(false);
            }
        });
    }, []);
    
    return (
        <div className="positions-item" key={position.id}>
            <div className="department__wrapper">
                <div className="department">
                    <p
                        className={`department-field department-field-custom-style ${isEditTitle ? 'editableInput' : ''}`}
                        contentEditable={isEditTitle}
                        suppressContentEditableWarning={true}
                        onInput={(e) => setTitle(e.target.innerText)}
                    >
                        {position.title}
                    </p>
                    <a
                        className="edit"
                        href="#"
                        onClick={(e) => handleEditTitle(e)}
                    ></a>
                    <a className="skills-archive" href="#"></a>
                </div>
                
                <div className="skills__archive-popup">
                    <p>
                        Department can't be deactivated until you have at least one active user
                        with this department.
                    </p>
                </div>
                
                <div className="add-job">
                    <button className="add-job-btn btn">
                        Add Job
                    </button>
                </div>
            </div>
            
            <div className="content__section">
                <div className="table">
                    <div className="row row-header">
                        <div className="cell">Job Title (Rank)</div>
                        <div className="cell">Description</div>
                        <div className="cell">Skills</div>
                        <div className="cell">Actions</div>
                    </div>
                    
                    {position.departments_jobs.map((job, index) => (
                        <div className="row row-item" key={index}>
                            <div className="cell name">{job.title}</div>
                            <div className="cell description">{job.description}</div>
                            <div className="cell tags">
                                <div>
                                    {job.jobs_skills_jobs.map((skill, index) => (
                                        <a href={'#'}
                                           key={index}>{skill.skills_jobs_skill.title}</a>
                                    ))}
                                </div>
                            </div>
                            <div className="cell actions">
                                <span className="edit edit-job-btn"></span>
                                <span className="archive"></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
/* eslint-enable */