// 1.	A function presenting the operation of a for loop (1 point)
// 2.	A function presenting the operation of a while loop (1 point)
// 3.	A function presenting the operation of a for ... in loop (1 point)
// 4.	A function presenting the operation of a for ... of loop (1 point)
// 5.	A function presenting the operation of an if statement (1 point)
// 6.	A function accepting two (or more) parameters,
//      checking if they are numbers or can be converted to numerical values and
//      performing calculations on them or (if this is not possible) returning an error (1 point)
// 7.	A function accepting a variable number of parameters and doing something with them (1 point)
// 8.	A function accepting a function as one of the parameters (and using it in some way) +
//      2 example functions that can be used as its parameters (1 point)
// 9.	An example of using a constructor function to create objects - objects
//      should have at least 3 fields of different types and 1 method doing something (1 point)
// 10.	An example of using classes to create objects - objects should have at least 3 fields of different types,
//      a constructor and 1 method doing something (1 point)


//1
function presentingForLoop(){
    console.log("1. Presenting for loop")
    for (let i = 1; i < 5; i++) {
        console.log(i);
    }
}
presentingForLoop();
console.log("----------------------------")

//2
function presentingWhileLoop(){
    console.log("2. Presenting while loop")
    let i = 0;
    while (i < 5) {
        console.log(i);
        i++;
    }
}
presentingWhileLoop();
console.log("----------------------------")

//3
function presentingForInLoop(){
    let arrayOfNumbers = [1,2,3,4,5];
    console.log("3. Presenting for ... in on an array:");

    for (let index in arrayOfNumbers) {
        console.log("Index: " + index + ", Value: " + arrayOfNumbers[index] );
    }
}
presentingForInLoop();
console.log("----------------------------")

//4
function presentingForOfLoop() {
    let arrayOfDoubles = [1.1, 2.2, 3.3, 4.4, 5.5];
    console.log("4. Presenting for ... of on an array:");

    for (let element of arrayOfDoubles) {
        console.log(`Element of array: ${element}`);
    }
}
presentingForOfLoop();
console.log("----------------------------")

//5
function presentingIfStatement(){
    console.log("5. Presenting if statement")
    let x = 10;
    if (x > 5) {
        console.log("x is greater than 5");
    }
}
presentingIfStatement();
console.log("----------------------------")
console.log("6. Presenting function with two+ params, checking error:")

//6
function presentingParametersCheckingError(param1, param2, param3) {
    const parameters = [param1, param2, param3];
    let totalSum = 0;

    for (const param of parameters) {
        const num = Number(param);

        if (isNaN(num) || !isFinite(num)) {
            return `Error: Value '${param}' (Type: ${typeof param}) is not a valid numerical input.`;
        }

        totalSum += num;
    }

    return totalSum;
}
// --- Test Cases ---
console.log("--- Success Examples ---");
console.log(`Sum(10, 5, '3.5'): ${presentingParametersCheckingError(10, 5, '3.5')}`); // Output: 18.5
console.log(`sum 2 \+ 3 \+ 1 = ${presentingParametersCheckingError(2, 3, 1)}`);   // Output: 6
console.log("--- Error Examples ---");
console.log(`Passing: 1, 2, 'cat'.\nShould be error because of \"cat\":\n${presentingParametersCheckingError(1, 2, 'cat')}`);

console.log("----------------------------")
console.log("7. Presenting a function with variable number of parameters")

//7
function createListSentence(...words) {
    if (words.length === 0) {
        return "no items passed";
    }
    // words will be separated by commas
    const list = words.join(", ");

    // return the sentence
    return `The final sentence is: ${list}`;
}
console.log("Example 1 (Three parameters):");
console.log(createListSentence("apple", "banana", "cherry"));
console.log("Example 2 (Five parameters):");
console.log(createListSentence("Red", "Green", "Blue", "Yellow", "Purple"));
console.log("Example 3 (Zero parameters):");
console.log(createListSentence());

console.log("----------------------------")
console.log("8. Presenting a function with variable number of parameters")

//8
function processArrayUsingFunction(arr, operation) {
    if (!Array.isArray(arr) || typeof operation !== 'function') {
        console.error("Error: Invalid arguments, requires an array and a function.");
        return [];
    }

    const resultArray = [];

    for (const element of arr) {
        const result = operation(element);
        resultArray.push(result);
    }

    return resultArray;
}
function squareNumber(num) {
    return num * num;
}
function addTen(num) {
    return num + 10;
}

const numbers = [2, 4, 6];
console.log("Original Array:", numbers);

const squaredResult = processArrayUsingFunction(numbers, squareNumber);
console.log("Result (Squared):", squaredResult); // should be: [4, 16, 36]
const addedResult = processArrayUsingFunction(numbers, addTen);
console.log("Result (Add Ten):", addedResult);  // should be: [12, 14, 16]

console.log("----------------------------")
console.log("9. Presenting a constructor function to create objects")

//9
function Cat(firstName, age, isFriendly) {
    this.firstName = firstName;
    this.age = age;
    this.isFriendly = isFriendly;

    Cat.prototype.sayMeowIfFriendly = function() {
        if (this.isFriendly) {
            console.log(`${this.firstName} says meow!`);
        } else {
            console.log(`${this.firstName} is not friendly! Don\`t say meow to you!`);
        }
    }
}

const kitty = new Cat("Kitty", 3, true);
kitty.sayMeowIfFriendly();
const angryKitty = new Cat("AngryKitty", 5, false);
angryKitty.sayMeowIfFriendly();

console.log("----------------------------")
console.log("10. Presenting example of using classes to create objects:");

//10
class Book {
    constructor(title, author, numberOfPages, isFiction) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isFiction = isFiction;
    }

    getSummaryOfTheBook() {
        let category = this.isFiction ? "Fiction" : "Non-Fiction";
        return `Title: ${this.title}, Author: ${this.author}, Number of Pages: ${this.numberOfPages}, Category: ${category}`;
    }
}
const novel = new Book("The Martian", "Andy Weir", 384, true);
console.log(novel.getSummaryOfTheBook());
const reference = new Book("Sapiens", "Yuval Noah Harari", 512, false);
console.log(reference.getSummaryOfTheBook());