import { staticServerBaseUrl } from "./variables"

export function getRandomString() {
    return Math.random().toString().slice(2)
}

export async function fileToBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result!);
        reader.onerror = error => reject(error);
    });
}

export function getFileExtension(fileName: string) {
    return fileName.substring(fileName.lastIndexOf("."))
}

export function createStaticServerLink(path: string) {
    return staticServerBaseUrl + path
}

export function getFullFormattedDate(dateString: string) {
    return new Date(dateString).toLocaleString([], {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })
}