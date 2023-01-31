import { renderCountriesList, renderCountryDetails } from "./script.js";

export const renderDetailDashboard = () => {
const searchParameter = new URLSearchParams(window.location.search);
const countryCode = searchParameter.get("country");
if(countryCode=== 'undefined'){
    backToMainPage();
}
console.log(countryCode);
const API_DETAIL_URL = `https://restcountries.com/v3.1/alpha/${countryCode}`;

fetch(API_DETAIL_URL)
.then(res => res.json())
.then(([country]) => {
    if(!country){
        backToMainPage();
    }
    console.log(country);
    country = {
        capital: country.capital ?? 'no Capital', 
        name: country.name.common,
        nativeName: Object.values(country.name.nativeName)[0].official,
        flag: country.flags.svg, 
        population: country.population.toLocaleString(), 
        region: country.region,
        subregion: country.subregion,
        tld: country.tld[0],
        currencies: Object.values(country.currencies).map(currency =>       currency.name).join(", "),
        languages: Object.values(country.languages).join(", "),
        code: country.cioc,
        borders: country.borders,
    };
    renderCountryDetails(country);
});
};

const backToMainPage = () => {
    window.location.href = "/";
};

export const createLink = (text, link) => {
    const btnLink = document.createElement('a');
    btnLink.classList.add('btn-link');
    btnLink.href = link;
    btnLink.innerText = text;
    if(btnLink.innerText === 'Back'){
        btnLink.style.margin = '100px 50px';
    }
    return btnLink;
};

export const borderCountriesContainer = (country) => {

    const borderCountriesContainerElement = document.createElement('div');
    borderCountriesContainerElement.classList.add('borders-label-and-elements');
    const labelElement = document.createElement('strong');
    labelElement.innerText = "Border Countries: ";
    borderCountriesContainerElement.appendChild(labelElement);

    if(country.borders && country.borders.length > 0)
    {
        const borderLinksContainer = document.createElement('div');
        borderLinksContainer.classList.add('border-links-container');
        country.borders.forEach((border) => {
            borderLinksContainer.appendChild(createLink(border,`/?country=${border}`));
            borderCountriesContainerElement.appendChild(borderLinksContainer);
        });
    }

    return borderCountriesContainerElement;
};

export const createDetailElement = (country) => {
    const containerDetail = document.createElement('div');
    containerDetail.classList.add('details-container');

    const containerRightSideDetails = document.createElement('div');
    containerRightSideDetails.classList.add('right-side-details');

    const countryFlag = document.createElement('img');
    countryFlag.classList.add('flag-detail');
    countryFlag.src = country.flag;
    countryFlag.alt = country.name + ' flag';

    const detailInfo = document.createElement('h1');
    detailInfo.innerText = country.name;

    const countryNativeName = document.createElement('p');
    countryNativeName.innerText = 'Native Name: ' + country.nativeName;

    const countryPopulation = document.createElement('p');
    countryPopulation.innerText = 'Population: ' + country.population;

    const countryRegion = document.createElement('p');
    countryRegion.innerText = 'Region: ' + country.region;

    const countrySubregion = document.createElement('p');
    countrySubregion.innerText = 'Sub Region: ' + country.subregion;

    const countryCapital = document.createElement('p');
    countryCapital.innerText = 'Capital: ' + country.capital;

    const countryTld = document.createElement('p');
    countryTld.innerText = 'Top Level Domain: ' + country.tld;

    const countryCurrencies = document.createElement('p');
    countryCurrencies.innerText = 'Currencies: ' + country.currencies;

    const countryLanguages = document.createElement('p');
    countryLanguages.innerText = 'Languages: ' + country.languages;

    containerDetail.appendChild(countryFlag);
    containerRightSideDetails.appendChild(detailInfo);
    containerRightSideDetails.appendChild(countryNativeName);
    containerRightSideDetails.appendChild(countryPopulation);
    containerRightSideDetails.appendChild(countryRegion);
    containerRightSideDetails.appendChild(countrySubregion);
    containerRightSideDetails.appendChild(countryCapital);
    containerRightSideDetails.appendChild(countryTld);
    containerRightSideDetails.appendChild(countryCurrencies);
    containerRightSideDetails.appendChild(countryLanguages);
    containerDetail.appendChild(containerRightSideDetails);

    return containerDetail;
};

