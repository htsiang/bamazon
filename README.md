## READ ME

Upon running the program, the product table displays. The inquirer npm then runs and asks the first question.
![Image 1](./images/runApp1.jpg)

If you don't confirm your order, the CLI asks if you want to try again.
![Image 2](./images/runApp2.jpg)

If you select 'no,' the CLI terminates.
![Image 3](./images/runApp3.jpg)

If you select 'yes,' the inquirer runs again and asks you what product you want to purchase and in what amount.
![Image 4](./images/runApp4.jpg)

When you confirm your order, the program checks the amount you want to order compared to the amount in stock. If not enough product is in stock, the program terminates with the message 'Insufficient quantity!'
![Image 5](./images/runApp5.jpg)

If there is enough product in stock, the order is fulfilled. The program logs the total cost of the order and displays the updated product quantity.
![Image 6](./images/runApp6.jpg)