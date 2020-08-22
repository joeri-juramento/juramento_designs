# Short date notation | Shorthand

*The following requirements where defined:*

### Intro

Original dates - in various order - take up the following space in file and screen space:

2020-08-22 
1234 5 67 89 --> 9 chars. 

Most of the information is redundant during the actual use but needs to defined to be specific after time has passed. So real-time relevant information is the 8-22 which means August the 22nd. 

> I am aware of other countries have different regional formats, but all of them - soon or later - run into the same issue of sorting or not being able to read the end of the file name because of the long date.

The fact that the order is different between region creates an extra chance of interpretation error. Preventing that is not the goal of this spec, making files (and notes) shorter and filenames easier to read on mobile devices, that is the goal while maintaining the ability to keep sorting files chronologically via the alphabet.

20200822_File_Verb_description.docx

2020-08-22_File_Verb_description.docx

Notation above requires 10 digit-chars (including hyphens for readability and zero fillers for sortability.)



**At the moment one can write this as shorter dates:**

20-08-22 (8 chars) 

The problem is that any dates below 2000 are sorted on the "wrong side" of any file names 20-08-22 because 99 > 20. Now comparing 999 to 020 would also not help; only 1999 compared to 2020 would sort correctly, which requires 2 extra digits/chars.

or

200822 (6 chars)

The problem is that for some of us '2008' is recognized, but it has nothing to do with the year 2008. 

or

20200822 (8 chars)

The problem is that certain dates are hard to read because of all the filler zeros; for example: 20200110; your brain wants to do something with the '11', but there is no eleven in this date.

So First requirement:









































End of File.



