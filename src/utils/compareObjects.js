export const compareObjects = ({ object1, object2 }) => {

    // Compare Objects -----------------------------------
    // from:
    // https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
    // https://github.com/panzerdp/dmitripavlutin.com/blob/master/content/posts/083-compare-objects/index.md
    //
    function deepEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            const areObjects = isObject(val1) && isObject(val2);
            if (
                areObjects && !deepEqual(val1, val2) ||
                !areObjects && val1 !== val2
            ) {
                return false;
            }
        }
        return true;
    }
    function isObject(object) {
        return object != null && typeof object === 'object';
    }

    return deepEqual(object1, object2);
}

// export default CompareObjects;