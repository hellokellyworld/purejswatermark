# Muminle Frontend Application
How to setup and run in local computer
    1. Install dependencies
    	npm install

    2. Run in development mode

    	Edit the webpack.config.js file to point to the correct back-end URL in devServer proxy section.
    	If you use localhost back-end, use "http://localhost:3001", otherwise you could use "https://mml-yourname-test-back.herokuapp.com"

    	Then you need to set the NODE_ENV to be development mode, and then run "npm run dev". On Linux/Mac,
    	the two steps can be combined :
    		NODE_ENV=development npm run dev

    3. Run in production mode

    	Edit server.js to set the proxy URL to the production back-end URL, e.g.  "https://mml-yourname-test-back.herokuapp.com" or "http://localhost:3001"

    	Then you need to set the NODE_ENV to production mode, and run "node server.js". On Linux/Mac these 3 steps can be combined as:

    		NODE_ENV=production "MML_BACKEND_URI="http://localhost:3001" node server.js 

		To run at a different log level other than debug:
		
			NODE_ENV=production MML_BACKEND_URI="http://localhost:3001" LOG_LEVEL=info node server.js 
			
			#LOG_LEVEL can be: trace,debug, info, warn,error,fatal. By default it is debug

	    You can browse the app at <http://localhost:8080>

How to setup and run on Heroku

    4. How to deploy to heroku mml-yourname-test-front app

    	a) create a login on heroku.com
		b) install heroku CLI  https://devcenter.heroku.com/articles/heroku-cli #skip if  you already have done it
		c) setup your computer to use SSH-Key to access heroku rather than always going to website and login.
	        https://devcenter.heroku.com/articles/keys	#skip if you have already done for your machine
    	c) ask Tom Long to add you to the team, then you will see "mml-yourname-test-front" app in your dashboard
    	d) heroku login
    	e) create the app on heroku

    		cd front-end/..  #need to go to the upper directory first

 			heroku create mml-yourname-test-front      
        	heroku git:remote --app mml-yourname-test-front
        	git remote rename heroku heroku-yourname-test-front

   		#----IF YOU ARE GOING TO DEPLOY TO TEAM app---
   		#git remote add  heroku-front-end https://git.heroku.com/mml-yourname-test-front.git  #this will connect #your source code to heroku git repository in addition to github/bitbucket.org repository
		#--------------------------

        heroku config:set MML_BACKEND_URI="https://mml-yourname-test-back.herokuapp.com/" -a mml-yourname-test-front

                #The above will setup an environmental variable called MML_BACKEND_URI
				#and the MML_BACKEND_URI value is set to the backend URL you created in step e)
                #and this environmental variable is only created for your front-end app named mml-yourname-test-front

		heroku config:set LOG_LEVEL=warn -a  mml-yourname-test-front
				#The  above will set the log level of the server to warn instead of debug.
				#LOG_LEVEL can be: trace,debug, info, warn,error,fatal. By default it is debug

        	git subtree push --prefix front-end heroku-yourname-test-front  master
                #This will push your front-end subfolder to the heroku as master branch for the
                #repository called heroku-yourname-test-front, and it is associated with your app 
				#mml-yourname-test-front
                #as soon as you pushed it, you will see that heroku will try to build it and run the app.

        	heroku open --app mml-yourname-test-front    #this will open your front-end app in your browser

    	f) to check the logs:

    		heroku logs --app mml-yourname-test-front

    	g) to restart/start the app on heroku

    		heroku start --app mml-yourname-test-front
    		heroku restart --app mml-yourname-test-front

    	h) open http://mml-yourname-test-front.herokuapp.com to see if it is working.

		i) to delete the app and start over:

			heroku destroy --app mml-yourname-test-front

Coding Styles:
	JS:  		https://google.github.io/styleguide/jsguide.html
	CSS HTML: 	https://google.github.io/styleguide/htmlcssguide.html

	TypeScript:
		https://github.com/microsoft/TypeScript/wiki/Coding-guidelines
		https://www.intertech.com/Blog/google-javascript-style-guide-takeaways-for-typescript-developers/
