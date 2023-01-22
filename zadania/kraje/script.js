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
        population: country.population, 
        region: country.region,
    };
    });
    renderCountriesList(countries);
});

let round = (x) => {
    if(x < 999)
    {
        return x;
    }

    if(x < 1000000) {
		return Math.round(x/1000) + "K";
	}

	if( x < 10000000) {
		return (x/1000000).toFixed(2) + "M";
	}

	if(x < 1000000000) {
		return Math.round((x/1000000).toFixed(2)) + "M";
	}

	if(x < 1000000000000) {
		return Math.round((x/1000000000).toFixed(2)) + "B";
	}
};

const createCountryItemElement = (country) => {
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
    countryPopulation.innerText = 'Population: ' + round(country.population);

    const countryRegion = document.createElement('p');
    countryRegion.classList.add('region');
    countryRegion.innerText = 'Region: ' + country.region;

    createDivItem.appendChild(countryFlag);
    createDivItem.appendChild(countryName);
    createDivItem.appendChild(countryCapital);
    createDivItem.appendChild(countryPopulation);
    createDivItem.appendChild(countryRegion);
    return createDivItem;
};

const createListElement = (countries) => {
    const ListElement = document.createElement('section');
    ListElement.classList.add('content');
    countries.forEach((country) => {
        ListElement.appendChild(createCountryItemElement(country));
    });

    return ListElement;
};

const renderCountriesList = (countries) =>{
    const rootElement = document.querySelector('.main-content');
    rootElement.innerHTML = '';
    rootElement.appendChild(createListElement(countries));
};

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

// THEME
const icon = document.querySelector('.icon');

icon.addEventListener('click', () => {
    document.body.classList.toggle('light');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});