let maindiv = document.createElement('div')
maindiv.classList.add('maindiv')
let size = 0
let isdone = 0
let stackdata = []
if (localStorage.length == 0) localStorage.setItem('datatext', JSON.stringify(stackdata))

const enter = document.querySelector('input')
enter.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) Clicktoadd()  
})

const Clicktoadd = () => {
    let s = []
    v = document.querySelector('input').value
    let userinput = {title: v, status: 'not-finish'}
    if (v == '') alert("Task can't be empty")
    else {
        if (size == 0) {
            s.push(userinput)
            localStorage.setItem('datatext', JSON.stringify(s))
            stackdata = JSON.parse(localStorage.getItem('datatext'))
            size = stackdata.length
            const reset = document.querySelector('.maindiv')
            if (reset != null) reset.remove()
            maindiv = document.createElement('div')
            maindiv.classList.add('maindiv')
            document.body.append(maindiv)
            isdone = 0
            show ()
        }
        else {
            stackdata.push(userinput)
            console.log(stackdata)
            localStorage.setItem('datatext', JSON.stringify(stackdata))
            stackdata = JSON.parse(localStorage.getItem('datatext'))
            size = stackdata.length
            const reset = document.querySelector('.maindiv')
            if (reset != null) reset.remove()
            maindiv = document.createElement('div')
            maindiv.classList.add('maindiv')
            document.body.append(maindiv)
            isdone = 0
            show ()
        }
    }
}

function show () {
    stackdata = JSON.parse(localStorage.getItem('datatext'))
    if (localStorage.length != 0) size = stackdata.length
    let i = size-1
    while (i != -1) { 
        const spanmain = document.createElement('span')
        const span = document.createElement('span')
        const delbtn = document.createElement('button')
        const donbtn = document.createElement('button')
        let index 
       
        // delete button
        delbtn.classList.add('delete')
        delbtn.innerHTML = 'DELLETE'
        delbtn.addEventListener('click', () => {
            if (size == 1) {
                stackdata = []
                maindiv.removeChild(spanmain) 
                localStorage.setItem('datatext', JSON.stringify(''))      
            }
            else {
                let arr = []
                for (let j=0;j<size;j++) {
                    if (index != j) 
                        arr.push(stackdata[j]) 
                }
                stackdata = arr
                maindiv.removeChild(spanmain)
                localStorage.setItem('datatext', JSON.stringify(stackdata))
                size = stackdata.length
                const reset = document.querySelector('.maindiv')
                if (reset != null) reset.remove()
                maindiv = document.createElement('div')
                maindiv.classList.add('maindiv')
                document.body.append(maindiv)
                isdone = 0   
                show ()
            } 
        })

        // done button
        donbtn.classList.add('done')
        donbtn.innerHTML = 'DONE'
        donbtn.addEventListener('click', () => {
            if (stackdata[index].status != 'done') {
                let arr = []
                let k = 0
                for (let j=0;j<size;j++) {    
                    if(j != isdone){
                        if (k == index) k++
                        arr[j] = stackdata[k++]
                    }else {
                        arr.push({title: stackdata[index].title, status: 'done'})
                    }
                }
                index = isdone
                stackdata = arr
                localStorage.setItem('datatext', JSON.stringify(stackdata))
                size = stackdata.length
                const reset = document.querySelector('.maindiv')
                if (reset != null) reset.remove()
                maindiv = document.createElement('div')
                maindiv.classList.add('maindiv')
                document.body.append(maindiv)
                isdone = 0
                show ()
            }
        })

        
        index  = i
        if (stackdata[i].status == 'done') isdone++
        if (stackdata[i].status == 'done') {
            span.classList.add('doneactive')
            donbtn.classList.remove('done')
            donbtn.classList.add('donebtn')
            delbtn.classList.remove('delete')
            delbtn.classList.add('donebtn')
        }
        spanmain.classList.add('spanmain')
        span.append(stackdata[i--].title)
        spanmain.append(span)
        spanmain.append(donbtn)
        spanmain.append(delbtn)
        spanmain.append(document.createElement('br'))
        maindiv.append(spanmain)
    }
    console.log('size : ' + size)
}
document.body.append(maindiv)
if (localStorage.length != 0) show ()


