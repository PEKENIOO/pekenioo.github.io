import{renderCountriesList}from "./script.js";

export const renderDashboard = () => {
document.querySelector('.inputs').classList.add('active');
const API_URL = "https://restcountries.com/v3.1/all";

let countries;
let search = '';
let region = '';

fetch(API_URL)
.then(res => res.json())
.then(countriesRaw => {
    countries = countriesRaw.map(country => {
    return {
        capital: country.capital ?? 'no Capital', 
        name: country.name.common,
        flag: country.flags.svg, 
        population: country.population.toLocaleString(), 
        region: country.region,
        code: country.cioc,
    };
    });
    renderCountriesList(countries);
});

const filterDataAndRenderCountriesList = () => {
    if(region == 'All')
    {
    const filteredAllCountries = countries.filter(country => {
        return country.name.toLowerCase().includes(search);
    });
    renderCountriesList(filteredAllCountries);
    }
    else
    {
    const filteredCountries = countries.filter(country => {
        return country.name.toLowerCase().includes(search) && (!region || country.region === region);
    });
    renderCountriesList(filteredCountries);
    }
}

document.querySelector('#search').addEventListener('input', (e) => {
    search = e.target.value.toLowerCase().trim();
    filterDataAndRenderCountriesList();
});

document.querySelector('#region').addEventListener('change', (e) => {
    region = e.target.value;

    filterDataAndRenderCountriesList();
});
};

const createCountryItemElement = (country) => {
    const anchorElement = document.createElement('a');
    anchorElement.classList.add('country-item-link');
    anchorElement.href = `?country=${country.code}`;

    const createDivItem = document.createElement('div');
    createDivItem.classList.add('country-item');

    const countryFlag = document.createElement('img');
    countryFlag.classList.add('flag');
    countryFlag.src = country.flag;
    countryFlag.alt = country.name + ' flag';

    const countryName = document.createElement('h1');
    countryName.classList.add('name');
    countryName.innerText = country.name;

    const countryCapital = document.createElement('p');
    countryCapital.classList.add('capital');
    countryCapital.innerText = 'Capital: ' + country.capital;

    const countryPopulation = document.createElement('p');
    countryPopulation.classList.add('population');
    countryPopulation.innerText = 'Population: ' + country.population;

    const countryRegion = document.createElement('p');
    countryRegion.classList.add('region');
    countryRegion.innerText = 'Region: ' + country.region;

    createDivItem.appendChild(countryFlag);
    createDivItem.appendChild(countryName);
    createDivItem.appendChild(countryCapital);
    createDivItem.appendChild(countryPopulation);
    createDivItem.appendChild(countryRegion);
    anchorElement.appendChild(createDivItem);
    return anchorElement;
};

export const createListElement = (countries) => {
    const ListElement = document.createElement('section');
    ListElement.classList.add('content');
    countries.forEach((country) => {
        ListElement.appendChild(createCountryItemElement(country));
    });

    return ListElement;
};