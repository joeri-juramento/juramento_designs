# Short date notation | Shorthand Requirement & Spec


[TOC]
------
*The following requirements where defined:*

### Intro

Original dates - in various order - take up the following space in file and screen space:

```
2020-08-22 
1234567890 --> 10 characters
```

Most of the information is redundant during the actual use, but needs to defined to be specific after time has passed. So real-time relevant information is the 8-22 which means August the 22nd. 

> I am aware of other countries have different regional formats, but all of them - soon or later - run into the same issue of sorting or not being able to read the end of the file name because of the long date.

The fact that the order is different between region creates an extra chance of interpretation error. Preventing that is not the goal of this spec, making files (and notes) shorter and filenames easier to read on mobile devices, that is the goal while maintaining the ability to keep sorting files chronologically via the alphabet. An example of the original filenames with date:

20200822_File_Verb_description.docx

2020-08-22_File_Verb_description.docx

Notation above requires 10 digit-chars (including hyphens for readability and zero fillers for sortability.)



**At the moment various suboptimal alternative notation forms exist:**

20-08-22 (8 chars) 

The problem is that any dates below 2000 are sorted on the "wrong side" of any file names 20-08-22 because 99 > 20. Now comparing 999 to 020 would also not help; only 1999 compared to 2020 would sort correctly, which requires 2 extra digits/chars.

or

200822 (6 chars)

The problem is that for some of us '2008' is recognized, but it has nothing to do with the year 2008. 

or

20200822 (8 chars)

The problem is that certain dates are hard to read because of all the filler zeros; for example: 20200110; your brain wants to do something with the '11', but there is no eleven in this date.

So the requirement:



## Requirements

<u>Create a date notation that is as short as possible without too much loss of information which remains sortable (chronologically correct) by system and understandable by average humans.</u>



Breaking down the requirement:



#### "a date notation that is as short as possible"

We can use the alphabet as numbers to prevent needing to characters above the number 9. Furthermore we can use accents for numbers above the number 26. 

> Though I am writing this in hindsight there were a lot of iterations; one iteration that compresses information of the year and the month onto each other. So 2020-08 would become 28 (20+8). The 12th month in 2020 would simply be written as 32. A day 28.22 which is 22nd of August 2020. The problem with this iteration is that it only makes sense up to 2020-12-31; after that you would need another digit. So the 28.22 above is actually [0]28.22 and after the end of the year, one would write 122.1. The year 2029-12-31 would be 941.31 because 29+12 = 41 (compressed information) and +1 day would require a new digit. Another problem of a notation is that one needs to calculate the year and month. For those curious why subtracting '20' on the 2nd digit: I started in 2020; if you re-align it with 2000 one cannot get further than 912.31. At that moment I realised I was thinking in circles because 912.31 or 028.22 are 6 chars and more complicated to use then 200822 which has a higher range. I needed to put more information per character/digit. So this line of thought was abandoned and I focused on the alphabet; our next-best-counter. 

ABCDEFGHIJKLMNOPQRSTUVWXYZ are 26 letters. A is the 1st letter; Z is the 26th letter. I am aware other languages have different lengths. New English and Dutch have 26 1-digit-char letters.

##### Shorting months

I can spare a month digit by writing October, November, December as J,K,L:

_11 = XXXX-01-01
_K1 = XXXX-11-01

One could write all months as letters; but for quick recognition, I keep 1-9 with numbers and add J,K,L. This way 9 out of 12 months can be quickly recognized which is a large chunk of the year. 

> I considered having the shortened days also in numbers from 1-9, but that would result in 'T23' which humans can read as '23' /twenty-three/, but there is no number '23' in date T23 because it means 2020-02-03, so I would recommend writing it as 'T2C' to avoid that confusing. 
>
> For Dutch people or Germans and others, I have a strong second argument, in Dutch, 'T23' is pronounced as /Tee three-and-twenty [NL: /Tee drie-en-twintig/]. So in my primary language the pronunciation order of numbers is totally a mess. 
>
> You might not realize this, but the French use math to say '97' (four [times] 20 [then add] 10 [and] 7), the Dutch go [gezellig] from back to forth saying seven-[and]-ninety and the English just pronounce what is on paper from left to right: /ninety-seven/. 
>
> I wanted to take this into account and make it as universal as possible as I already cannot solve the YYYY-MM-DD and YYYY/DD/MM differences so I did not want to add extra frustration or confusion by having people read shorthand dates as numbers that are not really there like the Dutch time: 9:30 is pronounced as /half-ten/ [NL: /half tien/]. There is no '10' in 9:30 so why do we pronounce it?! - Because the pronunciation originates from analog clocks with hands at the second hand would be between the 9 and the 10 similarly to the English a quarter to 10 which also has no 10 in the digital notation. I don't like the legacy of it though.



##### Shortening days

For 1-31 days I normally need 2 digits, from the alphabet I have a 1 char sign up to 26. I can extend this with a unique char for 27 up to 31. By going down this path an related requirement was identified. Usable by humans. That refers to being to enter the letter on a keyboard or mobile phone without alt-codes.

| Number | Letter |
| ------ | ------ |
| 1      | A      |
| ...    | ...    |
| 26     | Z      |
| 27     | Â      |
| 28     | Ê      |
| 29     | Ñ or Î |
| 30     | Ô      |
| 31     | Û      |

##### Shortening years

Now we have defined a spec for numbers 1 - 31, be can also re-use that for years to save a digit up to 2031.

So 2020 would be written as the 20th letter which is the T. This would give a range from 2001 to 2031 with 1 digit-char.

```
A__ = 2001-XX-XX
Û__ = 2032-XX-XX
T8_ = 2020-08-XX
```

For 2032 the spec can either be updated or one can switch to numbers:

```
321_ = 2032-01-XX
328V = 2032-08-22
```

Obviously there are more special characters, but the Û sorts pretty at the end of the alphabet so whatever is devised should keep the system-sorting into account.

> I considered using À,Á,Â,Ä,Ã, but the accents make it hard to differentiate. Using different letters, makes the visible difference between the number more significant. 



#### "without too much loss of information"

- I need the ability to write dates further then 2029, preferably up to 2099 which is over 79 years from this year (2020).
- I would like the ability to quickly recognize the month.



#### "which remains sortable (chronologically correct) by system"

20-08-2020_Filename.ext
25-01-2018_Filename.ext

Dates above will be incorrectly sorted by the system. The correct notation YYYY-MM-DD requires 10 chars.

The shorthand notation only requires 3 and is sortable:

T8T_Filename.ext
R1Y_Filename.ext

If sorted on filename from old to new, the R1Y file would be correctly listed above the T8T file.



#### "<u>understandable</u> [and usable] by average humans"

This means the date does not need be calculated due to compressed information like the first iteration. (28.22)

> Yesterday, I did not know what the 20th letter from the alphabet was. The position of a letter in the alphabet is not knowledge ready at hand (for me); but it is deductible for those who have not memorized it and fairly universal, even if your main (Latin-based) language has another alphabet. 

##### Understanding vs knowing the alphabet

I recognize that this requires learning the positions of 26 letters plus 6 extra accented-letters.

However, the proposed system allows humans to start gradually.

2020-08-22 can be gradually learned in the shorthand notation if that is so desired.

20H20 - Starting with only the months, requires 5 digits at best, so still shorter.

208V - Starting with only the day in letter-format and the last 3 months. 
20JV - Example in October.

T822 - Only the year and last 3 months in letter-format; it saves space and the year obviously does not change that often. 
TJ22 - Example in October

T8V

None of these notation variation violates the requirement as defined. Dates are shorter, it remains sortable as long as you stick to one variant.



#### "[understandable and] <u>usable</u> by average humans"

This also connects to the previous section. Most people will have access to an English alphabet index order and it could be learned.

The following requirements are specifically applicable on the special chars, but they are obviously valid for all letters and numbers in the spec.

- I need to be able to enter the char via a keyboard on PC.
- I need to be able to enter the char via a keyboard on mobile phone.
- I need to be able to write down the char fairly easily.
- I need to be able to differentiate the letters from each other.
- I need to be able to read a shorthand notation and understand it as a date. 

The reason I chose Â - Ô is because one can write them with a keyboard *without special alt-codes* and the requirements above are met. 

> Other accented letters where considered: Ŷ Ě Š Ŝ Č Ŵ Ž Š Č Ê Ň Ŷ ³ þ Ť Ô. But I needed one for which I was able to actually type it and the rabbit whole of extended alt-codes in the windows registry is not one I would recommend to anyone. 

Furthermore I choose the 27-31st letters on the A-Z row below to maintain sortability:



ÂBCDÊFGHÎJKLMÑÔPQRSTÛVWXYZ



> I (originally) skipped the Î in favour of Ñ due to various soft reasons, so I am sure what is best: 
>
> - The related number is 29; the nine starts with the letter N.
> - The capital 'i' can be confused with letter 'l' (el) depending on fonts, however, there is no letter L with a circumflex ^, so an i with a ^ is unique.
> - In numbers there is no (significant) difference in width, so a list of dates is always listed in the same with; I was afraid that the letter Î would break that tradition. A counter-argument would be that the letter I as in 9 is being used for I9I = 2009-09-09 or T9I = 2020-09-09. So the width problem, if any, does not only exists at the 29th number letter.
> - Furthermore, I assumed that Ñ would be easier to differentiate that Î, though I have no data to backup that claim.
> - An argument for Î would be that one could say that all vowels (A,E,I,O,U) were chosen to participate in filling up the numbers 27 to 31.



##### Leap day

There is one happy coincidental extension point of the spec. In one would want a specific sign for leap day, one could use Ñ or Î depending on which is chosen as the default and which remains.



## Spec v0.9.0



We define a 3 to 4 character date notation system with an possible extension going to 5 characters after the year 2999. 

1. The system can express dates from 2000-01-01 until 2099-12-31 (and with 5 characters, up to 2999-12-31 [extension]).

2. The (English) alphabet is used to express two digit numbers into a single 'digit' saving horizontal space.

3. Vowels with accents are used to communicate days 27 until 31.

4. Dates remain sortable via the alphabet resulting in a chronologically correct list.

   

### First position representing the year X--

1. For the first 31 years the first position presents that last two digits of a year. The millennium and century are omitted. 
2. After the first 31 years the two first positions are identical to the last two digits of a year unless the spec is updated.

| Letter | = Year | Letter | = Year | Letter | = Year | Letter  | = Year |
| ---------: | ------ | ---------: | ------ | ---------: | ------ | ----------: | ------ |
| 0--       | 2000   | H--       | 2008   | P--       | 2016   | X--        | 2024   |
| A--       | 2001   | I--       | 2009   | Q--       | 2017   | Y--        | 2025   |
| B--       | 2002   | J--       | 2010   | R--       | 2018   | Z--        | 2026   |
| C--       | 2003   | K--       | 2011   | S--       | 2019   | Â--        | 2027   |
| D--       | 2004   | L--       | 2012   | T--       | 2020   | Ê--        | 2028   |
| E--       | 2005   | M--       | 2013   | U--       | 2021   | Î-- or Ñ-- | 2029   |
| F--       | 2006   | N--       | 2014   | V--       | 2022   | Ô--        | 2030   |
| G--       | 2007   | O--       | 2015   | W--       | 2023   | Û--        | 2031   |

From year 2032 on, the notation switches back to original digits, unless the spec is updated, meaning one writes 32-- after the year Û--.



### Second position representing the month -X-

1. The second last position represents the month and a dualistic notation form exists. 
2. For the months 1-9 (Jan-Sept) it is recommended to use the actual singular digits and not A-H. (For faster human recognition.)
3. For months 10,11,12 (Okt, Nov, Dec) the letters J, K and L are used.
4. A to H can still be used as an alternative notation form and can improve readability from the year 2032 and on. ("32AA" in stead of "321A")

| Shorthand | Letter | Month number | = Month   |
| --------- | ------ | ------------ | --------- |
| -1-       | A      | 1            | January   |
| -2-       | B      | 2            | February  |
| -3-       | C      | 3            | March     |
| -4-       | D      | 4            | April     |
| -5-       | E      | 5            | May       |
| -6-       | F      | 6            | June      |
| -7-       | G      | 7            | July      |
| -8-       | H      | 8            | August    |
| -9-       | I      | 9            | September |
| -J-       | J      | 10           | October   |
| -K-       | K      | 11           | November  |
| -L-       | L      | 12           | December  |



### Last position representing the day of month --X

1. The last position represents the day number as in day of the month 1 to 31.
2. The alphabet letters represent the day of the month based on their index number in the (English) alphabet.
3. Since the alphabet is 26 letters long, for numbers 27 until 31, vowels with a circumflex (Â,Ê,Î,Ô,Û) are used.
4. For the number 29 an additional notation exist: the letter --Ñ. (For the time being, --Ñ and --Î may be used interchangeably while the spec is in draft, until a benefit of one above the other is found. One could use --Ñ to explicitly reference to a leap day, like T2Ñ. To be continued.)
5. [Extension] --Ž refers to "the last day of the month". Depending on the month, --Ž refers to 30 or 31 or in case of the month February to 28 or 29. (This allows the user to refer to the last day of the Month without needing to figure out which number fits which Month nor counting knuckles.)

| Letter | = Day of Month | Letter  | = Day of Month                   |
| ---------: | -------------- | ----------: | -------------------------------- |
| --A       | 1              | --R        | 18                               |
| --B       | 2              | --S        | 19                               |
| --C       | 3              | --T        | 20                               |
| --D       | 4              | --U        | 21                               |
| --E       | 5              | --V        | 22                               |
| --F       | 6              | --W        | 23                               |
| --G       | 7              | --X        | 24                               |
| --H       | 8              | --Y        | 25                               |
| --I       | 9              | --Z        | 26                               |
| --J       | 10             | --Â        | 27                               |
| --K       | 11             | --Ê        | 28                               |
| --L       | 12             | --Î or --Ñ | 29                               |
| --M       | 13             | --Ô        | 30                               |
| --N       | 14             | --Û        | 31                               |
| --O       | 15             | --Ž        | 30,31,28,29<br />(last day of month) |
| --P       | 16             |            |                                  |
| --Q       | 17             |            |                                  |



### Putting all positions together

Examples of dates:

| Datum YYYY-MM-DD | Datum shorthand | Commenting on example                                        |
| ---------------- | --------------- | ------------------------------------------------------------ |
| 2020-01-01       | T1A             | First day of the year. Year T (20), First Month (1), Day A (1). |
| 2020-02-29       | T2Ñ             | Leap day, using Ñ as alternative to Î.                       |
| 2020-08-23       | T8W             | Example.                                                     |
| 2020-08-27       | T8Â             | Using special char for day 27.                               |
| 2020-09-31       | T9Û             | Using special char for day 31.                               |
| 2020-10-01       | TJA             | Switching over to letter J for October.                      |
| 2020-11-28       | TKÊ             | Letter K for November, Ê for 28.                             |
| 2020-12-31       | TLÛ             | Last day of the year. Year T (20), Month L (12), Day Û (31)  |



### Range of spec

| Datum YYYY-MM-DD | Datum shorthand   | Commenting on example                                        |
| ---------------- | ----------------- | ------------------------------------------------------------ |
| 2000-01-01       | 01A               | Start of spec                                                |
| 2001-01-01       | A1A               | Example                                                      |
| 2031-12-31       | ÛLÛ               | Last day of 3 char notation.                                 |
| 2032-01-01       | 321A or 31AA      | First day of 4 char notation.                                |
| 2032-12-31       | 32LÛ              | Example                                                      |
| 2099-12-31       | 99LÛ              | Last day of 4 char notation.                                 |
| 2100-01-01       | 1001A or 100AA    | First day of 5 char notation. [Extension]                    |
| 2100-12-31       | 100LÛ             | Example                                                      |
| 2999-12-31       | 999LÛ             | Last day of 5 char notation. [Extension] <br />**End of spec.** |
| (3000-01-01)     | (3000AA or Ô00AA) | (First day of 6 char notation [Speculation])                 |





















notes


End of File.



