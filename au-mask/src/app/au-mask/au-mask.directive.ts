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
    mask = '';

    input: HTMLInputElement;

    fullFieldSelected = false;

    charstest = []; // for test

    constructor(el: ElementRef) {

        this.input = el.nativeElement;

    }

    ngOnInit() {

        this.input.value = this.buildPlaceHolder();

    }

    @HostListener('select', ['$event'])
    onSelect($event:UIEvent) {

        this.fullFieldSelected = this.input.selectionStart == 0 &&
                    this.input.selectionEnd === this.input.value.length;

    }

    @HostListener("keydown", ['$event', '$event.keyCode'])
    onKeyDown($event: KeyboardEvent, keyCode) {

        if ($event.metaKey || $event.ctrlKey) {
            return;
        }

        if (keyCode !== TAB) {
            $event.preventDefault();
        }

        const key = String.fromCharCode(keyCode),
            cursorPos = this.input.selectionStart;


        if (this.fullFieldSelected) {

            this.input.value = this.buildPlaceHolder();

            const firstPlaceholderPos = findIndex(this.input.value,
                char => char === '_');

            this.input.setSelectionRange(firstPlaceholderPos, firstPlaceholderPos);

        }

        switch (keyCode) {

            case LEFT_ARROW:
                this.handleLeftArrow(cursorPos);

                return;

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
            digitValidator = maskDigitValidators[maskDigit] || neverValidator;

        if (digitValidator(key)) {

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
        }
    }

    calculatePreviousCursorPos(cursorPos) {
        const valueBeforeCursor = this.input.value.slice(0, cursorPos);

        return  findLastIndex(valueBeforeCursor,
            char => ! includes(SPECIAL_CHARACTERS, char) );

    }

    handleRightArrow(cursorPos) {
        const valueAfterCursor = this.input.value.slice(cursorPos + 1);

        const nextPos =
            findIndex(valueAfterCursor, char => !includes(SPECIAL_CHARACTERS, char) );

        if (nextPos >= 0) {

            const newCursorPos = cursorPos + nextPos + 1;

            this.input.setSelectionRange(newCursorPos, newCursorPos);
        }
    }


    buildPlaceHolder(): string { // : string means this method should return a string

        this.charstest = this.mask.split(''); 
        // if charstest is number, there is an error: Type 'string[]' is not assignable to type 'number'.
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













