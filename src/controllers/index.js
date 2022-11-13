const { spawn } = require('child_process');
const { logger } = require('../services/logger');

const executeCommand = async (req, res) => {
    try {
        logger.info('Executing command');
        const {
            hostAddr,
            destPort,
            count,
            mode,
            spoofIp,
            randSource,
            tcpFlags,
            dataSize,
            packetSpeed,
            timeout,
        } = req.body;

        let command = `hping3 ${hostAddr}`;
        command += ` --${packetSpeed}`;
        if (destPort !== null) command += ` -p ${destPort}`;
        if (count !== null) command += ` --count ${count}`;
        if (mode != null) command += ` --${mode}`;
        if (randSource === true) command += ' --rand-source';
        if (randSource === false && spoofIp !== null) {
            command += ` --spoof ${spoofIp}`;
        }
        if (tcpFlags !== null) {
            tcpFlags.forEach((flag) => {
                command += ` --${flag}`;
            });
        }

        if (dataSize !== null) command += ` --data ${dataSize}`;

        logger.info(`command is: ${command}`);

        const cmd = command.split(' ');
        const program = cmd[0];
        const args = cmd.slice(1, cmd.length);

        logger.info(`arguments are ${args}`);

        const child = spawn(program, args);
        child.stdout.on('data', (data) => {
            logger.info(`stdout: ${data}`);
        });

        setTimeout(() => {
            child.stdin.pause();
            child.kill();
            logger.info(`killing child process with pid: ${child.pid}`);
        }, timeout * 1000);

        res.send({ message: 'attack is successful' });
    } catch (e) {
        logger.error(e);
    }
};

module.exports = {
    executeCommand,
};
