

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".heart-shape");
    const countdownElement = document.getElementById("countdown");
    const body = document.body;
    const slideshowContainer = document.querySelector('.slideshow-container');
    const backgrounds = ['bg1', 'bg2', 'bg3'];
    let currentIndex = 0;

   let days = 1;

   const slideshowInterval = setInterval(changeBackground, 4000);

   function changeBackground() {
       slideshowContainer.classList.remove(...backgrounds);
       currentIndex = (currentIndex + 1) % backgrounds.length;
       slideshowContainer.classList.add(backgrounds[currentIndex]);
   }

   function updateCountdown() {
       // 显示剩余天数
       countdownElement.innerHTML = `${days} days`;

       // 如果倒计时结束
       if (days >= 32) {
           clearInterval(countdownInterval);
           countdownElement.style.display = "none";
           container.style.display = "block";
           body.style.backgroundColor = "rgba(255, 192, 203, 0.5)"
           body.style.backgroundImage = "none";
           clearInterval(countdownInterval);
            clearInterval(slideshowInterval); // 停止轮播

            // 移除所有背景图片
            slideshowContainer.classList.remove(...backgrounds);
            slideshowContainer.style.backgroundImage = 'none';
           startHeartAnimation();
       } else {
           days++; // 每秒减少一天
       }
   }

   // 每秒更新一次倒计时
   const countdownInterval = setInterval(updateCountdown, 400);

    function startHeartAnimation() {
    // 参数范围，控制心形的密度
    const numPoints = 56;  // 照片数量
    const scaleFactor = 40;  // 控制心形的大小
    const positions = [];

    // 生成心形坐标
    for (let i = 0; i < numPoints; i++) {
        const t = Math.PI * 2 * i / numPoints;
        const x = scaleFactor * 16 * Math.sin(t) ** 3;
        const y = -scaleFactor * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        positions.push({ x: x + 500, y: y + 400 });  // 偏移以使心形居中
    }

    // 加载照片
    for (let i = 0; i < numPoints; i++) {
        const photo = document.createElement("div");
        photo.classList.add("photo");
        photo.style.left = '50%';  // 初始位置居中
        photo.style.top = '30%';

        const img = document.createElement("img");
        img.src = `images/photo${i + 1}.jpg`;  // 替换为实际路径
        photo.appendChild(img);

        container.appendChild(photo);

        // 延迟显示
        setTimeout(() => {
            photo.classList.add("show");
            setTimeout(() => {
                photo.style.left = `${positions[i].x}px`;
                photo.style.top = `${positions[i].y}px`;
                
            }, 1900);  // 在放大效果完成后再移动位置
        }, i * 1800);  // 每隔200ms显示一张照片
    }
}
const textContainer = document.getElementById("text-container");

    if (!textContainer) {
        console.error("Text container element is missing from the DOM.");
        return;
    }

    function showText(message, delay = 0, speed = 100) {
        setTimeout(() => {
            let index = 0;
            textContainer.innerHTML = "";

            function type() {
                if (index < message.length) {
                    textContainer.innerHTML += message.charAt(index);
                    index++;
                    setTimeout(type, speed); // 每100ms显示一个字符
                }
            }

            type();
        }, delay); // 延迟显示文本
    }

    // 示例：延迟 2000ms (2秒) 后开始逐字显示文本
    showText("It’s hard to believe that we’ve been together for a month already. I still remember how I mustered up the courage to confess my feelings to you that night. I believe it was the bravest and most correct decision I’ve made in years. Going forward, I promise to show my love for you through my actions. I love you! 🌟", 110000, 100);



updateCountdown();
});
