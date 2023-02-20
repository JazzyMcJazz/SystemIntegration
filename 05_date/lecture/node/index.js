const date = new Date();
console.log("Date", date);

console.log();

console.log(new Intl.DateTimeFormat('en-US').format(date));
console.log(new Intl.DateTimeFormat('da-DK').format(date));

