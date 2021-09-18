export function blockQuoteText(text: string) {
    return text
        .replaceAll("\n\r", "\n")
        .replaceAll("\r\n", "\n")
        .replaceAll("\r", "\n")
        .replaceAll("\n", "\n> ");
} 