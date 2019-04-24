'use stict'

class Profile {   // Класс пользователя
    constructor({userName, name: {firstName, lastName}, password}) {
        this.userName = userName;
        this.name = {firstName, lastName};
        this.password = password;
    }

    addMoney({ currency, amount }, callback) {  // метод добавляющий деньги в личный кошелек
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    createUser(callback) {    // Метод добавляющий нового пользователя
        return ApiConnector.createUser({
            userName: this.userName,
            name: this.name,
            password: this.password,
        },
        (err, data) => {
            console.log(`Creating user ${this.userName}`);
            callback(err, data);
        });
    }

    performLogin(callback) { // Авторизация пользователя
        return ApiConnector.performLogin({
            userName: this.userName,
            password: this.password,
        },
        (err, data) => {
            console.log(`Authorizing user ${this.userName}`);
            callback(err, data);
        });
    }
         // Конвертация валют:
        
    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) { // Конвертация валюты
        return ApiConnector.convertMoney({fromCurrency: 'EUR', targetCurrency: 'Netcoins', targetAmount}, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }



    transferMoney({to, amount}, callback) { // Перевод токенов другому пользователю
        return AoiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Transfering ${amount} of Netcoins to ${to}`);
            callback(err, data);
        });
    }

}


// Вторая чать задачи:
function main() {
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
    // сначала создаем и авторизуем пользователя

    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
            console.error('Error during adding money to Ivan');
            } else {
                console.log(`Added 500000 euros to Ivan`);
        }
    });
}

main();