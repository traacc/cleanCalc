const calc = document.body.querySelector('.calc');

const objectElement = calc.querySelector('.calcHeader__typeObject');
const cleaningTypeElement = calc.querySelector('.calcHeader__typeCleaning');
const roomsElement = calc.querySelector('.calcHeader__numberRooms');
const fqTypeElement = calc.querySelector('.calcHeader__freq');

const objectType = calc.querySelector('.calcHeader__typeObject select');
const cleaningType = calc.querySelector('.calcHeader__typeCleaning select');
const fqType = calc.querySelector('.calcHeader__freq select');
const roomsType = calc.querySelector('.calcHeader__numberRooms select');


const sqGroup = calc.querySelector('.calc__groupSq');
const onceGroup = calc.querySelector('.calc__groupOnceCleaning');
const manyGroup = calc.querySelector('.calc__groupManyCleaning');

const sqM2 = sqGroup.querySelector('input[type="range"]');
const workersCount = onceGroup.querySelector('input.val');
const daysInWeek = manyGroup.querySelector('input.val');

const windowsGroup = calc.querySelector('.calc__groupWindows');
const windowsWoCleaningGroup = calc.querySelector('.calc__groupWindows');
const balconyGroup = calc.querySelector('.calc__groupBalcony');
const dryGroup = calc.querySelector('.calc__groupDry');
const otherGroup = calc.querySelector('.calc__groupOther');

const totalCosts = document.querySelector('.cost__value');

const groups = [ roomsElement, fqTypeElement, sqGroup, onceGroup, manyGroup, windowsGroup, windowsWoCleaningGroup, balconyGroup, dryGroup, otherGroup];


function updateGroup() {
    groups.forEach((el)=>{
        el.classList.add('hide');
    });
    switch (objectType.value) {
        case 'any':
            
            break;
        case 'flat':
            roomsElement.classList.remove('hide');
            break;
        case 'house':
            
            break;
        default:
            break;
    }
    switch (cleaningType.value) {
        case 'general':
        case 'wet':
        case 'afterRepiar':
        case 'special':
            sqGroup.classList.remove('hide');
            windowsGroup.classList.remove('hide');
            balconyGroup.classList.remove('hide');
            dryGroup.classList.remove('hide');
            otherGroup.classList.remove('hide');
            break;
        case 'windows':
            windowsWoCleaningGroup.classList.remove('hide');
            balconyGroup.classList.remove('hide');
            dryGroup.classList.remove('hide');
            otherGroup.classList.remove('hide');
            break;
        case 'support':
        case 'ju':
            dryGroup.classList.remove('hide');
            otherGroup.classList.remove('hide');
            fqTypeElement.classList.remove('hide');
            break;
        default:
            break;
    }
    switch (fqType.value) {
        case 'once':
            onceGroup.classList.remove('hide');
            break;
        case 'many':
            onceGroup.classList.remove('hide');
            manyGroup.classList.remove('hide');
            break;
        default:
            break;
    }
}
calc.querySelectorAll('.calc__field .val[data-price]').forEach((el)=>{
    el.addEventListener('input', (e)=>{
        console.log(el.parentElement.parentElement);
        el.parentElement.parentElement.querySelector('.price').textContent = el.value * el.dataset.price + " рублей";
        updateTotalCost();
    })
});
function updateTotalCost() {
    const activeFields = calc.querySelectorAll(".calc__group:not(.hide) input.val");
    let basePrice = 0;
    switch (cleaningType.value) {
        case 'general':
            basePrice = sqM2.value * 100;
            break;
        case 'wet':
            basePrice = sqM2.value * 70;
            break;
        case 'afterRepiar':
            basePrice = sqM2.value * 120;
            break;
        case 'special':
            basePrice = sqM2.value * 300;
            break;
        case 'support':
        case 'ju':
            break;
        case 'windows':
        default:
            break;
    }
    console.log(basePrice);
    switch (fqType.value) {
        case 'once':
            basePrice = workersCount.value * 2500;
            break;
        case 'many':
            basePrice = workersCount.value * daysInWeek.value * 3500;
            break;
        default:
            break;
    }
    let costs = 0;
    for(let el of activeFields) {
        if(el.dataset.price && el.parentElement.parentElement.parentElement.querySelector('.cb:checked'))
            costs += el.value * el.dataset.price;
    }
    totalCosts.textContent = (basePrice + costs) + " рублей";
}

calc.querySelectorAll('.calc__toggleGroup').forEach((el)=>{
    el.addEventListener('click', ()=>{
        console.log(el.parentElement);
        el.parentElement.parentElement.querySelector('.calc__groupContent').classList.toggle('hide');
        el.classList.toggle('calc__toggleGroup--hidden');
    });
});
workersCount.addEventListener('input', ()=>{
    updateGroup();
    updateTotalCost();
});
daysInWeek.addEventListener('input', ()=>{
    updateGroup();
    updateTotalCost();
});
sqM2.addEventListener('change', ()=>{
    updateGroup();
    updateTotalCost();
});
objectType.addEventListener('change', ()=>{
    fqType.selectedIndex = 0;
    updateGroup();
    updateTotalCost();
});
cleaningType.addEventListener('change', ()=>{
    fqType.selectedIndex = 0;
    updateGroup();
    updateTotalCost();
});
fqType.addEventListener('change', ()=>{
    updateGroup();
    updateTotalCost();
});
document.addEventListener("DOMContentLoaded",()=>{
    updateGroup();
    updateTotalCost();
});