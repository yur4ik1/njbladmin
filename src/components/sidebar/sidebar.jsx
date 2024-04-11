import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const Sidebar = () => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    
    useEffect(() => {
        const sidemenuItem = document.querySelectorAll('.sidemenu__item');
        
        if (sidemenuItem) {
            sidemenuItem.forEach(menu => {
                menu.addEventListener('click', function () {
                    sidemenuItem.forEach(menu => menu.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    }, []);
    
    const menuItems = [
        {
            title: 'Company',
            subMenu: [
                { title: 'Account Settings', link: '/' },
                { title: 'Branding', link: '/branding' },
                { title: 'Subscription', link: '/subscription' },
                { title: 'Billing', link: '/billing' },
            ],
        },
        {
            title: 'Directory',
            subMenu: [
                { title: 'Users', link: '/users' },
                { title: 'Positions', link: '/positions' },
                { title: 'Levels', link: '/levels' },
                { title: 'Skills', link: '/skills' },
                { title: 'Achievements', link: '/achievements' },
                { title: 'Transactions', link: '/transactions' },
            ],
        },
        {
            title: 'Rewards',
            subMenu: [
                { title: 'Inventory', link: '/inventory' },
                { title: 'Requests', link: '/requests' },
            ],
        },
        {
            title: 'Integrations',
            link: '/integrations',
            soon: true,
        },
    ];
    
    return (
        <section className="sidebar">
            <ul className="sidemenu">
                {menuItems.map((item, index) => (
                    <li key={index} className={`sidemenu__item ${item.subMenu && item.subMenu.some(subItem => currentPath === subItem.link) && 'active'} ${currentPath === item.link && 'active'}`}>
                        {item.link ? (
                            <Link className={`sidemenu__item-link ${item.soon && 'soon'}`} to={item.link}>
                                {item.soon ? (<p>{item.title} <br /><span>Coming soon</span></p>) : (item.title)}
                            </Link>
                        ) : (
                            <Link className={`sidemenu__item-link ${item.soon && 'soon'}`} to={item.link}>
                                {item.soon ? (<p>{item.title} <br /><span>Coming soon</span></p>) : (item.title)}
                            </Link>
                        )}
                        
                        {item.subMenu && (
                            <ul className="submenu">
                                {item.subMenu.map((subItem, subIndex) => (
                                    <li key={subIndex} className={`submenu__item ${currentPath === subItem.link && 'active'}`}>
                                        <Link className="submenu__item-link" to={subItem.link}>{subItem.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Sidebar;
