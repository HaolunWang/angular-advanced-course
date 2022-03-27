import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

import * as includes from 'lodash.includes';
import {
    BACKSPACE,
    DELETE,
    LEFT_ARROW, overWriteCharAtPosition, RIGHT_ARROW, SPECIAL_CHARACTERS,
    TAB
} from "./mask.utils";

import * as findLastIndex from 'lodash.findlastindex';
import * as findIndex from 'lodash.findindex';
import {maskDigitValidators, neverValidator} from "./digit_validators";



@Directive({
    selector: '[au-mask]'
})
export class AuMaskDirective implements OnInit {

    @Input('au-mask')
    mask = ''; // mask is from value of au-mask for example <input au-mask="(999) 999-9999"> in app.component.html

    input: HTMLInputElement;

    fullFieldSelected = false;

    charstest = []; // for test

    constructor(el: ElementRef) {

        this.input = el.nativeElement;

    }

    ngOnInit() {

        this.input.value = this.buildPlaceHolder();

    }

    @HostListener('select', ['$event']) // detect if select event is fired
    onSelect($event:UIEvent) {

        this.fullFieldSelected = this.input.selectionStart == 0 &&
                    this.input.selectionEnd === this.input.value.length;

    }

    @HostListener("keydown", ['$event', '$event.keyCode']) // automatically detect keydown event
    onKeyDown($event: KeyboardEvent, keyCode) { // prevent the keyboard hitting override the default underscore

        if ($event.metaKey || $event.ctrlKey) {
            return;
        }

        if (keyCode !== TAB) {
            $event.preventDefault(); // take over all the behaviour of input box
        }

        const key = String.fromCharCode(keyCode),
            cursorPos = this.input.selectionStart;


        if (this.fullFieldSelected) {
            // if fullFieldSelected is true
            this.input.value = this.buildPlaceHolder(); // resetting the field, initialization as ngOnInit()

            const firstPlaceholderPos = findIndex(this.input.value,
                char => char === '_');

            this.input.setSelectionRange(firstPlaceholderPos, firstPlaceholderPos);

        }

        switch (keyCode) {

            case LEFT_ARROW:
                this.handleLeftArrow(cursorPos);

                return; // return here from the onKeyDown method

            case RIGHT_ARROW:

                this.handleRightArrow(cursorPos);

                return;


            case BACKSPACE:

                    this.handleBackspace(cursorPos);

                    return;

            case DELETE:

                this.handleDelete(cursorPos);

                return;
        }

        const maskDigit = this.mask.charAt(cursorPos),
            digitValidator = maskDigitValidators[maskDigit] || neverValidator; // neverValidator is any special character input and not included in au-mask
            // maskDigit is from au-mask at cursor position
            // digitValidator is to select a validating method based on the value of cursor position from the au-mask

        if (digitValidator(key)) {
            // digitValidator(key) is to pass the keycode to the validating method and see if matched with the value in validating method

            overWriteCharAtPosition(this.input, cursorPos, key);

            this.handleRightArrow(cursorPos);

        }
    }

    handleBackspace(cursorPos) {

        const previousPos = this.calculatePreviousCursorPos(cursorPos);

        if (previousPos >= 0) {
            overWriteCharAtPosition(this.input, previousPos, '_');
            this.input.setSelectionRange(previousPos, previousPos);
        }
    }

    handleDelete(cursorPos) {
        overWriteCharAtPosition(this.input, cursorPos, '_');
        this.input.setSelectionRange(cursorPos, cursorPos);
    }


    handleLeftArrow(cursorPos) {

        const previousPos = this.calculatePreviousCursorPos(cursorPos);

        if (previousPos >= 0) {
            this.input.setSelectionRange(previousPos, previousPos);
            // set the previous position before the cursor position if hit left arrow keycode
        }
    }

    calculatePreviousCursorPos(cursorPos) {
        const valueBeforeCursor = this.input.value.slice(0, cursorPos);

        return  findLastIndex(valueBeforeCursor,
            char => ! includes(SPECIAL_CHARACTERS, char) );

    }

    handleRightArrow(cursorPos) {
        const valueAfterCursor = this.input.value.slice(cursorPos + 1);

        console.log("valueAfterCursor: " + valueAfterCursor);
        const nextPos =
            findIndex(valueAfterCursor, char => !includes(SPECIAL_CHARACTERS, char) );
            // find the first position where not contains SPECIAL_CHARACTERS
            // if met dash '-', valueAfterCursor is like '-____ ____ ____ ____', nextPos is 1
            // if just met underscore '_', valueAfterCursor is like '_-____ ____ ____ ____', nextPos is 0
        console.log("nextPos: " + nextPos);

        if (nextPos >= 0) {

            const newCursorPos = cursorPos + nextPos + 1;

            this.input.setSelectionRange(newCursorPos, newCursorPos);
        }
    }


    buildPlaceHolder(): string { // : string means this method should return a string

        this.charstest = this.mask.split(''); 
        // if charstest is number[], there is an error: Type 'string[]' is not assignable to type 'number[]'.
        console.log("typeof charstest: " + typeof this.charstest + "\ncharstest: " + this.charstest);
        this.charstest.forEach(function(value) {
            console.log("each value in charstest: " + value);
        });
        
        const chars = this.mask.split('');
        // so chars is an array

        return chars.reduce((result, char) => {

            return result +=
                includes(SPECIAL_CHARACTERS, char) ? char : '_'
                // means if current char is included in the SPECIAL_CHARACTERS array, 
                // if current char is one in SPECIAL_CHARACTERS, use special characters
                // if not, then use underscore character

        }, '');


    }

}













