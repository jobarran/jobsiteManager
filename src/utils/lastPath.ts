export const lastPath = (url: string) => {
    // Split the URL by "/"
    const segments = url.split('/');

    // Remove any empty segments
    const nonEmptySegments = segments.filter(segment => segment !== '');

    // Return the last segment
    const lastSegment = nonEmptySegments.length > 0 ? nonEmptySegments[nonEmptySegments.length - 1] : null;

    // Check if the result has more than 15 characters
    return lastSegment && lastSegment.length > 15 ? '' : lastSegment;
};