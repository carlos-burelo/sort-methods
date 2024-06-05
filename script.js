let operations = 0;

export async function startSorting(sortFunction) {
    let boxes = document.querySelectorAll('.box');
    operations = 0;
    await sortFunction(boxes);
}

export async function swap(box1, box2) {
    await sleep(500);

    let pos1 = box1.getBoundingClientRect();
    let pos2 = box2.getBoundingClientRect();
    let color1 = box1.style.getPropertyValue('--bg-color');
    let color2 = box2.style.getPropertyValue('--bg-color');
    let deltaX = pos1.left - pos2.left;

    box1.style.transform = `translateX(-${deltaX}px)`;
    box2.style.transform = `translateX(${deltaX}px)`;

    await sleep(500);

    let tempValue = box1.dataset.value;
    box1.dataset.value = box2.dataset.value;
    box2.dataset.value = tempValue;

    let temp = box1.innerText;
    box1.innerText = box2.innerText;
    box2.innerText = temp;

    box1.style.setProperty('--bg-color', color2);
    box2.style.setProperty('--bg-color', color1);

    box1.style.transform = "translateX(0)";
    box2.style.transform = "translateX(0)";
}

export function shuffleBoxes() {
    let boxes = document.querySelectorAll('.box');
    let array = Array.from(boxes);
    let values = generateRandomValues(array.length);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.forEach((box, index) => {
        let value = values[index];
        box.innerText = `$ ${value}0 MXN`;
        box.dataset.value = value;
    });
}

function generateRandomValues(length) {
    let values = [];
    for (let i = 0; i < length; i++) {
        let randomValue = Math.floor(Math.random() * 100) + 1;
        while (values.includes(randomValue)) {
            randomValue = Math.floor(Math.random() * 100) + 1;
        }
        values.push(randomValue);
    }
    return values;
}


export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function bubbleSort(boxes) {
    let len = boxes.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (parseInt(boxes[i].dataset.value) > parseInt(boxes[i + 1].dataset.value)) {
                await swap(boxes[i], boxes[i + 1]);
                swapped = true;
                operations++;
                document.getElementById('operations').innerText = operations;
            }
        }
    } while (swapped);
}

export async function shellSort(boxes) {
    let len = boxes.length;
    for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < len; i++) {
            let temp = boxes[i].dataset.value;
            let j;
            for (j = i; j >= gap && parseInt(boxes[j - gap].dataset.value) > parseInt(temp); j -= gap) {
                await swap(boxes[j], boxes[j - gap]);
                operations++;
                document.getElementById('operations').innerText = operations;
            }
            boxes[j].dataset.value = temp;
        }
    }
}

export async function selectionSort(boxes) {
    let len = boxes.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (parseInt(boxes[j].dataset.value) < parseInt(boxes[minIndex].dataset.value)) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(boxes[i], boxes[minIndex]);
            operations++;
            document.getElementById('operations').innerText = operations;
        }
    }
}



export async function insertionSort(boxes) {
    let len = boxes.length;
    for (let i = 1; i < len; i++) {
        let key = boxes[i].dataset.value;
        let j = i - 1;
        while (j >= 0 && parseInt(boxes[j].dataset.value) > parseInt(key)) {
            await swap(boxes[j], boxes[j + 1]);
            operations++;
            document.getElementById('operations').innerText = operations;
            j--;
        }
        boxes[j + 1].dataset.value = key;
    }
}