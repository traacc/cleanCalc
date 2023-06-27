const calc = document.body.querySelector('.calc');

const objectElement = calc.querySelector('.calcHeader__typeObject');
const cleaningTypeElement = calc.querySelector('.calcHeader__typeCleaning');
const roomsElement = calc.querySelector('.calcHeader__numberRooms');
const fqTypeElement = calc.querySelector('.calcHeader__freq');

const objectType = calc.querySelector('.calcHeader__typeObject select');
const cleaningType = calc.querySelector('.calcHeader__typeCleaning select');

const ctGeneral = cleaningTypeElement.querySelector('option[value="general"]');
const ctWet = cleaningTypeElement.querySelector('option[value="wet"]');
const ctAfterRepiar = cleaningTypeElement.querySelector('option[value="afterRepiar"]');;
const ctSupport = cleaningTypeElement.querySelector('option[value="support"]');;
const ctJu = cleaningTypeElement.querySelector('option[value="ju"]');;
const ctWindows = cleaningTypeElement.querySelector('option[value="windows"]');;
const ctSpecial = cleaningTypeElement.querySelector('option[value="special"]');;

const cleaningTypeList = [ctGeneral,ctWet,ctAfterRepiar,ctSupport,ctJu,ctWindows,ctSpecial];

const fqType = calc.querySelector('.calcHeader__freq select');
const roomsType = calc.querySelector('.calcHeader__numberRooms select');


const sqGroup = calc.querySelector('.calc__groupSq');
const onceGroup = calc.querySelector('.calc__groupOnceCleaning');
const manyGroup = calc.querySelector('.calc__groupManyCleaning');

const sqM2 = sqGroup.querySelector('input[type="range"]');
const workersCount = onceGroup.querySelector('input.val');
const daysInWeek = manyGroup.querySelector('input.val');

const specialNote = calc.querySelector('.calc__specialNote');

const degMoving = document.querySelector('.calc__sq .rangeDeg .degMoving');

const windowsGroup = calc.querySelector('.calc__groupWindows');
const windowsWoCleaningGroup = calc.querySelector('.calc__groupWindows');
const balconyGroup = calc.querySelector('.calc__groupBalcony');
const dryGroup = calc.querySelector('.calc__groupDry');
const otherGroup = calc.querySelector('.calc__groupOther');

const nameEl = document.querySelector('.sendForm__name');
const phoneEl = document.querySelector('.sendForm__phone');

const url = './sendMail.php';

const totalCosts = document.querySelector('.cost__value');

const groups = [ roomsElement, fqTypeElement, sqGroup, specialNote, onceGroup, manyGroup, windowsGroup, windowsWoCleaningGroup, balconyGroup, dryGroup, otherGroup];

let tc = 0;

function updateGroup() {
    groups.forEach((el)=>{
        el.classList.add('hide');
    });
    cleaningTypeList.forEach((el)=>{
        el.classList.add('hide');
    });
    calc.querySelectorAll('.calc__toggleGroup').forEach((el)=>{
            el.parentElement.parentElement.querySelector('.calc__groupContent').classList.add('hide');
            el.classList.add('calc__toggleGroup--hidden');
    });
    switch (objectType.value) {

        case 'flat':
            roomsElement.classList.remove('hide');
            ctGeneral.classList.remove('hide');
            ctWet.classList.remove('hide');
            ctAfterRepiar.classList.remove('hide');
            ctWindows.classList.remove('hide');
            ctSpecial.classList.remove('hide');
            break;
        case 'house':
            
            ctGeneral.classList.remove('hide');
            ctWet.classList.remove('hide');
            ctAfterRepiar.classList.remove('hide');
            ctWindows.classList.remove('hide');
            ctSpecial.classList.remove('hide');
            break;
        case 'non-living':
            ctSupport.classList.remove('hide');
            ctJu.classList.remove('hide');
            break;
        default:
            break;
    }
    switch (cleaningType.value) {
        case 'general':
        case 'wet':
        case 'afterRepiar':
        
            sqGroup.classList.remove('hide');
            windowsGroup.classList.remove('hide');
            balconyGroup.classList.remove('hide');
            dryGroup.classList.remove('hide');
            otherGroup.classList.remove('hide');
            break;
        case 'special':
            windowsGroup.classList.remove('hide');
            balconyGroup.classList.remove('hide');
            dryGroup.classList.remove('hide');
            otherGroup.classList.remove('hide');
            specialNote.classList.remove('hide');
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
calc.querySelectorAll('.calc__field input[type="checkbox"]').forEach((el)=>{
    el.addEventListener('input',(e)=>{
        updateTotalCost();
    });
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
            basePrice = workersCount.value * daysInWeek.value * 2500;
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
    tc = basePrice + costs;
}

calc.querySelectorAll('.calc__toggleGroup').forEach((el)=>{
    el.addEventListener('click', ()=>{
        el.parentElement.parentElement.querySelector('.calc__groupContent').classList.toggle('hide');
        el.classList.toggle('calc__toggleGroup--hidden');
    });
});
workersCount.addEventListener('input', (e)=>{
    if(/[6-9]/.test(e.target.value)) {
        e.target.value="1";
    }
    updateTotalCost();
});
daysInWeek.addEventListener('input', (e)=>{
    if(/[8-9]/.test(e.target.value)) {
        e.target.value="1";
    }
    updateTotalCost();
});
sqM2.addEventListener('input', ()=>{
    let per =  (sqM2.value - sqM2.min) / (sqM2.max - sqM2.min) * 100;
    sqM2.style.background = `linear-gradient(to right, #0F5696 ${per}%, #D9D9D9 ${per}%)`;

    const ratio = Number(((sqM2.value - sqM2.min)*100) / (sqM2.max - sqM2.min));
    degMoving.style.left = `calc(${ratio}% + (${-5 - ratio * 0.15}px))`
    degMoving.textContent = sqM2.value;

    //updateGroup();
    updateTotalCost();
});
objectType.addEventListener('change', ()=>{
    cleaningType.selectedIndex = 0;
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

async function sendMail(obj) {
    await fetch(url, {method: 'POST', body: JSON.stringify(obj)});
}

document.querySelector('.sendForm__btn').addEventListener('click', async ()=>{
    let mailData = {
        "name": nameEl.value,
        "phone": phoneEl.value,
        "objectType":objectType.value,
        "cleaningType":cleaningType.value,
        "rooms":roomsType.value,
        "fqType":fqType.value,
        "sqM2":sqM2.value,
        "workersCount":workersCount.value,
        "daysInWeek":daysInWeek.value,
        "totalCosts":tc,
    };

    const activeFields = calc.querySelectorAll(".calc__group:not(.hide) input.val");
    for(let el of activeFields) {
        if(el.parentElement.parentElement.parentElement.querySelector('.cb:checked'))
            mailData[el.name] = el.value;
    }

    console.log(mailData);
    await sendMail(mailData);
});
document.addEventListener("DOMContentLoaded",()=>{
    let per =  (sqM2.value - sqM2.min) / (sqM2.max - sqM2.min) * 100;
    sqM2.style.background = `linear-gradient(to right, #0F5696 ${per}%, #D9D9D9 ${per}%)`;
    updateGroup();
    updateTotalCost();
});