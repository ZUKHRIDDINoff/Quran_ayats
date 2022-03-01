const wrapper = document.querySelector('.wrapper'),
    ads = document.querySelector('.ads'),
    surahName = document.querySelector('#surahName'),
    btn = document.querySelector('.adss'),
    inputElement = document.querySelector('#inputElement'),
    list = document.querySelector('#list'),
    audioWrapper = document.querySelector('#audioWrapper')


inputElement.addEventListener('keyup', event => {
    if (event.keyCode == 13) {
        fetch('https://api.quran.sutanlab.id/surah/' + inputElement.value)
            .then(data => data.json())
            .then(data => {
                surahName.innerHTML = data.data.name.transliteration.en
                result = data.data.verses
                list.textContent = ''
                
                result.forEach(el => {
                    let li = document.createElement('li')
                    let h2 = document.createElement('h2')
                    let h4 = document.createElement('h4')
                    let audioEl = document.createElement('audio')
                    h2.textContent = el.text.arab
                    h4.textContent = el.translation.en
                    audioEl.src = el.audio.primary

                    li.append(h2, h4)
                    list.append(li)
                    li.addEventListener('click',(event) =>{
                        audioWrapper.innerHTML = null
                        audioEl.currentTime = 0;
                        audioWrapper.append(audioEl)
                        audioEl.play()
                    })
                    btn.addEventListener('click',(event) =>{
                        console.log(audioWrapper);
                    })
                })
            })
            .catch(error => console.log(error))
    }
})
