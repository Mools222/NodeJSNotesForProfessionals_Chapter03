function page30() {
    const express = require('express');
    const app = express();
    app.get('/ping', (request, response) => {
        response.send('pong');
    });
    app.listen(8080, 'localhost');
}

// page30();

function page31() {
    const express = require('express');
    const app = express();

    app.get('/myPath', function (req, res, next) {
        console.log("a");
        res.send("a");
        next();
    }, function (req, res, next) {
        console.log("b");
    });

    app.listen(8080, 'localhost');
}

// page31();

function page32() {
    // app.js
    const express = require('express');
    const greetMiddleware = require('./NodeJSNotesForProfessionals_Chapter03_greet.js');
    express()
        .use('/api/v1/', greetMiddleware({greeting: 'Hello world'}))
        .listen(8080);
}

// page32();

function page33() {
// app.js
    const express = require('express');
    const greetMiddleware = require('./NodeJSNotesForProfessionals_Chapter03_greet2.js');

    class GreetingService {
        constructor(greeting = 'Hello') {
            this.greeting = greeting;
        }

        createGreeting(name) {
            return `${this.greeting}, ${name}!`;
        }
    }

    express()
        .use('/api/v1/service1', greetMiddleware({
            service: new GreetingService('Hello'),
        }))
        .use('/api/v1/service2', greetMiddleware({
            service: new GreetingService('Hi'),
        }))
        .listen(8080);
}

// page33();

function page33_2() {
    const express = require('express'); //Imports the express module
    const app = express(); //Creates an instance of the express module
    const PORT = 3000; //Randomly chosen port
    app.set('view engine', 'jade'); //Sets jade as the View Engine / Template Engine
    app.set('views', 'NodeJSNotesForProfessionals/src/views'); //Sets the directory where all the views (.jade files) are stored.
    //Creates a Root Route
    app.get('/', function (req, res) {
        // res.render('index'); //renders the index.jade file into html and returns as a response. The render function optionally takes the data to pass to the view.

        // Test
        res.render('index', {title: 'My Jade Front Page'});
    });
    //Starts the Express server with a callback
    app.listen(PORT, function (err) {
        if (!err) {
            console.log('Server is running at port', PORT);
        } else {
            console.log(JSON.stringify(err));
        }
    });
}

// page33_2();

function page34() {
    const express = require('express'); //Imports the express module
    const app = express(); //Creates an instance of the express module
    const PORT = 3000; //Randomly chosen port
    app.set('view engine', 'ejs'); //Sets ejs as the View Engine / Template Engine
    app.set('views', 'NodeJSNotesForProfessionals/src/views'); //Sets the directory where all the views (.ejs files) are stored.
    //Creates a Root Route
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'My EJS Front Page',
            supplies: ["Supply 1", "Supply 2", "Supply 3", "Supply 4"],
            message: "This is a message"
        });
    });
    //Starts the Express server with a callback
    app.listen(PORT, function (err) {
        if (!err) {
            console.log('Server is running at port', PORT);
        } else {
            console.log(JSON.stringify(err));
        }
    });
}

// page34();

function page34_2() {
    var express = require('express');
    var cors = require('cors'); // Use cors module for enable Cross-origin resource sharing
    var app = express();
    app.use(cors()); // for all routes
    var port = process.env.PORT || 8080;
    app.get('/', function (req, res) {
        var info = {
            'string_value': 'StackOverflow',
            'number_value': 8476
        };
        // res.json(info);

        // or
        // res.send(JSON.stringify({
        // string_value: 'StackOverflow',
        // number_value: 8476
        // }));

        // you can add a status code to the json response
        res.status(200).json(info);

        // Test
        // res.send(info);
    });
    app.listen(port, function () {
        console.log('Node.js listening on port ' + port)
    })
}

// page34_2();

function page35() {
    const express = require('express');
    const app = express();

    // [Test: http://localhost:3000/test.txt]
    app.use(express.static('NodeJSNotesForProfessionals'));

    let port = 3000;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

// page35();

function page36() {
    // By default, Express will look for an 'error' view in the /views directory to render.
    // [How would it do it by default? I don't get it]
}

// page36();

function page36_2() {
    const express = require('express');
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', 'NodeJSNotesForProfessionals/src/views');

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        //pass error to the next matching route.
        next(err);
    });

    // Test
    app.use(function (err, req, res, next) {
        console.log("Since next is called with an err (like this: next(err)) in the middleware above, only middleware with the 'err' parameter will be called");
        next(err);
    });
    app.use(function (req, res, next) {
        console.log("Since I have no 'err' parameter, so I will not be called");
    });

    // handle error, print stacktrace
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

    let port = 3000;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

// page36_2();

function page37() {
    const express = require('express');
    const app = express();

    // [Test with: http://localhost:3000/settings/32135?field=name]
    app.get('/settings/:user_id', function (req, res) {
        // get the full path
        console.log(req.originalUrl); // => /settings/32135?field=name
        // get the user_id param
        console.log(req.params.user_id); // => 32135
        // get the query value of the field
        console.log(req.query.field); // => 'name'

        // [Doesn't seem to work]
        console.log(req.get('Content-Type')); // "text/plain"

        // [Test - Also doesn't work] (https://expressjs.com/en/api.html)
        console.log(req.get('content-type'));
        console.log(req.headers['content-type']);

        res.send("Yep");
    });

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    // [Test with a PUT request to: http://localhost:3000/settings/32135 + this body:]
    // { "name": "Peter" }
    app.put('/settings/:user_id', function (req, res) {
        console.log(req.body.name); // "Peter"

        res.send("Got it");
    });

    let port = 3000;
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

// page37();

function page38() {
    var express = require('express');
    var app = express();

    //GET /names/john
    app.get('/names/:name', function (req, res, next) {
        if (req.params.name == 'john') {
            return res.send('Valid Name');
        } else {
            next(new Error('Not valid name')); //pass to error handler
        }
    });

    //error handler
    app.use(function (err, req, res, next) {
        console.log(err.stack); // e.g., Not valid name
        return res.status(500).send('Internal Server [Error] Occurred');
    });

    app.listen(3000);
}

// page38();

function page38_2() {
    let express = require('express');
    let app = express();

    app.use(function (req, res, next) {
        function afterResponse() {
            res.removeListener('finish', afterResponse);
            res.removeListener('close', afterResponse);
            // actions after response

            // Test
            console.log("action after request");
        }

        res.on('finish', afterResponse);
        res.on('close', afterResponse);
        // action before request
        // eventually calling `next()`

        // Test
        console.log("action before request");

        next();
    });

    // app.use(app.router);

    // Test
    app.get('/', function (req, res, next) {
        console.log("Sending stuff");

        return res.send('<h1>A big text for you.</h1>');
    });

    app.listen(3000);
}

// page38_2();

function page39() {
    var express = require('express');
    var cookieParser = require('cookie-parser'); // module for parsing cookies
    var app = express();

    app.use(cookieParser());

    app.get('/setcookie', function (req, res) {
        // setting cookies
        res.cookie('username', 'john doe', {maxAge: 900000, httpOnly: true});
        return res.send('Cookie has been set');
    });

    app.get('/getcookie', function (req, res) {
        var username = req.cookies['username'];
        if (username) {
            return res.send(username);
        }
        return res.send('No cookie found');
    });

    app.listen(3000);
}

// page39();

function page39_2() {
    var express = require('express');
    var app = express();

    //each request will pass through it
    app.use(function (req, res, next) {
        req.user = 'testuser';
        next(); // it will pass the control to next matching route
    });

    app.get('/', function (req, res) {
        var user = req.user;
        console.log(user); // testuser
        return res.send(user);
    });

    app.listen(3000);
}

// page39_2();

// [What is this supposed to do?]
function page40() {
    var app = require('express')();
    require('express-reverse')(app);
    app.get('test', '/hello', function (req, res) {
        res.end('hello');
    });
    app.listen(3000);
}

// page40();

function page40_2() {
    'use strict';
    const port = process.env.PORT || 3000;
    var app = require('express')();
    app.listen(port);
    app.get('/', (req, res) => res.send('HelloWorld!'));
    app.get('/wiki', (req, res) => res.send('This is wiki page.'));
    app.use((req, res) => res.send('404-PageNotFound'));
}

// page40_2();

function page41() {
    var app = require('express')();

    app.get('/api', function (req, res, next) {
        // Both /api/foo and /api/bar will run this - [Doesn't seem to be true - However, if you change "/api" to "/*" it works]
        lookupMember(function (err, member) {
            if (err)
                return next(err);
            req.member = member;

            // Test
            console.log(req.member);

            next();
        });

        // Test
        // res.send("A");
    });

    app.get('/api/foo', function (req, res, next) {
        // Only /api/foo will run this
        doSomethingWithMember(req.member);

        // Test
        res.send("B");
    });

    app.get('/api/bar', function (req, res, next) {
        // Only /api/bar will run this
        doSomethingDifferentWithMember(req.member);

        // Test
        res.send("C");
    });

    app.listen(3000);

    // Test
    function lookupMember(f) {
        f(null, "SomeMember");
    }

    function doSomethingWithMember(member) {
        console.log("B1 " + member);
    }

    function doSomethingDifferentWithMember(member) {
        console.log("C1 " + member);
    }
}

// page41();

function page41_2() {
    var app = require('express')();

    app.get('/foo', function (req, res, next) {
        doSomethingAsync(function (err, data) {
            if (err)
                return next(err);
            // renderPage(data);

            // Test
            renderPage(data, res);
        });

        res.write("Write something before the async stuff finishes\n");
    });

    // In the case that doSomethingAsync return an error, this special
    // error handler middleware will be called with the error as the
    // first parameter.
    app.use(function (err, req, res, next) {
        // renderErrorPage(err);

        // Test
        renderErrorPage(err, res);
    });

    app.listen(3000);

    // Test
    function doSomethingAsync(f) {
        let promise = new Promise((resolve, reject) => {
            let number = Math.floor(Math.random() * 10);
            console.log(number);

            setTimeout(() => {
                if (number > 4)
                    resolve("It worked: " + number); // Return this after 2 sec
                else
                    reject(Error("It broke: " + number));
            }, 2000);
        });

        promise
            .then(value => f(null, value))
            .catch(reason => f(reason, null));
    }

    function renderPage(data, res) {
        console.log("Data: " + data);
        res.write("Data: " + data);
        res.end();
    }

    function renderErrorPage(error, res) {
        console.log(error);
        res.write("" + error);
        res.end();
    }
}

// page41_2();

function page41_3() {
    var app = require('express')();

    app.get('/bananas', function (req, res, next) {
        getMember(function (err, member) {
            if (err)
                return next(err); // [I guess this calls some default invisible error handling method - It seems to be using console.error() to print to the console and it sends a HTML <pre> tag with the error message]

            // If there's no member, don't try to look
            // up data. Just go render the page now.
            if (!member)
                return next('route'); // [Calling next('route') will bypass any subsequent middleware on the current route and jump to the next matching route (which is the "app.get('/bananas'..." function call below)]

            // Otherwise, call the next middleware and fetch
            // the member's data.
            req.member = member;
            next(); // [This call the subsequent middleware]
        });
    }, function (req, res, next) {
        getMemberData(req.member, function (err, data) {
            if (err)
                return next(err); // [I guess this calls some default invisible error handling method - It seems to be using console.error() to print to the console and it sends a HTML <pre> tag with the error message]

            // If this member has no data, don't bother
            // parsing it. Just go render the page now.
            if (!data)
                return next('route'); // [Calling next('route') will bypass any subsequent middleware on the current route and jump to the next matching route (which is the "app.get('/bananas'..." function call below)]

            // Otherwise, call the next middleware and parse
            // the member's data. THEN render the page.
            req.member.data = data;
            next(); // [This call the subsequent middleware]
        });
    }, function (req, res, next) {
        req.member.parsedData = parseMemberData(req.member.data);
        next();
    });

    app.get('/bananas', function (req, res, next) {
        // renderBananas(req.member);

        // Test
        renderBananas(req.member, res);
    });

    app.listen(3000);

    // Test
    function getMember(callback) {
        let number = Math.floor(Math.random() * 3);
        // number = 2;
        console.log("N1: " + number);

        if (number === 0)
            callback("SomeError1", null); // Error
        else if (number === 1)
            callback(null, null);  // No error + no member
        else
            callback(null, {name: "SomeMemberName"}); // No error + member
    }

    function getMemberData(member, callback) {
        let number = Math.floor(Math.random() * 3);
        // number = 2;
        console.log("N2: " + number);

        if (number === 0)
            callback("SomeError2", null); // Error
        else if (number === 1)
            callback(null, null);  // No error + no member data
        else
            callback(null, "SomeMemberData"); // No error + member data
    }

    function parseMemberData(memberData) {
        return memberData.toUpperCase();
    }

    function renderBananas(data, res) {
        if (data) {
            console.log(data);
            res.send(data);
        } else {
            res.send("Error: No meember");
            console.log("No meember")
        }
    }
}

// page41_3();

function page42() {
    var app = require('express')();

    // [/path/:id(\d+) = matches "http://localhost:3000/path/" + "1 or more digits" and the digits are found under "req.params.id"]
    app.get('/path/:id(\\d+)', function (req, res, next) { // please note: "next" is passed
        if (req.params.id == 0) // validate param
            return next(new Error('Id is 0')); // go to first Error handler, see below

        // Catch error on sync operation
        var data;
        try {
            data = JSON.parse('/file.json');

            // Test
            // data = JSON.parse({id:"abc"});
        } catch (err) {
            return next(err);
        }

        // If some critical error then stop application
        if (!data)
            throw new Error('Smth wrong');

        // If you need send extra info to Error handler
        // then send custom error (see Appendix B)
        if (smth)
            next(new MyError('smth wrong', arg1, arg2));

        // Finish request by res.render or res.end
        res.status(200).end('OK');
    });

    // Be sure: order of app.use have matter
    // Error handler
    app.use(function (err, req, res, next) {
        if (req.url != 'POST')
            return next(err); // go-to Error handler 2.
        console.log(req.url, err.message);
        if (req.xhr) // if req via ajax then send json else render error-page
            res.json(err);
        else
            res.render('error.html', {error: err.message});
    });

    // Error handler 2
    app.use(function (err, req, res, next) {
        // do smth here e.g. check that error is MyError
        if (err instanceof MyError) {
            console.log(err.message, err.arg1, err.arg2);
        }

        res.end();
    });

    app.listen(3000);

    class MyError extends Error {
        constructor(err) {
            super();
            this.error = err;
        }

        toString() {
            return this.error;
        }
    }
}

// https://stackoverflow.com/questions/17793344/empty-req-body-receiving-text-plain-post-request-to-node-js
// On the server side, Express uses connect's bodyParser which by default only supports the following content types:
//     application/json
//     application/x-www-form-urlencoded
//     multipart/form-data
function page44() {
    const express = require('express');
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.post('/post-data-here', function (req, res, next) {
        console.log(req.body); // req.body contains the parsed body of the request.

        // Test
        res.send(req.body);
    });

    // Test
    app.get('/', (req, res, next) => {
        res.send(`<!DOCTYPE html>
<html>
<body>
<h2>HTML Forms</h2>
<form action="/post-data-here" method="post">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form> 
</body>
</html>
`)
    });

    app.listen(8080, 'localhost');
}

page44();