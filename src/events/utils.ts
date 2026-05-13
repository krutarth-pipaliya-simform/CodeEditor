export function generateId() {
    return crypto.randomUUID();
}

export function getRowColumn(
    text: string,
    index: number
): { row: number; column: number } {
    const lines = text.substring(0, index).split("\n");
    
    return {
        row: lines.length - 1,
        column: (lines[lines.length - 1 ]??"").length,
    };
}

export function positionToIndex(
    text: string,
    row: number,
    column: number
) {
    const lines = text.split("\n");

    let index = 0;

    for (let i = 0; i < row; i++) {
        index += lines[i]!.length + 1  ;
    }

    index += column;

    return index;
}