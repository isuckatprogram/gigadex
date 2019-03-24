/* jshint esversion: 6 */
/* jshint -W027  */
/* jshint -W061 */
fs = require('fs');
const readlineSync = require('readline-sync');
// const colors = require('colors/safe');
colors = require('ansi-colors');
// const colors = require('chalk');

__jnixdirname = __dirname + '/os';
home = __jnixdirname + '/home';
pwd = home;
text = '';

func = require('./func.js');
cmd = require(__jnixdirname + '/sys/cmd/./root.js');

do {
	let x = pwd;
	if (pwd.includes(home)) {
		x = pwd.replace(home, '~');
	} else {
		x = pwd.replace(__jnixdirname, '');
	}
	if (pwd == __jnixdirname) {
		x = '/';
	}

	var consoleText = readlineSync.question(colors.green('root@jnix') + ' ' + colors.blue(x + ' # '));
	if (consoleText == 'exit') {
		return '';
	}
	let out = command(consoleText);
	if (out !== undefined && out !== '') {
		console.log(out);
	}
} while (true);

function command(ftext) {
	text = ftext.match(/\S+/g);
	if (Object.keys(cmd).includes(text[0])) {
		return cmd[text[0]]();
	} else {
		func.error('Command not found', text[0], 'Gigadex');
	}
}