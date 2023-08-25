const conteinerNode = document.getElementById('fifteen');
const ItemNode = Array.from(document.querySelectorAll('.item'));

const countItems = 16;

function getMatrix(arr) {
    const matrix = [[], [], [], []];
    let x = 0
    let y = 0
    for (let i = 0; i < arr.length; i++) {
        if (x >= 4) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++;

    }
    return matrix
}

let matrix = getMatrix(ItemNode.map((item) => Number(item.dataset.matrixId)));

ItemNode[0].style.display = 'none'

function setPositionItems(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const element = matrix[y][x];
            const node = ItemNode[element - 1]
            setNodeStyles(node, x, y)
        }
    }
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}% , ${y * shiftPs}% , 0)`
}

function shuffleArray(arr) {
    return arr.map((element) => ({ element, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ element }) => element)
}

document.getElementById('shuffle-btn').addEventListener('click', () => {
    const shufledArray = shuffleArray(matrix.flat())
    matrix = getMatrix(shufledArray)
    setPositionItems(matrix)
})

function findCords(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == number) {
                return { x, y }
            }
        }
    }
    return null
}

BlankNumber = 1;

function validSwap(cord1, cord2) {
    const diffX = Math.abs(cord1.x - cord2.x)
    const diffY = Math.abs(cord1.y - cord2.y)
    return ((diffX === 1 || diffY === 1) && (cord1.x == cord2.x || cord1.y == cord2.y))
}

function Swap(cords1, cords2, matrix) {
    const cords1Number = matrix[cords1.y][cords1.x]
    matrix[cords1.y][cords1.x] = matrix[cords2.y][cords2.x]
    matrix[cords2.y][cords2.x] = cords1Number;
}
conteinerNode.addEventListener('click', event => {
    const buttonNode = event.target.closest('button')
    if (!buttonNode) {
        return
    }
    const ButtonNumber = Number(buttonNode.dataset.matrixId)
    const ButtonCords = findCords(ButtonNumber, matrix)
    const BlankCords = findCords(BlankNumber, matrix)
    const isValid = validSwap(ButtonCords, BlankCords)
    if (isValid) {
        Swap(BlankCords, ButtonCords, matrix)
        setPositionItems(matrix);
    }
})


setPositionItems(matrix);