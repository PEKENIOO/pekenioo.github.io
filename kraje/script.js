import { renderDashboard, createListElement } from "./dashboard.js";
import { renderDetailDashboard, createDetailElement, createLink, borderCountriesContainer} from "./renderDetailDashboard.js";

if(window.location.search.includes("?country=")){
   renderDetailDashboard();
}else{
    renderDashboard();
};

export const renderCountriesList = (countries) =>{
    const rootElement = document.querySelector('.main-content');
    rootElement.innerHTML = '';
    rootElement.appendChild(createListElement(countries));
};

export const renderCountryDetails = (country) => {
    const rootElement = document.querySelector('.main-content');
    rootElement.innerHTML = '';
    rootElement.appendChild(createLink('Back','/'));
    rootElement.appendChild(createDetailElement(country));
    rootElement.appendChild(borderCountriesContainer(country));
};

// THEME
const changeTheme = document.querySelector('.icon');

let theme = localStorage.getItem('theme') || 'light';

changeTheme.addEventListener('click', function(){
    if(theme === 'dark'){
        document.body.classList.add('light');
        changeTheme.classList.add('fa-moon');
        changeTheme.classList.remove('fa-sun');
        theme = 'light';
    }
    else{
        document.body.classList.remove('light');
        changeTheme.classList.add('fa-sun');
        changeTheme.classList.remove('fa-moon');
        theme = 'dark';
    };

    localStorage.setItem('theme', theme);
});

if(theme=== 'light')
{
    document.querySelector('body').classList.add('light');
};

window.addEventListener('load', function(){
    if(this.document.body.classList.contains('light'))
    {
        changeTheme.classList.add('fa-moon');
    }
    else
    {
        changeTheme.classList.add('fa-sun');
    }
});

