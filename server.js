const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
//crea l'app express
var app = express();
//usa la directory per i file parziali (primo argomento)
hbs.registerPartials(__dirname+'/views/partials');
//posso richiamare {{getCurrentYear}} senza specificarlo per ogni oggetto dato che è un valore unico
//e non ha senso richiamare la funzione di continuo
hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//key, hbs
app.set('view engine','hbs');
//next -> l'applicazione continua solo quanto viene richiamato next()
app.use( (req,res, next) => {
	var now = new Date().toString();
	var log = now+" "+req.method+" "+req.url+"\n";
	
	fs.appendFile('server.log',log, (err)=>{
		if(err){
			console.log('Unable to connect the server');
		}
	});
	next();
});

app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});

//usa la funzione middleware express.static
app.use(express.static(__dirname+'/public'));
 
//handler per il GET Http
app.get('/', (req, res) =>{
	res.render('home.hbs', {
		pageTitle: 'Home page',
		name: 'Biagio',
		welcomeMessage: 'Welcome to our site'
	});
});

app.get('/about', (req,res)=>{
	//usa il template specificato e un oggetto da poter riutilizzare nella pagina about.hbs
	res.render('about.hbs', {
		pageTitle: 'About page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req,res)=>{
	res.send({
		errorMessage: 'Unable to fulfill the request'
	});
});

//ascolta sulla porta 3000 di localhost
app.listen(port, () =>{
	console.log('Server is up on port '+port);
});