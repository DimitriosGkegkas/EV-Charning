const yargs = require('yargs');

exports.login = yargs
.command('login', '', {
    password: {
        description: '',
        type: 'string',
    },
    username: {
        description: '',
        type: 'string',
    }
})
.help()
.argv;


exports.login = yargs
.command('login', '', {
    password: {
        description: '',
        type: 'string',
    },
    username: {
        description: '',
        type: 'string',
    }
})
.help()
.argv;