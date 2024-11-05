function loadImageAsync(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = url;
        return img;
    });
}

export async function LoadImagesAsync(arr) {
    const promises = [];
    for (const url of arr) {
        promises.push(loadImageAsync(url));
    }
    const ret = await Promise.all(promises);
    return ret;
}