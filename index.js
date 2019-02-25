// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] }

let neighborhoodId = 0
class Neighborhood {
    constructor(name){
        this.id = ++neighborhoodId
        this.name = name
        store.neighborhoods.push(this)
    }
    deliveries() { return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id) }
    customers() { return store.customers.filter(customer => customer.neighborhoodId === this.id) }
    meals() { 
        const meals = this.deliveries()
            .map(del => del.mealId)
            .map(mealId => store.meals.find(meal => meal.id === mealId))
        return [...new Set(meals)]
    }
}

let customerId = 0
class Customer {
    constructor(name, neighborhoodId){
        this.id = ++customerId
        this.name = name
        this.neighborhoodId = neighborhoodId
        store.customers.push(this)
    }
    deliveries() { return store.deliveries.filter(delivery => delivery.customerId === this.id) }
    meals() {
        return this.deliveries().map(delivery => store.meals.find(meal => delivery.mealId === meal.id))
    }
    totalSpent() { return this.meals().reduce((acc, curr) => acc + curr.price, 0)}

}

let mealId = 0
class Meal {
    constructor(title, price){
        this.id = ++mealId
        this.title = title
        this.price = price
        store.meals.push(this)
    }
    deliveries() { return store.deliveries.filter(delivery => delivery.mealId === this.id) }
    customers() {
        return store.customers.filter(customer => this.deliveries()
            .some(delivery => delivery.customerId === customer.id))
    }
    static byPrice(){ return store.meals.sort((a,b) => b.price - a.price)}
}

let deliveryId = 0
class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.id = ++deliveryId
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        store.deliveries.push(this)
    }
    meal(){ return store.meals.find(meal => meal.id === this.mealId )}
    customer() { return store.customers.find(customer => customer.id === this.customerId) }
    neighborhood() { return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId) }
}