
import {animation, style, animate, trigger, transition, useAnimation}
    from '@angular/animations';


export const fadeIn = animation([
    style({opacity:0}), // 0 means it's invisible, 1 means it's fully visible on the screen
    animate("{{delay}}",style({opacity:1})) // same as animate("1000ms",style({opacity:1}))
],
    {params: {delay: '1000ms'}});

export const fadeOut = animation(
    animate("{{delay}}", style({opacity:0})),
    {params: {delay: '1000ms'}}
);

export const fadeInOut = trigger('fadeInOut', [ // make pop up panel faded in and out
    transition('void => *', useAnimation(fadeIn, {params: {delay: '500ms'}}) ),
    // {params: {delay: '500ms'}} argument can replace the {params: {delay: '1000ms'}} above in fadeIn
    transition('* => void', useAnimation(fadeOut, {params: {delay: '500ms'}}) )
    // {params: {delay: '500ms'}} argument can replace the {params: {delay: '1000ms'}} above in fadeOut
]);


