export const insertBetweenElements  = (
    sourceArray: JSX.Element[], 
    insertedElement: JSX.Element
    ) => {
    for (let i = 1; i < sourceArray.length; i = i + 2) {
        sourceArray.splice(i, 0, insertedElement);
    }
}