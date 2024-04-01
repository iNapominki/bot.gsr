/** Данное преобразование требуется из за того то в 
 * параметр кнопки нельзя записать длинный текст и приглось 
 * сокращать таким образом  
 */

const query_btn = require("../const/query_btn");

function parsQueryButton (queru) {

const buttonValue = queru?.data;
// Получаем все после знака "?"
const afterQuestionMark = buttonValue.split("?")[1];

// Преобразуем оставшуюся часть в JSON объект
const keyValuePairs = afterQuestionMark.split(",");
const params = {};
keyValuePairs.forEach(pair => {
    const [key, value] = pair.split("=");
    params[key.trim()] = value.trim();
});

// собираем исходный объект
const newObject = {};
Object.keys(query_btn).forEach(key => {
    if (key === "approve") {
        newObject[key] = params[query_btn[key]] === "true";
    } else {
        newObject[key] = params[query_btn[key]];
    }
});

 return newObject;

}

module.exports = parsQueryButton;