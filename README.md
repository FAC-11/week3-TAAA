# **TEAM TAAA**


### WHY
We wanted to make an app which makes a second API call to generate multiple points of interests from the result of the first API call. Tube stations are a wealth of information for this.

## User Stories
* The user should to begin with a simplistic form allowing them to enter a tube journey. On clicking submit, a new section should appear showing the journey rendered as resources from the internet.
* The app should have minimal load delay. since it it a relatively simple site, we expect the load delay to be due to the speed and order of API calls.
* The results section should make sense and be easy to read as separate elements, whether it consists of few elements or many.
* Entering and submitting the user's data should be as painless as possible, with any potential for error or ambiguity at this stage having been designed out.



## WHAT
The user enters a tube journey via a pair of drop-downs and clicks submit.

The site fetches results and updates the DOM with a new section below. Each section corresponds to each station which the user passes and contains the station name, a youtube thumbnail and video title which both link to a youtube video somehow related to that part of London.

[check out how it functions here](https://fac-11.github.io/week3-TAAA/)


## HOW - the journey
We first tried to connect to spotify to get links to music for each station. Spotify has an interface to simulate API queries which provides album covers and preview clips of songs. But spotify are all, like, we want your soul if you use our API. So it's youtube for teh win!

The TFL API is badly documented and has an annoying feature that reroutes queries to 'disambiguation' when the query is 'ambiguous' like 'Bank station to Westminster station'. The JSON reponses are also daunting-looking at first.

Some research confirmed that an alternative is available for sanitised input, using TFL's own ICS station numbers, which we then had to look up and reformat. When the query input is sanitised, the reponses are reasonably predictable for automatic parsing. Youtube's results are far more tolerant and we assume that some content will be found for any tube station name we pass it.


From the beginning, we prioritised the whole team's understanding of the whole codebase as we progressed. We did some research without pairing, but pair-programmed the entire project.

We really worried about API mess, but overnight research meant that we preempted problems and could fix them quickly during FAC time.

We tried to preempt problems by creating good structures in the code from the start. In the end, we didn't finish quickly enough to use these for strecth goals, but it feels like the time spent on preempting problems is less than the time we would have spent resolving them.

An example is the parallel function. In the end, it took a pair of us about an hour to write, which is little more than the callback would have taken alone, and considerably less than it would have taken to write an array of working callbacks and then convert them to run in parallel.

One difficulty we found was passing returned values through the program flow rather than storing them globally. This was because the program flow often went through a callback which was not immediately executed and therefore couldn't be simply modified to take extra arguments as a normally defined fucntion would.


## Notes

Talk through the Why, What, How of your project
How did you split up the work?

How did you choose to pair?

Walk us through the UX (user experience) i.e. demo your website

How well does it conform to your brief - the user stories

Walk us through your code. Prioritise the things you learned that were new to you, which the rest of your cohort could benefit from hearing about:

something you're proud of

something that you found really hard / struggled with
