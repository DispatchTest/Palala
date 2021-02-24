Nodejs, Express and Mongo DB API.

**Requirements**
-Node JS
-Mongo DB Local Instance or Cloud Atlas

**Set Up**
-Clone the project
-Use the terminal application of your choice to navigate into the project directory.(CMD, Git Bash, Bash .etc)
-Run the command "npm install"
-Open the project in your code editor of choice.
-Navigate to the "config" directory in the Project. 
-Locate the "config.env" file and set the environment variables.
        PORT = -- PORT --
        MONGO_URI= -- Mongo DB URI --
        SMTP_HOST= -- SMTP HOST --
        SMTP_PORT= -- SMTP PORT --
        SMTP_USER= -- SMTP USER --
        SMTP_PASS= -- SMTP PASSWORD --
        SESSION_SECRET= -- EXPRESS SESSION SECRET --
        CLOUDINARY_KEY= -- CLOUDINARY API KEY--
        CLOUDINARY_SECRET= -- CLOUDINARY API SECRET --

-Run the command "npm run dev" to run in development mode.
-Run the command "npm start" to run in production mode.