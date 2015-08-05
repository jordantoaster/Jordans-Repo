======================
About The Application
======================
The purpose of the application was to create and buy and sell website that focused on the theme of books.
Users would be able to enrol into the system, update their profile, buy/sell books in the market place or 
search for a particular book they are seeking. 

Books, users and activity data are each represented by a table in a MYSQL database, with a relationship
defined between the books and users in order to establish ownership. The activity table contains information
about each 'action' performed on the system, this is crucial in order to identify potential security violations
and acts as a pool of evidence just incase a risky event occurs. For more information view the folder 'Readme +
other Details' to view the ER diagram of the database.

On the client side (the browser) HTML is the selected mark up, with CSS styling the elements. Jquery has been 
utilised in order to simplify DOM manipulation and provide a library which supports AJAX. AJAX will allow
updating of a web pages data without the requirement of refreshing and is the channel from which data is send
from the client to the server. The bootstrap JS library has also been included to make use of the 'components'
provided can be seen in the navigation bar and login screen tab functionality.

The 'server side' language in this applications context is JAVA. HTTP servlets are used to 'catch' the request data
and perform actions based on the contents of the request. This may vary from performing validation to inserting data
into the MYSQL database, an HTTP response will always be provided with additional information which may prompt the user
or move to another screen of the application.

The server side code has been organised into five categories...

1. A unit test package
- These tests evaluate each individual component of the JAVA code automatically once run to determine if the expected 
functionality is maintained.
2. A pojo package
- This is fairly self explanatory and contains the plain old JAVA objects that are used to represent entities in the system.
In this context users, books and actions.
3. Data access objects
- These provide an interface to the database and provide sets of specific operations, each table is represented by an 
accompanying DAO class.
4. A utility package
- This package contained classes that performed certain 'utility' roles in the system such as encryption and encoding 
url strings
5. a 'controller' package
- This contained the JAVA servlets, the goal was to make these classes act as the pivot from which data is retrieved from 
the front and back ends of the system and performing the processing required (business logic). The functionality was 
intended to replicate the 'C' in MVC to an extent. (I personally believe this needs to be better enforced as the code
has inconsistencies which require refactoring).


=============================
Other Details
=============================
- The system was locally deployed on tomcat.
- If attempting to log in the password for the current users is ' Jordan1#!11 '

=============================
Future Improvements
=============================
- Is the map conversion required? would it be less expensive to pass through multiple parameters instead of a JS object?
- Remember me cookie
- Investigate if SSL can be implemented
- Investigate if SQL injection is possible
- Add activity support to the full system
- Confirm is GETS Should become POSTS. more secure and less of a threat. confirm data in GETS is not in danger.
- move response base and action classes to pojo package.
- Add ajax method to master JS file and return response for individual processing, removes some duplication.
- Is 'userOnSystem' method and 'readAndCompare' not very similar?
- Translating back to the plain username is not a great implementation, is the server request required? should I just compare for the encoded version in dao?

============================
VERSION - 1.0.0
============================



