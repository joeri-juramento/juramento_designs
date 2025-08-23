<font size="6">**Short date notation | Shorthand Requirement & Spec**</font>


[TOC]
------
*The following requirements where defined:*

# Problem introduction

Original dates - in various order - take up the following space in file and screen space:

```
2020-08-22 
1234567890 --> 10 characters
```

Most of the information is redundant during the actual use, but needs to defined to be specific after time has passed. So real-time relevant information is the 8-22 which means August the 22nd. 

> I am aware of other countries have different regional formats, but all of them - soon or later - run into the same issue of sorting or not being able to read the end of the file name because of the long date.

The fact that the order is different between region creates an extra chance of interpretation error. Preventing that is not the goal of this spec, making files (and notes) shorter and filenames easier to read on mobile devices, that is the goal while maintaining the ability to keep sorting files chronologically via the alphabet. An example of the original (very long) filenames with date:

```
20200822_File_Verb_description.docx
2020-08-22_File_Verb_description.docx
```

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



# Requirements

<u>Create a date notation that is as short as possible without too much loss of information which remains sortable (chronologically correct) by system and understandable by average humans.</u>



Breaking down the requirement:



## "a date notation that is as short as possible"

We can use the alphabet as numbers to prevent needing to characters above the number 9. Furthermore we can use accents for numbers above the number 26. 

> Though I am writing this in hindsight there were a lot of iterations; one iteration that compresses information of the year and the month onto each other. So 2020-08 would become 28 (20+8). The 12th month in 2020 would simply be written as 32. A day 28.22 which is 22nd of August 2020. The problem with this iteration is that it only makes sense up to 2020-12-31; after that you would need another digit. So the 28.22 above is actually [0]28.22 and after the end of the year, one would write 122.1. The year 2029-12-31 would be 941.31 because 29+12 = 41 (compressed information) and +1 day would require a new digit. Another problem of a notation is that one needs to calculate the year and month. For those curious why subtracting '20' on the 2nd digit: I started in 2020; if you re-align it with 2000 one cannot get further than 912.31. At that moment I realised I was thinking in circles because 912.31 or 028.22 are 6 chars and more complicated to use then 200822 which has a higher range. I needed to put more information per character/digit. So this line of thought was abandoned and I focused on the alphabet; our next-best-counter. 

ABCDEFGHIJKLMNOPQRSTUVWXYZ are 26 letters. A is the 1st letter; Z is the 26th letter. I am aware other languages have different lengths. New English and Dutch have 26 1-digit-char letters.

### Shorting months

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



### Shortening days

For 1-31 days I normally need 2 digits, from the alphabet I have a 1 char sign up to 26. I can extend this with a unique char for 27 up to 31. By going down this path an related requirement was identified. Usable by humans. That refers to being to enter the letter on a keyboard or mobile phone without alt-codes.

| Number | Letter |
| ------ | ------ |
| 1      | A      |
| ...    | ...    |
| 26     | Z      |
| 27     | Â      |
| 28     | Ê      |
| 29     | Î or Ñ |
| 30     | Ô      |
| 31     | Û      |

### Shortening years

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



## "without too much loss of information"

- I need the ability to write dates further then 2029, preferably up to 2099 which is over 79 years from this year (2020).
- I would like the ability to quickly recognize the month.



## "which remains sortable (chronologically correct) by system"

20-08-2020_Filename.ext
25-01-2018_Filename.ext

Dates above will be incorrectly sorted by the system. The correct notation YYYY-MM-DD requires 10 chars.

The shorthand notation only requires 3 and is sortable:

T8T_Filename.ext
R1Y_Filename.ext

If sorted on filename from old to new, the R1Y file would be correctly listed above the T8T file.



## "<u>understandable</u> [and usable] by average humans"

This means the date does not need be calculated due to compressed information like the first iteration. (28.22)

> Yesterday, I did not know what the 20th letter from the alphabet was. The position of a letter in the alphabet is not knowledge ready at hand (for me); but it is deductible for those who have not memorized it and fairly universal, even if your main (Latin-based) language has another alphabet. 

### Understanding vs knowing the alphabet

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



## "[understandable and] <u>usable</u> by average humans"

This also connects to the previous section. Most people will have access to an English alphabet index order and it could be learned.

The following requirements are specifically applicable on the special chars, but they are obviously valid for all letters and numbers in the spec.

- I need to be able to enter the char via a keyboard on PC.
- I need to be able to enter the char via a keyboard on mobile phone.
- I need to be able to write down the char fairly easily.
- I need to be able to differentiate the letters from each other.
- I need to be able to read a shorthand notation and understand it as a date. 

The reason I chose Â - Ô is because one can write them with a keyboard *without special alt-codes* and the requirements above are met. 

> Other accented letters where considered: Ŷ Ě Š Ŝ Č Ŵ Ž Š Č Ê Ň Ŷ ³ þ Ť Ô. But I needed one for which I was able to actually type it and the rabbit hole of extended alt-codes via the windows registry is not one I would recommend to anyone. 

Furthermore I choose the 27-31st letters on the A-Z row below to maintain sortability:



ÂBCDÊFGHÎJKLMÑÔPQRSTÛVWXYZ



> I (originally) skipped the Î in favour of Ñ due to various soft reasons (in retrospect: read weak arguments) , so I am not sure yet what is the best: 
>
> 1. The related number is 29; the nine starts with the letter N.
> 2. The capital 'i' can be confused with letter 'l' (el) depending on fonts, however, there is no letter L with a circumflex ^, so an i with a ^ is unique.
> 3. In numbers there is no (significant) difference in width, so a list of dates is always listed in the same with; I was afraid that the letter Î would break that tradition. A counter-argument would be that the letter I as in 9 is being used for I9I = 2009-09-09 or T9I = 2020-09-09. So the width problem, if any, does not only exists at the 29th number letter.
> 4. Furthermore, I assumed that Ñ would be easier to differentiate that Î, though I have no data to backup that claim.
> 5. An argument for Î would be that one could say that all vowels (A,E,I,O,U + ^) were chosen to participate in filling up the numbers 27 to 31. A simpler rule than introducing Ñ next to 4 vowels.
>
> These side notes are here to show a process of thought and can be continue after additional testing. Read the latest spec to find out the status quo.
>
### Retrospective comments:
>
> Argument 5 seems to be much stronger than anticipated. I experienced it about talking about the spec with others (n=2). "I used the vowels with little roof" [NL: "Klinkers met een dakje"] for the missing numbers (which also maintains sortability), is easier to communicate than "I used the letter N with tilde for 29 and the rest are vowels".  //T8Z



### Leap day

There is one happy coincidental extension point of the spec. If one would want a specific sign for leap day, one could use Ñ or Î depending on which is chosen as the default and which remains.



# Spec v0.9.1 (Partially Superseded)



We define a 3 to 4 character date notation system with an possible extension going to 5 characters: 

1. The system can express dates from 2000-01-01 until 2099-12-31 (and with 5 characters, up to 2999-12-31 [extension]).

2. The (English) alphabet is used to express two digit numbers into a single 'digit' saving horizontal space.

3. Vowels with a circumflex (^) are used to communicate days 27 until 31.

4. Dates remain sortable via the alphabet resulting in a chronologically correct list.

   

## First position representing the year X--

1. For the first 31 years the first position presents that last two digits of a year. The millennium and century are omitted. 
2. After the first 31 years the two first positions are identical to the last two digits of a year unless the spec is updated.

| Letter | = Year | Letter | = Year | Letter | = Year | Letter  | = Year |
| ---------: | ------ | ---------: | ------ | ---------: | ------ | ----------: | ------ |
| 0--       | 2000   | H--       | 2008   | P--       | 2016   | X--        | 2024   |
| A--       | 2001   | I--       | 2009   | Q--       | 2017   | Y--        | 2025   |
| B--       | 2002   | J--       | 2010   | R--       | 2018   | Z--        | 2026   |
| C--       | 2003   | K--       | 2011   | S--       | 2019   | Â--        | 2027   |
| D--       | 2004   | L--       | 2012   | T--       | 2020   | Ê--        | 2028   |
| E--       | 2005   | M--       | 2013   | U--       | 2021   | (*~~Ñ-- or~~) Î-- | 2029   |
| F--       | 2006   | N--       | 2014   | V--       | 2022   | Ô--        | 2030   |
| G--       | 2007   | O--       | 2015   | W--       | 2023   | Û--        | 2031   |

From year 2032 on, the notation switches back to original digits, unless the spec is updated, meaning one writes 32-- after the year Û--.

> (*Ñ if the discussion of 29 progresses towards Ñ as a special notation for leap day the 29th, it makes less sense to also keep using it also as an alternative to 29 in the years.)

## Second position representing the month -X-

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



## Last position representing the day of month --X

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
| --L       | 12             | (--Ñ or) --Î | 29                               |
| --M       | 13             | --Ô        | 30                               |
| --N       | 14             | --Û        | 31                               |
| --O       | 15             | --Ž        | 30,31,28,29<br />(last day of month) |
| --P       | 16             |            |                                  |
| --Q       | 17             |            |                                  |



## Full examples - All positions

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



## Range of spec

| Datum YYYY-MM-DD    | Datum shorthand     | Commenting on example                                        |
| ------------------- | ------------------- | ------------------------------------------------------------ |
| 2000-01-01          | 01A                 | Start of spec                                                |
| 2001-01-01          | A1A                 | Example                                                      |
| 2031-12-31          | ÛLÛ                 | Last day of 3 char notation.                                 |
| 2032-01-01          | 321A or 31AA        | First day of 4 char notation.                                |
| 2032-12-31          | 32LÛ                | Example                                                      |
| 2099-12-31          | 99LÛ                | Last day of 4 char notation.                                 |
| 2100-01-01          | 1001A or 100AA      | First day of 5 char notation. [Extension]                    |
| 2100-12-31          | 100LÛ               | Example                                                      |
| 2999-12-31          | 999LÛ               | Last day of 5 char notation. [Extension] <br />**End of spec.** |
| ------------------- | ------------------- | -------------------                                          |
| (3000-01-01)        | (3000AA or Ô00AA)   | (First day of 6 char notation [Speculation])                 |
| (1999-01-01)        | (1999AA or S99AA)   | (Before 2000, using 6 chars [Speculation])                   |



# Implementation vBeta

> I started using it on my own file system and my paper notes; the damn date field is finally large enough for my handwriting ;).
>
> To be continued. 



## Today Site

At https://go.juramento.nl/today you can find the shorthand date of today. Iframe below:

<iframe height="350" width="100" scrolling='no' frameborder='yes' src="https://juramento.nl/today"></iframe>

It is running a script on a Cloudflare worker. The date is corrected for CEST time (UTC+2), since the script is running at the Cloudflare's side, your browser's local date is not consulted.

> (And if you are on this site, there is even a chance that due to your privacy settings your browser does not represent your actual local time, so actually I do not want to address time zones and it shouldn't be required.)
>
> I was just curious if and how fast I could build it in Javascript in a Cloudflare worker and I did. The fact that Date() is tied to time (in Javascript) was just a necessary evil to overcome.



## Calendar

> After I got the hang of some JavaScript date operations and my conversion, I asked myself: what can I do if I really want to rely on the short date system? I argued that I needed some integration with my current digital system. I tried to use the 'Alternative calendar' feature in Windows and 'Alternative Timezone' but that is not really for a Custom Time Date Notation like the above, so I settled on a integration with my calendar via iCal. I argued that I want to be able to update the events quickly if the spec ever got updated so I didn't want a one-time export which could expire.
>
> So I looked into *.ics file which is a text-based format which a Cloudflare worker could generate and serve.

### Dynamic rolling horizon of events

> I don't need 365 events in my calendar. I just need some visible support when I am learning the AlphabetÐates. Remember it is a shorthand notation form, not an complete replacement of the actual date if that makes any sense at this point.

Based on today's date this dynamic calendar will move forward with the time into the future, adding new events and removing old ones. Every event will have the shorthand date is its subject, for example "T8Z". No reminders are added (but beware of your client) and time is marked as free. The iCal spec was followed. [iCalender.org's validator](https://icalendar.org/validator.html?url=https://blog.juramento.nl/shortdates/AlpabetDates.ics) really helped.


#### iCal desires (v1.2)


1. Starting at 6-to-7 weeks in the past, I want a weekly event on Monday for 4 weeks. (First day of the week in NL.)
2. I want a daily events starting on a Monday two complete weeks before the current week and then for 35 days ending at a Sunday; in other words: 
   *I want five complete weeks of daily events starting on a Monday with today in the middle week.*
3. After the first 2 weeks from today, I want 14 weeks with weekly events on Monday.
4. Based on today, I want a weekly events on the current weekday for 6 weeks. (No doubles.)

#### iCal calendar link

You can subscribe to the iCal calendar with this URL:

https://blog.juramento.nl/shortdates/AlpabetDates.ics 

If you download and save the file, you get an export which will not update itself as far as I know. If you import two offline files, you should not get double events due to an unique UID in every event. If you really want to see, **I strongly recommend subscribing instead of downloading** so the calendar is automatically updated.

#### iCal generator script

At the moment of writing you cannot customize the number of events, unless you run your own script. You can find it in the repository:

https://go.juramento.nl/source-shortdates-ical



# Discussion

## Issue sorting Â-Ô<Z

> Unfortunately the accented letters representing numbers 27 - 31 do not sort as desired. It remains unclear how this got passed the preliminary tests, because it makes sense Â would be sorted after A and not after Z; suspected is that the method of measuring (using terminal X which did sort as desired) was the cause it did go unnoticed at first.
>
> The incorrect sorting was noticed after creating a file with 'T9Â' and it got sorted on top. So this list:
>
> - T9A
> - T9B
> - T9Z
> - T9Â
> - T9Ê
>
> Will sort like:
>
> - T9A
> - T9Â
> - T9B
> - T9Ê
> - T9Z
>
> 

One the requirements is having this sortability in alphabetical order which matches the chronical order of days. After taking another look at sorting the following was observed where found:

1. Windows Explorer sorts Â before Z after A.
2. Mac Finder sorts Â before Z after A.
3. Windows cmd shorts Â before Z after A.
4. Mac zsh/fish sorts Â AFTER Z. 
5. Windows Explorer & Mac Finder sort 'T90' after ' whereas they sort 'TJ0' BEFORE 'TJA'. (it reads the '90', hence,we use T9- and no 0.)
6. Windows cmd & Mac zsh/fish sort ' T90' before 'T9A'  and 'TJ0' also before 'TJA'. (Issue for 2000?)
7. Windows Explorer, cmd and Mac sorts the old 27th English letter '&' before the A and before the '-'
8. Mac Finder sorts '&' before the A but after the '-'
9. iOS sync app sorts Â AFTER Z.
10. iOS native files app sorts Â before Z after A.
11. Sorting in Notepad++ sorts Â AFTER Z.

So sorting is not consistent over all platforms. 

### Searching for solutions

> Now I need to find 5 new symbols/letters representing the numbers 27,28,29,30,31, looking for symbols/letters that sort better than Â-Ô vowels. These are my thoughts:
>
> - Greek Alphabet like used in hurricane naming.
>   - Some Greek capitals have overlap and cannot be reused.
>   - Some Greek letters have lookalikes and should not be reused.
>   - Expected penalty in usability as typing these letters might be harder.
>
> - Shift the number, so shift 7 = &, shift 8 = * etcetera.
>   
>   - On a physical keyboard, the bridge from 27 to '&' might easy, the sorting of the symbols is not structured.
>   
> - Other characters on a keyboard 
>
>   - No internal sorting one can infer. (so far I found)
>
>   ```
>   - + */( ) & ^ % $ # @ ! )
>   ```
>
>   

### The Greek alphabet

| Α    | α    | [alfa](https://nl.wikipedia.org/wiki/Alfa_(letter))   | Ν    | ν    | [nu](https://nl.wikipedia.org/wiki/Nu_(letter))       |
| ---- | ---- | ----------------------------------------------------- | ---- | ---- | ----------------------------------------------------- |
| Β    | β    | [bèta](https://nl.wikipedia.org/wiki/Bèta_(letter))   | Ξ    | ξ    | [xi](https://nl.wikipedia.org/wiki/Xi_(letter))       |
| Γ    | γ    | [gamma](https://nl.wikipedia.org/wiki/Gamma_(letter)) | Ο    | ο    | [omikron](https://nl.wikipedia.org/wiki/Omikron)      |
| Δ    | δ    | [delta](https://nl.wikipedia.org/wiki/Delta_(letter)) | Π    | π    | [pi](https://nl.wikipedia.org/wiki/Pi_(letter))       |
| Ε    | ε    | [epsilon](https://nl.wikipedia.org/wiki/Epsilon)      | Ρ    | ρ    | [rho](https://nl.wikipedia.org/wiki/Rho_(letter))     |
| Ζ    | ζ    | [zèta](https://nl.wikipedia.org/wiki/Zèta)            | Σ    | σς   | [sigma](https://nl.wikipedia.org/wiki/Sigma_(letter)) |
| Η    | η    | [èta](https://nl.wikipedia.org/wiki/Èta)              | Τ    | τ    | [tau](https://nl.wikipedia.org/wiki/Tau_(letter))     |
| Θ    | θ    | [thèta](https://nl.wikipedia.org/wiki/Thèta)          | Υ    | υ    | [ypsilon](https://nl.wikipedia.org/wiki/Ypsilon)      |
| Ι    | ι    | [jota](https://nl.wikipedia.org/wiki/Jota_(letter))   | Φ    | φ    | [phi](https://nl.wikipedia.org/wiki/Phi_(letter))     |
| Κ    | κ    | [kappa](https://nl.wikipedia.org/wiki/Kappa_(letter)) | Χ    | χ    | [chi](https://nl.wikipedia.org/wiki/Chi_(letter))     |
| Λ    | λ    | [lambda](https://nl.wikipedia.org/wiki/Lambda)        | Ψ    | ψ    | [psi](https://nl.wikipedia.org/wiki/Psi_(letter))     |
| Μ    | μ    | [mu](https://nl.wikipedia.org/wiki/Mu_(letter))       | Ω    | ω    | [omega](https://nl.wikipedia.org/wiki/Omega_(letter)) |

> Zooming in on Greek alphabet: (Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω)
>
> - Choosing alpha-epsilon **capital** letters
>   - Pro: simply just the 5 first letters of the alphabet.
>   - Con: 3 of 5 Capitals have overlap and cannot be used.
> - Choosing alpha-epsilon **small** letters
>   - Pro: simply just the 5 first letters of the alphabet.
>   - Con: The small letter alpha is not always that recognisable; font-depended.
>   - Con: The small letter gamma looks a lot like Y (T9γ could be confused with T9Y)
>   - Con: Inconsistent with other dates who use capital letters.
>   - Con: if for some reason a filename is displayed with capitals, the actual date would change its meaning due to overlap. 
> - Choosing omega-ypsilon **capital** letters
>   - Pro: last 5 letters of Greek alphabet (last numbers of Month).
>   - Con: X (chi) is similar to --X thus 24th and cannot be used.
>   - Con: Y (ypsilon) is similar to --Y thus 25th and cannot be used.
> - Choosing the five first **capital** letters that do not overlap. (Γ,Δ,Θ,Λ,Ξ)
>   - Pro: one can look up these letters and order.
>   - Con: there are several 5-Greek-capital-letter-combinations, why this one?
>     - It is the first 5.
>
> From here we explore more advanced (or possible far-fetched combo's):
>
> The Greek alphabet as 10 unique capital letters: (Γ Δ Θ Λ Ξ Π Σ Φ Ψ Ω)
>
> - Choosing five capital letters on a iOS Greek **keyboard** in order of appearance: 
>
>   - ΘΠΣΔΦ (sorted: ΔΘΠΣΦ)
>   - Now start at thèta (Θ) but skip any letter that is sorted before the last:
>   - ΘΠΣΦΨ (sorted the same, obviously)
>
> - Choose 5 capital letters that have any **association** with the numbers 27-31.
>
>   - (FYI: the Greek modern alphabet has 24 letters.)
>
>   - The 7th letter is Èta (H) which conflicts with --H.
>
>   - The 17th letter is Rho (P) which conflicts with --P
>
>   - (FYI: [Greek numerals](https://en.wikipedia.org/wiki/Greek_numerals) have one letter for 1-9 and 10,20,...,100 and they combine for numerals in between.)
>
>   - The Greek numeral of 30 can be written as Λ'  (lambda).
>
>     - Pro: using this letter to represent --Λ the 30th date would work.
>     - Con: This implies that the 27, 28 and 29th representation have to exist before Λ in the alphabet to maintain sortability.
>       - Pro: You cannot do this wrong, because there are only (capital) 3 letters in front of Λ matching the requirements.
>       - Pro: unplanned, it also results in choosing the first available 5.
>     - Con: I don't think it is basic knowledge that Λ' means 30. 
>       - Counter: Vowel --Ô being 30 was also taught and had only the circular reference to a round number.
>     - Con: Lambda and Delta are look-a-like (Δ Λ) which can cause confusion. 
>     - Con: this would make it harder to use omega (Ω) as the last number 31.
>     - Pro: One could use the remaining letters to extend the years of the spec. Ψ-- = 2035.
>     - Con: if for some reason the filename is represented as small letters, the letter gamma might be confused with a small letter y. 
>
>   - The last Greek letter is omega Ω; the association would be last letter is last date.
>
>     - Pro: Easy to recognize, being the last.
>     - Con: 31 is not always the last day of the month since 30, 29 and 28 can sometimes all be the last day of the month.
>       - Alternative: omega could also be used as joker for *last day* like Ž once was and have only a contextual number depending on the month. --Ω = error; Ω = 30th of Sept.
>
>   - Looking at form, the gamma Γ, looks like a mirror 7. (--Γ would be 27.)
>
>     - Proxy-Pro: this is fits the the lambda = 30 path.
>
>     - Pro: form could help remembering it as a mnemonic.
>
>       

#### Looking at Greek

> Typing these Greek characters on iOS is done via the Greek keyboard. Typing Â by holding A and moving towards the letter Â might be experienced as a simpler interaction than switching the keyboard to Greek. On a windows machine it is more complicated.
>
> In ["[understandable and] usable by average humans"](https://blog.juramento.nl/juramento_designs/Project.Date-Shorthand/T8_spec_date-shorthand.html#understandable-and-uusableu-by-average-humans) requirements are defined about being able to use/type them:
>
> > - I need to be able to enter the char via a keyboard on PC.
> > - I need to be able to enter the char via a keyboard on mobile phone.
> > - I need to be able to write down the char fairly easily.
> > - I need to be able to differentiate the letters from each other.
> > - I need to be able to read a shorthand notation and understand it as a date. 
>
> Though I would like to define: "no alt codes", I did not and explicitly stated what the minimum requirements are. That Â is 'typable' without alt-codes is great, but if it sorts incorrect, that is not ideal.
>
> What is more important? Sorting or ease of typing? 
>

#### Implications of using Greek

Let's have a look at what you have to do to type these characters.

On Windows you have combo-keys, you have simple alt-codes (alt+nnn) lower then 256, you have alt-codes higher than 256 and you have more sophisticated alt-codes a.k.a. uni-codes like alt U+0939 and you have the Greek keyboard.

> Experiencing these alt-codes, sometimes you even have to update your regional settings or a registry key to get some of these combinations working. This is unacceptable! It should not be this complicated! Having to resort to the Greek alphabet all together is already a drag and potentially a breaking aspect of the use of shortdates all together, so adding another hoop to jump through will not help.

| Letter | Windows                                                      | Mac                                                          | iOS                            |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| Â      | ^ + A = [shift 6]+[shift a]                                  | ^ + A [option + 6] +[shift a]                                | Hold letter A, select Â        |
| Γ      | Switch to Greek, shift g<br />**[Alt] + [226]**<br />[Alt] + [915]<br />[Alt] + [U+0393] | Switch to Greek, shift g<br />Switch to hex, [Opt]+[0393]    | Switch to Greek, choose letter |
| Δ      | Switch to Greek, shift d<br />[Alt] +  [{n/a}]<br />[Alt] + [923]<br />[Alt] + [U+0394] | Switch to Greek, shift d<br />**[Option] + [j]**<br />Switch to hex, [Opt]+[0394] | dito (= ")                     |
| Θ      | Switch to Greek, shift u<br />**[Alt] + [233]**<br />[Alt] + [952]<br />[Alt] [u] [+] [0398] | Switch to Greek, shift u<br />Switch to hex, [Opt]+[0398]    | "                              |
| Λ      | Switch to Greek, shift l (L)<br />[Alt] + [923]              | Switch to Greek, shift l                                     | "                              |
| Ξ      | Switch to Greek, shift j<br />[Alt] + [926]                  | Switch to Greek, shift j                                     | "                              |
| Π      | Switch to Greek, shift p<br />[Alt] + [928]                  | Switch to Greek, shift p<br />**[Option] + [shift] + [p]**   | "                              |
| Σ      | Switch to Greek, shift l**<br />[Alt] + [228]**<br />[Alt] + [931] | Switch to Greek, shift s<br />**[Option] + [w]**             | "                              |
| Φ      | Switch to Greek, shift f**<br />[Alt] + [232]**<br />[Alt] + [934] | Switch to Greek, shift f                                     | "                              |
| Ψ      | Switch to Greek, shift y<br />[Alt] + [936]                  | Switch to Greek, **shift c**                                 | "                              |
| Ω      | Switch to Greek, shift w<br />**[Alt] + [234]**<br />[Alt] + [937] | Switch to Greek, **shift v**<br />**[Option] + [z]**         | "                              |

> **Windows**
> I am very upset that the alt codes are so complicated. I had to change my region (setting for non-unicode apps only) to get the 3 digit codes to work on my Windows machine. 
>
> I got the [Alt] [u] [+] [0398] working via a setting in my registry but NO I do not want to do this. I do not want to remember this awkward and painful combination. The benefits should outweigh any downside.
>
> **Mac**
> On the mac, you can apparently also use the unicode input, you need to add an extra hex-input keyboard though. In the table you can find 3 examples, symmetric to Windows; then I stopped, out of protest.
>
> On the mac, not all the letters are on the same position, because that would be to easy :/ - the letters Ψ and Ω are not on the keys y and w like on windows, but on the keys c and v. 
>
> On the mac you can also type certain Greek letters with the option key. I used Keyboard viewer where to find them and switched between several keyboards lay-out. With the lay-out US International or ABC (normal) and with option key + optional shift I could type:
>
> Σ Π Δ Ω and small Greek letter: μ 
> (And I almost mistook a German ß [Eszett] for β [beta]. Fun fact: the the alt-code 225 which results in the German one is circulating the internet as being beta, which I can understand as alt+224 result in alpha and alt+226 results in gamma. However, as you can see, they are not the same.)
>


So in conclusion, Windows seems to have 5 short alt-codes below 255 and Mac has 4 option combo's; both platforms have the ability to add an external keyboard providing access to all letters, but the letters on physical keyboards do not change, meaning a onscreen keyboard or user-memory needs to be used to find the appropriate letters. We can use this new information to create another priority of selecting the 5 chars.

For the overview, the small letters:

| Letter | Comment                                                      | Peek |
| ------ | ------------------------------------------------------------ | ---- |
| α      | Collision/Overlap via capital A.                                       | A    |
| β      | Collision via capital B. Possible confusion with ß             | B    |
| γ      | Similarity, visually with y / Y.                             | Γ    |
| δ      |                                                              | Δ    |
| ε      | Collision via capital E.                                       | E    |
| ζ      | Collision via capital Z.                                       | Z    |
| η      | Collision via capital H.                                       | H    |
| θ      | Similarity in description-by-human with Φ. ("Circle/Zero/O with line through it".) ** | Θ    |
| ι      | Collision via capital I. **                                    | I    |
| κ      | Collision via capital K. **                                    | K    |
| λ      |                                                              | Λ    |
| μ      | Collision via capital M. [Mu]                                  | M    |
| ν      | Collision via capital N. [Nu]                                  | N    |
| ξ      |                                                              | Ξ    |
| ο      | Collision via capital O. **                                    | O    |
| π      | **                                                           | Π    |
| ρ      | Collision via capital P. **                                    | P    |
| σ,ς *  |                                                              | Σ    |
| τ      | Collision via capital T. **                                    | T    |
| υ      | Collision via capital Y. [Uspilon]                             | Y    |
| φ      | Similarity in description-by-human with θ/Θ. ("Circle/Zero/O with line through it".) | Φ    |
| χ      | Collision via capital X.                                       | X    |
| ψ      | **                                                           | Ψ    |
| ω      |                                                              | Ω    |

Take note that:

- There are no 5 smaller letters next to each other that do not have an overlap of their capital equivalent. 
- ** Letters whose lower-case version looks similar like their uppercase version 
  - The only letters like this that also do not have overlap are Pi and Psi.
- 8 Lower case Greek letters remain of you skip all overlapping letters and choose theta or phi.

> Sometimes certain systems do now allow to spell project files, channels, team-names or whatever with capital letters. If we would allow lower case Greek letters into the spec whose upper case letters have a different meaning, that could result in a conflict of meaning, or in other words *ambiguity,* in contexts in which we have no control over letter capitalisation. 

#### Scoring remaining letters

Now we have gathered more information we can create a kind of rating per letter:

| Letter | Name | Association ** | Usability:<br />Typeability | Visually distinct novice | Case Similarity | Novice human description | Σ |
| ----------------- | ----------- | ----------- | ---- | ----------------- | ----------------- | ----------------- | ----------------- |
|  |  | +1 for usable to potential meaning 27-31 | +1 for extra fast type method<br />0 for default method |  | 0 for default <br />+1 is yes | simple & universal +2<br />edge +1 |  |
| Γ | Gamma upper | 🟩 Mirrored 7   | 🟩 +1@windows | 🟩yes | no | 🔴"half rectangle" | +3 |
| Δ | Delta upper | 4                      | 🟩 +1@mac | 🟩yes, if no Λ<br />🔶ish(Λ) | no | 🟩"triangle" | +3 |
| Θ * | Theta upper | friend from Independence Day II | 🟩 +1@windows | 🟩yes | 🔶ish | 🟩"circle with line" + if no Φ<br />🔶"circle with line" | +3,5<br />+2,75! |
| Λ | Lambda upper | 🟩30                   | - | 🔶ish(Δ) | ish- | 🟩"V upside-down" | +2,5! |
| Ξ | Xi upper | -                     | - | no (E \*3) | no | 🟩"Three lines"<br />"Hambuger" (font dependent!) | +1 |
| Π | Pi upper | goal | 🟩 +1@mac | 🟩yes- | ish/yes 🔶 | 🔶"Handwriting letter of N" | +2,75! |
| Σ | Sigma upper | sum                | 🟩 +1@windows<br />🟩 +1@mac | 🟩yes | no | 🟩"mirrored 3"<br />🧪"sumtotal" | +4 |
| Φ * | Phi upper | - | 🟩 +1@windows | 🟩yes | 🔶ish | 🟩"circle with vertical line" + if no Θ<br />🔶"circle with vertical line" | +3,5<br />+2,75! |
| Ψ | Psi upper | aquaman<br />trident   | - | 🟩yes | 🟩yes | 🟩"trident" | +3 |
| Ω | Omega upper | superman<br />the last | 🟩 +1@windows<br />🟩 +1@mac | 🟩yes | no | 🧪"Ohm"<br />🔴"headset" | +3 |
| δ | Delta lower | - | - | 🟩yes | no | 🔶"frog fish" | +1,5 |
| θ * | Theta | - | - | 🟩yes | 🔶ish | 🔶"oval with line"<br />🔶"pill" | +1,75 |
| λ | Lambda lower | - | - | 🟩yes | ish- | 🟩"y upside-down" | +1 |
| ξ | Xi lower | - | - | no (ε) | no | 🔴 |  |
| π | Pi lower | gate<br />3,141592 | 🟩 +1@mac | 🟩yes | 🔶ish | 🧪"pi"<br />🟩"two T's" | +3,5 |
| σ,ς | Sigma lower | whistle, - | - | no (tiny) | no | 🔶"handwriting o" , 🧪"failed c" | +0,5 |
| φ * | Phi lower | tree (font dependent!) | - | no (ψ) | 🔶ish | 🔶"circle with vertical line" | +0,75 |
| ψ | Psi lower | trident, pitchfork | - | 🟩yes, but no(φ) | 🟩yes | 🟩"trident"<br />🧪"pitchfork" | +3 |
| ω | Omega lower | - | - | no | no  | 🧪"a round drawn w"<br />🧪"{nsfw}"<br />🟩"handwriting w" | +1 |

\* because of similarity in how people could describe these letters, we want to prevent collisions and *"/Tee Naine Oow with line/"* needs to be enough to communicate the date. Not everybody might know the formal name of letters. 

\** association is primarily focused on numerical associations, but others are welcome to get an idea.

\*3 - Tested in Windows Explorer; you brain auto completes T9Ξ to T9E and on top of that, they do look similar.

🧪 requires verification if this would ever be used by anyone this way. Other items in this column heave been verified by third party, but just n=1; to get an idea.

🟩 green square: +1

🔶 orange diamond: 0,5 ; 2x = 0,75

🔴 red circle ; nope / not good enough

> Why not one form? So people who are colour blind can see the difference. - That I don't expect visitors does not matter. #Design-brain-training.

Best scoring letters in order based on current information (v1):

Γ Δ Θ* Ππ Σ Φ* Ψψ Ω of which I should choose only one of *; which both scored the lowest.

| Number                                                       | List 1 | List 2 | List 3 | List 4 | List 5 | List 6 | List inv. | List win. | List mac |
| ------------------------------------------------------------ | ------ | ------ | ------ | ------ | ------ | ------ | --------- | --------- | -------- |
| 27                                                           | Γ      | Γ      | Γ      | Γ      | Γ      | Γ      | Π         | Γ         | Δ        |
| 28                                                           | Δ      | Δ      | Δ      | Δ      | Δ      | Θ      | Σ         | Θ         | Π (!)    |
| 29                                                           | Θ      | Θ      | Π      | Σ      | Σ      | Σ      | Φ         | Σ         | π (!)    |
| 30                                                           | Π      | Σ      | Σ      | Φ      | Φ      | Φ      | Ψ         | Φ         | Σ        |
| 31                                                           | Σ      | Ψ      | Φ      | Ψ      | Ω      | Ψ      | Ω         | Ω         | Ω        |
| last day                                                     | Ω      | Ω      | Ω      | Ω      | -      | Ω      | -         | -         | -        |
|                                                              |        |        |        |        |        |        |           |           |          |
| not used                                                     | Ψ      | Π      | Ψ      | Π      | Θ Π Ψ  | Π      | Γ Δ       | Δ Π Ψ     | Γ Ψ      |
| mandatory excluded                                           | Φ      | Φ      | Θ      | Θ      | -      | ign.   | Θ         | ign.      | ΘΦ       |
| Status                                                       |        |        |        |        |        |        |           |           | 🔴        |
| Ψ vs Π: typeability mac superseded!                          | (1)    |        | (1)    |        | (0.5)  | (0)    | (1)       | (0.5)     | -        |
| Ψ vs Π: Ψ wins due to easy description.                      |        | +1     |        | +1     | +0.5   | +1     | +1        | +0.5      | -        |
| Ψ vs Π: Ψ wins on case similarity.                           |        | +1     |        | +1     | +0.5   | +1     | +1        | +0.5      | -        |
| Φ vs Θ: equal in every area.<br />fyi: some font-dependencies. | -      | -      | -      | -      | -      |        | -         | -         | -        |
| typeability quick on windows                                 | +4     | +4     | +4     | +4     | +4     | +5     | +3        | +5        | -        |
| typeability quick on mac                                     | +3     | +2     | +2     | +2     | +3     | +2     | +2        | +2        | -        |
| typeability on Greek keyb. mac&win Left Hand                 | +3/5   | +4/5   | +4/5   | +5/5   | +5/5   | +4/5   | +4/5      | +4/5      | -        |
| Subtotal A                                                   | 10     | 12     | 10     | 13     | 12     | 13     | 11        | 12        | -        |
| Ω vs Ψ: equal on most but Ψ has easier novice-description    | 0      | +1     | 0      | +1     | 0      | +1     | +1 n/a    | 0         | -        |
| Ω vs Ψ: Ω has better keyb. support on mac&win                | 0      | 0      | 0      | 0      | +2     | 0      | +1 n/a    | +2        | -        |
| Subtotal B                                                   | 10     | 13     | 10     | 14     | 14     | 14     | 13        | 14        | -        |
| Δ vs Θ: Θ wins-ish on case similarity Δδ Θθ [max 0.5]        | +0,5   | +0.5   | 0      | 0      | 0      | +0.5   | 0         | +0.5      | -        |
| Count case similar letters:                                  | 1x     | 2x     | 2x     | 2x     | 1x     | 3x     | 4x        | 3x        | -        |
| Subtotal C                                                   |        |        |        |        |        | 14.5   |           | 14.5      |          |

#### Intermediate conclusion

 List 6 and List Windows have the most points, the difference is 31 = --Ω or --Ψ. 

> Which combination is best?  Besides personal preference, I have no other means of measure to pre-determine which letter would be best at the moment. Let's give it a go in the iCal and let's see if there are any unforeseen surprises. Perhaps using the letters like Â-Ô will provide new insights. Also the current selection ignores the expected confusion between Θ and Φ, so there is more to experience.

| Letter         | Date       |
| -------------- | ---------- |
| T9Γ            | 2020-09-27 |
| T9Θ            | 2020-09-28 |
| Τ9Σ            | 2020-09-29 |
| Τ9Φ            | 2020-09-30 |
| ~~Τ9Ω~~ \| T9Ψ | 2020-09-31 |

So the testing will try to answer several questions:

 1. Is working with Greek letters in itself acceptable?
 2. Which letter is better to work with, Omega (Ω) or Psi (Ψ)?
 3. Are Thèta (Θ) and Phi (Φ) causing any confusion is distinguishing dates?

Answers below.

# Spec 1.0.1

Shorthand date notation contains 3 characters. First character represents the year. Second the month. Third the day-date-number.

1. The range of years is 2001 (letter A) up to 2031 (letter psi Ψ).

2. The range of months is January (1) up to September (9) up to October, November and December as J,K,L respectively. 

3. The range of days is 0 (char -) up to 31 (letter psi Ψ).
4. For numbers 28 tot 31, five letters from the Greek alphabet are used. (See above.)
5. It must be a lexicographically sortable date that preserves chronological order and sorts identically across Windows, MacOs, iOS in Explorer, Command-Prompt, PowerShell, Finder, Files-app and Terminal-zsh.

- In special circumstances, if a Greek letter is not allowed, complete the format with a dash and concatenates the number like  `Y7-29_` for`Y7Ψ_`. 
- An underscore (or space) must follow the date to keep the shortdate a separate prefix. 
- If used as suffix, `~_vY7A`  could be a possible notation.
- A shortdate must be in capitals unless technology does not allow it.

### Examples

| Shortdate | ISO Date   |
| :-------- | ---------- |
| A1A       | 2001-01-01 |
| ALΨ       | 2001-12-31 |
| Y8-       | 2025-08    |
| Y9A       | 2025-09-01 |
| Y9Φ       | 2031-09-30 |
| ΨLΨ       | 2031-12-31 |



# Experiences & Reflection

After using shorthand date for about 5 years, we reflect in 2025:

## Answers

1. *Is working with Greek letters in itself acceptable?* 

   Yes, on MacOs a Shortcut is always nearby to past ShortDate onto the clipboard or a widget or calendar that shows the ShortDates of yesterday, today and so on. Occasionally you run into an issue where Greek letters are not allowed, this usually results in using 'X8-27' instead of the ShortDate X8Γ; still shorter. Typing the Greek letters on iOS is easy, on MacOS or Windows you find yourself trying a few buttons occasionally. 

2. *Which letter is better to work with, Omega (Ω) or Psi (Ψ)?*

   Psi (Ψ). It has a lookalike '3' in it on its side and a stick left over for the 1 for 31. So its easier to remember. Secondly, writing an omega with a pen turned out to be too hard and in my handwriting was aesthetic very displeasing. All the other letters could be drawn with conviction, but the omega was hard to remember or use and therefore no longer used.

3. *Are Thèta (Θ) and Phi (Φ) causing any confusion is distinguishing dates?*

   No, Theta can be made an 8 shape-wise and is therefore a reminder of 28. Phi was harder to remember, but never confused with 28.

## Experiences

   The benefits of Shorthand Dates:

- On mobile or tablets in file lists context, one can actually keep the files apart. Limited horizontal width is less of an issue.
- On desktop important information being 'ellipsed' (dotted ...) because of long file/project names no longer an issue.
- On desktop in finder/explorer context you can quickly identify years or months without losing glancing access to other information in the name.
- Regular search on first chars like 'X8-' was very quick and effective.
- The shorthand date actually fits in the dedicated date-field on paper.
- Most dates are very fast to use, write or type. 
  - During the "Greek days", in the digital world I prefer calendar-widget-peeking or quick Shortcut that copies date to clipboard. 
- In autocomplete situations, you finish quicker because the delta is in one character.
- When working with paths, filenames are shorter, making the full command easier to read.
- Typing numerical dates usually take longer and seemed more prone to typos. 
  - Maybe because shortdates are copied more often than typed.
  - Shortdates are shorter, so less mistakes possible.


## Reflection

- Shorthand dates are for personal use, I have not had the need to share these dates with others. For documents that were deliverables for others, I have altered it to a normal YYYY-MM(-DD) when needed. 
  - Since intermediate files and end-deliverables usually have to be stored in different location, it is not an issue.
  - Shortdates solve a problem for me, it is totally acceptable and doable to convert it for others.
  - Incidentally, perhaps, another user has seen a name with a shortdate, but they might read it as an abbreviation of something so it remains harmless. 
- Using the dash to refer to the whole month like 'Y8-' worked fine. `X8-_FileExample.txt` The dash with underscore looks a little weird perhaps, but the benefits in sorting and searching outweighed that.
- Sometimes, the width of different shortdates is slightly different if the font letter width differs. 
- The Shortdate iCal system has a moving date horizon and an active "day of the week" that goes further than the normal horizon. A side effect in some online calendar systems is finding many Shortdate events in the trash as the horizon moves, days are deleted & added from the calendar. A less complex iCal horizon can solve this. 
- Converting dates in my head goes pretty quickly, but a digital device with calendar is usually nearby when this is relevant.
- I do wish we had universal one-char numbers up to at least 31.
- I wish we had an [3-]unicode/emoji char[s] for dates that render universally.
  - Perhaps with regional date rendered representations (like different operating systems implement emoji.)
    - And if they have different regional date representations, one must not be able to confuse dates due to some visible delta.
  - They would fall back on year-month-date if not rendered. 
  - They would date sort properly.
  - They take up less horizontal space than the full date.
- Since it is working for me, I find it suboptimal that beyond 2031, no 3-character solution exists yet. 

### Differences around the world

The following table ([Source](https://en.wikipedia.org/wiki/Date_format_by_country)) is added to showcase (an outtake) of the differences that exists in how people type and write dates.

| Country        | Continent     | Gov./Official Format | Common/Everyday Format | / - . ? |
|----------------|---------------|----------------------------|------------------------|----------------|
| Netherlands    | Europe        | YYYY-MM-DD            | DD-MM-YYYY             | - |
| France         | Europe        | DD/MM/YYYY            | <- ditto | / |
| United Kingdom | Europe        | DD/MM/YYYY            | <- ditto | / |
| Germany        | Europe        | YYYY-MM-DD           | DD.MM.YYYY             | - . |
| Kenya          | Africa        | YY/MM/DD             | DD/MM/YYYY (Eng), M/D/YYYY (Sw) | / |
| South Africa   | Africa        | YYYY-MM-DD           | DD/MM/YYYY             | - / |
| China          | Asia          | YYYY/M/D              | YYYY/M/D               | / |
| Japan          | Asia          | YYYY/MM/DD          | <- ditto     | / |
| India          | Asia          | YYYY-MM-DD            | DD-MM-YYYY             | - |
| United States  | North America | YYYY-MM-DD            | MM/DD/YYYY             | - / |
| Canada         | North America | YYYY-MM-DD           | DD/MM/YYYY (EN), YYYY-MM-DD (FR) | - / |
| Mexico         | North America | DD/MM/YYYY           | DD/MM/YYYY             | / |
| Brazil         | South America | DD/MM/YYYY            | <- ditto | / |
| Argentina      | South America | YYYYMMDD              | DD/MM/YYYY             | [] / |
| Australia      | Oceania       | YYYY-MM-DD            | DD/MM/YYYY             | - / |
| New Zealand    | Oceania       | YYYY-MM-DD            | DD/MM/YYYY             | - / |
| (ShortDate) | - | YMD | YMD | [] |



# Meta

| Attribute                    | Value                                     |
| ---------------------------- | ----------------------------------------- |
| Starting date                | T8- \| 2020-08                            |
| Last update                  | Y8- \| 2025-08 \| Check git commits:      |
| Source location of this page | https://go.juramento.nl/source-shortdates |
| Permalink to published page  | https://go.juramento.nl/shortdates        |





<!--End of File marker; for Git.-->

