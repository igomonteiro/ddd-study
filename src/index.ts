import Address from "./entity/Address";
import Customer from "./entity/Customer";
import Order from "./entity/Order";
import OrderItem from "./entity/OrderItem";

const customer = new Customer("123", "Igada");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 10);
const item2 = new OrderItem("2", "Item 2", 20, "p1", 10);

const order = new Order("1", "123", [item1, item2]);
