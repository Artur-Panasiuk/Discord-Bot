require('dotenv').config();
const { TENOR } = process.env;
const axios = require("axios");

module.exports = {
    name: 'gif',
    description: 'Steals random gif from tenor',
    usage: '%gif [input]',
    execute: async(mess, args) => {
        let temp = '';
        for(arg of args){
            temp += ` ${arg}`;
        }
        let argString = temp.substring(1);

        axios
            .get(`https://tenor.googleapis.com/v2/search?q=excited&key=${TENOR}&client_key=my_test_app&q=${argString}`)
            .then((response) => {
                mess.channel.send(response.data.results[0].url);
            })
            .catch((err) => {
                mess.channel.send(`Something went wrong. - ${err}`);
            });
    }
}