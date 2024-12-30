export const capitalizeWords = (string) => {
    if(!string || typeof string !== 'string') return 'string is required';
    return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}