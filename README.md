# Latte
> Created by Jason Liu <br>
> This app has been deployed as version 1.0

### What is Latte?
Latte is an image categorisation application created for a small audience. <br>
It allows users to upload **images** onto the application, where they can assign them to **tags** or add them to **albums**. <br>
**Images**, **tags** and **albums** can all be named and have a description attached to them, which can be edited in the front or backend.
<br><br>
Images, tags and albums can also all be deleted from the frontend as well. <br>
Latte does have authentication in that a username and password is needed to access the application (which can only be administered by an admin)


### What technologies does Latte use?
- **_React_** is used to create the frontend (shown in this repository)
- **_Django_** is used to create the backend
- **_Django Rest Framework_** was also used to create an API for the frontend to interact with
- **_Postgres_** was used as the database

### Moving forward with Latte
Latte is currently in version 1.0 for the production state.<br>
In the future, I have the following improvements:
- Add more metadata to each image (e.g. allow the user to specify when the image was taken) to allow for improved filtering.
- More work also needs to be done to allow for additional image formats (e.g HEIC or SVG formats)
- Make the website responsive (however this is low priority as the website was designed to be used on laptops)

# Where can I see Latte?
To visit Latte, please visit the following link: <br>
> [Latte](https://latte-frontend.onrender.com/)