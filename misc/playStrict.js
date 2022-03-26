'use strict';
// console.log("Hello")

// function counter() {
//     console.log("Hello")
// }

// counter();
// counter();
// counter();
// counter();
// counter();
// counter();
// counter();
// counter();

// function viaFerrata(harness, helmet) {
//     // console.log(`${harness}, ${helmet}`);
//     const safety = `${harness} harnesses and ${helmet} helmets are available.`;
//     return safety;
// }

// viaFerrata(3, 4); // returns just 3 and 4

// To return the sentence we need to create a new variable and call the variable. 
// const safetyRequirement = viaFerrata(3, 4);
// console.log(safetyRequirement);

// function fruitBlender(mangoes, oranges) {
//     const fruit = `${mangoes} mangoes and ${oranges} oranges are available.`;
//     return fruit;
// }

// const fruitBlend = fruitBlender(3, 4);
// console.log(fruitBlend);

// const mangoJuice = fruitBlender(5, 0);
// console.log(mangoJuice);
// declaration - can be hoisted
// function calcHeight(peakHeight) {
//     return peakHeight - 455;
// }

// const ascent1 = calcHeight(1677);

// // Function Expression 
// const calcHeight2 = function(peakHeight) {
//     return peakHeight - 455;
// }

// const ascent2 = calcHeight2(1677);

// console.log(ascent1, ascent2);

// // Arrow Functions

// const calcHeight3 = peakHeight => peakHeight - 455;
// const ascent3 = calcHeight3(1677);
// console.log(ascent3);

// Needs to be debugged
// const roadTripRemaining = totalDistance => {
//     const distanceTravelled = 1300 - totalDistance;
//     console.log(distanceTravelled)
//     const tripCompletion = 1300 - distanceTravelled;
//     console.log(tripCompletion);
//     return tripCompletion;
// }

// console.log(roadTripRemaining(800));
// Arrow functions.
// const yearsUntilRetirement = (birthYear, firstname) => {
//     const age = 2020 - birthYear;
//     const retirement = 65 - age;
//     // return retirement;
//     console.log(`${firstname} will retire in ${retirement} years.`);
// }

// console.log(yearsUntilRetirement(1984, "George"));
// console.log(yearsUntilRetirement(1981, "Primo"));

// function fruitBlender(fruit) {
//     return fruit * 8;
// }

// function cocktailMaker(apples, pears, oranges, bananas) {
//     // call the function fruitBlender
//     const preparedApples = fruitBlender(apples);
//     const preparedPears = fruitBlender(pears);
//     const preparedOranges = fruitBlender(oranges);
//     const preparedBananas = fruitBlender(bananas);

//     const juice = `The Cocktail is made from ${preparedApples} apple pieces, ${preparedPears} pear fragments, ${preparedOranges} orange slices, and ${preparedBananas} sliced banana pieces.`;
//     return juice;
// }

// const ready = cocktailMaker(3, 4, 5, 6);
// console.log(ready);

//function review

const findAge = function (birthYear) {
    return 2040 - birthYear;
}

const yearsUntilFreedom = function (birthYear, nickname) {
    const age = findAge(birthYear);
    const liberation = 65 - age;
    
    if (liberation > 0) {
        console.log(`${nickname} has ${liberation} years remaining.`);
        return liberation;
    }   else {
        console.log(`${nickname} is already retired.`);
        return -1;
    }
}

console.log(yearsUntilFreedom(1984, "George"));
console.log(yearsUntilFreedom(1906, "Picsou"));