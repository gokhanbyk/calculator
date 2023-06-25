const input = document.querySelector('.calculate-input')
const item = document.querySelector('.calculate-item')
const equal = document.querySelector('.equal')

let display = '0'
let firstValue = null
let waitingValue = false
let operator = null
let selectedTarget = null

function updateScreen() {
    input.value = display
}
updateScreen()

item.addEventListener('click',function(e) {
    const element = e.target

    if(!element.matches('button')) return;

    if(element.classList.contains('clear')) {
        clear()
        updateScreen()
        return
    }
    if(element.classList.contains('decimal')){
        decimal()
        updateScreen()
        return
    }
    if(element.classList.contains('delete')) {
        deleteBtn()
        updateScreen()
        return
    }
    if(element.classList.contains('operator')) {
        forOperators(element.value)
        updateScreen()
        return
    }
    
    // changeColor(e)

    inputNumber(element.value)
    updateScreen()
})


function forOperators(element) {
    let secondValue = parseFloat(display)

    if(operator && waitingValue) {
        operator = element
        return
    }

    if(firstValue === null) {
        firstValue = parseFloat(display)
    } else {
        const result = calculate(firstValue, secondValue, operator)
        display = result
        firstValue = display
    }

    operator = element
    waitingValue = true
}

function calculate(first, second, op) {
    if(op == '+') {
        return first + second
    } else if (op == '-') {
        return first - second
    } else if (op == '*') {
        return first * second
    } else if(op == '/') {
        return first / second
    }
    return first
}





function inputNumber(num) {
    if(waitingValue) {
        display = num
        waitingValue = false
    } else {
        display = display === '0' ? num : display + num
    }
}


function clear() {
    display = '0'
    firstValue = null
    waitingValue = false
    operator = null
}

function decimal() {
    if(!display.includes('.')) {
        display += '.'
    }
}

function deleteBtn() {
    display = input.value.slice(0, -1)
}

// function changeColor(e) {
// //  if(e.target.classList.contains('selected')) {
// //     e.target.classList.remove('selected')

// //  } else {
// //     e.target.classList.add('selected')
// // }
// }