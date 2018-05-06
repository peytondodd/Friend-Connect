# Friend Connect
The live version can be found at: https://thejasonxie.com/projects/friendconnect

### About this project

This is my largest project so far. It is a social networking site very similar to 
Facebook. It was my first time creating something like this so I made a lot of 
mistakes and learned a lot as well.

The focus of this project was more about the functionality rather than the 
aesthetics. I didn't work as much on the CSS because I wanted to learn more about
PHP and MySQL. Therefore I used bootstrap to make it look decent.

### features about this project
I used HTML, CSS, Vanilla JS, Ajax, Bootstrap, PHP, and MySQL to create this website. 
The best aspect of this project is the use of ajax to make things seem like it happens 
real time (eg. creating and receiving new posts, sending and receiving new messages, 
adding, blocking, deleting friends, etc.)

### Bugs

I tried to check and remove as many bugs as possible but I am pretty sure there 
are still many left. The code looks very messy and unorganized which makes it very 
hard to debug.

To make things seem real time, I used the long polling method with ajax. I tried to 
make the poll about 40 seconds like Facebook but I kept getting a 504 ajax error. So I 
reduced it back to 10 seconds.

### Issues and Concerns

The server for this webpage is located in Chicago and therefore the time of the posts 
and messages may not be in your correct local timezone. I decided not to fix this 
because I wanted to move on to a different project. But the fix for this would be to: 

1. Store time in UTC and get the user timezone through javascript and then convert.

2. If the server time can't be stored in UTC, find the timezone of user through 
javascript, convert the server time from Chicago to UTC then to the user timezone.

### Lessons learned from this project

I need to plan things better ahead of time instead of comming up with new ideas while 
working and getting new problems along with it.