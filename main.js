const hearts = document.querySelectorAll("i.fa-heart");
const removeProduct = document.querySelectorAll(".remove");
const removeAll = document.querySelector(".Action");
const plusBtns = document.querySelectorAll(".counter :first-child");
const minusBtns = document.querySelectorAll(".counter :last-child");
let totalAmount = document.querySelector(".total-amount");




removeAll.addEventListener('click', () => {
    const items = document.querySelectorAll(".Cart-Items");
    for(const item of items) {
        item.remove();
    }
    sumCalculator();
})

for(const heart of hearts) {
    heart.addEventListener("click", () => {
        heart.classList.toggle("fa-regular");
        heart.classList.toggle("fa-solid");
    });
    }

for(const removeBtn of removeProduct) {
    removeBtn.addEventListener('click', ()=> {
        removeBtn.closest(".Cart-Items").remove();
        sumCalculator();
    })
}

for(const plusBtn of plusBtns) {
    plusBtn.addEventListener('click', ()=> {
        plusBtn.nextElementSibling.textContent = Number(plusBtn.nextElementSibling.textContent)+1;
        let price = currency2number(plusBtn.parentElement.nextElementSibling.children[0].textContent) / (Number(plusBtn.nextElementSibling.textContent)-1);
        plusBtn.parentElement.nextElementSibling.children[0].textContent = '$' + (price * Number(plusBtn.nextElementSibling.textContent)).toFixed(2);
        console.log('price+: ', price);
        console.log('plus function: ', (price * Number(plusBtn.nextElementSibling.textContent)).toFixed(2));
        sumCalculator();
    })
}

for(const minusBtn of minusBtns) {
    minusBtn.addEventListener('click', ()=> {
        if(Number(minusBtn.previousElementSibling.textContent > 1)) {
            minusBtn.previousElementSibling.textContent = Number(minusBtn.previousElementSibling.textContent)-1;
            let price = currency2number(minusBtn.parentElement.nextElementSibling.children[0].textContent) / (Number(minusBtn.previousElementSibling.textContent)+1);
            minusBtn.parentElement.nextElementSibling.children[0].textContent = '$' + (price * Number(minusBtn.previousElementSibling.textContent)).toFixed(2);
            console.log('price-: ', price);
            console.log('minus function: ', (price * Number(minusBtn.previousElementSibling.textContent)).toFixed(2));
            sumCalculator();
        }
    })
}

function currency2number (price) {
    price = price.replaceAll(",", "").replace("$", "");
    return Number(price);
}

function sumCalculator() {
    const numberArr = [];
    const amounts = document.querySelectorAll(".amount");
    for(const el of amounts) {
        numberArr.push(currency2number(el.textContent));
    }
    totalAmount.textContent = '$'+numberArr.reduce((acc, curr) => acc+curr, 0).toFixed(2);
}