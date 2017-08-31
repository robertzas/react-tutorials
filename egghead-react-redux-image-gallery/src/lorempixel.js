export const fetchImages = () => {
    let images = []
    for (let i = 0; i < 5; i++) {
        images.push('http://lorempixel.com/640/480/city/' + i)
    }
    return images
}