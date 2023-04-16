const btnArr = document.querySelectorAll('.hands>button');
let mainSec = 0;
let mainMin = 0;
let mainMilSec = 0;
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const miliSeconds = document.querySelector('.miliSeconds');
let flag = 0;
const lapContainer = document.querySelector('.lap-container>ul');

btnArr.forEach((val) => {
    val.addEventListener('click', function () {
       let  _text = (val.innerHTML).toUpperCase();
        switch (_text) {
            case 'START':
                val.innerHTML = 'Stop';
                _start();
                flag++;
                break;
            case 'STOP':
                val.innerHTML = 'Resume';
                btnArr[0].innerHTML = 'Reset';
                _stop();
                break;
            case 'RESET':
                val.innerHTML = 'Lap';
                btnArr[1].innerHTML = 'Start';
                _reset();
                break;
            case 'LAP':
                _lap();
                break;
            case 'RESUME':
                val.innerHTML = 'Stop';
                btnArr[0].innerHTML = 'Lap';
                _start();
                break;

        }
    })
})

function _lowerThanTen(temp) {
    let tempo = '';
    if (temp < 10) {
        tempo = '0' + temp;
    } else {
        tempo = temp;
    }
    return tempo;
}


let _time = '';

function _start() {
    _time = setInterval(function () {

        if (mainMilSec < 99) {
            mainMilSec++;
        } else {
            mainMilSec = 0;
            if (mainSec < 60) {
                mainSec++;
            } else {
                mainSec = 0;
                mainMin++;
            }
        }


        minutes.innerHTML = _lowerThanTen(mainMin) + ' :';
        seconds.innerHTML = _lowerThanTen(mainSec) + ' :';
        miliSeconds.innerHTML = _lowerThanTen(mainMilSec);




    }, 100)

}


let count = 1;

function _lap() {
    let _li = document.createElement('li');
    if (flag > 0) {
        document.querySelector('.lap-container>ul>li.header').classList.remove('d-none');
        _li.innerHTML = `
                <span>${_lowerThanTen(count)}</span>
                <span>${minutes.innerHTML + '' + seconds.innerHTML + '' + miliSeconds.innerHTML}</span>`;
        const List = document.querySelectorAll('.lap-container>ul>li')
        lapContainer.insertBefore(_li, List[1]);
        count++;
    }
}

function _stop() {
    clearInterval(_time);
}

function _reset() {
    flag = 0;
    count = 1;
    clearInterval(_time);
    document.querySelector('.lap-container>ul>li.header').classList.add('d-none');
    lapContainer.innerHTML = ` 
        <li class="header d-none">
            <span>Lap</span>
            <span>Lap times</span>
        </li>`;
    mainMilSec = 0;
    mainMin = 0;
    mainSec = 0;
    minutes.innerHTML = '00 :';
    seconds.innerHTML = '00 :'
    miliSeconds.innerHTML = '00';
}