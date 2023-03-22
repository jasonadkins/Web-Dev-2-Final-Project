export function getClue(callback) {
    const xhr = new XMLHttpRequest();


xhr.addEventListener('readystatechange', () => {

    if(xhr.readyState !== XMLHttpRequest.DONE) return;

    if(xhr.status !== 200 ) {
    callback(xhr.status);
    } else {
    const data = JSON.parse(xhr.responseText);
    callback(null, data);
    }
});

xhr.open('GET', 'https://jservice.xyz/api/random-clue');
xhr.send();
}
