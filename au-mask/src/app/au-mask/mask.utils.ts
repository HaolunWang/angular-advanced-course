
import * as findLastIndex from 'lodash.findlastindex';
import * as findIndex from 'lodash.findlastindex';
import * as includes from 'lodash.findlastindex';

export const  TAB = 9,
    LEFT_ARROW =	37,
    RIGHT_ARROW = 39,
    BACKSPACE = 8,
    DELETE = 46;

export const SPECIAL_CHARACTERS = [" ", "/", "(", ")", "+", "\/", "-"];
// "\/" means "\"


export function overWriteCharAtPosition(input:HTMLInputElement,
                                        position:number, key: string) {

    const currentValue = input.value;
    // currentValue and input.value is current HTML view value
    input.value = currentValue.slice(0, position) +
        key + currentValue.slice( position + 1 );
    // For example, if hit 'B' keycode, the input.value is like ' B ' in HTML view, depends on the cursor position selected where hit 'B' keycode.
    // string.slice(0, 3), if 'ABCDE', returns 'ABC', not contained the index position 3; string.slice(3) returns 'DE', string index afrer 3 (contain 3) all returned
    // key is keycode hit, if cursor selected position is 3, total lenth is 5, so input.value is '  B  ', other places are blank

}







