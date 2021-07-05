# DnD-Hit-count
Webpage that solves this reddit post:  
https://www.reddit.com/r/3Blue1Brown/comments/o4o6zx/probability_distributions_for_dice/

Link: https://inspirateur.github.io/DnD-Hit-count/

## How it works

Basically the insight is:  
The distribution of the sum of n independant variables of law P is the convolution of P times itself n times  
https://en.wikipedia.org/wiki/Convolution_of_probability_distributions

Using this we can solve the problem following these steps:
- compute the probability distribution of damages inflicted in a single turn
- for each turn t:
  - convolve the damage distribution t times to get the distribution of inflicted damages at turn t
  - compute the probability of the mob being dead by simply summing the distribution from dammages >= HP

this gives you a cumulative distribution, representing the probability of the mob being dead at each turn.
It can then easily be converted to a discrete distribution for plotting.
