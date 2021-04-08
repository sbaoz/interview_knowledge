function instance_of(instance, constructor) {
    const prototype = constructor.prototype
    let __proto__ = Object.getPrototypeOf(instance)
    while (true) {
        if (__proto__ === null) {
            return false
        }
        if (__proto__ === prototype) {
            return true
        }
        __proto__ = Object.getPrototypeOf(__proto__)
    }
}
function Parent() {

}
function Child() {

}
Child.prototype = new Parent()
const childInstance = new Child()
console.log(instance_of(childInstance, Parent))
