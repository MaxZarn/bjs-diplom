'use stict'

class Profile {   // Класс пользователя
    constructor({username, name: {firstName, lastName}, password}) {
        this.username = username;
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
            username: this.username,
            name: this.name,
            password: this.password,
        },
        (err, data) => {
            console.log(`Creating user ${this.username}`);
            callback(err, data);
        });
    }

    authorize(callback) { // Авторизация пользователя
        return ApiConnector.performLogin({
            username: this.username,
            password: this.password,
        },
        (err, data) => {
            console.log(`Authorizing user ${this.username}`);
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
};

function getStocks(callback) { // с помощью этой функции получаем текущий курс между валютами
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks info`);
        callback(err, data[data.length - 1]); // возвращает последний элемент массива data
    });
};

 //const stocksInfo = getStocks(callback);



// Вторая чать задачи:
function main() {

    getStocks((err, data) => { // получаем текущий курс между валютами
        if(err) {
            console.error('Error during getting stocks');
        } else {
            const stocksInfo = data;

            const Ivan = new Profile({
                username: 'ivan',
                name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                password: 'ivanspass',
                });
                
            const Max = new Profile({
                username: 'max',
                name: {firstName: 'Maxim', lastName: 'Zarn'},
                password: 'maxpass',
                });   

                Ivan.createUser((err, data) => { // Создали пользователя Иван
                    if(err) {
                        console.error(`Error during creating ivan`);
                    } else {
                        console.log(`ivan is created!`);

                        Max.createUser((err, data) => { // Создали пользователя Макс
                            if(err) {
                                console.error(`Error during creating max`);
                            } else {
                                console.log(`max is created!`);

                        Ivan.authorize((err, data) => {
                          if(err) {
                             console.error(`Error during authorizing ivan`);
                          } else {
                              console.log(`ivan is authorized!`);
                            
                         Ivan.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
                             if (err) {
                                    console.error('Error during adding money to Ivan');
                                    } else {
                                        console.log(`Added 500000 euros to Ivan`);
                                        const targetAmount = stocksInfo[EUR_NETCOIN] * 500000;
                                    
                               // const targetAmount = stocksInfo[EUR_NETCOIN] * 500000;
                                    
                                Ivan.convertMoney({fromCurrency: 'EUR', targetCurrency: 'Netcoins', targetAmount}, (err, data) => {
                                 if(err) {
                                     console.error('Error during converting money')
                                 } else {
                                     console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
                                    
                                    
                                   Ivan.transferMoney({to: Max.userName, amount: targetAmount}, (err, data) => {
                                        if(err) {
                                           console.error('Error during transfer money');
                                        } else {
                                           console.log(`Max has got ${targetAmount} Netcoins`);
                                       }

                                });
                            }});
                        }});
                     }});
                    }});

                }});  
                
    }});  

    
/*
    Max.createUser((err, data) => { //  Создали пользователя Макс
        if(err) {
            console.error(`Error during creating max`);
        } else {
            console.log(`max is created!`);
        }
    });
*/
}

main();