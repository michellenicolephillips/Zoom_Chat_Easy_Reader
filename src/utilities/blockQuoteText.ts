import React from 'react';

export function blockQuoteText(text: string) {
    if (props.markdownOn) {
        //return text.replaceAll(/\r/gm,"> ");
        return text
            .replaceAll("\n\r", "\n")
            .replaceAll("\r\n", "\n")
            .replaceAll("\r", "\n")
            .replaceAll("\n", "\n> ");
    } else {
        return text;
    }
} 