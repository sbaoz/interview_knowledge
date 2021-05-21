const a = {
    a: 1,
    b: () => {
        console.log('b')
    },
    c: {
        d: 2,
        e: () => {
            console.log('b')
        },
        g: {
            h: 3,
            i: () => {
                console.log('i')
            },
            j: {
                k: 4,
                l: () => {
                    console.log('l')
                },
            }
        }
    },
    f: [1,2,3]
}

const aa = {...a}
const aaa = Object.assign({}, a)
const aaaa = JSON.parse(JSON.stringify(a))
console.log(aa);
