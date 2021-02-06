// set default values
document.getElementById("yaru_text").value = "👹これからやること";
document.getElementById("yaru_time").value = "3";


// setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = "60px 'Noto Sans JP', sans-serif";
ctx.textBaseline = "middle";
ctx.textAlign = "center";


let start_time = new Date().getTime();

const yaru_button_clicked = () => {
    start_time = new Date().getTime();
    const stream = canvas.captureStream();
    const video = document.getElementById("video");
    video.srcObject = stream;
    video.play().then(() =>
        video.requestPictureInPicture());
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const duration_min = Number(document.getElementById("yaru_time").value);

    let t = new Date().getTime();
    t = (t - start_time) / (duration_min * 60 * 1000);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width * t, canvas.height);

    const text = document.getElementById("yaru_text").value;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width * t, canvas.height);
    ctx.clip();
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.restore();

    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

document.getElementById("yaru_button").onclick = yaru_button_clicked;
