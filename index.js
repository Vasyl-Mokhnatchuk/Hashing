const bcrypt = require('bcrypt');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function checkPasswordRequirements(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function compareWithHash(hash, password) {
  return await bcrypt.compare(password, hash);
}

readline.question('Введіть пароль: ', async (password) => {
  if (checkPasswordRequirements(password)) {
    const hash = await hashPassword(password);
    console.log('Захешований пароль:', hash);

    const isMatch = await compareWithHash(hash, password);
    console.log('Паролі збігаються:', isMatch);
  } else {
    console.log('Неправильний пароль. Пароль повинен містити мінімум 8 символів, включаючи великі та малі літери, цифри та спеціальні символи.');
  }
  readline.close();
});
