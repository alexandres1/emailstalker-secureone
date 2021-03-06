const imaps = require('imap-simple');
const _ = require('lodash');
const simpleParser = require('mailparser').simpleParser;
const nodemailer = require('nodemailer');

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const ipsEmailSender = async (
	appliance,
	destination,
	source,
	ruleId,
	policy,
	time,
	description,
	destinationPort,
	sourcePort,
) => {
	const transport = nodemailer.createTransport({
		host: 'smtp.office365.com',
		name: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PASS,
		},
	});
	//

	transport
		.sendMail({
			from: process.env.MAILER_EMAIL,
			// to: `notificacao@secureone.com.br,${process.env.MAILER_EMAIL}`,
			to: `wallacecardosogomes@gmail.com`,
			subject: 'Alerta de segurança',
			html: `<body
			style="
				max-width: 720px;
				margin-top: 20px;
				margin-left: 10px;
				font-family: 'Calibri', sans-serif;
			"
			>
			<p
				style="color: red;
				font-weight: bold;
				font-size: 30px";
				line-height: 2px;"
			>
				Alerta de segurança!
			</p>
			<br />
			<p>Sistema de prevenção de intrusão executado.</p>
			<section style="line-height: 2px">
				<p style="font-weight: 600">
					Categoria: <span style="font-weight: 400;">${description}</span>
				</p>
				<p style="font-weight: 600">
					Local: <span style="font-weight: 400; color: orange">${appliance}</span>
				</p>
				<p style="font-weight: 600">
					IP Origem: <span style="font-weight: 400">${source}</span>
				</p>
				<p style="font-weight: 600">
					IP Destino: <span style="font-weight: 400">${destination}</span>
				</p>
				<p style="font-weight: 600">
					Porta Origem: <span style="font-weight: 400">${sourcePort}</span>
				</p>
				<p style="font-weight: 600">
					Porta Destino: <span style="font-weight: 400">${destinationPort}</span>
				</p>
				<p style="font-weight: 600">
					ID da ameaça:
					<span style="font-weight: 400; color: orange">${ruleId}</span>
				</p>
				<p style="font-weight: 600">
					Hora: <span style="font-weight: 400">${time}</span>
				</p>
				<p style="font-weight: 600">
					Política: <span style="font-weight: 400">${policy}</span>
				</p>
			</section>
			<br />
			<section style="line-height: 5px">
				<p>Para mais informações desta ameaça:</p>
				<p>
					<a
						href="https://securityportal.watchguard.com/Threats/Detail?ruleId=${ruleId}"
						>https://securityportal.watchguard.com/Threats/Detail?ruleId=${ruleId}</a
					>
				</p>
			</section>
			<section>
				<img
					style="width: 180px"
					src="https://static.wixstatic.com/media/25ae14_9f0b632478c344c8a1a49e1be2e83da8~mv2.png"
				/>
				<p>
					<a
						href="https://secureone.com.br/"
						>www.secureone.com.br</a
					>
				</p>
			</section>
		</body>
		`,
		})
		.then(() => {
			console.log(`Email delivered to client`);
		})
		.catch((err) => {
			console.log('Errors occurred, failed to deliver the email');

			if (err.response && err.response.body && err.response.body.errors) {
				err.response.body.errors.forEach((error) =>
					console.log('%s: %s', error.field, error.message),
				);
			} else {
				console.log(err);
			}
		});
};

const aVEmailSender = async (
	appliance,
	destination,
	source,
	policy,
	timeString,
	description,
	reason,
	authUser,
	virus,
	host,
	path,
) => {
	const transport = nodemailer.createTransport({
		host: 'smtp.office365.com',
		name: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PASS,
		},
	});
	//

	transport
		.sendMail({
			from: process.env.MAILER_EMAIL,
			// to: `notificacao@secureone.com.br,${process.env.MAILER_EMAIL}`,
			to: `wallacecardosogomes@gmail.com`,
			subject: 'Alerta de segurança',
			html: `<body
			style="
				max-width: 720px;
				margin-top: 20px;
				margin-left: 10px;
				font-family: 'Calibri', sans-serif;
			"
		>
			<p style="color: red; font-weight: bold; font-size: 30px; line-height: 2px">
				Alerta de segurança!
			</p>
			<br />
			<p>Proteção de antivírus executada com sucesso.</p>
			<section style="line-height: 2px">
				<p style="font-weight: 600">
					Categoria: <span style="font-weight: 400">${description}</span>
				</p>
				<p style="font-weight: 600">
					Local: <span style="font-weight: 400; color: orange">${appliance}</span>
				</p>
				<p style="font-weight: 600">
					Razão:
					<span style="font-weight: 400"
						><span style="color: red">${reason}</span></span
					>
				</p>
				<p style="font-weight: 600">
					Usuário autenticado:
					<span style="font-weight: 400"
						><span style="color: red">${authUser}</span></span
					>
				</p>
				<p style="font-weight: 600">
					Origen: <span style="font-weight: 400">${source}</span>
				</p>
				<p style="font-weight: 600">
					Destino: <span style="font-weight: 400">${destination}</span>
				</p>
				<p style="font-weight: 600">
					Hora: <span style="font-weight: 400">${timeString}</span>
				</p>
				<p style="font-weight: 600">
					Política: <span style="font-weight: 400">${policy}</span>
				</p>
				<br />
				<section style="line-height: 2px">
					<p style="font-weight: 600">
						Informações do Vírus:</span><p></p>
						<p>Virus: <span style="font-weight: 400; color: red">${virus}</p>
						<p>Host: <span style="font-weight: 400; color: red">${host}</p>
						<p>Path: <span style="font-weight: 400; color: red">${path}</p>
					</p>
				</section>
			</section>
			<br />
			<section>
				<img
					style="width: 180px"
					src="https://static.wixstatic.com/media/25ae14_9f0b632478c344c8a1a49e1be2e83da8~mv2.png"
				/>
				<p>
					<a href="https://secureone.com.br/">www.secureone.com.br</a>
				</p>
			</section>
		</body>
		`,
		})
		.then(() => {
			console.log(`Email delivered to client`);
		})
		.catch((err) => {
			console.log('Errors occurred, failed to deliver the email');

			if (err.response && err.response.body && err.response.body.errors) {
				err.response.body.errors.forEach((error) =>
					console.log('%s: %s', error.field, error.message),
				);
			} else {
				console.log(err);
			}
		});
};

const parseIPSEmails = async (message) => {
	const auxAppliance = message.split('Appliance: ', 2);
	const appliance = auxAppliance[1].split('\n', 1)[0];

	const auxDestination = message.split('Destination IP: ', 2);
	const destination = auxDestination[1].split('Destination', 1)[0];

	const auxDestinationPort = message.split('Destination Port: ', 2);
	const destinationPort = auxDestinationPort[1].split('Rule', 1)[0];

	const auxSource = message.split('Source IP: ', 2);
	const source = auxSource[1].split('Source', 1)[0];

	const auxSourcePort = message.split('Source Port: ', 2);
	const sourcePort = auxSourcePort[1].split('Destination', 1)[0];

	const auxRuleID = message.split('Rule ID: ', 2);
	const ruleId = auxRuleID[1].split(',', 1)[0];

	const auxPolicy = message.split('Policy Name: ', 2);
	const policy = auxPolicy[1].split('\n', 1)[0];

	const auxDescription = message.split('Message: ', 2);
	let description = auxDescription[1].split(',', 1)[0];

	if (description.includes('IPS')) {
		description = 'Intrusion Prevention Service';
	}

	const auxTime = message.split('Time: ', 2);
	const time = auxTime[1].split('(', 1)[0];
	const dateArray = time.split(' ');

	let dayOfTheWeek;
	let month;

	switch (dateArray[0]) {
		case 'Sun':
			dayOfTheWeek = 'Dom';
			break;
		case 'Mon':
			dayOfTheWeek = 'Seg';
			break;
		case 'Tue':
			dayOfTheWeek = 'Ter';
			break;
		case 'Wed':
			dayOfTheWeek = 'Qua';
			break;
		case 'Thu':
			dayOfTheWeek = 'Qui';
			break;
		case 'Fri':
			dayOfTheWeek = 'Sex';
			break;
		default:
			dayOfTheWeek = 'Sab';
	}

	switch (dateArray[1]) {
		case 'Jan':
			month = 'Jan';
			break;
		case 'Feb':
			month = 'Fev';
			break;
		case 'Mar':
			month = 'Mar';
			break;
		case 'Apr':
			month = 'Abr';
			break;
		case 'May':
			month = 'Mai';
			break;
		case 'Jun':
			month = 'Jun';
			break;
		case 'Jul':
			month = 'Jul';
			break;
		case 'Aug':
			month = 'Ago';
			break;
		case 'Sep':
			month = 'Set';
			break;
		case 'Oct':
			month = 'Out';
			break;
		case 'Nov':
			month = 'Nov';
			break;
		default:
			month = 'Dez';
	}

	const timeString = `${dayOfTheWeek} ${month} ${dateArray[2]} ${dateArray[3]} ${dateArray[4]}`;

	console.log(`Appliance: ${appliance}`);

	await ipsEmailSender(
		appliance,
		destination,
		source,
		ruleId,
		policy,
		timeString,
		description,
		destinationPort,
		sourcePort,
	);
};

const parseIPSEmailsFromCloud = async (message) => {
	const auxLocal = message.split('device ', 2);
	const local = auxLocal[1].split(':', 1)[0];
	const auxDestination = message.split('Destination IP: <a href="http://', 2);
	const destinationIp = auxDestination[1].split('Destination', 1)[0];
	const auxDestinationPort = message.split('Destination Port: ', 2);
	const destinationPort = auxDestinationPort[1].split('\n', 1)[0];
	const auxSource = message.split('Source IP: ', 2);
	const sourceIp = auxSource[1].split('Source', 1)[0];
	const auxSourcePort = message.split('Source Port: ', 2);
	const sourcePort = auxSourcePort[1].split('Destination', 1)[0];
	const auxRuleID = message.split('Rule ID: ', 2);
	const ruleId = auxRuleID[1].split(',', 1)[0];
	const auxPolicy = message.split('Policy Name: ', 2);
	const policy = auxPolicy[1].split('\n', 1)[0];
	const description = 'Intrusion Prevention Service';

	const auxWhen = message.split('WHEN:\n\n', 2);
	const when = auxWhen[1].split('\n', 1)[0];

	const dateString = capitalizeFirstLetter(
		new Date().toLocaleString('pt-BR', {
			dateStyle: 'long',
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}),
	);

	const hourString = new Date().toLocaleString('pt-BR', {
		timeStyle: 'short',
		hour12: false,
	});

	console.log(`Local: ${local}`);
	console.log(`Ip Destino: ${destinationIp}`);
	console.log(`Porta Destino: ${destinationPort}`);
	console.log(`Ip Origem: ${sourceIp}`);
	console.log(`Porta Origem: ${sourcePort}`);
	console.log(`Descrição: ${description}`);
	console.log(`RuleID: ${ruleId}`);
	console.log(`Política: ${policy}`);
	console.log(`Quando: ${when}`);
	console.log(`Datestring: ${dateString}`);
	console.log(`HourString: ${hourString}`);

	console.log(`Local: ${local}`);
};

const parseAVEmails = async (message) => {
	const auxAppliance = message.split('Appliance: ', 2);
	const appliance = auxAppliance[1].split('\n', 1)[0];

	const auxDestination = message.split('Destination IP: ', 2);
	const destination = auxDestination[1].split(' ', 1)[0];

	const auxSource = message.split('Source IP: ', 2);
	const source = auxSource[1].split(' ', 1)[0];

	const auxPolicy = message.split('Policy Name: ', 2);
	const policy = auxPolicy[1].split(' ', 1)[0];

	const auxAuthUser = message.split('User: ', 2);
	const authUser = auxAuthUser[1].split(' ', 1)[0];

	const auxVirus = message.split('virus: ', 2);
	const virus = auxVirus[1].split(' ', 1)[0];

	const auxHost = message.split('host: ', 2);
	const host = auxHost[1].split(' ', 1)[0];

	const auxPath = message.split('path: ', 2);
	const path = auxPath[1].split('\n', 1)[0];

	const description = 'Gateway Antivírus Policies';
	const reason = 'Virus encontrado';

	const auxTime = message.split('Time: ', 2);
	const time = auxTime[1].split('(', 1)[0];
	const dateArray = time.split(' ');

	let dayOfTheWeek;
	let month;

	switch (dateArray[0]) {
		case 'Sun':
			dayOfTheWeek = 'Dom';
			break;
		case 'Mon':
			dayOfTheWeek = 'Seg';
			break;
		case 'Tue':
			dayOfTheWeek = 'Ter';
			break;
		case 'Wed':
			dayOfTheWeek = 'Qua';
			break;
		case 'Thu':
			dayOfTheWeek = 'Qui';
			break;
		case 'Fri':
			dayOfTheWeek = 'Sex';
			break;
		default:
			dayOfTheWeek = 'Sab';
	}

	switch (dateArray[1]) {
		case 'Jan':
			month = 'Jan';
			break;
		case 'Feb':
			month = 'Fev';
			break;
		case 'Mar':
			month = 'Mar';
			break;
		case 'Apr':
			month = 'Abr';
			break;
		case 'May':
			month = 'Mai';
			break;
		case 'Jun':
			month = 'Jun';
			break;
		case 'Jul':
			month = 'Jul';
			break;
		case 'Aug':
			month = 'Ago';
			break;
		case 'Sep':
			month = 'Set';
			break;
		case 'Oct':
			month = 'Out';
			break;
		case 'Nov':
			month = 'Nov';
			break;
		default:
			month = 'Dez';
	}

	const timeString = `${dayOfTheWeek} ${month} ${dateArray[2]} ${dateArray[3]} ${dateArray[4]}`;

	console.log(`Appliance: ${appliance}`);

	// console.log(appliance);
	// console.log(destination);
	// console.log(source);
	// console.log(policy);
	// console.log(timeString);
	// console.log(description);
	// console.log(reason);
	// console.log(authUser);
	// console.log(virus);
	// console.log(host);
	// console.log(path);

	await aVEmailSender(
		appliance,
		destination,
		source,
		policy,
		timeString,
		description,
		reason,
		authUser,
		virus,
		host,
		path,
	);
};

const emailStalker = async () => {
	console.log('Stalker Running');

	const config = {
		imap: {
			user: process.env.MAILER_EMAIL,
			password: process.env.MAILER_PASS,
			host: 'outlook.office365.com',
			port: 993,
			tls: true,
			tlsOptions: { rejectUnauthorized: false },
			authTimeout: 3000,
		},
	};

	await imaps
		.connect(config)
		.then(function (connection) {
			return connection
				.openBox('INBOX')
				.then(function () {
					let searchCriteria = [
						'UNSEEN',
						// ['HEADER', 'FROM', `${process.env.FILTER_FROM}`],
					];
					let fetchOptions = {
						bodies: ['HEADER', 'TEXT', ''],
						markSeen: true,
					};

					return connection
						.search(searchCriteria, fetchOptions)
						.then(function (messages) {
							messages.forEach(function (item) {
								let all = _.find(item.parts, { which: '' });
								var id = item.attributes.uid;
								var idHeader = 'Imap-Id: ' + id + '\r\n';
								simpleParser(idHeader + all.body, async (err, mail) => {
									const message = mail.text;
									const mailHtml = mail.html;
									const subject = mail.subject;
									const from = mail.from;

									// if (subject === 'Alerta de Segurança') {
									// 	return;
									// }

									console.log(`Email from ${from.text} fetched!`);
									// console.log(mailHtml);

									if (from === `${process.env.MAILER_EMAIL}`) {
										if (message.includes('IPS')) {
											console.log('IPS EMAIL');
											await parseIPSEmails(message);
										}

										if (message.includes('-av')) {
											console.log('AV EMAIL');
											await parseAVEmails(message);
										}
									}
								});
							});
						})
						.then(() => {
							connection.end();
							console.log('Stalker Finished');
							console.log('Connection closed');
							console.log(new Date().toISOString());
						})
						.catch((err) => {
							console.log(err);
							connection.end();
						});
				})
				.catch((err) => {
					console.log(err);
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = { emailStalker };
