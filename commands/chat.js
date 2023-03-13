const {Configuration, OpenAIApi } = require("openai");
const { OPENAI } = process.env;

const call = async input => {
    const configuration = new Configuration({
        apiKey: OPENAI,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${input}`,
            max_tokens: 128,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        return response.data.choices[0].text;
    } catch (err) {
        return err;
    }
}

module.exports = {
    name: 'chat',
    description: 'ChatGPT command',
    usage: '%chat [prompt]',
    execute: async(mess, args) => {
        let temp = '';
        for(arg of args){
            temp += ` ${arg}`;
        }
        let argString = temp.substring(1);

        const response = await call(argString);

        mess.channel.send(response);
    }
}