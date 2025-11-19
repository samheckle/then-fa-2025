let vow = [
    "Skin smooth asphalt hardens",
    "once the morning clouds break.",
    "An earthworm lashes its drying body,",
    "all muscle and guts,",
    "and I think of how you might stoop",
    "mid sentence in pursuit of its",
    "moisture, some good dirt.",
    "",
    "What makes good dirt is mostly air, some water—",
    "room to move and consume and cast.",
    "This is my promise to you,",
    "To be mineral and porous.",
    "Once I’m reminded, I do what you might do.",
    "Pick up the little rings, toss them",
    "into good dirt.",
]

let lines

window.onload = () =>{
    let poem = document.getElementById('by-carly')

    for(let c = 0; c < 9; c++){
        let div = document.createElement('div')
        div.classList.add('column')
        div.style.top = (Math.random() * 50) + 50 + 'px'
        for(let line of vow){
            let span = document.createElement('span')
            for(let i = 0; i < 9; i++){
                span.textContent += line + ' '
            }
            span.classList.add('line')

            let index = vow.indexOf(line)
            span.id = 'line-'+index
            let topPos = index * 50 + 15
            span.style.top = topPos + 'px'
            div.append(span)
        }
        poem.append(div)
    }
    lines = document.getElementsByClassName('line')
}

setInterval(()=>{
    if (lines.length > 0){
        for(let line of lines){
            let leftPos = !parseInt(line.style.left) ? 15 : parseInt(line.style.left)
            console.log(leftPos)
            if(Math.random() > 0.5 ){
                line.style.left = leftPos* Math.sin(Date.now()) + "px"
            } else{
                line.style.left = leftPos* Math.sin(Date.now()) + "px"
            }
        }
    }
}, 500)