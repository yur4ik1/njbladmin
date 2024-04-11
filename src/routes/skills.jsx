import {createFileRoute} from '@tanstack/react-router'
import {protectedRoute} from "../utils/auth.jsx";
import {Helmet} from "react-helmet";
import Header from "../components/header/header.jsx";
import Sidebar from "../components/sidebar/sidebar.jsx";
import MainLayout from "../components/layouts/main-layout/main-layout.jsx";
import {useEffect, useState} from "react";
import Loading from "../components/loading/Loading.jsx";
import {getSkills} from "../utils/fetches/skills/getSkills.js";
import {performSearch} from "../utils/fetches/skills/search.js";

export const Route = createFileRoute('/skills')({
    beforeLoad: ({context, location}) => {
        protectedRoute({location});
    },
    component: () => <Skills/>
})

const Skills = () => {
    const [isLoading, setIsLoading] = useState(true);
    
    const [limit, setLimit] = useState();
    const [offset, setOffset] = useState(0);
    const [status, setStatus] = useState();
    
    const [skills, setSkills] = useState([]);
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const [globalSearch, setGlobalSearch] = useState('');
    
    const handleSearch = (search) => {
        performSearch(search, status).then((data) => {
            setSearchResults(data.data.skills);
        });
    }
    
    const handleChangeStatus = (status) => {
        setStatus(status);
        setIsLoading(true);
    }
    
    const handleGlobalSearch = (search) => {
        if (search === '') {
            setGlobalSearch('');
            setSearchResults([]);
            setIsLoading(true);
            document.getElementById('search-input').value = '';
            return;
        }
        
        setGlobalSearch(search);
        setSearchResults([]);
        setIsLoading(true);
        document.getElementById('search-input').value = search;
    }
    
    const resetSearch = () => {
        document.getElementById('search-input').value = '';
        setSearch('');
        setSearchResults([]);
    }
    
    useEffect(() => {
        getSkills(limit, offset, status, globalSearch).then((data) => {
            setIsLoading(false);
            setSkills(data.data.skills);
        });
    }, [globalSearch, limit, offset, status]);
    
    return (
        <MainLayout>
            {
                <Helmet>
                    <link rel="stylesheet" href="/css/skills.css"/>
                </Helmet>
            }
            
            <div className="skills-page">
                <Header/>
                
                <section className="another__wrapper">
                    <Sidebar/>
                    
                    <section className="content skills">
                        <div id="anchor">
                            <h2>SKILLS</h2>
                        </div>
                        <div className="add-skill">
                            <a className="add-skill-btn btn">Add Skill</a>
                        </div>
                        <div className="search__wrapper">
                            <span className="search-icon">
                                <div className="search-input-block">
                                    <input className="search-input" id="search-input" type="text"
                                           placeholder="Type here to search for Skill..."
                                           onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    {globalSearch && (
                                        <button onClick={resetSearch} className="closeFilter">
                                            <img src="/img/subscription__popup-close.svg" alt=""/>
                                        </button>
                                    )}
                                    {searchResults.length > 0 && (
                                        <div className="search-input-selector">
                                            {searchResults.map((result) => (
                                                <label onClick={() => handleGlobalSearch(result.title)} key={result.id}>{result.title}</label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </span>
                            <div className={`filter-select ${isFilterOpen && 'active'}`}>
                                <div onClick={() => setIsFilterOpen(!isFilterOpen)}
                                     className={`select-selected ${isFilterOpen && 'select-arrow-active'}`}
                                     id="filterSelect">
                                    {status === undefined ? "All" : status ? "Active" : "Archived"}
                                </div>
                                <span className="line"></span>
                                {isFilterOpen && (
                                    <div className="select-items" id="selectItemsFilter">
                                        <div className="select-option">
                                            <input type="checkbox" onClick={() => handleChangeStatus()} id="all"
                                                   checked={status === undefined}/>
                                            <label htmlFor="all" className="filterLabel">All</label>
                                        </div>
                                        <div className="select-option">
                                            <input type="checkbox" id="active" onClick={() => handleChangeStatus(true)}
                                                   checked={status === true}/>
                                            <label htmlFor="active" className="filterLabel">Active</label>
                                        </div>
                                        <div className="select-option">
                                            <input type="checkbox" id="Archived"
                                                   onClick={() => handleChangeStatus(false)}
                                                   checked={status === false}/>
                                            <label htmlFor="Archived" className="filterLabel">Archived</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {isLoading && <Loading/>}
                        
                        <div id="skills-view">
                            {skills.map((skill) => (
                                <Skill key={skill.id} skill={skill}/>
                            ))}
                        </div>
                        
                        {/*<div className="navigation" id="navigation">
                            <span className="prev" id="btnPrev"></span>
                            <span className="page active" id="firstCircle">1</span>
                            <span className="page" id="secondCircle">2</span>
                            <span className="next" id="btnNext"></span>
                        </div>
                        
                        <div id="pagination-numbers">
                        </div>*/}
                    </section>
                </section>
            </div>
        </MainLayout>
    );
};

/* eslint-disable */
const Skill = ({skill}) => {
    return (
        <div className={"skill-item"}>
            <div className="department__wrapper">
                <div className="department">
                    <p className="department-field department-field-custom-style" type="text"
                       contentEditable="false">
                        {skill.title}
                    </p>
                    <button type="button" className="edit edit-skill-btn"
                            style={{border: "none", background: "none"}}>
                    
                    </button>
                    <a className={`archive ${skill.active === true ? "" : "Archived-statu"}`}
                       href="#"></a>
                </div>
                <div className="add-job">
                    {skill.skills_skills_levels.length < 6 ?
                        (<button className="add-skills btn add-skills-btn">Add Skill’s
                            Level</button>) :
                        (<button disabled={true} className="add-skills btn deactive-btn"
                                 style={{color: "#b9babe", background: "#fafcfb"}}>Add Skill’s
                            Level</button>)
                    }
                </div>
                
                <div className="deactive-info-popup">
                    <p className="title">You can’t add Skill’s Level</p>
                    <p className="text">All levels already added to this skill. You can only
                        edit or archive any necessary skill's level.</p>
                </div>
            </div>
            
            <div className="section__tags">
                {skill.skills_skills_departments.map((department) => (
                    <a href={'#'}
                       key={department.id}>{department.skills_departments_department.title}</a>
                ))}
            </div>
            
            <div className="content__section">
                <div className="table">
                    <div className="row row-header">
                        <div className="cell">Level</div>
                        <div className="cell">Description</div>
                        <div className="cell" style={{width: "10.46vw"}}>Attribute</div>
                        <div className="cell" style={{width: "6.72vw"}}>Receipt <br/> Condition
                        </div>
                        <div className="cell" style={{width: "5.7vw"}}>Status</div>
                        <div className="cell">Actions</div>
                    </div>
                    
                    {skill.skills_skills_levels.map((level) => (
                        <div className="row row-item" key={level.id}>
                            <div className="cell name">{level.skills_levels_level.title}</div>
                            <div className="cell desc">{level.description}</div>
                            <div className="cell attribute">
                                <div className="flex">
                                    <div className="flex-start">
                                        <img src="/img/power-2.png" alt=""
                                             className="no-absolute"/>
                                        <p className="no-absolute">Power</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cell coins">{level.goal}</div>
                            <div
                                className="cell status">{level.status === 1 ? "Active" : "Archived"}</div>
                            <div className="cell actions">
                                <span className="edit edit-job-btn"></span>
                                <span
                                    className={`archive ${level.status === 1 ? "" : "Archived-statu"}`}></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
/* eslint-enable */

export default Skills;