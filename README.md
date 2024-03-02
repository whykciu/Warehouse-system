# Warehouse-system "Abar"
Abar is a simple web application facilitating the management of a wholesale store with a primary focus on beverage wholesale (but with an option to expand to other categories). The application enables management of customers and their orders, deliveries carried out by warehouse employees, and tasks issued by office staff.

# Technologies used
- Backend: Django
- Frontend: Angular, Typescript, HTML, SCSS
- Database: SQLite

# Users
The application includes a login and registration mechanism (for Customers only). Ultimately, there are 5 types of users:
- Administrator
- Customer
- Warehouse Employee
- Office Employee
- Unauthenticated User (Guest)

# Administrator
The administrator account is able to edit every model in the application. This account is created and available for login only on the Django administration page since it uses Django's technologies and advantages. Only the administrator can add new products and users such as Warehouse and Office Employees.

# Customer
This is the only type of account that anyone can create using the registration form on the website. This account only has the ability to order products to their registered address, view their order history, and delivery status.

# Office Employee
An account type created only by the administrator, responsible for reviewing orders placed by customers and allocating them for delivery to the appropriate warehouse employees. An office employee can also assign one of the predefined warehouse tasks or create a custom task if previous methods are not applicable.

# Pracownik hurtownii
This account is responsible for executing assigned tasks. This user can view all tasks assigned to them, categorized into three groups:
- New
- In progress
- Completed
    
Warehouse employees can start new tasks or complete ongoing ones. When handling a 'shipment' task, all orders within that shipment are updated with their completion status, providing customers ordering from that shipment with more accurate information about their orders.

# Guest
This is not an account type with any object in the system but simply an unauthenticated user who can browse the main page and register.

# Used Design Patterns
Tasks of different types inherit from a common Task model, so the Factory Method pattern was used when creating tasks, creating appropriate creators for different task types. The creator creates the appropriate task, sets its parameters, and saves it to the database. In the Django architecture, the MVT (Model - View - Template) pattern is used, where web page templates call appropriate REST methods on corresponding endpoints, which invoke methods in views (View), i.e., methods that communicate with the database using object models (Model) in Django.

# Możliwości rozwoju aplikacji
- Adding a warehouse class to store quantities of data objects
- Creating an interactive list of products (able to be checked/unchecked) in an order for warehouse employees to mark progress in unpacking products from vehicles
- Mapping routes for the entire shipment on maps as well as the order of points
- Creating a scalable web application for mobile devices or a separate phone application (this would facilitate the easy use of the two previous options)
