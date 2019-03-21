const defaultCategories = {
    'less' : 'Less',
    'very': 'Very',
    'extrem': 'Extremely likely'
}
export function getCategory(key){
    return defaultCategories[key];
}