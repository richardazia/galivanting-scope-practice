'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// The Application

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movementlist = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  movementlist.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
      <div class="movements__value">${mov}</div>
    </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const outGoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outGoing)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display the UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear the text fields

    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    updateUI(currentAccount);
  } else {
    alert('Wrong pin');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc && // receiverAcc is not undefined
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('Transfer OK');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  } else {
    alert('Invalid amount or receiver');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.balance >= amount * 0.1) {
    // Add the movement
    currentAccount.movements.push(amount);
    // Update the UI
    updateUI(currentAccount);
  } else {
    alert('Invalid amount: Computer says no');
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    console.log('Close OK');
    // // Find account number
    // console.log(
    //   `Index position of current account: = ${accounts.indexOf(currentAccount)}`
    // );
    // FindIndex method
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // remove the account number from the array
    accounts.splice(accounts.indexOf(currentAccount), 1);
    // remove the account from the UI
    containerApp.style.opacity = 0;
    // Update welcome message
    labelWelcome.textContent = 'Account deleted successfully';
  } else {
    alert('Invalid username or pin');
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// createUsernames('accounts'); I spent time trying to debug the function. I had 'accounts'. This broke the app.

createUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
let arr = [
  'duck',
  'cat',
  'dog',
  'mouse',
  'chicken',
  'goat',
  'cow',
  'bear',
  'moose',
  'monkey',
];

console.log(arr.slice(2, 4)); // ['dog', 'mouse'] (from 2 to 4 but excluding four)

console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice()); // for a shallow copy of the array
console.log([...arr]); // Same result, but different tool for a shallow copy of the array
console.log(arr);
console.log(arr.splice(2, 4)); // ['dog', 'mouse'] (from 2 to 4 but excluding four)
console.log(arr);

arr.splice(-1);
console.log(arr);

arr.splice(1, 2);

// Reverse the array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['k', 'j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // This modifies the original array
console.log(arr2);

// Concatenation
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);
console.log(letters.join(' '));

//The at method
console.log(letters[0]);
console.log(letters.at(0));
console.log(letters[4]);
console.log(letters.at(4));

console.log(arr[arr.length - 1]);
console.log(arrx.slice(-1));
console.log(arr.last());
*/

/////////////////////////////////////////////////

/*

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);




// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Transaction ${i + 1}: ${movement} deposit.`);
  } else {
    console.log(`Transaction ${i + 1}: ${Math.abs(movement)} withdrawal.`);
  }
}
console.log('And now forEach...');
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Transaction ${index + 1}: ${movement} deposit.`);
  } else {
    console.log(`Transaction ${index + 1}: ${Math.abs(movement)} withdrawal.`);
  }
});
*/

// forEach with Maps and Sets
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['CHF', 'Swiss franc'],
]);
//Map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Set
const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'CHF']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
*/

/////////////////////////////////////////////////

/*
//Coding Challenge #1
// Data Set 1
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

//Data Set 2
// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 6];
//

const checkDogs = function (dogsJulia, dogsKate) {
  // Create an array with Julia's corrected data, shallow and constant
  const correcteDogsJulia = dogsJulia.slice(1, -2);
  // correcteDogsJulia.splice(0,1);
  // correcteDogsJulia.splice(-2);
  console.log(correcteDogsJulia);

  // Concatenate the two arrays
  const dogs = correcteDogsJulia.concat(dogsKate);
  console.log(dogs);
  for (const [i, dog] of dogs.entries()) {
    if (dog > 3) {
      console.log(`Dog number ${i + 1} is an adult and is ${dog} years old.`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy.`);
    }
  }
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);


*/

/////////////////////////////////////////////////
/*
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUSD = 1.05;
const eurToCHF = 1.04;
const eurToGBP = 0.86;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUSD;
});
*/
// arrow challenge
// Remove function and replace it with an arrow, remove curly braces as this fits to one line and remove the return statement. When code is on one line it is automatically returned.
/*
const movementsUSDArrow = movements.map(mov => mov * eurToUSD);
console.log(`Arrow version: ${movementsUSDArrow}`);
console.log(movements);
console.log(movementsUSD);

const movementsCHF = movements.map(function (mov) {
  return mov * eurToCHF;
});
// Arrow practice
const movementsCHFArrow = movements.map(mov => mov * eurToCHF);
console.log(`Arrow version: ${movementsCHFArrow}`);
console.log(movementsCHF);

const movementsGBP = movements.map(function (mov) {
  return mov * eurToGBP;
});
// Arrow practice
const movementsGBParrow = movements.map(mov => mov * eurToGBP);
console.log(movementsGBP);
console.log(`Arrow version: ${movementsGBParrow}`);

// Compare this to the for method

const movementsCHFFor = [];
for (const mov of movements) movementsCHFFor.push(mov * eurToCHF);
console.log(movementsCHFFor);

const movDescs = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )} euros.`
);

console.log(movDescs);
*/

/////////////////////////////////////////////////
/*
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});

console.log(movements);
console.log(deposits);
console.log(withdrawals);

// And with the For loop
console.log('Using the for loop');
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawalsFor = [];
for (const mov of movements) if (mov < 0) withdrawalsFor.push(mov);
console.log(withdrawalsFor);

// The Reduce Method

const balance = movements.reduce(function (acc, mov) {
  return acc + mov;
}, 0);
console.log(balance);
// Arrow version
const balanceArrow = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balanceArrow);

let balanceAcc = 0;
for (const mov of movements) balanceAcc += mov;
console.log(`For Loop: ${balanceAcc}`);

//Maximum value

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/
/////////////////////////////////////////////////
////// Challenge 2 Attempt //////////////////////
/////////////////////////////////////////////////

/*
console.log(data);
console.log(data2);

const calcAverageHumanAge = function (ages) {
  
  for (const [dogAge] of dogAges.entries()) {
    if (dogAge <= 2) {
      humanAge.push(2 * dogAge);
    } else if (dogAge > 2) {
      humanAge.push(16 + dogAge * 4);
    }
  }
  */
/*
  const humanAges = ages.map(age => (age <= 2 ? 
    2 * age : 
    16 + age * 4));
  console.log(humanAges);
};

console.log(calcAverageHumanAge(5, 2, 4, 1, 15, 8, 3));
console.log('couac couac');
*/

// Course solution:
/*

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  const adultDogs = humanAges.filter(age => age >= 18);
  console.log(`Adult Dogs: ${adultDogs}`);
  // const TotAdultAge = adultDogs.reduce(function (acc, age) {
  //   return acc + age;
  // }, 0);
  // As an arrow function
  const average =
    adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;
  return average;
  // // Solution 3
  // const average =
  //   adultDogs.reduce((acc, age, i, arr) => acc + age, 0) / arr.length;
  // return average;
};

console.log(avg1, avg2);
*/

/////////////////////////////////////////////////
/*
const eurToUSD = 1.1;
const TotDepUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUSD)
  //For debugging we can look at the array using this method
  .map((mov, i, arr) => {
    console.log(arr);
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(TotDepUSD);
*/

/////////////////////////////////////////////////
// Coding Challenge 3 - chaining
/*
const data = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = ages => {
  const humanAges = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18);
  const average =
    humanAges.reduce((acc, age, i, arr) => acc + age, 0) / arr.length;
  return average, humanAges;
};
*/

// Course solution - I still need to practice chaining
/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// To chain the events we run each function in a chain, without going through the step of creating a variable. We map the ages according the reqquirements, then filter the ages to keep just the dogs of the right age, and when this is done we work out the average age of the dogs via the reduce method.
// We go from having three or four functions to one function and cut out the middle constants.

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);
*/

/////////////////////////////////////////////////
// The Find method
/*
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);
console.log(movements);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

/////////////////////////////////////////////////
//// Implement the login ///////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
////////////// Some and Very ////////////////////
/////////////////////////////////////////////////
/*
console.log(movements);
console.log(movements.includes(200));

// Conditional statements: Some
console.log(movements.some(mov => mov === 840));

const findDeposits = movements.some(mov => mov > 6000);
const findWithdrawals = movements.some(mov => mov < -12);
console.log(findDeposits, findWithdrawals);

// The Every method - returns true if all the elements in the array pass the test implemented by the provided function.

console.log(movements.every(mov => mov > 0));
console.log(accounts4.movements.every(mov => mov > 0));

// Seperate callback

const deposit = mov => mov > 0;
const withdrawal = mov => mov < 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
console.log(movements.some(withdrawal));
*/

/////////////////////////////////////////////////
//Working with Nested arrays via flat and flatMap
/////////////////////////////////////////////////
/*
const arr = [1, 2, 3, [4, 5, 6], [7, 8, 9]];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [[5]], 6], 7, 8, 9];
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);

const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// Chain all the methods together

const overallBalanceChain = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceChain);

// How to use FlatMap
const overallBalanceFlatMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceFlatMap);
*/
/////////////////////////////////////////////////
////////////// Sorting Arrays ///////////////////
/////////////////////////////////////////////////
/*
const people = ['Richard', 'Jean', 'Paul', 'Marie', 'Jeanne'];
console.log(people);
console.log(people.sort());
console.log(people); // It has been mutated

// Sort works with strings

// Working with Numbers

// Change the order of the list by inverting which value is 1 and which is -1

const sortedNumbers = movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
});
console.log(sortedNumbers);

// Short hand version

movements.sort((a, b) => a - b);
console.log(`Shorthand sort: ${movements}`);
*/

// Ways to create and fill arrays
const arr = [1, 2, 3, 4, 5, 6, 7];

const x = Array(10);
console.log(x); // [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined] Empty * 10

const y = new Array(7);
console.log(y); // [undefined, undefined, undefined, undefined, undefined, undefined, undefined] //Empty * 7

// The Fill method
x.fill(1, 3);
console.log(x); // [undefined, undefined, undefined, 1, 1, 1, undefined, undefined, undefined, undefined]

arr.fill(23, 4, 6);
console.log(arr); // [1, 2, 3, 4, 23, 23, 23]

const r = Array.from({ length: 10 }, () => 1);
console.log(r); // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const card = Array.from({ length: 12 }, (_, i) => i + 1);
console.log(card); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// useful for solitaire games

// How to read numbers from a page element
labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );
  console.log(movementsUI);

  // The second option is to use the map method and then expand the array
  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
    el => el.textContent.replace('€', '')
  );

  console.log(movementsUI2);
});
