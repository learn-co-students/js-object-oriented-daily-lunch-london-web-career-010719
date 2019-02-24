// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {    
    constructor(name) {
        this.id = ++neighborhoodId
        this.name = name
        store.neighborhoods.push(this)
    }

    deliveries() {
        return store.deliveries.filter( delivery => 
            delivery.neighborhoodId === this.id
        )
    }

    customers() {
        return store.customers.filter( customer => 
            customer.neighborhoodId === this.id
            )
        }

    meals() {
        let allmeals = this.deliveries().map ( delivery => 
            delivery.meal()
        )
        return allmeals.filter((value, index, array) => array.indexOf(value) === index)
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.id = ++customerId
        this.neighborhoodId = neighborhoodId
        this.name = name    
        store.customers.push(this)    
    }

    deliveries() {
        return store.deliveries.filter( delivery => 
            delivery.customerId === this.id
        )
    }

    meals() {
        return this.deliveries().map ( delivery => 
            delivery.meal()
        )
    }

    totalSpent() {
        let reducer = function(total, meal) {
            return total += meal.price
        }
        return this.meals().reduce(reducer, 0);
    }
}

class Meal {
    constructor(title, price) {
        this.id = ++mealId
        this.title = title
        this.price = price
        store.meals.push(this)
    }

    deliveries() {
        return store.deliveries.filter( delivery => 
            delivery.mealId === this.id
        )
    }

    customers() {
        return this.deliveries().map ( delivery => 
            delivery.customer()
        )
    }

    static byPrice() {
        return store.meals.sort(function(a,b) {
            return a.price - b.price
        }).reverse()
    }
}
class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = ++deliveryId
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        store.deliveries.push(this)
    }

    meal() {
        return store.meals.find( meal => 
            meal.id === this.mealId
        )
    }

    customer() {
        return store.customers.find( customer => 
            customer.id === this.customerId
        )
    }

    neighborhood() {
        return store.neighborhoods.find( neighborhood => 
            neighborhood.id === this.neighborhoodId
        )
    }
}