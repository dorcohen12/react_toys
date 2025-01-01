import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    createToy,
    getDefaultFilter,
    getFilterFromSearchParams
}

export const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered'
]

const STORAGE_KEY = 'toys'

_createToys()

async function query(filterBy) {
    try {
        let toys = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            let { name = '', inStock = 'all'} = filterBy
            if(name.length > 0) {
                toys = toys.filter(toy =>
                    toy.name.toLowerCase().includes(name.toLowerCase())
                )
            }
            if(inStock !== 'all') {
                if(inStock === '0') {
                    inStock = false;
                } else {
                    inStock = true;
                }
                toys = toys.filter(toy => toy.inStock === JSON.parse(inStock))
            }
        }
        return toys
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(robotToSave) {
    if (robotToSave.id) {
        return storageService.put(STORAGE_KEY, robotToSave)
    } else {
        robotToSave.isOn = false
        return storageService.post(STORAGE_KEY, robotToSave)
    }
}

function createToy(model = '', type = '', batteryStatus = 100) {
    return {
        model,
        batteryStatus,
        type
    }
}

function getDefaultFilter() {
    return {
        name: '',
        inStock: 'all',
        labels: ''
    }
}


function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

/* thanks for ariel */

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: false
    }
}

function _createRandomToy(toy) {
    toy._id = utilService.makeId();
    toy.name = _generateToyName();
    toy.labels = _getRandomLabels(labels);
    toy.inStock = Math.random() >= 0.5;
    toy.price = Math.round(Math.random() * 300);
    return toy;
}

async function _createToys() {
    const toys = [];
    for (let i = 0; i < 20; i++) {
        const toy = getEmptyToy();
        toys.push(_createRandomToy(toy));
    }
    return utilService.saveToStorage(STORAGE_KEY, toys);
}

function _generateToyName() {
    const adjectives = ['Happy', 'Magic', 'Super', 'Bouncy', 'Sparkly', 'Dancing', 'Flying', 'Rainbow', 'Talking', 'Musical'];
    const nouns = ['Bear', 'Robot', 'Doll', 'Unicorn', 'Puppy', 'Dinosaur', 'Dragon', 'Pony', 'Train', 'Car'];
    const suffixes = ['Bot', 'Friend', 'Pal', 'Buddy', 'Toy', 'Wonder', 'Star', 'Hero', 'Master', 'Joy'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${randomAdjective} ${randomNoun} ${randomSuffix}`;
}

function _getRandomLabels(labels) {
    // Get a random number between 1 and the length of the labels array
    const numberOfLabels = Math.floor(Math.random() * labels.length) + 1;

    // Create a copy of the original array to avoid modifying it
    const shuffledLabels = [...labels];

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = shuffledLabels.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledLabels[i], shuffledLabels[j]] = [shuffledLabels[j], shuffledLabels[i]];
    }

    // Return only the first 'numberOfLabels' elements
    return shuffledLabels.slice(0, numberOfLabels);
}




