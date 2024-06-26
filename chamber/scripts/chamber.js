const currentYearSelector = document.querySelector('#currentYear');
const lastModifiedSelector = document.querySelector('#lastModified');

const today = new Date();

currentYearSelector.textContent = today.getFullYear();
lastModifiedSelector.textContent = `Last Modified: ${document.lastModified}`;

const menuButtonSelector = document.querySelector('#menu');
const animatedMenuSelector = document.querySelector('#animatedMenu');

menuButtonSelector.addEventListener('click', () => {
    menuButtonSelector.classList.toggle('open');
    animatedMenuSelector.classList.toggle('open');
});

const homeSelector = document.querySelector('.home');


const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=34.23&lon=-84.48&appid=7bf9a045a7e358e0909cb880c445a24d&units=imperial';

async function getCurrentWeather(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); 
}

if (homeSelector) {
    getCurrentWeather(currentWeatherUrl); 
}

const businessesSelector = document.querySelector('#businesses');
const url = "https://devemmanuel1.github.io/wdd231/chamber/data/members.json";

if (homeSelector) {
    getCompanyCards(url, businessesSelector, true);
}

const directorySelector = document.querySelector('.directory');
const companiesSelector = document.querySelector('#companies');
const cardViewSelector = document.querySelector('#cardView');
const listViewSelector = document.querySelector('#listView');

async function getCompanyCards(url, selector, silverOrGold = false) {
    const response = await fetch(url);
    const data = await response.json();
    
    if (silverOrGold) {
        const dataFiltered = data.companies.filter(company => company.membershipLevel > 1);
        
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * dataFiltered.length);
            dataFiltered.splice(randomIndex, 1);
        }
        displayCompanyCards(dataFiltered, selector);
    } else {
        displayCompanyCards(data.companies, selector);
    }
}

async function getCompanyList(url) {
    const response = await fetch(url);
    const data = await response.json();

    displayCompanyList(data.companies);
}

const displayCompanyCards = (companies, selector) => {
    selector.textContent = "";

    companies.forEach(company => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const name = document.createElement('h3');
        const image = document.createElement('img');
        const address = document.createElement('div');
        address.setAttribute('class', 'address');
        const address1 = document.createElement('p');
        const address2 = document.createElement('p');
        const phoneNumber = document.createElement('p');
        const website = document.createElement('p');
        const membershipLevel = document.createElement('p');

        name.textContent = company.name;
        card.appendChild(name);
        
        image.setAttribute('src', company.image);
        image.setAttribute('alt', `${company.name} image`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');
        card.appendChild(image);

        address1.textContent = company.address.street;
        address.appendChild(address1)
        address2.textContent = `${company.address.city}, ${company.address.state} ${company.address.zip}`;
        address.appendChild(address2);
        card.appendChild(address);

        phoneNumber.textContent = company.phoneNumber;
        card.appendChild(phoneNumber);

        website.textContent = company.website;
        card.appendChild(website);

        membershipLevel.textContent = `Membership Level: ${company.membershipLevel}`;
        card.appendChild(membershipLevel);

        selector.appendChild(card);
    });
    selector.setAttribute('class', 'companies-grid');
}

const displayCompanyList = companies => {
    companiesSelector.textContent = "";

    companies.forEach(company => {
        const card = document.createElement('div');
        card.setAttribute('class', 'list');
        const name = document.createElement('h3');
        const address = document.createElement('div');
        address.setAttribute('class', 'address');
        const address1 = document.createElement('p');
        const address2 = document.createElement('p');
        const info =document.createElement('div');
        const phoneNumber = document.createElement('p');
        const website = document.createElement('p');

        name.textContent = company.name;
        card.appendChild(name);
        
        address1.textContent = company.address.street;
        address.appendChild(address1)
        address2.textContent = `${company.address.city}, ${company.address.state} ${company.address.zip}`;
        address.appendChild(address2);
        card.appendChild(address);

        phoneNumber.textContent = company.phoneNumber;
        info.appendChild(phoneNumber);
        website.textContent = company.website;
        info.appendChild(website);
        card.appendChild(info);

        companiesSelector.appendChild(card);
    });
    companiesSelector.removeAttribute('class', 'companies-grid');
}

if (directorySelector) {
    cardViewSelector.addEventListener('click', () => {
        getCompanyCards(url, companiesSelector);
    });

    listViewSelector.addEventListener('click', () => {
        getCompanyList(url);
    });

    getCompanyCards(url, companiesSelector);
}